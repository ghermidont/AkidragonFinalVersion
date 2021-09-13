import React, {Suspense} from "react";
import {Route, Switch} from "react-router";
import {HashRouter} from "react-router-dom";

//Import custom Route:
import PrivateRoute from "./PrivateRoutes"; //Checks is the user is logged in.

// Connect contexts:
import {AuthContextProvider} from "./context/AuthContext";
import {ArticlesContextProvider} from  "./context/ArticlesContext";
import {StreamsContextProvider} from "./context/StreamsContext";
import {LanguageContextProvider} from "./context/LanguageContext";
import {TournamentsContextProvider} from "./context/TournamentsContext";
import {TeamsContextProvider} from "./context/TeamsContext";

//Import Pages:
import UserProfilePage from "./pages/UserAccount/UserProfilePage";
import BlogPage from "./pages/BlogPage/BlogPage";
import AddArticlesForm from "./pages/UserAccount/AddArticlesPage/AddArticlesForm";
import UpdateUserProfilePage from "./pages/UserAccount/UpdateUserProfilePage";
import SubmitCvForm from "./pages/AboutUsPage/SubmitCvForm";
import ModeratorAddStreamsForm from "./pages/ModeratorPanel/ModeratorAddStreamsForm";
import ModeratorAddTournamentsForm from "./pages/ModeratorPanel/ModeratorAddTournamentsForm";
import Step2CompleteProfilePage from "./pages/UserAccount/CreateUserAccount/Step2CompleteProfilePage";
import MainLoginPage from "./pages/LoginPage/MainLoginPage";
import UserProfileArticlesPage from "./pages/UserAccount/UserProfileArticlesPage";
import ApproveArticlesPage from "./pages/ModeratorPanel/ApproveArticlesPage";
import DeleteProfilePage from "./pages/UserAccount/DeleteProfilePage";
import HomePage from "./pages/HomePage/HomePage";
import ArticlePage from "./pages/IndividualArticlePage";
import ContactUsPage from "./pages/ContactUsPage/ContactUsPage";
import ContentPage from "./pages/ContentPage";
import AboutUsPage from "./pages/AboutUsPage/AboutUsPage";
import TournamentsPage from "./pages/TournamentsPage";
import ManageArticlesPage from "./pages/UserAccount/AddArticlesPage/ManageArticlesPage";
import ManageStreamsPage from "./pages/ModeratorPanel/ManageStreamsPage";
import ManageTournamentsPage from "./pages/ModeratorPanel/ManageTournamentsPage";
import EditTournamentForm from "./pages/ModeratorPanel/EditTournamentForm";
import EditStreamForm from "./pages/ModeratorPanel/EditStreamForm";
import EditArticleForm from "./pages/UserAccount/AddArticlesPage/EditArticleForm";
import SponsorshipPage from "./pages/SponsorshipPage/SponsoshipPage";
import CMSMenu from "./pages/CMSMenu/CMSMenu";
import MainSurveyPage from "./pages/SurveyPage/SurveySteps/MainSurveyPage";
import BannersMenu from "./pages/ModeratorPanel/BannersMenu/BannersMainMenu";
import FullStreamsList from "./pages/FullStreamsList";
import GameSalesPage from "./pages/GameSalesPage";
import GameTeamsPage from "./pages/GameTeamsPage/GameTeamsPage";
import IndividualGameTeamPage from "./pages/GameTeamsPage/IndividualGameTeamPage";

//Connect styles:
import "./styles/scss/style.scss";

//Import components:
import NavBar from "./parts/NavBar";
import Footer from "./parts/Footer";

function App() {
	return(
		<div className="App">
			<AuthContextProvider>
				<Suspense fallback={<div>Loading...</div>}>
					<HashRouter>
						<LanguageContextProvider>
							{/*The navbar*/}
							<NavBar />
							<StreamsContextProvider>
								<TeamsContextProvider>
									<ArticlesContextProvider>
										<TournamentsContextProvider>
											<Switch>
												<PrivateRoute path="/UserProfilePage" component={UserProfilePage} />
												<PrivateRoute path="/AddArticlesForm" component={AddArticlesForm} />
												<PrivateRoute path="/ModeratorAddStreamsForm" component={ModeratorAddStreamsForm} />
												<PrivateRoute path="/ModeratorAddTournamentsForm" component={ModeratorAddTournamentsForm} />
												<PrivateRoute path="/UserProfileArticlesPage" component={UserProfileArticlesPage} />
												<PrivateRoute path="/UpdateUserProfilePage" component={UpdateUserProfilePage} />
												<PrivateRoute path="/ApproveArticlesPage" component={ApproveArticlesPage} />
												<PrivateRoute path="/ManageArticlesPage" component={ManageArticlesPage} />
												<PrivateRoute path="/ManageStreamsPage" component={ManageStreamsPage} />
												<PrivateRoute path="/ManageTournamentsPage" component={ManageTournamentsPage} />
												<PrivateRoute path="/edit-tournament/:slug" component={EditTournamentForm} />
												<PrivateRoute path="/edit-stream/:slug" component={EditStreamForm} />
												<PrivateRoute path="/edit-article/:slug" component={EditArticleForm} />
												<PrivateRoute path="/DeleteProfilePage" component={DeleteProfilePage} />
												<PrivateRoute path="/CMSMenu" component={CMSMenu} />
												<PrivateRoute path="/MainSurveyPage" component={MainSurveyPage} />
												<PrivateRoute path="/BannersMenu" component={BannersMenu} />

												<Route path="/" exact component={HomePage} />
												<Route path="/article/:slug" component={ArticlePage} />
												<Route path="/team/:slug" component={IndividualGameTeamPage} />
												<Route path="/ContactUsPage" component={ContactUsPage} />
												<Route path="/BlogPage" component={BlogPage} />
												<Route path="/ContentPage" component={ContentPage} />
												<Route path="/FullStreamsList" component={FullStreamsList} />
												<Route path="/AboutUsPage" component={AboutUsPage} />
												<Route path="/TournamentsPage" component={TournamentsPage} />
												<Route path="/SubmitCvForm" component={SubmitCvForm} />
												<Route path="/MainLoginPage" component={MainLoginPage} />
												<Route path="/SponsorshipPage" component={SponsorshipPage} />
												<Route path="/Step2CompleteProfilePage" component={Step2CompleteProfilePage} />
												<Route path="/GameSalesPage" component={GameSalesPage} />
												<Route path="/GameTeamsPage" component={GameTeamsPage} />
											</Switch>
										</TournamentsContextProvider>
									</ArticlesContextProvider>
								</TeamsContextProvider>
							</StreamsContextProvider>
						</LanguageContextProvider>
						{/*The footer*/}
						<Footer/>
					</HashRouter>
				</Suspense>
			</AuthContextProvider>
		</div>
	);
}

export default App;


