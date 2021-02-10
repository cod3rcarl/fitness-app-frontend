import React from "react";
import { Button, ButtonGroup } from "reactstrap";

export default function Home({ history }) {
  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("user_id");
    localStorage.removeItem("role");
    history.push("/login");
  };
  return (
    <div>
      Hello from Home{" "}
      <ButtonGroup>
        <Button
          className="secondary-btn"
          onClick={() => history.push("/events")}
        >
          Events
        </Button>
        <Button className="logout-btn" onClick={handleLogout}>
          Logout{" "}
        </Button>{" "}
      </ButtonGroup>
    </div>
  );
}
