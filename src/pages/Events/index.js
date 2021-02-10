import React, { useEffect, useState, useMemo } from "react";
import api from "../../services/api";
import config from "../../services/config";
import moment from "moment";
import {
  Button,
  ButtonGroup,
  Alert,
  Popover,
  PopoverBody,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
} from "reactstrap";
import "./dashboard.css";
import socketio from "socket.io-client";
//Dashboard will show all the events
export default function Dashboard({ history }) {
  const [events, setEvents] = useState([]);
  const user = localStorage.getItem("user");
  const user_id = localStorage.getItem("user_id");
  const [rSelected, setRSelected] = useState(null);
  const [popoverOpen, setPopoverOpen] = useState(false);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [message, setMessage] = useState("");
  const [registrationMessage, setRegistrationMessage] = useState("");
  const [eventRequest, setEventRequest] = useState([]);

  const [droppedDownOpen, setDroppedDownOpen] = useState(false);

  const toggle = () => setDroppedDownOpen(!droppedDownOpen);

  useEffect(() => {
    getEvents();
  }, []);

  const socket = useMemo(
    () => socketio(config.CONNECTION, { query: { user: user_id } }),
    [user_id]
  );

  useEffect(() => {
    socket.on("registration_request", (data) =>
      setEventRequest([...eventRequest, data])
    );
  }, [eventRequest, socket]);

  const filterHandler = (query) => {
    setRSelected(query);
    getEvents(query);
  };

  const myEventsHandler = async () => {
    try {
      setRSelected("myevents");
      const response = await api.get("/user/events", {
        headers: {
          user: user,
        },
      });

      setEvents(response.data.events);
    } catch (error) {
      history.push("/login");
    }
  };

  const getEvents = async (filter) => {
    try {
      const url = filter ? `/events/${filter}` : "/events";
      const response = await api.get(url, {
        headers: {
          user: user,
        },
      });

      setEvents(response.data.events);
    } catch (error) {
      history.push("/login");
    }
  };

  const deleteEventHandler = async (eventId) => {
    try {
      await api.delete(`/events/${eventId}`, {
        headers: {
          user: user,
        },
      });
      setSuccess(true);
      setMessage("The event was deleted successfully!");
      setPopoverOpen(!popoverOpen);
      setTimeout(() => {
        setPopoverOpen(!popoverOpen);
      }, 2000);
      setTimeout(() => {
        setSuccess(false);
        setPopoverOpen(!popoverOpen);
        filterHandler(null);
        setMessage("");
      }, 3500);
    } catch (error) {
      setError(true);
      setMessage(" Error when deleting event!");
      setTimeout(() => {
        setError(false);
        setMessage("");
      }, 2000);
    }
  };
  const registrationRequest = async (event) => {
    try {
      await api.post(`/registration/${event.id}`, {}, { headers: { user } });

      setSuccess(true);
      setRegistrationMessage(
        `The request for the event ${event.title} was successful`
      );
      setTimeout(() => {
        setSuccess(false);
        setMessage("");
      }, 3000);
    } catch (error) {
      setError(true);
      setRegistrationMessage(
        `The request for the event ${event.title} was unsuccessful`
      );
      setTimeout(() => {
        setError(false);
        setMessage("");
      }, 2000);
    }
  };
  const acceptEventRequest = async (eventId) => {
    try {
      await api.post(
        `/registration/${eventId}/approval`,
        {},
        { headers: { user } }
      );
      setSuccess(true);
      setMessage("You have accepted this request");
      removeNotification(eventId);
      setTimeout(() => {
        setSuccess(false);
        setMessage("");
      }, 3000);
    } catch (error) {
      console.log(error);
    }
  };
  const rejectEventRequest = async (eventId) => {
    try {
      await api.post(
        `/registration/${eventId}/rejection`,
        {},
        { headers: { user } }
      );
      setError(true);
      setMessage("You have rejected this request");
      removeNotification(eventId);
      setTimeout(() => {
        setError(false);
        setMessage("");
      }, 3000);
    } catch (error) {
      console.log(error);
    }
  };
  const removeNotification = (eventId) => {
    const newEvents = eventRequest.filter((evt) => evt._id !== eventId);
    setEventRequest(newEvents);
  };
  console.log(events);
  return (
    <>
      <ul className="notifications">
        {" "}
        {eventRequest.map((request) => {
          console.log(eventRequest);
          return (
            <>
              {" "}
              <li key={request._id}>
                <div>
                  <strong>{request.user.email}</strong> wants to register for
                  your event <strong>{request.event.title}</strong>{" "}
                </div>{" "}
                <ButtonGroup>
                  {" "}
                  <Button
                    color="secondary"
                    onClick={() => acceptEventRequest(request._id)}
                  >
                    Accept{" "}
                  </Button>{" "}
                  <Button
                    className="logout-btn"
                    onClick={() => rejectEventRequest(request._id)}
                  >
                    Reject{" "}
                  </Button>{" "}
                </ButtonGroup>
              </li>
            </>
          );
        })}
      </ul>
      {success ? (
        <Alert className="event-validation" color="success">
          {" "}
          {message}
        </Alert>
      ) : (
        ""
      )}
      {error ? (
        <Alert className="event-validation" color="danger">
          {" "}
          {message}
        </Alert>
      ) : (
        ""
      )}
      <div className="filter-panel">
        <Dropdown isOpen={droppedDownOpen} toggle={toggle}>
          <DropdownToggle color="primary" caret>
            Filter
          </DropdownToggle>
          <DropdownMenu>
            <DropdownItem
              onClick={() => filterHandler(null)}
              active={rSelected === null}
            >
              All Sports
            </DropdownItem>
            <DropdownItem
              onClick={myEventsHandler}
              active={rSelected === "myevents"}
            >
              My Events{" "}
            </DropdownItem>
            <DropdownItem
              onClick={() => filterHandler("running")}
              active={rSelected === "running"}
            >
              Running{" "}
            </DropdownItem>
            <DropdownItem
              onClick={() => filterHandler("cycling")}
              active={rSelected === "cycling"}
            >
              Cycling{" "}
            </DropdownItem>
            <DropdownItem
              onClick={() => filterHandler("swimming")}
              active={rSelected === "swimming"}
            >
              Swimming{" "}
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </div>{" "}
      <ul className="events-list">
        {" "}
        {events.map((event) => (
          <li key={event._id}>
            <header
              style={{
                backgroundImage: `url(${event.thumbnail})`,
              }}
            >
              {" "}
              {event.user === user_id ? (
                <div>
                  <Button
                    color="danger"
                    size="sm"
                    id="Popover1"
                    onClick={() => deleteEventHandler(event._id)}
                  >
                    Delete{" "}
                  </Button>{" "}
                  <Popover
                    placement="bottom"
                    isOpen={popoverOpen}
                    target="Popover1"
                  >
                    <PopoverBody>
                      {" "}
                      {error ? (
                        <Alert className="event-validation" color="danger">
                          {" "}
                          {message}{" "}
                        </Alert>
                      ) : (
                        ""
                      )}{" "}
                      {success ? (
                        <Alert className="event-validation" color="success">
                          {" "}
                          {message}
                        </Alert>
                      ) : (
                        ""
                      )}{" "}
                    </PopoverBody>{" "}
                  </Popover>{" "}
                </div>
              ) : (
                ""
              )}{" "}
            </header>{" "}
            <strong> {event.title} </strong>{" "}
            <p> Event Date: {moment(event.date).format("l")} </p>{" "}
            <p> Event Price: {parseFloat(event.price).toFixed(2)} </p>{" "}
            <p> Event Description: {event.description} </p>{" "}
            <Button onClick={() => registrationRequest(event)} color="primary">
              {" "}
              Register{" "}
            </Button>{" "}
          </li>
        ))}{" "}
      </ul>{" "}
      {error ? (
        <Alert className="event-validation" color="danger">
          {" "}
          {registrationMessage}{" "}
        </Alert>
      ) : (
        ""
      )}{" "}
      {success ? (
        <Alert className="event-validation" color="success">
          {" "}
          {registrationMessage}
        </Alert>
      ) : (
        ""
      )}{" "}
    </>
  );
}
