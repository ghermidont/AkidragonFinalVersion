//https://www.youtube.com/watch?v=NgWGllOjkbs
//https://www.geeksforgeeks.org/how-to-send-attachments-and-email-using-nodemailer-in-node-js/
import React, {useRef, useState} from "react";
import emailjs from "emailjs-com";
import{ init } from "emailjs-com";
init("user_CT1XM0LjSnypYte1fnGI7");

export default function SponsorshipForm (){
	//TODO implement the disable button and translate buttons
	let publishBtnRef = useRef();

	function sendSponsorshipEmail(e) {
		e.preventDefault();
		emailjs.sendForm("service_jhhv0ki", "template_dim3yck", "#sponsorship-form", "user_CT1XM0LjSnypYte1fnGI7")
			.then((result) => {
				window.alert("Message sent: " + result.text);
			}, (error) => {
				window.alert("Error sending the message: " + error.text);
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
											<input placeholder="Surname"
												id="surname"
												type="text"
												className="form-control"
												required
												name="surname"
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
									<textarea placeholder = "Message"  id="message"
										className="form-control" rows="1"
										required
										name="message"
									/>
								</div>
								<div className="input-group mb-3">
									<input className="form-check-input mt-0" type="checkbox" value=""/>
									<div> process data</div>
								</div>
								<button type="submit" className="primary-btn submit">Submit</button>
							</form>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

