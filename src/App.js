import React, {Suspense, useState} from 'react';
import {Route, Switch} from 'react-router';
import {HashRouter} from 'react-router-dom';
import {AuthContextProvider} from './context/AuthContext';
import {ArticlesContextProvider} from  './context/ArticlesContext';
import {StreamsContextProvider} from './context/StreamsContext';
import {LanguageContextProvider} from './context/LanguageContext';
import {TournamentsContextProvider} from "./context/TournamentsContext";
import UserProfilePage from './pages/UserAccount/UserProfilePage';
import BlogPage from './pages/BlogPage';
import AddArticlesForm from './pages/UserAccount/AddArticlesPage/AddArticlesForm';
import UpdateUserProfilePage from './pages/UserAccount/UpdateUserProfilePage';
import SubmitCvForm from './pages/AboutUsPage/SubmitCvForm';
import ModeratorAddStreamsForm from './pages/ModeratorPanel/ModeratorAddStreamsForm';
import ModeratorAddTournamentsForm from './pages/ModeratorPanel/ModeratorAddTournamentsForm';
import Step2CompleteProfilePage from "./pages/UserAccount/CreateUserAccount/Step2CompleteProfilePage";
import MainLoginPage from "./pages/LoginPage/MainLoginPage";
import UserProfileArticlesPage from './pages/UserAccount/UserProfileArticlesPage';
import ApproveArticlesPage from './pages/ModeratorPanel/ApproveArticlesPage';
import DeleteProfilePage from './pages/UserAccount/DeleteProfilePage';

//connect styles
import './styles/scss/style.scss';

//pages import
import HomePage from './pages/HomePage/HomePage';
import ArticlePage from "./pages/IndividualArticlePage";
import ContactUsPage from "./pages/ContactUsPage/ContactUsPage";
import ContentPage from "./pages/ContentPage";
import AboutUsPage from "./pages/AboutUsPage/AboutUsPage";
import TournamentsPage from "./pages/TournamentsPage";

//components import
import NavBar from "./parts/NavBar";
import Footer from "./parts/Footer";
import PrivateRoute from "./PrivateRoutes";
import ManageArticlesPage from "./pages/UserAccount/AddArticlesPage/ManageArticlesPage";
import ManageStreamsPage from "./pages/ModeratorPanel/ManageStreamsPage";
import ManageTournamentsPage from "./pages/ModeratorPanel/ManageTournamentsPage";
import EditTournamentForm from "./pages/ModeratorPanel/EditTournamentForm";
import EditStreamForm from "./pages/ModeratorPanel/EditStreamForm";
import EditArticleForm from "./pages/UserAccount/AddArticlesPage/EditArticleForm";
import FirstLoginForm from "./pages/FirstLoginForm";
import SponsorshipPage from "./pages/SponsorshipPage/SponsoshipPage";
import CMSMenu from "./pages/CMSMenu/CMSMenu";
import MainSurveyPage from "./pages/SurveyPage/SurveySteps/MainSurveyPage";
function App() {

   const [loginPassed, setLoginPassed] = useState(false);

    if(loginPassed===true) {
    return(
        <div className="App">
            <AuthContextProvider>
                <Suspense fallback={<div>Loading...</div>}>
                    <HashRouter>
                        <LanguageContextProvider>
                        <NavBar />
                            <StreamsContextProvider>
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
                                            <PrivateRoute path="/Step2CompleteProfilePage" component={Step2CompleteProfilePage} />
                                            <PrivateRoute path="/ManageArticlesPage" component={ManageArticlesPage} />
                                            <PrivateRoute path="/ManageStreamsPage" component={ManageStreamsPage} />
                                            <PrivateRoute path="/ManageTournamentsPage" component={ManageTournamentsPage} />
                                            <PrivateRoute path="/edit-tournament/:slug" component={EditTournamentForm} />
                                            <PrivateRoute path="/edit-stream/:slug" component={EditStreamForm} />
                                            <PrivateRoute path="/edit-article/:slug" component={EditArticleForm} />
                                            <PrivateRoute path="/DeleteProfilePage" component={DeleteProfilePage} />
                                            <PrivateRoute path="/CMSMenu" component={CMSMenu} />
                                            <PrivateRoute path="/MainSurveyPage" component={MainSurveyPage} />

                                            <Route path="/" exact component={HomePage} />
                                            <Route path="/article/:slug" component={ArticlePage} />
                                            <Route path="/ContactUsPage" component={ContactUsPage} />
                                            <Route path="/BlogPage" component={BlogPage} />
                                            <Route path="/ContentPage" component={ContentPage} />
                                            <Route path="/AboutUsPage" component={AboutUsPage} />
                                            <Route path="/TournamentsPage" component={TournamentsPage} />
                                            <Route path="/SubmitCvForm" component={SubmitCvForm} />
                                            <Route path="/MainLoginPage" component={MainLoginPage} />
                                            <Route path="/SponsorshipPage" component={SponsorshipPage} />

                                            SponsorshipPage
                                        </Switch>
                                    </TournamentsContextProvider>
                                </ArticlesContextProvider>
                            </StreamsContextProvider>
                        </LanguageContextProvider>
                        <Footer/>
                    </HashRouter>
                </Suspense>
            </AuthContextProvider>
        </div>
    );
}else{
    return(<FirstLoginForm setLoginPassed={setLoginPassed}/>);
}
}

export default App;


