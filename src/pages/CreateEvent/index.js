import React, { useState, useMemo, useEffect } from "react";
import api from "../../services/api";
import {
  Alert,
  Container,
  Button,
  Form,
  FormGroup,
  Input,
  Label,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  ButtonDropdown,
} from "reactstrap";
import cameraIcon from "../../assets/camera.png";
import "./events.css";

export default function EventsPage({ history }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [thumbnail, setThumbnail] = useState(null);
  const [sport, setSport] = useState("Sport");
  const [date, setDate] = useState("");
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [dropdownOpen, setOpen] = useState(false);
  const user = localStorage.getItem("user");

  useEffect(() => {
    if (!user) {
      history.push("/login");
    }
  }, []);
  const toggle = () => setOpen(!dropdownOpen);

  const preview = useMemo(() => {
    return thumbnail ? URL.createObjectURL(thumbnail) : null;
  }, [thumbnail]);

  const submitHandler = async (e) => {
    e.preventDefault();

    const eventData = new FormData();
    eventData.append("thumbnail", thumbnail);
    eventData.append("sport", sport);
    eventData.append("title", title);
    eventData.append("price", price);
    eventData.append("description", description);
    eventData.append("date", date);

    try {
      if (
        title !== "" &&
        description !== "" &&
        price !== "" &&
        sport !== "Sport" &&
        date !== ""
      ) {
        await api.post("/events", eventData, { headers: { user: user } });
        setSuccess(true);
        setTimeout(() => {
          setSuccess(false);
          history.push("/");
        }, 2000);
      } else {
        setError(true);
        setTimeout(() => {
          setError(false);
        }, 2000);
      }
    } catch (error) {
      Promise.reject(error);
      console.log(error);
    }
  };

  const sportEventHandler = (sport) => setSport(sport);

  return (
    <Container>
      <h2>Create your Event</h2>
      <Form onSubmit={submitHandler}>
        <FormGroup>
          <ButtonDropdown
            className="submit-btn"
            isOpen={dropdownOpen}
            toggle={toggle}
          >
            <Button value={sport} disabled>
              {sport}
            </Button>
            <DropdownToggle caret />
            <DropdownMenu>
              <DropdownItem onClick={() => sportEventHandler("running")}>
                running
              </DropdownItem>
              <DropdownItem onClick={() => sportEventHandler("cycling")}>
                cycling
              </DropdownItem>
              <DropdownItem onClick={() => sportEventHandler("swimming")}>
                swimming
              </DropdownItem>
            </DropdownMenu>
          </ButtonDropdown>
        </FormGroup>
        <div className="input-group">
          <FormGroup>
            <Label>Upload Image: </Label>
            <Label
              id="thumbnail"
              style={{ backgroundImage: `url(${preview})` }}
              className={thumbnail ? "has-thumbnail" : ""}
            >
              <Input
                type="file"
                onChange={(e) => setThumbnail(e.target.files[0])}
              />
              <img
                src={cameraIcon}
                style={{ maxWidth: "50px" }}
                alt="upload icon"
              />
            </Label>
          </FormGroup>
          <FormGroup>
            <Label>Title: </Label>
            <Input
              id="title"
              type="text"
              value={title}
              placeholder={"Event Title"}
              onChange={(e) => setTitle(e.target.value)}
            />
          </FormGroup>

          <FormGroup>
            <Label>Event description: </Label>
            <Input
              id="description"
              type="text"
              value={description}
              placeholder={"Event Description"}
              onChange={(e) => setDescription(e.target.value)}
            />
          </FormGroup>
          <FormGroup>
            <Label>Event price: </Label>
            <Input
              id="price"
              type="text"
              value={price}
              placeholder={"Event Price £0.00"}
              onChange={(e) => setPrice(e.target.value)}
            />
          </FormGroup>
          <FormGroup>
            <Label>Event date: </Label>
            <Input
              id="date"
              type="date"
              value={date}
              placeholder={"Event Date"}
              onChange={(e) => setDate(e.target.value)}
            />
          </FormGroup>
        </div>
        <FormGroup>
          <Button className="submit-btn">Create Event</Button>
        </FormGroup>
        <FormGroup>
          <Button className="secondary-btn" onClick={() => history.push("/")}>
            Return to Dashboard
          </Button>
        </FormGroup>
      </Form>
      {error ? (
        <Alert className="event-validation" color="danger">
          {" "}
          Missing required information
        </Alert>
      ) : (
        ""
      )}
      {success ? (
        <Alert className="event-validation" color="success">
          {" "}
          The event was created successfully!
        </Alert>
      ) : (
        ""
      )}
    </Container>
  );
}
