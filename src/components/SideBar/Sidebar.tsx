import React from "react";
import { MDBIcon } from "mdb-react-ui-kit";
import "./Sidebar.css";
import { NavLink } from "react-router-dom";

interface Item {
  text: string;
  to: string | any;
  icon?: string;
}

let role: string = "User";

const Sidebar = () => {
  const userlinks: Item[] = [
    { text: "Rides", to: "/", icon: "car-side" },
    { text: "Profile", to: "/profile", icon: "user" },
  ];

  const adminlinks: Item[] = [
    { text: "Users", to: "/users", icon: "users" },
    { text: "My Rides", to: "/", icon: "car-side" },
    { text: "User Rides", to: "/userRides", icon: "car-side" },
    { text: "Profile", to: "/profile", icon: "user" },
  ];

  const driverlinks: Item[] = [
    { text: "Booked Rides", to: "/", icon: "car-side" },
    { text: "Profile", to: "/profile", icon: "user" },
  ];

  const sysadminlinks: Item[] = [
    { text: "Users", to: "/users", icon: "users" },
    { text: "Rides", to: "/", icon: "car-side" },
  ];

  return (
    <div className={"side-nav-container"}>
      <div className="nav-menu">
        {role === "User" &&
          userlinks.map((item) => (
            <NavLink to={item.to} key={item.text} className={"menu-item"}>
              <MDBIcon className="px-2" size="lg" fas icon={item.icon} />
              <span>{item.text}</span>
            </NavLink>
          ))}
        {role === "Admin" &&
          adminlinks.map((item) => (
            <NavLink to={item.to} key={item.text} className={"menu-item"}>
              <MDBIcon className="px-2" size="lg" fas icon={item.icon} />
              <span>{item.text}</span>
            </NavLink>
          ))}
        {role === "Driver" &&
          driverlinks.map((item) => (
            <NavLink to={item.to} key={item.text} className={"menu-item"}>
              <MDBIcon className="px-2" size="lg" fas icon={item.icon} />
              <span>{item.text}</span>
            </NavLink>
          ))}
        {role === "SysAdmin" &&
          sysadminlinks.map((item) => (
            <NavLink to={item.to} key={item.text} className={"menu-item"}>
              <MDBIcon className="px-2" size="lg" fas icon={item.icon} />
              <span>{item.text}</span>
            </NavLink>
          ))}
      </div>
    </div>
  );
};

export default Sidebar;
