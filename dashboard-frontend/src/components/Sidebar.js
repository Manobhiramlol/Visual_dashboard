import React from "react";
import { Link } from "react-router-dom";
import "../Styles/Sidebar.css"; // Ensure this path is correct

const Sidebar = () => {
  return (
    <div className="Sidebar">
      <h2>Dashboard</h2>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/analytics">Analytics</Link></li>
        <li><Link to="/settings">Settings</Link></li>
      </ul>
    </div>
  );
};

export default Sidebar;
