import React from "react";
import "./home.css"; // Custom styles
import FD from "../../../img/fastt.png";
import BGG from "../../../img/bhaiya.png";
import ID from "../../../img/intd.png";
import RT from "../../../img/RealTime.png";

function Home() {
  return (
    <div className="home-container">
      <div className="bdy">
        {/* Hero Section */}
        <div className="text-center p-5" id="heroHeader">
          <h1 className="display-4">Welcome to Malhi Enterprises</h1>
          <p className="lead">
            Fast, Reliable, and Affordable Shipping Solutions
          </p>
        </div>

        {/* Our Services Section */}
        <div className="bgourservices">
          <div className="row">
            <div className="col-md-6 text-center">
              <img
                src={BGG}
                alt="Courier Service"
                className="img-fluid rounded shadow"
                style={{ width: "80%", height: "auto" }} // Adjusted for responsiveness
              />
            </div>
            <div className="col-md-6 d-flex flex-column justify-content-center">
              <h2 className="mb-4">Why Choose Us?</h2>
              <ul className="list-unstyled">
                <li>
                  <span role="img" aria-label="truck">
                    🚚
                  </span>{" "}
                  <strong>Fast Delivery Times</strong> – Delivering your
                  packages on time, every time.
                </li>
                <li>
                  <span role="img" aria-label="lock">
                    🔒
                  </span>{" "}
                  <strong>Secure and Safe Handling</strong> – Your items are
                  handled with care and precision.
                </li>
                <li>
                  <span role="img" aria-label="tracking">
                    📦
                  </span>{" "}
                  <strong>Real-time Package Tracking</strong> – Know exactly
                  where your package is at all times.
                </li>
                <li>
                  <span role="img" aria-label="money">
                    💰
                  </span>{" "}
                  <strong>Affordable Rates</strong> – Get premium service at
                  competitive prices.
                </li>
              </ul>

              {/* Animated Stats */}
              <div className="mt-4">
                <h3>Trusted by Thousands!</h3>
                <div className="row text-center mt-3">
                  <div className="col-4">
                    <h4 className="display-6">1.5k+</h4>
                    <p>Happy Clients</p>
                  </div>
                  <div className="col-4">
                    <h4 className="display-6">2k+</h4>
                    <p>Packages Delivered</p>
                  </div>
                  <div className="col-4">
                    <h4 className="display-6">99%</h4>
                    <p>Customer Satisfaction</p>
                  </div>
                </div>
              </div>

              <div className="text-center mt-4">
                <a
                  href="https://api.whatsapp.com/send/?phone=917719674619&text&type=phone_number&app_absent=0"
                  target="_blank"
                  rel="noreferrer"
                >
                  <button
                    className="wbtn"
                    style={{
                      backgroundColor: "#4CAF50", // Change to your desired color
                      color: "Black", // Change text color if needed
                      border: "none", // Optional: remove border
                      padding: "10px 20px", // Optional: add padding
                      borderRadius: "5px", // Optional: add rounded corners
                      cursor: "pointer", // Change cursor to pointer on hover
                    }}
                  >
                    <img
                      src="https://cdn.jsdelivr.net/npm/simple-icons@v3/icons/whatsapp.svg"
                      alt="WhatsApp Logo"
                      width="20"
                      height="20"
                      style={{ marginRight: "8px" }} // Space between image and text
                    />
                    Contact WhatsApp
                  </button>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <section className="services">
        <h2>Our Services</h2>
        <div className="service-cards">
          <div className="service-card">
            <img src={FD} alt="Same-Day Delivery" />
            <h3>Faster Delivery</h3>
            <p>Get your packages delivered faster with our express service.</p>
          </div>
          <div className="service-card">
            <img src={ID} alt="International Shipping" />
            <h3>International Shipping</h3>
            <p>We offer shipping solutions to destinations around the globe.</p>
          </div>
          <div className="service-card">
            <img src={RT} alt="Package Tracking" />
            <h3>Real-Time Tracking</h3>
            <p>Track your packages in real-time with our user-friendly app.</p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
