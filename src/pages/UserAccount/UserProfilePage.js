import React, {useEffect, useState} from 'react';
import ShortArticlesList from "../../components/ShortArticlesList";
import {Link} from "react-router-dom";
import {useAuthContext} from "../../context/AuthContext";
import {useDataFromFirestore} from "../../customHooks/useFirestore";
import {projectFirestore} from "../../fireBase";
//import useStorage from "../../customHooks/useStorage";
//import {useDataFromFirestore} from "../../customHooks/useFirestore";
//import LoginSignUpForm from "../LoginPage/LoginSignUpForm";
//import Step2CompleteProfilePage from "./CreateUserAccount/Step2CompleteProfilePage";

export default function UserProfilePage() {
  console.log("UserProfilePage");
  const {currentUser} = useAuthContext();
  const CurrentUserFromLS = JSON.parse(localStorage.getItem('LSCurrentUser'));
  const {docsFromHook} = useDataFromFirestore('user-profiles');
  const currentUserExtraInfoLS = JSON.parse(localStorage.getItem('currentUserExtraInfo'));


  useEffect(() => {
    if(docsFromHook&&(currentUser||CurrentUserFromLS)) {
      let userDoc = projectFirestore
          .collection('user-profiles')
          .doc(CurrentUserFromLS.uid).get().then((doc)=>{
          if(doc.exists){
            localStorage.setItem("currentUserExtraInfo", JSON.stringify(doc.data()));
          }else{
            // doc.data() will be undefined in this case
            console.log("No such document!");
          }
          })
          .catch((error) => {
              console.log("Error getting document:", error);
          });

      console.log(JSON.stringify(userDoc));
      //localStorage.setItem("currentUserExtraInfo", JSON.stringify(userDoc));
      }
  }, );

  // projectFirestore
  //     .collection('user-profiles')
  //     .doc(currentUser.uid?currentUser.uid:CurrentUserFromLS)
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
                                  {currentUserExtraInfoLS&&
                                  <img className="profile__img" src={currentUserExtraInfoLS.photoURL?currentUserExtraInfoLS.photoURL:"https://firebasestorage.googleapis.com/v0/b/aki-dragon.appspot.com/o/profile_pictures%2Fdepositphotos_199564354-stock-illustration-creative-vector-illustration-default-avatar.jpg?alt=media&token=5f904560-36a3-4425-9386-960fa63a92e6"} alt=""/>
                                  }
                                </div>
                                <ul className="profile__list">
                                  <li className="profile__item"><strong>Profile page:</strong></li>
                                  {/*<li className="profile__item">Name: {userInfo.firstName}</li>*/}
                                  {/*<li className="profile__item">Lastname: {userInfo.lastName}</li>*/}
                                  <li className="profile__item">Email: {currentUser?currentUser.email:CurrentUserFromLS.email}</li>
                                  <li className="profile__item">Email verified: {currentUser?currentUser.emailVerified===false||CurrentUserFromLS.emailVerified===false?"false":"true":""}</li>
                                  {currentUserExtraInfoLS&&
                                      <>
                                      <li className="profile__item">First name: {currentUserExtraInfoLS.firstName}</li>
                                      <li className="profile__item">Last name: {currentUserExtraInfoLS.lastName}</li>
                                  </>
                                      }
                                  <br/>
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
                                    <li className="profile__settings-item">
                                      <Link className='profile__settings-link' to='/NOApproveArticlesPage'>Approve Articles</Link>
                                    </li>
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
                              <Link className='article-profile__btn' to="/UserProfileArticlesPage">See All</Link>
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