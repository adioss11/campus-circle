from pydantic import BaseModel, Field

from app.schemas.event import EventOut


class ProfileOut(BaseModel):
    """JSON for the profile page: who you are, plus events from your RSVPs."""

    id: int
    name: str
    initials: str
    going: list[EventOut] = Field(default_factory=list)
    looking: list[EventOut] = Field(default_factory=list)
