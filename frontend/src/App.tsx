import "./App.css";

function App() {
  return (
    <div className="app">
      <nav className="navbar">
        <div className="logo">Campus Circle</div>

        <div className="nav-links">
          <a href="#">Home</a>
          <a href="#">Events</a>
          <a href="#">Clubs</a>
          <a href="#">About</a>
        </div>

        <button className="login-button">Log In</button>
      </nav>

      <main className="hero">
        <div className="hero-text">
          <p className="eyebrow">YOUR CAMPUS. YOUR COMMUNITY.</p>

          <h1>
            Find your people.
            <br />
            <span>Build your circle.</span>
          </h1>

          <p className="description">
            Discover events, meet new people, join clubs, and make the most
            of your college experience.
          </p>

          <div className="buttons">
            <button className="primary-button">Get Started</button>
            <button className="secondary-button">Explore Events</button>
          </div>
        </div>

        <div className="hero-card">
          <div className="card-header">
            <span>🎓</span>
            <div>
              <strong>Campus Events</strong>
              <small>What's happening this week</small>
            </div>
          </div>

          <div className="event">
            <div className="event-date">
              <strong>15</strong>
              <small>SEP</small>
            </div>
            <div>
              <strong>Welcome Back Social</strong>
              <p>Student Center · 6:00 PM</p>
            </div>
          </div>

          <div className="event">
            <div className="event-date">
              <strong>18</strong>
              <small>SEP</small>
            </div>
            <div>
              <strong>Club Fair</strong>
              <p>Main Quad · 12:00 PM</p>
            </div>
          </div>

          <div className="event">
            <div className="event-date">
              <strong>21</strong>
              <small>SEP</small>
            </div>
            <div>
              <strong>Game Night</strong>
              <p>Student Lounge · 7:30 PM</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
