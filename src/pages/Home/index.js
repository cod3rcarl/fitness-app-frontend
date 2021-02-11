import React from "react";
import { Button, ButtonGroup } from "reactstrap";
import TopNav from "../../components/TopNav";
export default function Home({ history }) {
  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("user_id");
    localStorage.removeItem("role");
    history.push("/");
  };
  return (
    <div>
      <TopNav />
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
