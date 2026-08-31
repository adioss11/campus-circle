import { useNavigate } from "react-router-dom";

type SidebarProps = {
  onPost: () => void;
};

export function Sidebar({ onPost }: SidebarProps) {
  const navigate = useNavigate();

  return (
    <aside className="sidebar">
      <p className="sidebar-mark">Campus Circle</p>

      <nav className="sidebar-nav">
        <button
          type="button"
          className="sidebar-link is-current"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          Events
        </button>
        <button type="button" className="sidebar-link" onClick={onPost}>
          Post event
        </button>
        <button type="button" className="sidebar-link" title="Coming soon">
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
