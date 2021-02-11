import React, { useState, useContext } from "react";
import Navbar from "../../components/Navbar";
import { Alert, Input } from "reactstrap";
import api from "../../services/api";
import { UserContext } from "../../context";

export default function Login({ history }) {
  const { setIsLoggedIn } = useContext(UserContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [errMessage, setErrMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await api.post("/login", {
      email,
      password,
    });

    const user_id = response.data.user_id || false;
    const user = response.data.user || false;
    const role = response.data.role || false;

    try {
      if (user && user_id) {
        localStorage.setItem("user", user);
        localStorage.setItem("user_id", user_id);
        localStorage.setItem("role", role);
        setIsLoggedIn(true);
        history.push("/home");
      } else {
        const { message } = response.data;
        setError(true);
        setErrMessage(message);
        setTimeout(() => {
          setError(false);
          setErrMessage("");
        }, 5000);
      }
    } catch (error) {
      setError(true);
      setErrMessage(`Error, the server returned an error`);
    }
  };
  return (
    <>
      <Navbar transparent />
      <main>
        <section className="absolute w-full h-full">
          <div
            className="relative  flex content-center items-center justify-center "
            style={{
              height: "100vh",
            }}
          >
            <div
              className="absolute w-full h-full bg-center bg-cover"
              style={{
                backgroundImage: "url('/background-one.jpg')",
              }}
            >
              <span
                id="blackOverlay"
                // Overlay shade
                className="w-full h-full absolute opacity-75 bg-black"
              ></span>
            </div>
            <div className="container mx-auto px-4 h-full">
              <div className="flex content-center items-center justify-center h-full">
                <div className="w-4/12 px-2">
                  <div className="relative flex flex-col min-w-0 break-words w-full shadow-lg rounded-lg bg-gray-300 opacity-75 border-0">
                    <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                      <div className="text-gray-500 text-center mt-8 mb-3 font-bold">
                        <small>Continue your Journey</small>
                      </div>
                      <form onSubmit={handleSubmit}>
                        <div className="relative w-full mb-3">
                          <label
                            className="block uppercase text-gray-700 text-xs font-bold mb-2"
                            htmlFor="grid-password"
                          >
                            Email
                          </label>
                          <Input
                            type="email"
                            className="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full"
                            placeholder="Email"
                            style={{ transition: "all .15s ease" }}
                            onChange={(e) => setEmail(e.target.value)}
                          />
                        </div>
                        <div className="relative w-full mb-3">
                          <label
                            className="block uppercase text-gray-700 text-xs font-bold mb-2"
                            htmlFor="grid-password"
                          >
                            Password
                          </label>
                          <Input
                            type="password"
                            name="password"
                            id="examplePassword"
                            placeholder="Your Password"
                            onChange={(e) => setPassword(e.target.value)}
                          />
                        </div>
                        <div className="text-center mt-6">
                          <button
                            className="bg-gray-900 text-white active:bg-gray-700 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full"
                            type="submit"
                            style={{ transition: "all .15s ease" }}
                          >
                            Sign In
                          </button>
                        </div>
                        <p>
                          Don't have an account?{" "}
                          <span
                            className="sign-up"
                            onClick={() => history.push("/register")}
                          >
                            Sign up here!
                          </span>{" "}
                        </p>
                      </form>
                      {error ? (
                        <Alert className="event-validation" color="danger">
                          {errMessage}
                        </Alert>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
