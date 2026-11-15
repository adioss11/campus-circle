import hashlib
import secrets

# A slow hash makes guessing passwords expensive.
# New passwords use 600_000 rounds, the current OWASP guide for PBKDF2-SHA256.
# Hashes saved earlier used 200_000 rounds. verify_password still accepts those.
_ITERATIONS = 600_000
_LEGACY_ITERATIONS = 200_000
_ALLOWED_ITERATIONS = {_ITERATIONS, _LEGACY_ITERATIONS}


def hash_password(password: str) -> str:
    """Turn a password into a stored string. The password itself is not stored.

    Format: iterations$salt$digest. The iteration count is stored so an older
    hash can still be checked after this number changes.
    """
    salt = secrets.token_hex(16)
    digest = hashlib.pbkdf2_hmac(
        "sha256",
        password.encode(),
        salt.encode(),
        _ITERATIONS,
    )
    return f"{_ITERATIONS}${salt}${digest.hex()}"


def verify_password(password: str, stored: str) -> bool:
    """Return True if this password matches the stored hash."""
    parsed = _parse_stored(stored)
    if parsed is None:
        return False
    iterations, salt, digest_hex = parsed
    digest = hashlib.pbkdf2_hmac(
        "sha256",
        password.encode(),
        salt.encode(),
        iterations,
    )
    return secrets.compare_digest(digest.hex(), digest_hex)


def _parse_stored(stored: str) -> tuple[int, str, str] | None:
    parts = stored.split("$")
    if len(parts) == 2:
        iterations = _LEGACY_ITERATIONS
        salt, digest_hex = parts
    elif len(parts) == 3 and parts[0].isdigit():
        iterations = int(parts[0])
        salt, digest_hex = parts[1], parts[2]
    else:
        return None
    if iterations not in _ALLOWED_ITERATIONS or not salt or not digest_hex:
        return None
    return iterations, salt, digest_hex
