/* eslint-disable no-mixed-spaces-and-tabs */
import React, {useEffect, useState} from "react";
import ShortArticlesList from "../../components/ShortArticlesList";
import {Link} from "react-router-dom";
import {useAuthContext} from "../../context/AuthContext";
import {projectFirestore} from "../../fireBase";
import {useTranslation} from "react-i18next";

export default function UserProfilePage() {
	const {t} = useTranslation();

	//Two user instances for data persistence in case of page refresh.
	const { currentUser } = useAuthContext();
	const CurrentUserFromLS = JSON.parse(localStorage.getItem("LSCurrentUser"));

	//States.
	const [ moderator, setModerator ] = useState();
	const [ currentUserExtraInfoFB, setCurrentUserExtraInfoFB ] = useState({});
	const [ currentUserDbPointsInfo, setCurrentUserDbPointsInfo ] = useState();

	useEffect(() => {

		//Gets current user extra info from the database.
		async function getCurrentUserExtraInfo() {
			if (currentUser || CurrentUserFromLS) {
				await projectFirestore
					.collection("user-profiles")
					.doc(CurrentUserFromLS.uid).get().then((doc) => {
						if (doc.exists) {
							setCurrentUserExtraInfoFB(doc.data());
						} else {
							window.alert("No document related to the user!");
						}
					})
					.catch((error) => {
						window.alert("Error getting user info document: " + error);
					});
			}
		}

		//Check current user role function - simple user or moderator.
		async function checkCurrentUserRole() {
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

		//Gets the user score info from the database.
		async function getDoc(){
			await projectFirestore
				.collection("score")
				.doc(CurrentUserFromLS.uid).get().then((doc)=>{
					if(doc.exists){
						setCurrentUserDbPointsInfo(doc.data());
					}else{
						window.alert("No scores document!");
					}
				})
				.catch((error) => {
					window.alert("Error getting score document:", error);
				});
		}
		//Above functions calls.
		getCurrentUserExtraInfo().then().catch(()=>window.alert("Connection error. Refresh the page"));
		checkCurrentUserRole().then().catch(()=>window.alert("Connection error. Refresh the page"));
		getDoc().then().catch(()=>window.alert("Connection error. Refresh the page"));
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
								<li className="profile__item"> {moderator?<strong>{t("UserProfilePage.ModeratorPage")}:</strong>:<strong>{t("UserProfilePage.ProfilePage")}:</strong>}</li>
								<li className="profile__item">Email: {currentUser?currentUser.email:CurrentUserFromLS.email}</li>
								<li className="profile__item">{t("UserProfilePage.EmailVerified")}: {currentUser?currentUser.emailVerified===false||CurrentUserFromLS.emailVerified===false?"false":"true":""}</li>
								{currentUserExtraInfoFB&&
                    <>
                    	<li className="profile__item">{t("UserProfilePage.FirstName")}: {currentUserExtraInfoFB.firstName}</li>
                    	<li className="profile__item">{t("UserProfilePage.LastName")}: {currentUserExtraInfoFB.lastName}</li>
                    </>
								}
								{currentUserDbPointsInfo?
									<li className="profile__item">{t("UserProfilePage.AvailablePoints")}: {currentUserDbPointsInfo.value}</li>:
									<li className="profile__item">{t("UserProfilePage.AvailablePoints")}: 0</li>
								}
								<br/>
							</ul>
						</div>
						{moderator&&
            <ul className="profile__settings">
            	<li>
            		<div className="profile__settings-title">
            			<span className="icon-cog"> </span> {t("UserProfilePage.Actions")}:
            		</div>
            		<ul className="profile__settings-list">
            			<li className="profile__settings-item">
            				<Link className='profile__settings-link' to='/ModeratorAddStreamsForm'>{t("UserProfilePage.Add streams")}</Link>
            			</li>
            			<li className="profile__settings-item">
            				<Link className='profile__settings-link' to='/ModeratorAddTournamentsForm'>{t("UserProfilePage.AddTournaments")}</Link>
            			</li>
            			<li className="profile__settings-item">
            				<Link className='profile__settings-link' to='/AddArticlesForm'>{t("UserProfilePage.AddArticles")}</Link>
            			</li>
            			<li className="profile__settings-item">
            				<Link className='profile__settings-link' to='/ManageArticlesPage'>{t("UserProfilePage.ManageArticles")}</Link>
            			</li>
            			<li className="profile__settings-item">
            				<Link className='profile__settings-link' to='/ManageStreamsPage'>{t("UserProfilePage.ManageStreams")}</Link>
            			</li>
            			<li className="profile__settings-item">
            				<Link className='profile__settings-link' to='/ManageTournamentsPage'>{t("UserProfilePage.ManageTournaments")}</Link>
            			</li>
            			<li className="profile__settings-item">
            				<Link className='profile__settings-link' to='/ApproveArticlesPage'>{t("UserProfilePage.ApproveArticles")}</Link>
            			</li>
            			<li className="profile__settings-item">
            				<Link className='profile__settings-link' to='/CMSMenu'>{t("UserProfilePage.EditStaticContent")}</Link>
            			</li>
            			<li className="profile__settings-item">
            				<Link className='profile__settings-link' to='/BannersMenu'>Banner menu</Link>
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