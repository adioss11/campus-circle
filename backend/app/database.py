import os

from dotenv import find_dotenv, load_dotenv
from sqlalchemy import create_engine, text
from sqlalchemy.orm import DeclarativeBase, sessionmaker

# Load variables from backend/.env into the process environment.
# find_dotenv walks up from this file so it still works if you start uvicorn
# from the backend/ folder.
load_dotenv(find_dotenv())

DATABASE_URL = os.getenv("DATABASE_URL")
if not DATABASE_URL:
    raise RuntimeError(
        "DATABASE_URL is missing. Copy backend/.env.example to backend/.env "
        "and set your PostgreSQL connection string."
    )

# engine = the live connection pool to PostgreSQL
engine = create_engine(DATABASE_URL)

# SessionLocal = factory for short-lived DB sessions (one per request later)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)


class Base(DeclarativeBase):
    """Parent class for table models we will add in a later step."""

    pass


def check_database_connection() -> bool:
    """Return True if PostgreSQL answers a simple SELECT 1."""
    with engine.connect() as connection:
        connection.execute(text("SELECT 1"))
    return True


def get_db():
    """
    FastAPI dependency we will use on routes later.
    Opens a session, yields it to the route, then closes it.
    """
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
