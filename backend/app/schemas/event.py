from pydantic import BaseModel, Field


class EventCreate(BaseModel):
    """JSON body the client sends to create an event."""

    title: str = Field(min_length=1, max_length=120)
    day: str = Field(min_length=1, max_length=2)
    month: str = Field(min_length=1, max_length=3)
    time: str = Field(min_length=1, max_length=40)
    location: str = Field(min_length=1, max_length=120)
    description: str = Field(min_length=1)


class EventOut(BaseModel):
    """JSON we send back after creating (or later listing) an event."""

    id: int
    title: str
    day: str
    month: str
    time: str
    location: str
    description: str

    # Lets FastAPI build this from a SQLAlchemy Event row automatically.
    model_config = {"from_attributes": True}
