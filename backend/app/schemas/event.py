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
    """JSON we send back for one event, including RSVP name lists."""

    id: int
    title: str
    day: str
    month: str
    time: str
    location: str
    description: str
    goingPeople: list[str] = Field(default_factory=list)
    lookingPeople: list[str] = Field(default_factory=list)
