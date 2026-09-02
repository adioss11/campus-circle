import { ProfileEventList } from "../components/ProfileEventList";
import { Sidebar } from "../components/Sidebar";
import { eventsForIds, FAKE_ME } from "../data/fakeProfile";
import "./EventsPage.css";
import "./ProfilePage.css";

export function ProfilePage() {
  const going = eventsForIds(FAKE_ME.goingEventIds);
  const looking = eventsForIds(FAKE_ME.lookingEventIds);

  return (
    <div className="events-shell">
      <div className="atmosphere" aria-hidden="true" />
      <div className="events-layout">
        <Sidebar />
        <main className="feed">
          <header className="profile-header">
            <div className="profile-avatar" aria-hidden="true">
              {FAKE_ME.initials}
            </div>
            <div>
              <p className="eyebrow">YOUR PROFILE</p>
              <h1>{FAKE_ME.name}</h1>
              <p>Fake preview for now. Photo upload comes later with a backend.</p>
            </div>
          </header>

          <ProfileEventList
            heading="Going"
            events={going}
            emptyText="You have not marked Going on any events yet."
          />
          <ProfileEventList
            heading="Looking for someone"
            events={looking}
            emptyText="You have not marked Looking for someone on any events yet."
          />
        </main>
      </div>
    </div>
  );
}
