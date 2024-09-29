import React from "react";

function Footer() {
  return (
    <footer>
      <div>
        <p>Follow us on:</p>
        <ul>
          <li>
            <a
              href="https://api.whatsapp.com/send/?phone=917719674619&text&type=phone_number&app_absent=0"
              target="_blank"
              rel="noreferrer"
            >
              Whatsapp
            </a>
          </li>
          <li>
            <a
              href="https://www.instagram.com/malhi_enterprises_/?igsh=cjNvaHZsemhrdTZw&utm_source=qr"
              target="_blank"
              rel="noreferrer"
            >
              Instagram
            </a>
          </li>
        </ul>
      </div>
      <div>
        <strong>
          <h3>Address:- </h3>
          JALANDHAR CANTT HEAD POST OFFICE,
          <br /> JASVIR SINGH S/O AJIT SINGH,
          <br /> OLD PHAGWARA ROAD, DEEP NAGAR, JALANDHAR
          <br />
          JALANDHAR PUNJAB-144005
          <br />
          GST No.:03DDOPM9654Q1ZJ
          <br />
          Contact No:- +91 7719674619
        </strong>
        {/* <br />
        <strong>Legal: All rights reserved.</strong> */}
      </div>
    </footer>
  );
}

export default Footer;
