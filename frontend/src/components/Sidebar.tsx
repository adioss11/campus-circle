import { useLocation, useNavigate } from "react-router-dom";

type SidebarProps = {
  onPost?: () => void;
};

export function Sidebar({ onPost }: SidebarProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const onEvents = location.pathname === "/events";
  const onProfile = location.pathname === "/profile";

  return (
    <aside className="sidebar">
      <p className="sidebar-mark">Campus Circle</p>

      <nav className="sidebar-nav">
        <button
          type="button"
          className={onEvents ? "sidebar-link is-current" : "sidebar-link"}
          onClick={() => {
            if (onEvents) {
              window.location.reload();
              return;
            }
            navigate("/events");
          }}
        >
          Events
        </button>
        <button
          type="button"
          className="sidebar-link"
          onClick={() => {
            if (onPost) {
              onPost();
              return;
            }
            navigate("/events");
          }}
        >
          Post event
        </button>
        <button
          type="button"
          className={onProfile ? "sidebar-link is-current" : "sidebar-link"}
          onClick={() => {
            if (onProfile) {
              window.scrollTo({ top: 0, behavior: "smooth" });
              return;
            }
            navigate("/profile");
          }}
        >
          Profile
        </button>
        <button
          type="button"
          className="sidebar-link"
          onClick={() => navigate("/")}
        >
          Log out
        </button>
      </nav>
    </aside>
  );
}
