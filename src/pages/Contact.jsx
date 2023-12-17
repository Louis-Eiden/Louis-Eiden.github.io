import SocialButtons from "../navigation/SocialButtons";

import "../App.css";
import "./Contact.css";

export default function Contact() {
  return (
    <>
      <div className="contact-container">
        <form id="contact-form" action="">
          <p>{/* <label htmlFor="name">name:</label> */}</p>
          <p>
            <input id="Name" type="text" placeholder="name" />
          </p>
          <p>{/* <label htmlFor="email">email:</label> */}</p>
          <p>
            <input id="Email" type="text" placeholder="email" />
          </p>
          <p>{/* <label htmlFor="message">message:</label> */}</p>
          <p>
            <textarea id="Message" type="text" placeholder="message" rows={4} />
          </p>
          <p>
            <button type="submit">send</button>
          </p>
        </form>
        <SocialButtons />
      </div>
    </>
  );
}
