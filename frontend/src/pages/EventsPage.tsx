import { useEffect, useLayoutEffect, useState } from "react";
import { createEvent, getEvents } from "../api/events";
import { EventCard } from "../components/EventCard";
import { PostEventModal } from "../components/PostEventModal";
import { Sidebar } from "../components/Sidebar";
import type { CampusEvent } from "../types/event";
import "./EventsPage.css";

export function EventsPage() {
  const [events, setEvents] = useState<CampusEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [posting, setPosting] = useState(false);
  const [saving, setSaving] = useState(false);

  useLayoutEffect(() => {
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }
    window.scrollTo(0, 0);
    if (sessionStorage.getItem("campusCircleScrollTop") === "1") {
      sessionStorage.removeItem("campusCircleScrollTop");
    }
  }, []);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const data = await getEvents();
        if (!cancelled) {
          setEvents(data);
          setLoadError(null);
        }
      } catch {
        if (!cancelled) {
          setLoadError(
            "Could not load events. Is the API running on port 8000?",
          );
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    void load();
    return () => {
      cancelled = true;
    };
  }, []);

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
          {loading ? <p className="feed-status">Loading events…</p> : null}
          {loadError ? <p className="feed-status feed-status-error">{loadError}</p> : null}
          {saveError ? <p className="feed-status feed-status-error">{saveError}</p> : null}
          {!loading && !loadError && events.length === 0 ? (
            <p className="feed-status">No events yet. Post the first one.</p>
          ) : null}
          {events.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </main>
      </div>
      {posting ? (
        <PostEventModal
          onClose={() => setPosting(false)}
          saving={saving}
          onCreate={(draft) => {
            void (async () => {
              setSaving(true);
              setSaveError(null);
              try {
                const saved = await createEvent({
                  title: draft.title,
                  day: draft.day,
                  month: draft.month,
                  time: draft.time,
                  location: draft.location,
                  description: draft.description,
                });
                setEvents((current) => [saved, ...current]);
                setPosting(false);
                window.scrollTo({ top: 0, behavior: "smooth" });
              } catch {
                setSaveError(
                  "Could not save the event. Is the API running on port 8000?",
                );
              } finally {
                setSaving(false);
              }
            })();
          }}
        />
      ) : null}
    </div>
  );
}
