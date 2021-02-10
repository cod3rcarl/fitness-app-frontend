import React, { useState, useEffect } from "react";
import api from "../../services/api";
import moment from "moment";
import "./style.css";
import { Button, ButtonGroup, Alert } from "reactstrap";

export default function MyRegistrations() {
  const [myEvents, setMyEvents] = useState([]);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [message, setMessage] = useState("");
  const user = localStorage.getItem("user");

  useEffect(() => {
    getMyEvents();
  }, []);

  const getMyEvents = async () => {
    try {
      const response = await api.get("/registration", { headers: { user } });

      setMyEvents(response.data.registrations);
    } catch (error) {
      console.log(error);
    }
  };

  const isApproved = (approved) =>
    approved === true ? "Approved" : "Rejected";

  const acceptEventRequest = async (eventId) => {
    try {
      await api.post(
        `/registration/${eventId}/approval`,
        {},
        { headers: { user } }
      );
      getMyEvents();
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
      getMyEvents();
    } catch (error) {
      console.log(error);
    }
  };

  const deleteRegistration = async (registration_id) => {
    try {
      await api.delete(`/registration/${registration_id}`, {
        headers: {
          user: user,
        },
      });
      setSuccess(true);
      setMessage("The registration was deleted successfully!");

      setTimeout(() => {
        setSuccess(false);
        setMessage("");
        getMyEvents();
      }, 3500);
    } catch (error) {
      setError(true);
      setMessage(" Error when deleting registration!");
      setTimeout(() => {
        setError(false);
        setMessage("");
      }, 2000);
    }
  };

  // const removeNotification = (eventId) => {
  //   const newEvents = myEvents.filter((evt) => evt._id !== eventId);
  //   setMyEvents(newEvents);
  //   getMyEvents();
  // };

  return (
    <>
      {" "}
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
      <ul className="events">
        {myEvents.map((event) => {
          return (
            <li key={event._id}>
              <div
                className="remove"
                onClick={() => deleteRegistration(event._id)}
              >
                <strong>X</strong>
              </div>
              <div>
                <strong>{event.eventTitle}</strong>
              </div>
              <div className="event-details">
                <span>Event Date: {moment(event.eventDate).format("l")}</span>
                <span>
                  Event Price: £{parseFloat(event.eventPrice).toFixed(2)}
                </span>
                <span> User Email: {event.userEmail}</span>
                <span>
                  {" "}
                  Status:{" "}
                  <span
                    className={
                      event.approved !== undefined
                        ? isApproved(event.approved)
                        : "Pending"
                    }
                  >
                    {" "}
                    {event.approved !== undefined
                      ? isApproved(event.approved)
                      : "Pending"}
                  </span>
                </span>
              </div>
              <ButtonGroup>
                {" "}
                <Button
                  disabled={
                    event.approved === true || event.approved === false
                      ? true
                      : false
                  }
                  color="secondary"
                  onClick={() => acceptEventRequest(event._id)}
                >
                  Accept{" "}
                </Button>{" "}
                <Button
                  disabled={
                    event.approved === true || event.approved === false
                      ? true
                      : false
                  }
                  className="logout-btn"
                  onClick={() => rejectEventRequest(event._id)}
                >
                  Reject{" "}
                </Button>{" "}
              </ButtonGroup>
            </li>
          );
        })}
      </ul>
    </>
  );
}
