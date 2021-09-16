import React, {useState} from "react";
import {useAuthContext} from "../../context/AuthContext";
import classes from "./LoginSignUpForm.module.scss";
import firebase from "firebase";

const LoginSignUpForm = () => {
	//Accepted file formats array.
	const fileTypesArray = ["image/png", "image/jpeg"];

	//States.
	const [error, setError] = useState(null);
	const [fileUploaded, setFileUploaded] = useState(false);

	//Password reset function.
	const passwordReset = () => {
		firebase.auth().sendPasswordResetEmail(email)
			.then(() => {
				window.alert("A password reset email has been sent to you email address");
			})
			.catch((error) => {
				window.alert(`The password could not be reset due to ${error.message}. Error code: ${error.code}`);
			});
	};
	//Connecting variables from the context.
	const {
		email,
		setEmail,
		password,
		setPassword,
		handleLogin,
		handleSignup,
		hasAccount,
		setHasAccount,
		emailError,
		passwordError,
		setSignUpFormUserUploadedFile
	} = useAuthContext();

	//File upload listener function.
	const fileUploadEventListener = (e) => {
		let uploadedFile = e.target.files[0];
		if (uploadedFile && fileTypesArray.includes(uploadedFile.type)) {
			setSignUpFormUserUploadedFile(uploadedFile);
			setFileUploaded(true);
		} else {
			setError("Please select an image file (png or jpg)");
		}
	};

	return (
		<>
			<div className="container">
				<div className={classes.formBody}>
					<h1 className="title form__title">Login/SignUp</h1>
					<form className={classes.form}>
						<input
							className='form-article__input'
							type="email"
							placeholder='Username'
							autoFocus
							required
							value={email}
							onChange={
								(e) => setEmail(e.target.value)
							}
						/>
						<p className="errorMsg">{emailError}</p>
						<input
							className='form-article__input'
							type="password"
							placeholder='Password'
							required
							value={password}
							onChange={
								(e) => setPassword(e.target.value)
							}
						/>
						<p className="passwordError">{passwordError}</p>

						<div className={classes.inner}>
							{hasAccount ? (
								<>
									<div className={classes.inner}>
										<button className={classes.btnIn} type="button"
											onClick={handleLogin}>Sign In
										</button>
										<p>
											{/* eslint-disable-next-line react/no-unescaped-entities */}
                      Don't have an account?
											<span className={classes.linkUp} onClick={() => setHasAccount(!hasAccount)}>Sign Up</span>
										</p>
									</div>

									<div>
										<button className={classes.btnReset} onClick={() => email !== "" ? passwordReset(email) :
											<div style={{color: "red"}}>Please provide an email address</div>}>Reset password
										</button>
									</div>
								</>
							) : (
								<>
									<div className={classes.inner}>
										<div className={classes.btnInner}>
											<form>
												<label className='btn-upload'>
                          Upload File
													<input className='visually-hidden' type="file" onChange={fileUploadEventListener}/>
												</label>
												<div className="output">
													{fileUploaded === true && <div className="error">File uploaded.</div>}
													{error && <div className="error">{error}</div>}
												</div>
											</form>

											<div>
												<button className="form-article__btn" type="button" onClick={handleSignup}>Sign up</button>
											</div>
										</div>

										<div className={classes.formText}>
											<p>
                        Have an account?
											</p>
											<span className={classes.linkIn} onClick={() => setHasAccount(!hasAccount)}>Sign in</span>
										</div>
									</div>
								</>
							)}
						</div>
					</form>
				</div>
			</div>

		</>
	);
};

export default LoginSignUpForm;