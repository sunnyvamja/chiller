import { Outlet } from "react-router-dom";
import "../App.css";

function Dashboard() {
  return (
    <div className="set">
      <div className="dashboard-container">
        <h3>Dashboard</h3>
        <p>Welcome to the school admin panel...</p>
        <Outlet />
      </div>
    </div>
  );
}

export default Dashboard;