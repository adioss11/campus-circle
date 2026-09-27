import { useState } from "react";
import { login, signup } from "../api/auth";

type AuthFormProps = {
  mode: "login" | "signup";
  onSwitchMode: () => void;
  onBack: () => void;
  onSuccess: () => void;
};

export function AuthForm({
  mode,
  onSwitchMode,
  onBack,
  onSuccess,
}: AuthFormProps) {
  const isSignup = mode === "signup";
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  return (
    <form
      className="auth-form"
      onSubmit={(event) => {
        event.preventDefault();
        if (busy) {
          return;
        }
        setError("");
        setBusy(true);
        const action = isSignup
          ? signup({ name: name.trim(), email: email.trim(), password })
          : login({ email: email.trim(), password });
        void action
          .then(() => onSuccess())
          .catch((reason: unknown) => {
            const message =
              reason instanceof Error ? reason.message : "Could not log in";
            setError(
              message === "Failed to fetch"
                ? "Could not reach the API. Is it running on port 8000?"
                : message,
            );
          })
          .finally(() => setBusy(false));
      }}
    >
      <p className="eyebrow">{isSignup ? "NEW HERE" : "WELCOME BACK"}</p>
      <h2>{isSignup ? "Create an account" : "Log in"}</h2>
      <p className="auth-copy">
        Accounts are saved in PostgreSQL. The password is stored as a hash, not
        as the text you type.
      </p>

      <div className="fields">
        {isSignup ? (
          <label className="field" htmlFor="name">
            <span>Name</span>
            <input
              id="name"
              type="text"
              value={name}
              autoComplete="name"
              onChange={(event) => setName(event.target.value)}
              required
            />
          </label>
        ) : null}

        <label className="field" htmlFor="email">
          <span>Email</span>
          <input
            id="email"
            type="email"
            value={email}
            autoComplete="email"
              onChange={(event) => setEmail(event.target.value)}
              required
            />
        </label>

        <label className="field" htmlFor="password">
          <span>Password</span>
          <input
            id="password"
            type="password"
            value={password}
            autoComplete={isSignup ? "new-password" : "current-password"}
              minLength={isSignup ? 8 : undefined}
              onChange={(event) => setPassword(event.target.value)}
              required
            />
          </label>
        </div>

        {error ? <p className="form-error">{error}</p> : null}

        <button type="submit" className="primary-button" disabled={busy}>
          {busy ? "Please wait…" : isSignup ? "Sign up" : "Log in"}
        </button>

      <p className="auth-switch">
        {isSignup ? "Already have an account?" : "Need an account?"}{" "}
        <button type="button" className="text-button" onClick={onSwitchMode}>
          {isSignup ? "Log in" : "Sign up"}
        </button>
      </p>

      <button type="button" className="text-button back-button" onClick={onBack}>
        Back to home
      </button>
    </form>
  );
}
