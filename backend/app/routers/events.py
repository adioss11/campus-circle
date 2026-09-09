from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database import get_db
from app.models.event import Event
from app.schemas.event import EventCreate, EventOut

router = APIRouter(prefix="/events", tags=["events"])


@router.get("", response_model=list[EventOut])
def list_events(db: Session = Depends(get_db)):
    """
    Return every event row from PostgreSQL.

    Newest saved first (highest id first). That is a simple stand-in until
    we store real dates we can sort by.
    """
    return db.query(Event).order_by(Event.id.desc()).all()


@router.post("", response_model=EventOut, status_code=201)
def create_event(payload: EventCreate, db: Session = Depends(get_db)):
    """
    Create one event row in PostgreSQL and return it.

    Steps:
    1. FastAPI checks the JSON against EventCreate.
    2. We build an Event model (table row).
    3. db.add + db.commit saves it.
    4. db.refresh loads the new id from Postgres.
    """
    event = Event(
        title=payload.title.strip(),
        day=payload.day.strip(),
        month=payload.month.strip(),
        time=payload.time.strip(),
        location=payload.location.strip(),
        description=payload.description.strip(),
    )
    db.add(event)
    db.commit()
    db.refresh(event)
    return event
