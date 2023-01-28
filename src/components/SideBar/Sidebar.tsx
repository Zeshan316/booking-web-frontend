import React from "react";
import "./Sidebar.css";
import { NavLink } from "react-router-dom";

interface MenuItem {
  text: string;
  to?: string | any;
}


const Sidebar = () => {

  const menuItems: MenuItem[] = [
    { text: "Home", to:"/" },
    { text: "Profile", to:"/profile" },
    { text: "Ride History", to:"/history" },
  ];

  return (
    <div className={"side-nav-container"}>
      <div className="nav-menu">
        {menuItems.map((item ) => (
          <NavLink to={item.to}
          key={item.text} className={"menu-item"} >
            <h5>{item.text}</h5>
          </NavLink>
        ))}
      </div>
    </div>

  );
};

export default Sidebar;
