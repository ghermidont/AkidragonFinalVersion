import React from 'react';
import PictureUploadForm from './PictureUploadForm';
import {useAuthContext} from '../../context/AuthContext';

//Implement the Enter key stroke login and signup
const LoginSignUpForm = () => {
  console.log("LoginSignUpForm() worked");
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
    passwordError
  } = useAuthContext();

  return (
    <>
      <div className='form-article__body form-login__body'>
        <h1 className="title form-title">
          Login
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
            {/*{hasAccount ? (*/}

                 <button className="form-article__btn" style={{marginLeft: '20px'}} type="button" onClick={handleLogin}>Sign in</button>
                {/*<p>*/}
                {/*  Don't have an account?*/}
                {/*  <span onClick={()=>setHasAccount(!hasAccount)}>Sign up</span>*/}
                {/*</p>*/}

            {/*// ):(*/}
            {/*// <>*/}
            {/*//      <PictureUploadForm />*/}
            {/*//   <div>*/}
            {/*//      <p>*/}
            {/*//         Have an account?*/}
            {/*//      </p>*/}
            {/*//   <span onClick={()=>setHasAccount(!hasAccount)}>Sign in</span>*/}
            {/*//   </div>*/}
            {/*//   <div> <button className="form-article__btn" type="button" onClick={handleSignup}>Sign up</button></div>*/}
            {/*// </>*/}
            {/*// )}*/}
          </div>
        </form>
      </div>
    </>
  );
}

export default LoginSignUpForm;