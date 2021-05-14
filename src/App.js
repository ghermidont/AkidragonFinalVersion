import React, {Suspense, useState} from 'react';
import {Route, Switch} from 'react-router';
import {HashRouter} from 'react-router-dom';
//import {BrowserRouter} from 'react-router-dom';
import {AuthContextProvider} from './context/AuthContext';
import {ArticlesContextProvider} from  './context/ArticlesContext'
import {StreamsContextProvider} from './context/StreamsContext';
import {NewsContextProvider} from './context/NewsContext';
import {LanguageContextProvider} from './context/LanguageContext';
import UserProfilePage from './pages/UserAccount/UserProfilePage';
import BlogPage from './pages/BlogPage';
import AddArticlesForm from './pages/UserAccount/AddArticlesPage/AddArticlesForm';
//import NOUpdateUserProfilePage from './pages/UserAccount/NOUpdateUserProfilePage';
import SubmitCvForm from './pages/AboutUsPage/SubmitCvForm';
import ModeratorAddStreamsForm from './pages/ModeratorPanel/ModeratorAddStreamsForm';
import ModeratorAddTournamentsForm from './pages/ModeratorPanel/ModeratorAddTournamentsForm';
//import Step2CompleteProfilePage from "./pages/UserAccount/NO-CreateUserAccount/Step2CompleteProfilePage";
import MainLoginPage from "./pages/LoginPage/MainLoginPage";
// import UpdateArticleForm from "./pages/UserAccount/ModifyArticle/ModifyArticleForm";
// import ModifyStreamForm from "./pages/UserAccount/ModifyStream/ModifyStreamForm";
// import ModifyTournamentForm from "./pages/UserAccount/ModifyTournament/ModifyTournamentForm";
//import NOUserProfileArticlesPage from './pages/UserAccount/NO-UserProfileArticlesPage';
import NOApproveArticlesPage from './pages/ModeratorPanel/NO-ApproveArticlesPage';

//connect styles
import './styles/scss/style.scss';

//pages import
import HomePage from './pages/HomePage/HomePage';
import ArticlePage from "./pages/IndividualArticlePage";
import ContactUsPage from "./pages/ContactUsPage/ContactUsPage";
import ContentPage from "./pages/ContentPage";
import AboutUsPage from "./pages/AboutUsPage/AboutUsPage";
import TournamentsPage from "./pages/TournamentsPage";
//import LoginSignUpForm from "./pages/LoginPage/LoginSignUpForm";
//components import
import NavBar from "./parts/NavBar";
import Footer from "./parts/Footer";
import PrivateRoute from "./PrivateRoutes";
import ManageArticlesPage from "./pages/UserAccount/AddArticlesPage/ManageArticlesPage";
import ManageStreamsPage from "./pages/ModeratorPanel/ManageStreamsPage";
import ManageTournamentsPage from "./pages/ModeratorPanel/ManageTournamentsPage";

function App() {
     //const [loginPassed, setLoginPassed] = useState(false);
    //if(loginPassed===true) {
    return(
        <div className="App">
            <AuthContextProvider>
                <Suspense fallback={<div>Loading...</div>}>
                    <HashRouter>
                        <LanguageContextProvider>
                        <NavBar />
                            <StreamsContextProvider>
                                <ArticlesContextProvider>
                                    <NewsContextProvider>
                                        <Switch>
                                            <PrivateRoute path="/UserProfilePage" component={UserProfilePage} />
                                            <PrivateRoute path="/AddArticlesForm" component={AddArticlesForm} />
                                            <PrivateRoute path="/ModeratorAddStreamsForm" component={ModeratorAddStreamsForm} />
                                            <PrivateRoute path="/ModeratorAddTournamentsForm" component={ModeratorAddTournamentsForm} />
                                            {/*<PrivateRoute path="/NOUserProfileArticlesPage" component={NOUserProfileArticlesPage} />*/}
                                            {/*<PrivateRoute path="/NOUpdateUserProfilePage" component={NOUpdateUserProfilePage} />*/}
                                            <PrivateRoute path="/NOApproveArticlesPage" component={NOApproveArticlesPage} />
                                            {/*<PrivateRoute path="/Step2CompleteProfilePage" component={Step2CompleteProfilePage} />*/}
                                            {/*<PrivateRoute path="/ModifyArticleForm" component={UpdateArticleForm} />*/}
                                            {/*<PrivateRoute path="/ModifyStreamForm" component={ModifyStreamForm} />*/}
                                            {/*<PrivateRoute path="/ModifyTournamentForm" component={ModifyTournamentForm} />*/}
                                            <PrivateRoute path="/ManageArticlesPage" component={ManageArticlesPage} />
                                            <PrivateRoute path="/ManageStreamsPage" component={ManageStreamsPage} />
                                            <PrivateRoute path="/ManageTournamentsPage" component={ManageTournamentsPage} />

                                            <Route path="/" exact component={HomePage} />
                                            <Route path="/article/:slug" component={ArticlePage} />
                                            <Route path="/ContactUsPage" component={ContactUsPage} />
                                            <Route path="/BlogPage" component={BlogPage} />
                                            <Route path="/ContentPage" component={ContentPage} />
                                            <Route path="/AboutUsPage" component={AboutUsPage} />
                                            <Route path="/TournamentsPage" component={TournamentsPage} />
                                            <Route path="/SubmitCvForm" component={SubmitCvForm} />
                                            <Route path="/MainLoginPage" component={MainLoginPage} />
                                        </Switch>
                                    </NewsContextProvider>
                                </ArticlesContextProvider>
                            </StreamsContextProvider>
                        </LanguageContextProvider>
                        <Footer/>
                    </HashRouter>
                </Suspense>
            </AuthContextProvider>
        </div>
    );
//}else{
    // return(<FirstLoginForm setLoginPassed={setLoginPassed}/>);
//}
}

export default App;


