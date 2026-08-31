import { useState } from "react";

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

  return (
    <form
      className="auth-form"
      onSubmit={(event) => {
        event.preventDefault();
        onSuccess();
      }}
    >
      <p className="eyebrow">{isSignup ? "NEW HERE" : "WELCOME BACK"}</p>
      <h2>{isSignup ? "Create an account" : "Log in"}</h2>
      <p className="auth-copy">
        Preview only. Nothing is saved yet — the API comes later.
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
          />
        </label>

        <label className="field" htmlFor="password">
          <span>Password</span>
          <input
            id="password"
            type="password"
            value={password}
            autoComplete={isSignup ? "new-password" : "current-password"}
            onChange={(event) => setPassword(event.target.value)}
          />
        </label>
      </div>

      <button type="submit" className="primary-button">
        {isSignup ? "Sign up" : "Log in"}
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
