import React, {useState} from 'react';
import {useAuthContext} from '../../context/AuthContext';

//Implement the Enter key stroke login and signup
const LoginSignUpForm = () => {
  console.log("LoginSignUpForm() worked");
  const fileTypesArray = ['image/png', 'image/jpeg'];
  const [error, setError] = useState(null);

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
        //localStorage.setItem("userPicture", uploadedFile);
        setSignUpFormUserUploadedFile(uploadedFile);
    } else {
        //localStorage.removeItem("userPicture");
      //setUploadedPicFile('');
      setError('Please select an image file (png or jpg)');
    }
  };

  return (
    <>
      <div className='form-article__body form-login__body'>
        <h1 className="title form-title">
          Login/SignUp
        </h1>
        <form className='form-article' >
          <label className='form-article__label'>Username</label>
            <input
                className='form-article__input'
                type="email"
                autoFocus
                required
                value={email}
                onChange={
                  (e) => setEmail(e.target.value)
                }
            />
            <p className="errorMsg">{emailError}</p>

          <label className='form-article__label'>Password</label>
            <input
                className='form-article__input'
                type="password"
                required
                value={password}
                onChange={
                  (e)=>setPassword(e.target.value)
                }
            />
            <p className="passwordError">{passwordError}</p>

          <div className='form-article__box-btn'>
            {hasAccount ? (
                <>
                 <button className="form-article__btn" style={{marginLeft: '20px'}} type="button" onClick={handleLogin}>Sign in</button>
                <p>
                  Don't have an account?
                  <span onClick={()=>setHasAccount(!hasAccount)}>Sign up</span>
                </p>
              </>
             ):(
             <>
               <form>
                 <label className='btn-upload'>
                   Upload File
                   <input className='visually-hidden' type="file" onChange={fileUploadEventListener} />
                 </label>
                 <div className="output">
                   { error && <div className="error">{ error }</div>}

                 </div>
               </form>
               <div className='form__intro-text'>
                  <p>
                     Have an account?
                  </p>
               <span onClick={()=>setHasAccount(!hasAccount)}>Sign in</span>
               </div>
               <div> <button className="form-article__btn" type="button" onClick={handleSignup}>Sign up</button></div>
             </>
             )}
          </div>
        </form>
      </div>
    </>
  );
}

export default LoginSignUpForm;