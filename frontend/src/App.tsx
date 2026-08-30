import "./App.css";
import { EventCard } from "./components/EventCard";
import { FAKE_EVENTS } from "./data/fakeEvents";

function App() {
  return (
    <div className="app">
      <nav className="navbar">
        <div className="logo">Campus Circle</div>

        <div className="nav-links">
          <a href="#home" className="active">
            Home
          </a>
          <a href="#events">Events</a>
        </div>

        <button type="button" className="login-button">
          Log In
        </button>
      </nav>

      <main>
        <section id="home" className="hero">
          <div className="hero-text">
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

            <div className="buttons">
              <a href="#events" className="primary-button">
                See this week's events
              </a>
              <a href="#how-it-works" className="secondary-button">
                How it works
              </a>
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

            {FAKE_EVENTS.map((event) => (
              <div className="event" key={event.id}>
                <div className="event-date">
                  <strong>{event.day}</strong>
                  <small>{event.month}</small>
                </div>
                <div>
                  <strong>{event.title}</strong>
                  <p>
                    {event.location} · {event.time}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section id="events" className="events-section">
          <div className="section-heading">
            <p className="eyebrow">THIS WEEK ON CAMPUS</p>
            <h2>A few events you can actually show up to</h2>
            <p>
              See who is already in — so the room does not feel empty when you
              arrive.
            </p>
          </div>

          <div className="event-grid">
            {FAKE_EVENTS.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        </section>

        <section id="how-it-works" className="how-it-works">
          <div className="section-heading">
            <p className="eyebrow">THREE STEPS</p>
            <h2>How CampusCircle works</h2>
          </div>

          <div className="steps">
            <article className="step">
              <span>1</span>
              <h3>See what is on campus</h3>
              <p>
                Events in one place, instead of scattered university social
                accounts.
              </p>
            </article>
            <article className="step">
              <span>2</span>
              <h3>Say you are going</h3>
              <p>
                RSVP Going, or Looking for someone, so other students can see
                you.
              </p>
            </article>
            <article className="step">
              <span>3</span>
              <h3>Show up together</h3>
              <p>
                Public counts make it less awkward to be one of the first
                people there.
              </p>
            </article>
          </div>
        </section>
      </main>

      <footer className="footer">
        CampusCircle · static frontend preview · work in progress
      </footer>
    </div>
  );
}

export default App;
