import React from "react";
import { Button, ButtonGroup } from "reactstrap";
import TopNav from "../../components/TopNav";
export default function Home({ history }) {
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
      </ButtonGroup>
    </div>
  );
}
