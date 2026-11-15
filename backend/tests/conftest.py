import os
import subprocess

# Point the app at a separate database before it is imported.
os.environ["DATABASE_URL"] = (
    "postgresql+psycopg2://campuscircle:campuscircle@127.0.0.1:5432/campuscircle_test"
)

subprocess.run(
    [
        "sudo",
        "-u",
        "postgres",
        "psql",
        "-c",
        "CREATE DATABASE campuscircle_test OWNER campuscircle",
    ],
    check=False,
    capture_output=True,
)

import pytest
from fastapi.testclient import TestClient

from app.database import SessionLocal
from app.main import app
from app.models.event import Event
from app.models.rsvp import Rsvp
from app.models.session import LoginSession
from app.models.user import User


def wipe() -> None:
    db = SessionLocal()
    try:
        db.query(Rsvp).delete()
        db.query(LoginSession).delete()
        db.query(Event).delete()
        db.query(User).delete()
        db.commit()
    finally:
        db.close()


@pytest.fixture(scope="session")
def client():
    with TestClient(app) as test_client:
        yield test_client


@pytest.fixture(autouse=True)
def _clean(client):
    wipe()
    yield
    wipe()
