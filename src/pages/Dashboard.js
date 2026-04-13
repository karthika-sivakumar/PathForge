import Sidebar from "../components/Sidebar";
import StatCard from "../components/StatCard";
import "../styles/dashboard.css";
import { Plus, PackageOpen } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="dashboard">
      <Sidebar />

      <div className="main">
        <div className="top-bar">
          <div>
            <h1>Your Desk</h1>
            <p>Pick up where you left off.</p>
          </div>

          <button 
             className="new-btn flex items-center gap-2"
             onClick={() => navigate("/create")}
          >
            <Plus size={18} />
            New Path
          </button>
        </div>

        <div className="stats">
          <StatCard title="Total Paths" value="0" />
          <StatCard title="Total Videos" value="0" />
          <StatCard title="Completed" value="0" />
          <StatCard title="Overall" value="0%" />
        </div>

        <h2 className="section-title">Learning Paths</h2>

        <div className="empty-box flex flex-col items-center gap-2">
          <PackageOpen size={40} className="text-gray-400" />
          <h3>No paths yet</h3>
          <p>Create your first learning path to start organizing</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;