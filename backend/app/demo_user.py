from sqlalchemy.orm import Session

from app.models.user import User

# Temporary stand-in until real login exists.
DEMO_USER_NAME = "Alex Kim"


def initials_from_name(name: str) -> str:
    """Turn 'Alex Kim' into 'AK'. Not stored in the database — computed when we respond."""
    parts = [part for part in name.split() if part]
    if not parts:
        return "?"
    if len(parts) == 1:
        return parts[0][:2].upper()
    return (parts[0][0] + parts[-1][0]).upper()


def ensure_demo_user(db: Session) -> User:
    """Create Alex Kim once if missing, then return that row."""
    user = db.query(User).filter(User.name == DEMO_USER_NAME).first()
    if user:
        return user
    user = User(name=DEMO_USER_NAME)
    db.add(user)
    db.commit()
    db.refresh(user)
    return user
