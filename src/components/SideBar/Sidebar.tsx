import React from "react";
import { MDBIcon } from "mdb-react-ui-kit";
import "./Sidebar.css";
import { NavLink } from "react-router-dom";

interface Item {
  text: string;
  to: string | any;
  icon?: string;
}

let role: string = "Admin";
let links: Item[] = [];

const Sidebar = () => {
  const userlinks: Item[] = [
    { text: "Rides", to: "/", icon: "car-side" },
    { text: "Profile", to: "/profile", icon: "user-circle" },
  ];

  const adminlinks: Item[] = [
    { text: "Users", to: "/users", icon: "users" },
    { text: "My Rides", to: "/myrides", icon: "car-side" },
    { text: "User Rides", to: "/", icon: "car-side" },
    { text: "Profile", to: "/profile", icon: "user-circle" },
  ];

  const driverlinks: Item[] = [
    { text: "Booked Rides", to: "/", icon: "car-side" },
    { text: "Profile", to: "/profile", icon: "user-circle" },
  ];

  const sysadminlinks: Item[] = [
    { text: "Users", to: "/users", icon: "users" },
    { text: "Rides", to: "/", icon: "car-side" },
  ];

  if (role === "User") {
    links = userlinks;
  }
  if (role === "Admin") {
    links = adminlinks;
  }
  if (role === "Driver") {
    links = driverlinks;
  }
  if (role === "SysAdmin") {
    links = sysadminlinks;
  }

  return (
    <div className="side-nav-container bg-info">
      <div className="nav-menu">
        {links.map((item) => (
          <NavLink to={item.to} key={item.text} className="menu-item">
            <MDBIcon className="icon" fas icon={item.icon} />
            <span className="menu-text">{item.text}</span>
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
