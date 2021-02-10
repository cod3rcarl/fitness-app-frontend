import React, { useState, useContext } from "react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  Nav,
  NavItem,
  Button,
} from "reactstrap";
import { UserContext } from "../context";
import { Link } from "react-router-dom";

const TopNav = () => {
  const { isLoggedIn, setIsLoggedIn } = useContext(UserContext);
  const [collapsed, setCollapsed] = useState(true);

  const toggleNavbar = () => setCollapsed(!collapsed);

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("user_id");
    localStorage.removeItem("role");
    setIsLoggedIn(false);
  };

  return isLoggedIn ? (
    <div>
      {console.log(isLoggedIn)}
      <Navbar color="faded" light>
        <NavbarToggler onClick={toggleNavbar} />
        <Link to="/login" onClick={handleLogout}>
          <Button className="logout-btn">Logout</Button>
        </Link>
        <Collapse isOpen={!collapsed} navbar>
          <Nav navbar>
            <NavItem>
              <Link to="/">
                <Button className="logout-btn">Home</Button>
              </Link>
            </NavItem>
            <NavItem>
              <Link to="/events">
                <Button className="logout-btn">Events</Button>
              </Link>
            </NavItem>
            <NavItem>
              <Link to="/createevent">
                <Button className="logout-btn">Create Event</Button>
              </Link>
            </NavItem>
            <NavItem>
              <Link to="/myregistrations">
                <Button className="logout-btn">My Registrations</Button>
              </Link>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  ) : (
    ""
  );
};

export default TopNav;
