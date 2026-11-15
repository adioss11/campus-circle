from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.current_user import get_current_user
from app.database import get_db
from app.event_payload import event_to_out
from app.models.event import Event
from app.models.user import User
from app.schemas.event import EventCreate, EventOut

router = APIRouter(prefix="/events", tags=["events"])


@router.get("", response_model=list[EventOut])
def list_events(
    db: Session = Depends(get_db),
    _user: User = Depends(get_current_user),
):
    """
    Return every event row from PostgreSQL.

    The login token is required. The list is still shared: this query does
    not filter by person. Newest saved first (highest id first).
    """
    events = db.query(Event).order_by(Event.id.desc()).all()
    return [event_to_out(event, db) for event in events]


@router.post("", response_model=EventOut, status_code=201)
def create_event(
    payload: EventCreate,
    db: Session = Depends(get_db),
    _user: User = Depends(get_current_user),
):
    """
    Create one event row in PostgreSQL and return it.

    Steps:
    1. FastAPI checks the JSON against EventCreate.
    2. We build an Event model (table row).
    3. db.add + db.commit saves it.
    4. db.refresh loads the new id from Postgres.

    The login token is required. The new event is visible to every
    logged-in person.
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
    return event_to_out(event, db)


@router.get("/{event_id}", response_model=EventOut)
def get_event(
    event_id: int,
    db: Session = Depends(get_db),
    _user: User = Depends(get_current_user),
):
    """One event. The login token is required."""
    event = db.query(Event).filter(Event.id == event_id).first()
    if not event:
        raise HTTPException(status_code=404, detail="Event not found")
    return event_to_out(event, db)
