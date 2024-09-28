import React from 'react';
import './home.css'; // Custom styles
import FD from '../../../img/fastt.png'
import BGG from '../../../img/malhi.png'
import ID from '../../../img/intd.png'
import RT from '../../../img/RealTime.png'

function Home() {
  return (
    <div className="home-container">
      <div className="bdy">
        <div className="text-center p-5" id='heroHeader'>
          <h1 className="display-4">Welcome to Malhi Enterprises</h1>
          <p className="lead">Fast, Reliable, and Affordable Shipping Solutions</p>
        </div>

        <div className=" bgourservices">
          <div className="row">
            <div className="col-md-6">
              <img 
                src={BGG} 
                alt="Courier Service" 
                className="img-fluid rounded shadow" 
              />
            </div>
            <div className="col-md-6 d-flex flex-column justify-content-center">
              <h2>Why Choose Us?</h2>
              <ul className="list-unstyled">
                <li>🚚 Fast Delivery Times</li>
                <li>🔒 Secure and Safe Handling</li>
                <li>📦 Real-time Package Tracking</li>
                <li>💰 Affordable Rates</li>
              </ul>
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
