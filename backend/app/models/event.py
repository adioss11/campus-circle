from sqlalchemy import Integer, String, Text
from sqlalchemy.orm import Mapped, mapped_column

from app.database import Base


class Event(Base):
    """One row in the events table = one campus event."""

    __tablename__ = "events"

    # Primary key: Postgres fills this in automatically (1, 2, 3, …).
    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)

    title: Mapped[str] = mapped_column(String(120), nullable=False)
    day: Mapped[str] = mapped_column(String(2), nullable=False)
    month: Mapped[str] = mapped_column(String(3), nullable=False)
    # Display string like "6:00 PM – 8:00 PM" (matches the frontend for now).
    time: Mapped[str] = mapped_column(String(40), nullable=False)
    location: Mapped[str] = mapped_column(String(120), nullable=False)
    description: Mapped[str] = mapped_column(Text, nullable=False)
