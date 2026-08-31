import { useState } from "react";
import "./App.css";
import { AuthForm } from "./components/AuthForm";

type Screen = "home" | "login" | "signup";

function App() {
  const [screen, setScreen] = useState<Screen>("home");
  const isAuth = screen !== "home";

  return (
    <div className="app">
      <div className="atmosphere" aria-hidden="true" />

      <main className={isAuth ? "stage is-auth" : "stage"}>
        <div className="cluster">
          <section className="brand">
            <button
              type="button"
              className="wordmark"
              onClick={() => setScreen("home")}
            >
              Campus Circle
            </button>

            <p className="eyebrow">YOUR CAMPUS. YOUR COMMUNITY.</p>

            <h1>
              Find your people.
              <br />
              <span>Build your circle.</span>
            </h1>

            <p className="description">
              Campus events happen every day, but they are easy to miss and
              often feel empty. See who is going — or find someone to go with —
              so you are not the first to walk in.
            </p>

            {isAuth ? null : (
              <div className="buttons">
                <button
                  type="button"
                  className="secondary-button"
                  onClick={() => setScreen("login")}
                >
                  Log in
                </button>
                <button
                  type="button"
                  className="primary-button"
                  onClick={() => setScreen("signup")}
                >
                  Sign up
                </button>
              </div>
            )}
          </section>

          <section className="auth-slot" aria-hidden={!isAuth}>
            {isAuth ? (
              <AuthForm
                mode={screen === "signup" ? "signup" : "login"}
                onSwitchMode={() =>
                  setScreen(screen === "login" ? "signup" : "login")
                }
                onBack={() => setScreen("home")}
              />
            ) : null}
          </section>
        </div>
      </main>
    </div>
  );
}

export default App;
