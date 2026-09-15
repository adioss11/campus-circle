from sqlalchemy.orm import Session

from app.models.user import User

# Temporary stand-in until real login exists.
DEMO_USER_NAME = "Alex Kim"


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
