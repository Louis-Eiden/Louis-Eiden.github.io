import React, { useState, useContext } from "react";
import emailjs from "emailjs-com";

import { LanguageContext } from "../utils/LanguageContext.jsx";

import SocialButtons from "../navigation/SocialButtons";

import "../App.css";
import "./Contact.css";

export default function Contact() {

  const { language } = useContext(LanguageContext);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    // EmailJS params
    const serviceId = "contact_service";
    const templateId = "contact_template";
    const publicKey = "n6xYr2qZ_V7YAohSU";

    // EmailJS object with params
    const emailParams = {
      from_name: name,
      from_email: email,
      to_name: "Louis Eiden",
      message: message,
    };

    // Send email
    emailjs.send(serviceId, templateId, emailParams, publicKey)
      .then((result) => {
        console.log(result.text);
        alert("Message sent successfully!", result);
        setName("");
        setEmail("");
        setMessage("");
      }) 
      .catch((error) => {
        console.log(error.text);
        alert("Message failed to send!");
      });
  
  }

  return (
    <>
      <div className="contact-container">
        <form id="contact-form" onSubmit={handleSubmit} className="" >
          <p>{/* <label htmlFor="name">name:</label> */}</p>
          <p>
            <input 
              id="Name" 
              type="text" 
              placeholder="name" 
              value={name} 
              onChange={(e) => setName(e.target.value)}
            />
          </p>
          <p>{/* <label htmlFor="email">email:</label> */}</p>
          <p>
            <input 
              id="Email" 
              type="text" 
              placeholder="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              />
          </p>
          <p>{/* <label htmlFor="message">message:</label> */}</p>
          <p>
            <textarea 
              id="Message" 
              type="text" 
              placeholder= {language === "german" ? "nachricht" : "message"} 
              rows={4} 
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              />
          </p>
          <p>
            <button type="submit"> {language === "german" ? "senden" : "send"} </button>
          </p>
        </form>

        <SocialButtons />
      </div>
    </>
  );
}
