import { useState } from "react";
import { EventCard } from "../components/EventCard";
import { PostEventModal } from "../components/PostEventModal";
import { Sidebar } from "../components/Sidebar";
import { FAKE_EVENTS } from "../data/fakeEvents";
import type { CampusEvent } from "../types/event";
import "./EventsPage.css";

export function EventsPage() {
  const [events, setEvents] = useState<CampusEvent[]>(FAKE_EVENTS);
  const [posting, setPosting] = useState(false);

  return (
    <div className="events-shell">
      <div className="atmosphere" aria-hidden="true" />
      <div className="events-layout">
        <Sidebar onPost={() => setPosting(true)} />
        <main className="feed" id="event-feed">
          <header className="feed-header">
            <p className="eyebrow">THIS WEEK ON CAMPUS</p>
            <h1>Events</h1>
            <p>See who is going — or find someone to go with.</p>
          </header>
          {events.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </main>
      </div>
      {posting ? (
        <PostEventModal
          onClose={() => setPosting(false)}
          onCreate={(event) => {
            setEvents((current) => [event, ...current]);
            setPosting(false);
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
        />
      ) : null}
    </div>
  );
}
