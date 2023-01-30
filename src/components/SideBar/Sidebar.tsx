import React from "react";
import { MDBIcon } from "mdb-react-ui-kit";
import "./Sidebar.css";
import { NavLink } from "react-router-dom";

interface Item {
  text: string;
  to: string | any;
  icon?: string;
}


const Sidebar = () => {

  const userlinks: Item[] = [
    { text: "Bookings", to:"/", icon: "car-side"},
    { text: "Profile", to:"/profile", icon: "user" },
    { text: "Ride History", to:"/history", icon: "history" },
  ];



  return (
    <div className={"side-nav-container"}>
      <div className="nav-menu">
        {userlinks.map((item ) => (
          <NavLink to={item.to}
          key={item.text} className={"menu-item"} >
            <MDBIcon className="px-2" size="lg" fas icon={item.icon} />
            <span>{item.text}</span>
          </NavLink>
        ))}
      </div>
    </div>

  );
};

export default Sidebar;
