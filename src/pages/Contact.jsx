import "../App.css";
import "./Contact.css";

export default function Contact() {
  return (
    <>
      <div className="contact_container">
        <form id="contact-form" action="">
          <p>
            <label htmlFor="name">name:</label>
          </p>
          <p>
            <input id="Name" type="text" />
          </p>
          <p>
            <label htmlFor="email">email:</label>
          </p>
          <p>
            <input id="Email" type="text" />
          </p>
          <p>
            <label htmlFor="message">message:</label>
          </p>
          <p>
            <input id="Message" type="text" />
          </p>
          <p>
            <button type="submit">send</button>
          </p>
        </form>
      </div>
    </>
  );
}
