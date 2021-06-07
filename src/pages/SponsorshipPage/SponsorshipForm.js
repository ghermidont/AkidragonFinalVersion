//https://www.youtube.com/watch?v=NgWGllOjkbs
//https://www.geeksforgeeks.org/how-to-send-attachments-and-email-using-nodemailer-in-node-js/
import React from 'react';
import emailjs from 'emailjs-com';
import {init} from 'emailjs-com';
import {useHistory} from 'react-router-dom';
import {useTranslation} from "react-i18next";

init("user_ryi2yglqohFlHpuZyAqiJ");

export default function SponsorshipForm() {
  console.log("SponsorshipForm component worked.");
  const history = useHistory();
  const {t} = useTranslation();

  function sendSponsorshipEmail(e) {
    e.preventDefault();

    emailjs.sendForm(
      'service_neq4dxf',
      'template_y2x1337',
      '#sponsorship-form',
      'user_ryi2yglqohFlHpuZyAqiJ'
    )
      .then((result) => {
        window.alert("You message has been sent. We will contact you shortly.");
        console.log("The result is: " + result.text);
        result.text && history.push("/", {from: "/SponsorshipPage"});
      }, (error) => {
        console.log("An error intervened:" + error.text);
      });
    e.target.reset();
  }

  return (
    <div className="section">
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div className="section-title">
              <h2 className="title">{t('SponsorshipPage.CooperationOffers')}</h2>
              <hr/>
              <div className='form-update__body'>
                <form className='form-update' id="sponsorship-form" onSubmit={sendSponsorshipEmail} method="POST">
                  <div className="form-group">
                    <div className="row">
                      <div className="col-md-6">
                        <input placeholder={t('SponsorshipPage.NamePlaceHolder')}
                               id="name"
                               type="text"
                               className="form-control form-update__input"
                               required
                               name="name"
                        />
                      </div>

                      <div className="col-md-6">
                        <input placeholder="Email"
                               id="email"
                               type="email"
                               className="form-control form-update__input"
                               aria-describedby="emailHelp"
                               required
                               name="email"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="form-group">
                    <textarea placeholder={t('SponsorshipPage.MessagePlaceHolder')}
                              id="message"
                              className="form-control form-update__input"
                              rows="1"
                              required
                              name="message"
                    />
                  </div>

                  <button
                    type="submit"
                    className="primary-btn submit btn-upload"
                  >
                    {t('SponsorshipPage.SubmitButton')}
                  </button>
                </form>
                <div/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

