from fastapi import FastAPI

# Create the API application. This is the object uvicorn starts.
app = FastAPI(title="CampusCircle API")


@app.get("/")
def root():
    """Home URL of the API — a simple hello so we know the server is alive."""
    return {"message": "CampusCircle API is running"}


@app.get("/health")
def health():
    """Health check URL — used later to confirm the server is up."""
    return {"status": "ok"}
