//https://www.youtube.com/watch?v=NgWGllOjkbs
//https://www.geeksforgeeks.org/how-to-send-attachments-and-email-using-nodemailer-in-node-js/
import React from 'react';
import emailjs from 'emailjs-com';
import{ init } from 'emailjs-com';
import {useHistory} from 'react-router-dom';
init("user_ryi2yglqohFlHpuZyAqiJ");

export default function SponsorshipForm (){
    console.log("SponsorshipForm component worked.");
    const history = useHistory();

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
                result.text && history.push( "/", { from: "/SponsorshipPage" });
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
                            <h2 className="title">Cooperation offers</h2>
                            <hr/>
                            <form id="sponsorship-form" onSubmit={sendSponsorshipEmail} method="POST">
                                <div className="form-group">
                                    <div className="row">
                                        <div className="col-md-6">
                                            <input placeholder="Name"
                                                   id="name"
                                                   type="text"
                                                   className="form-control"
                                                   required
                                                   name="name"
                                            />
                                        </div>

                                        <div className="col-md-6">
                                            <input placeholder="Email"
                                                   id="email"
                                                   type="email"
                                                   className="form-control"
                                                   aria-describedby="emailHelp"
                                                   required
                                                   name="email"
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <textarea placeholder = "Message"
                                              id="message"
                                              className="form-control"
                                              rows="1"
                                              required
                                              name="message"
                                    />
                                </div>

                                <button
                                    type="submit"
                                    className="primary-btn submit"
                                >
                                    Submit
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

