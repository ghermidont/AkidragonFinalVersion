import React, {useEffect, useState} from 'react';
import ShortArticlesList from "../../components/ShortArticlesList";
import {Link} from "react-router-dom";
import {useAuthContext} from "../../context/AuthContext";
//import useStorage from "../../customHooks/useStorage";
//import {useDataFromFirestore} from "../../customHooks/useFirestore";
//import LoginSignUpForm from "../LoginPage/LoginSignUpForm";
//import Step2CompleteProfilePage from "./NO-CreateUserAccount/Step2CompleteProfilePage";

export default function UserProfilePage() {
  console.log("UserProfilePage");
  const {currentUser, sendVerifyEmail} = useAuthContext();
  const CurrentUserFromLS = JSON.parse(localStorage.getItem('LSCurrentUser'));

  //const {signUpFormUserUploadedFile, setUserUploadedPictureUrl} = useAuthContext;
  //const {url} = useStorage(signUpFormUserUploadedFile, currentUser.uid);
  //console.log("url of the db uploaded file");
  //console.log(url);
  //setUserUploadedPictureUrl(url);

  //const [infoAdded, setInfoAdded] = useState(false);
  // const {docsFromHook} = useDataFromFirestore('user-profiles');
  // let returnedUserDoc = [];

  // if(docsFromHook&&currentUser) {
  //   returnedUserDoc = docsFromHook.filter((User) => {
  //     console.log("The value of User.id from UserProfilePage");
  //     console.log(User);
  //     console.log(currentUser);
  //     return User.id === currentUser.uid;
  //   });
  // }
//
//   //Verify if user added extra info:
//   returnedUserDoc = docsFromHook.filter((User) => {
//     console.log(User.id)
//     console.log(CurrentUserFromLS.uid);
//     return User.id === CurrentUserFromLS.uid;
//   })
//
//
// useEffect(()=>{
//   if(returnedUserDoc.length===1){ setInfoAdded(true);}else{setInfoAdded(false);}
// },[returnedUserDoc.length]);
//
//   console.log(returnedUserDoc.length);

  return (
      <>
        {/*{infoAdded?*/}
        {/*    (*/}
        {/*        <>*/}
        {/*          {returnedUserDoc.map(userInfo =>*/}
                      <>
                        <section className="profile" key={currentUser?currentUser.uid:CurrentUserFromLS.uid}>
                          <div className="container">
                            <div className="profile__inner">
                              <div className="profile__box">
                                <div className="profile__image">
                                  <img className="profile__img" src="https://www.istockphoto.com/resources/images/PhotoFTLP/Signature-1205756464.jpg" alt=""/>
                                </div>
                                <ul className="profile__list">
                                  <li className="profile__item"><strong>Moderator page:</strong></li>
                                  {/*<li className="profile__item">Name: {userInfo.firstName}</li>*/}
                                  {/*<li className="profile__item">Lastname: {userInfo.lastName}</li>*/}
                                  <li className="profile__item">Email: {currentUser?currentUser.email:CurrentUserFromLS.email}</li>
                                  <li className="profile__item">Email verified: {currentUser?currentUser.emailVerified===false||CurrentUserFromLS.emailVerified===false?"false":"true":""}</li>
                                  <br/>
                                <button className="btn btn-warning" type="button" onClick={sendVerifyEmail}>Verify email</button>
                                </ul>
                              </div>
                              <ul className="profile__settings">
                                <li>
                                  <div className="profile__settings-title">
                                    <span className="icon-cog"></span> Actions:
                                  </div>
                                  <ul className="profile__settings-list">
                                    {/*<li className="profile__settings-item">*/}
                                    {/*  <Link className='profile__settings-link' to='/AddArticlesForm'>Added Article</Link>*/}
                                    {/*</li>*/}
                                    <li className="profile__settings-item">
                                      <Link className='profile__settings-link' to='/ModeratorAddStreamsForm'>Add streams</Link>
                                    </li>
                                    <li className="profile__settings-item">
                                      <Link className='profile__settings-link' to='/ModeratorAddTournamentsForm'>Add tournaments</Link>
                                    </li>
                                    <li className="profile__settings-item">
                                      <Link className='profile__settings-link' to='/AddArticlesForm'>Add articles</Link>
                                    </li>
                                    <li className="profile__settings-item">
                                      <Link className='profile__settings-link' to='/ManageArticlesPage'>Manage articles</Link>
                                    </li>
                                    <li className="profile__settings-item">
                                      <Link className='profile__settings-link' to='/ManageStreamsPage'>Manage streams</Link>
                                    </li>
                                    <li className="profile__settings-item">
                                      <Link className='profile__settings-link' to='/ManageTournamentsPage'>Manage tournaments</Link>
                                    </li>
                                    {/*<li className="profile__settings-item">*/}
                                    {/*  <Link className='profile__settings-link' to='/NOApproveArticlesPage'>Approve Articles</Link>*/}
                                    {/*</li>*/}
                                  </ul>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </section>

                        <section className="article-profile">
                          <div className="container">
                            <h2 className='article-profile__title title'>Article</h2>
                            <div className="article-profile__inner">
                              <Link className='article-profile__btn' to="/BlogPage">See All</Link>
                              <ShortArticlesList/>
                            </div>
                          </div>
                        </section>
                      </>
                  {/*)}*/}
                {/*</>*/}
            {/*) : (*/}
            {/*    <Step2CompleteProfilePage />*/}
            {/*)*/}
        }
    </>
  );
}