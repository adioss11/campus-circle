import hashlib
import secrets

# A slow hash makes guessing passwords expensive.
# 200_000 is the number of times we re-hash. Higher = slower = harder to brute-force.
_ITERATIONS = 200_000


def hash_password(password: str) -> str:
    """Turn a password into a stored string. The password itself is not stored."""
    salt = secrets.token_hex(16)
    digest = hashlib.pbkdf2_hmac(
        "sha256",
        password.encode(),
        salt.encode(),
        _ITERATIONS,
    )
    return f"{salt}${digest.hex()}"


def verify_password(password: str, stored: str) -> bool:
    """Return True if this password matches the stored hash."""
    try:
        salt, digest_hex = stored.split("$", 1)
    except ValueError:
        return False
    digest = hashlib.pbkdf2_hmac(
        "sha256",
        password.encode(),
        salt.encode(),
        _ITERATIONS,
    )
    return secrets.compare_digest(digest.hex(), digest_hex)
