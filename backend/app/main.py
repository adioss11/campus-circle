from contextlib import asynccontextmanager

from fastapi import FastAPI

from app.database import Base, check_database_connection, engine
from app.routers import events

# Import models so Base.metadata knows which tables to create.
from app.models import event as event_model  # noqa: F401


@asynccontextmanager
async def lifespan(_app: FastAPI):
    """Runs once when the server starts, then again when it shuts down."""
    # Option 1: if the events table does not exist yet, create it.
    Base.metadata.create_all(bind=engine)
    yield


app = FastAPI(title="CampusCircle API", lifespan=lifespan)
app.include_router(events.router)


@app.get("/")
def root():
    """Home URL of the API — a simple hello so we know the server is alive."""
    return {"message": "CampusCircle API is running"}


@app.get("/health")
def health():
    """
    Health check URL.
    Also verifies the PostgreSQL connection so we know the DB is reachable.
    """
    try:
        check_database_connection()
        database_status = "ok"
    except Exception as error:
        database_status = f"error: {error}"

    return {
        "status": "ok" if database_status == "ok" else "degraded",
        "database": database_status,
    }
