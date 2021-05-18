import React, {useEffect, useState} from 'react';
import ShortArticlesList from "../../components/ShortArticlesList";
import {Link} from "react-router-dom";
import {useAuthContext} from "../../context/AuthContext";
import {useDataFromFirestore} from "../../customHooks/useFirestore";
import {projectFirestore} from "../../fireBase";

export default function UserProfilePage() {
  console.log("UserProfilePage");
  const {currentUser} = useAuthContext();
  const CurrentUserFromLS = JSON.parse(localStorage.getItem('LSCurrentUser'));
  //const {docsFromHook} = useDataFromFirestore('user-profiles');
  //const currentUserExtraInfoLS = JSON.parse(localStorage.getItem('currentUserExtraInfo'));
  //const moderatorLS = JSON.parse(localStorage.getItem('currentUserRole'));
  const [moderator, setModerator] = useState();
  const[currentUserExtraInfoFB, setCurrentUserExtraInfoFB] = useState({});

  useEffect(() => {
    async function getCurrentUserExtraInfo() {
      if (currentUser || CurrentUserFromLS) {
        await projectFirestore
            .collection('user-profiles')
            .doc(CurrentUserFromLS.uid).get().then((doc) => {
          if (doc.exists) {
            setCurrentUserExtraInfoFB(doc.data());
            console.log(currentUserExtraInfoFB);
            //localStorage.setItem("currentUserExtraInfo", JSON.stringify(doc.data()));
          } else {
            console.log("No such document!");
          }
        })
            .catch((error) => {
              console.log("Error getting document:", error);
            });
      }
    }

    async function checkCurrentUserRole() {
      console.log("checkCurrentUserRole() worked");
      await projectFirestore
          .collection("roles")
          .doc(currentUser?currentUser.uid:CurrentUserFromLS.uid)
          .get()
          .then((doc)=>{
            if(doc.exists){
              return doc.data().moderator===true?setModerator(true):setModerator(false);
            }else{
              return setModerator(false);
            }
          });
    }

    getCurrentUserExtraInfo().then(()=>console.log("Got the user info!")).catch(()=>console.error("could not get current use extra info."));
    checkCurrentUserRole().then(()=>console.log(moderator)).catch(()=>console.error("could not get current use role."));
  }, []);

  return (
    <>
      <section className="profile" key={currentUser?currentUser.uid:CurrentUserFromLS.uid}>
        <div className="container">
          <div className="profile__inner">
            <div className="profile__box">
              <div className="profile__image">
                {currentUserExtraInfoFB&&
                  <img className="profile__img" src={currentUserExtraInfoFB.photoURL?currentUserExtraInfoFB.photoURL:"https://firebasestorage.googleapis.com/v0/b/aki-dragon.appspot.com/o/profile_pictures%2Fdepositphotos_199564354-stock-illustration-creative-vector-illustration-default-avatar.jpg?alt=media&token=5f904560-36a3-4425-9386-960fa63a92e6"} alt=""/>
                }
              </div>
              <ul className="profile__list">
                <li className="profile__item"> {moderator?<strong>Moderator page:</strong>:<strong>Profile page:</strong>}</li>
                <li className="profile__item">Email: {currentUser?currentUser.email:CurrentUserFromLS.email}</li>
                <li className="profile__item">Email verified: {currentUser?currentUser.emailVerified===false||CurrentUserFromLS.emailVerified===false?"false":"true":""}</li>
                {currentUserExtraInfoFB&&
                    <>
                      <li className="profile__item">First name: {currentUserExtraInfoFB.firstName}</li>
                      <li className="profile__item">Last name: {currentUserExtraInfoFB.lastName}</li>
                    </>
                    }
                <br/>
              </ul>
            </div>
            {moderator&&
            <ul className="profile__settings">
              <li>
                <div className="profile__settings-title">
                  <span className="icon-cog"></span> Actions:
                </div>
                <ul className="profile__settings-list">
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
                    <Link className='profile__settings-link' to='/ApproveArticlesPage'>Approve Articles</Link>
                  </li>
                </ul>
              </li>
            </ul>
            }
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
  );
}