from app.passwords import _ITERATIONS, hash_password, verify_password


def test_new_hash_uses_600000_rounds_and_verifies():
    stored = hash_password("password123")
    assert stored.startswith(f"{_ITERATIONS}$")
    assert _ITERATIONS == 600_000
    assert verify_password("password123", stored)
    assert not verify_password("wrong-password", stored)


def test_legacy_200000_round_hash_still_verifies():
    import hashlib

    salt = "cd" * 16
    digest = hashlib.pbkdf2_hmac(
        "sha256",
        b"password123",
        salt.encode(),
        200_000,
    ).hex()
    stored = f"{salt}${digest}"
    assert verify_password("password123", stored)
    assert not verify_password("wrong-password", stored)
