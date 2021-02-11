import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import AOS from "aos";
import "aos/dist/aos.css";
AOS.init({
  delay: 200,
  duration: 1200,
  once: false,
});
export default function Landing() {
  return (
    <>
      <Navbar transparent />
      <main>
        {/* Hero */}
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
          <div className="container relative mx-auto" data-aos="fade-in">
            <div className="items-center flex flex-wrap">
              <div className=" mt-10 w-full  px-4 ml-auto mr-auto text-center">
                <h1 className="text-white font-semibold text-5xl">
                  {/* Put a carousel of quotes here */}
                  Your body's not{" "}
                  <span className="text-red-500">giving out!</span>
                  <br /> Your head's
                  <span className="text-green-500"> giving up!</span>
                </h1>

                <h2 className="text-yellow-500 font-semibold text-5xl">
                  Keep Going!
                </h2>
                <Link to="/login">
                  {" "}
                  <button className="bg-transparent hover:bg-yellow-500 text-yellow-500 font semibold hover:text-white p-2 border border-yellow-500 hover:border-transparent rounded inline-block mt-5">
                    Login Here
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
        {/* ABOUT SECTION */}
        <section id="about" className="relative py-20 bg-black text-white">
          <div className="container mx-auto px-4">
            <div className="items-center flex flex-wrap">
              <div
                className="w-full md:w-4/12 ml-auto mr-auto px-4"
                data-aos="fade-right"
              >
                <img
                  alt="..."
                  className="max-w-full rounded-lg shadow-lg"
                  src="/football-gym-one.jpg"
                  style={{ maxHeight: "400px" }}
                />
              </div>
              <div
                className="w-full md:w-5/12 ml-auto mr-auto px-4"
                data-aos="fade-left"
              >
                <div className="md:pr-12">
                  <small className="text-yellow-500">About</small>
                  <h3 className="text-4xl uppercase font-bold">
                    Create lesson plans for your pupils
                  </h3>
                  <p className="mt-4 text-lg leading-relaxed">
                    The extension comes with three pre-built pages to help you
                    get started faster. You can change the text and images and
                    you're good to go.
                  </p>
                  <ul className="list-none mt-6">
                    <li className="py-2">
                      <div className="flex items-center">
                        <div>
                          <span className="font-semibold inline-block py-3 text-yellow-500 mr-3">
                            <i className="fas fa-dumbbell fa-2x"></i>
                          </span>
                        </div>
                        <div>
                          <h4 className="text-xl">The latest and greatest</h4>
                        </div>
                      </div>
                    </li>
                    <li className="py-2">
                      <div className="flex items-center">
                        <div>
                          <span className="font-semibold inline-block py-3 text-yellow-500 mr-3">
                            <i className="fas fa-hard-hat fa-2x"></i>
                          </span>
                        </div>
                        <div>
                          <h4 className="text-xl"> Quality sessions</h4>
                        </div>
                      </div>
                    </li>
                    <li className="py-2">
                      <div className="flex items-center">
                        <div>
                          <span className="font-semibold inline-block py-3 text-yellow-500 mr-3">
                            <i className="fas fa-users fa-2x"></i>
                          </span>
                        </div>
                        <div>
                          <h4 className="text-xl">Nutritional Advice</h4>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* SECTION */}
        <section className="pt-20 pb-48">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap justify-center text-center mb-24">
              <div className="w-full lg:w-6/12 px-4">
                <h2 className="text-4xl font-semibold">Meet the trainer</h2>
                <p className="text-lg leading-relaxed m-4 ">
                  A whole paragraph about the trainer can go here
                </p>
              </div>
            </div>
            {/* TRAINER CARD WRAPPER */}
            <div className="flex flex-wrap">
              {/* CARD ONE */}
              <div
                className="w-full md:w-4/12 lg:mb-0 mb-12 px-4"
                data-aos="flip-right"
              >
                <div className="px-6">
                  <img
                    alt="..."
                    src="../../../src/assets/team-1-800x800.jpg"
                    className="shadow-lg rounded max-w-full mx-auto"
                    style={{ maxWidth: "250px" }}
                  />
                  <div className="pt-6 text-center">
                    <h5 className="text-xl font-bold">Info Here</h5>
                    <p className="mt-1 text-sm text-gray-500 uppercase font-semibold">
                      Slogan or information here
                    </p>
                  </div>
                </div>
              </div>
              {/* CARD TWO */}
              <div
                className="w-full md:w-4/12 lg:mb-0 mb-12 px-4"
                data-aos="flip-right"
              >
                <div className="px-6">
                  <img
                    alt="..."
                    src="../../../src/assets/team-2-800x800.jpg"
                    className="shadow-lg rounded max-w-full mx-auto"
                    style={{ maxWidth: "250px" }}
                  />
                  <div className="pt-6 text-center">
                    <h5 className="text-xl font-bold">Another Header</h5>
                    <p className="mt-1 text-sm text-gray-500 uppercase font-semibold">
                      More Information here
                    </p>
                  </div>
                </div>
              </div>
              {/* CARD THREE */}
              <div
                className="w-full md:w-4/12 lg:mb-0 mb-12 px-4"
                data-aos="flip-right"
              >
                <div className="px-6">
                  <img
                    alt="..."
                    src="../../../src/assets/team-3-800x800.jpg"
                    className="shadow-lg rounded max-w-full mx-auto"
                    style={{ maxWidth: "250px" }}
                  />
                  <div className="pt-6 text-center">
                    <h5 className="text-xl font-bold">One more header</h5>
                    <p className="mt-1 text-sm text-gray-500 uppercase font-semibold">
                      Last bit of info
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* CONTACT HEADER SECTION */}
        <section className="pb-20 relative block bg-black text-white">
          <div
            className="bottom-auto top-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden -mt-20"
            style={{ height: "80px", transform: "translateZ(0)" }}
          >
            <svg
              className="absolute bottom-0 overflow-hidden"
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="none"
              version="1.1"
              viewBox="0 0 2560 100"
              x="0"
              y="0"
            >
              <polygon points="2560 0 2560 100 0 100"></polygon>
            </svg>
          </div>

          <div className="container mx-auto px-4 lg:pt-24 lg:pb-64 pb-20 pt-20">
            <div className="flex flex-wrap text-center justify-center">
              <div className="w-full lg:w-6/12 px-4">
                <h2 className="text-4xl font-semibold uppercase text-white">
                  Contact Me
                </h2>
                <p className="text-lg leading-relaxed mt-4 mb-4 ">
                  Contact me with and questions or to ook a session.
                </p>
              </div>
            </div>
          </div>
        </section>
        {/* CONTACT FORM */}
        <section className="relative block py-24 lg:pt-0 bg-black">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap justify-center lg:-mt-64 -mt-48">
              <div className="w-full lg:w-6/12 px-4">
                <div
                  className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-gray-300"
                  data-aos="fade-up-right"
                >
                  <div className="flex-auto p-5 lg:p-10 bg-yellow-500 text-black">
                    <h4 className="text-2xl font-semibold">
                      Want to work with us?
                    </h4>
                    <p className="leading-relaxed mt-1 mb-4 ">
                      Complete this form and we will get back to you in 24
                      hours.
                    </p>
                    <div className="relative w-full mb-3 mt-8">
                      <label
                        className="block uppercase  text-xs font-bold mb-2"
                        htmlFor="full-name"
                      >
                        Full Name
                      </label>
                      <input
                        type="text"
                        className="px-3 py-3 placeholder-gray-400  bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full"
                        placeholder="Full Name"
                        style={{ transition: "all .15s ease" }}
                      />
                    </div>

                    <div className="relative w-full mb-3">
                      <label
                        className="block uppercase  text-xs font-bold mb-2"
                        htmlFor="email"
                      >
                        Email
                      </label>
                      <input
                        type="email"
                        className="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full"
                        placeholder="Email"
                        style={{ transition: "all .15s ease" }}
                      />
                    </div>

                    <div className="relative w-full mb-3">
                      <label
                        className="block uppercase text-gray-700 text-xs font-bold mb-2"
                        htmlFor="message"
                      >
                        Message
                      </label>
                      <textarea
                        rows="4"
                        cols="80"
                        className="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full"
                        placeholder="Type a message..."
                      />
                    </div>
                    <div className="text-center mt-6">
                      <button
                        className="bg-black text-white active:bg-gray-700 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
                        type="button"
                        style={{ transition: "all .15s ease" }}
                      >
                        Send Message
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
