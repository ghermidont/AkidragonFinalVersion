import React from 'react';
import ContactUsForm from "./ContactUsForm";

function ContactUsPage(props) {
  return (
    <>
      <main className="page">
        <section className="contact-intro">
          <div className="container">
            <h1 className="contact-intro__title title"><span>Contattaci</span></h1>
            <p className="contact-intro__text">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci eius nesciunt, expedita
              dignissimos ducimus laudantium obcaecati alias iste dolores repellendus libero fuga, earum
              quisquam amet ea non unde, voluptate voluptatum suscipit esse facilis omnis! Nesciunt quia
              iure necessitatibus in, nisi dicta, tempora optio dolorum qui facilis voluptatibus facere
              porro. Ducimus consequuntur accusamus at eaque dicta a culpa sequi omnis id beatae officiis
              perferendis, nobis placeat, fugiat ipsam voluptatibus natus autem.
            </p>
            <ContactUsForm/>
          </div>
        </section>

        <section className="map">
          <div className="container">
            <ul className="map__list">
              <li className="map__item map__address">
                <span className="icon-location"> </span>
                Piazza del Popolo nr.18, Palazzo Valadier 00187 Roma, Lazio
              </li>
              <li className="map__item map__phone">
                <span className="icon-phone"> </span>
                <a href="tel:+390636712213">+390636712213</a>
              </li>
              <li className="map__item map__chat">
                <span className="icon-whatsapp"> </span>
                Scrivici su Whatsapp
              </li>
            </ul>
          </div>
        </section>
      </main>
    </>
  );
}

export default ContactUsPage;