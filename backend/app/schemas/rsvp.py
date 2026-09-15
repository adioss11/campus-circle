from typing import Literal

from pydantic import BaseModel


class RsvpUpdate(BaseModel):
    """JSON body for clicking Going or Looking for someone."""

    status: Literal["going", "looking"]
