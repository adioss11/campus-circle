from sqlalchemy import text
from sqlalchemy.engine import Engine


def ensure_auth_columns(engine: Engine) -> None:
    """Add login columns if the users table already existed without them.

    create_all creates missing tables. It does not add new columns to a table
    that is already there. These ALTER statements are the small, explicit
    update for that case. Safe to run every startup.
    """
    statements = [
        "ALTER TABLE users ADD COLUMN IF NOT EXISTS email VARCHAR(255)",
        "ALTER TABLE users ADD COLUMN IF NOT EXISTS password_hash VARCHAR(255)",
        "ALTER TABLE users DROP CONSTRAINT IF EXISTS users_name_key",
        "DROP INDEX IF EXISTS users_name_key",
        "CREATE UNIQUE INDEX IF NOT EXISTS users_email_key ON users (email)",
    ]
    with engine.begin() as connection:
        for statement in statements:
            connection.execute(text(statement))
