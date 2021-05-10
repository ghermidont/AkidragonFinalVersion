import React from 'react';
//import {useAuthContext} from "../../context/AuthContext";
import {useDataFromFirestore} from "../../customHooks/useFirestore";
import {auth} from "../../fireBase";

export default function NOUpdateUserProfilePage() {
  //const {currentUser} = useAuthContext();
  const {docsFromHook} = useDataFromFirestore('user-profiles');
  const currentUser = auth.currentUser

  let returnedUserDoc = [];

  if(docsFromHook&&currentUser) {
    returnedUserDoc = docsFromHook.filter(doc => {
      return doc.id === currentUser.uid;
    });
  }

  return (
    <>
      <div className='form-update__body'>
        <form className="form-update">
          <div className="form-update__avatar-image">
            <img className="form-update__avatar-img" src="https://www.istockphoto.com/resources/images/PhotoFTLP/Signature-1205756464.jpg" alt=""/>
          </div>
          <label className='form-update__label btn-upload'> <span className='icon-upload2'></span> Upload
            <input className='form-update__btn visually-hidden' type="file" placeholder='file'/>
          </label>
          <label className='form-update__label'>
            Nick Name
            <input className='form-update__input' type="text" required/>
          </label>
          <label className='form-update__label'>
            Date
            <input className='form-update__input date' type="date"
                   min="2021-05-03" max="2022-12-31"/>
          </label>
          <label className='form-update__label'>
            Name
            <input className='form-update__input' type="text" required/>
          </label>
          <label className='form-update__label'>
            Last Name
            <input className='form-update__input' type="text" required/>
          </label>
          <label className='form-update__label'>
            Address
            <input className='form-update__input' type="text" required/>
          </label>
          <label className='form-update__label'>
            Password
            <input className='form-update__input' type="password" required/>
          </label>
          <label className='form-update__label'>
            Email
            <input className='form-update__input' type="email" required/>
          </label>
          <button className="form-article__btn">Submit</button>
        </form>
      </div>
    </>
  );
}

//To be adapted
/*import React, { useRef, useState } from "react"
import { Form, Button, Card, Alert } from "react-bootstrap"
import { useAuth } from "../contexts/AuthContext"
import { Link, useHistory } from "react-router-dom"

export default function UpdateProfile() {
  const emailRef = useRef()
  const passwordRef = useRef()
  const passwordConfirmRef = useRef()
  const { currentUser, updatePassword, updateEmail } = useAuth()
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const history = useHistory()

  function handleSubmit(e) {
    e.preventDefault()
    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Passwords do not match")
    }

    const promises = []
    setLoading(true)
    setError("")

    if (emailRef.current.value !== currentUser.email) {
      promises.push(updateEmail(emailRef.current.value))
    }
    if (passwordRef.current.value) {
      promises.push(updatePassword(passwordRef.current.value))
    }

    Promise.all(promises)
      .then(() => {
        history.push("/")
      })
      .catch(() => {
        setError("Failed to update account")
      })
      .finally(() => {
        setLoading(false)
      })
  }

  return (
    <>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Update Profile</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                ref={emailRef}
                required
                defaultValue={currentUser.email}
              />
            </Form.Group>
            <Form.Group id="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                ref={passwordRef}
                placeholder="Leave blank to keep the same"
              />
            </Form.Group>
            <Form.Group id="password-confirm">
              <Form.Label>Password Confirmation</Form.Label>
              <Form.Control
                type="password"
                ref={passwordConfirmRef}
                placeholder="Leave blank to keep the same"
              />
            </Form.Group>
            <Button disabled={loading} className="w-100" type="submit">
              Update
            </Button>
          </Form>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        <Link to="/">Cancel</Link>
      </div>
    </>
  )
}
*/