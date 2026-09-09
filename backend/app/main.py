from fastapi import FastAPI

from app.database import check_database_connection

# Create the API application. This is the object uvicorn starts.
app = FastAPI(title="CampusCircle API")


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
