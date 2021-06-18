import React, {useState} from 'react';
import {useAuthContext} from '../../context/AuthContext';
import classes from './LoginSignUpForm.module.scss';
import firebase from 'firebase';

//Implement the Enter key stroke login and signup
const LoginSignUpForm = () => {
  console.log("LoginSignUpForm() worked");
  const fileTypesArray = ['image/png', 'image/jpeg'];
  const [error, setError] = useState(null);
  const [fileUploaded, setFileUploaded] = useState(false);

    const passwordReset = () => {
        firebase.auth().sendPasswordResetEmail(email)
            .then(() => {
                window.alert("A password reset email has been sent to you email address");
            })
            .catch((error) => {
                window.alert(`The password could not be reset due to ${error.message}. Error code: ${error.code}`);
            });
    }

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

 const fileUploadEventListener = (e) => {
    let uploadedFile = e.target.files[0];
    if (uploadedFile && fileTypesArray.includes(uploadedFile.type)) {
      setSignUpFormUserUploadedFile(uploadedFile);
      setFileUploaded(true);
    } else {
      setError('Please select an image file (png or jpg)');
    }
  };

  return (
    <>
      <div className="container">
        <div className={classes.formBody}>
          <h1 className="title form__title">
            Login/SignUp
          </h1>
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

            <div className='form-article__box-btn'>
              {hasAccount ? (
                <>
                  <button className="form-article__btn" style={{marginLeft: '20px'}} type="button"
                          onClick={handleLogin}>Sign in
                  </button>
                    <div>
                        <button onClick={()=>email!==""?passwordReset(email):<div style={{color: "red"}}>Please provide an email address</div>}>Reset password</button>
                    </div>
                  <p>
                    Don't have an account?
                    <span onClick={() => setHasAccount(!hasAccount)}>Sign up</span>
                  </p>
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
                          {fileUploaded===true&& <div className="error">File uploaded.</div>}
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
}

export default LoginSignUpForm;