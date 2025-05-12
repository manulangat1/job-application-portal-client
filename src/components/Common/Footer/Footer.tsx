import React from "react";

function Footer() {
  const getYear = new Date().getFullYear();
  return (
    <footer className="footer">
      <section className="socials">
        <p>Reach out to us on social media</p>
        <ul>
          <li>Twitter</li>
          <li>Linkedin</li>
          <li>Github</li>
        </ul>
      </section>
      <section className="about">
        <p>This is a simple application for the FE</p>
        <h1>{getYear}</h1>
      </section>
      <section className="ot">
        <p>This is a simple application for the FE</p>
      </section>
    </footer>
  );
}

export default Footer;
