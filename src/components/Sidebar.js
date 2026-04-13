import { useNavigate, useLocation } from "react-router-dom";
import {
  BookOpen,
  LayoutDashboard,
  LogOut,
  User
} from "lucide-react";

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <div className="sidebar">
      {/* Top */}
      <div>
        <div className="logo-box">
          <BookOpen size={22} />
          <span>PathForge</span>
        </div>

        <div
          className={`menu ${location.pathname === "/" ? "active" : ""}`}
          onClick={() => navigate("/")}
        >
          <LayoutDashboard size={20} />
          <span>Dashboard</span>
        </div>

      </div>

      {/* Bottom */}
      <div className="bottom-section">
        <div className="user">
          <div className="avatar">
            {user?.name ? user.name.charAt(0).toUpperCase() : <User size={16} />}
          </div>

          <div className="user-info">
            <p>{user?.name || "User"}</p>
            <span>{user?.email || "user@email.com"}</span>
          </div>
        </div>

        {/* Logout as menu item (not button) */}
        <div className="menu logout" onClick={handleLogout}>
          <LogOut size={18} />
          <span>Logout</span>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;