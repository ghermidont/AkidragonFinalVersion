import React, {useEffect} from 'react';
import {Link, useHistory} from "react-router-dom";
import {useDataFromFirestore} from "../../customHooks/useFirestore";
import classes from './style/UserProfileArticlesPage.module.scss';
//import {useLanguageContext} from "../../context/LanguageContext";
import {useAuthContext} from "../../context/AuthContext";
import {useArticlesContext} from "../../context/ArticlesContext";
import {useLanguageContext} from "../../context/LanguageContext";
import {Button} from "react-bootstrap";
import {projectFirestore} from "../../fireBase";

const UserProfileArticlesPage = () => {
  console.log("UserProfileArticlesPage ");
  const {docsFromHook} = useDataFromFirestore('articles');
  const {currentUser} = useAuthContext();
  const {appLanguage} = useLanguageContext();
  const history = useHistory();
  const {setChosenArticleNumber} = useArticlesContext();
  const CurrentUserFromLS = JSON.parse(localStorage.getItem('LSCurrentUser'));
  const {setChosenModifyArticleNumber} = useArticlesContext();

  let generalLatestArticlesArr = [];
  let userPersonalArticlesArr = [];

  if(docsFromHook&&(currentUser||CurrentUserFromLS)) {

    userPersonalArticlesArr = docsFromHook.filter(function (article) {
      return article.authorId === (currentUser.uid||CurrentUserFromLS.uid);
    });
  }

  if(docsFromHook&&(currentUser||CurrentUserFromLS)) {
    generalLatestArticlesArr = docsFromHook.filter(function (article) {
      return article.approved === true;
    });
  }

  const tabsBtn = document.querySelectorAll('.articles-page__tab-btn');
  const tabsItems = document.querySelectorAll('.articles-page__tab-list');

  tabsBtn.forEach(function (item) {
    item.addEventListener('click', function () {
      let currentBtn = item;
      let tabId = currentBtn.getAttribute('data-tab');
      let currentTab = document.querySelector(tabId);

      tabsBtn.forEach(function (item) {
        item.classList.remove('active');
      });
      tabsItems.forEach(function (item) {
        item.classList.remove('active');
      });
      currentBtn.classList.add('active');
      currentTab.classList.add('active');
    });
  });

   return (
    <>
      <section className='articles-page'>
        <div className="container">
          <h1 className="articles-page__title title">Articles</h1>
          <Link className='btn ' to='/AddArticlesForm'>Add Articles</Link>
          <div className="articles-page__tab tab">

            <div className="articles-page__tab-body">
              <div className="tab__btn-inner">
                <button className="articles-page__tab-btn active" type="button" data-tab="#tab_1">New Articles</button>
                <button className="articles-page__tab-btn" type="button" data-tab="#tab_2">Personal Articles</button>
              </div>

              <ul className="articles-page__tab-list active" id="tab_1">
                {generalLatestArticlesArr && generalLatestArticlesArr.slice(0, 8).map(doc => (
               <>
                  <br/>
                  <li className="articles-page__tab-item" key={doc.id}>
                  <article className='articles-page__post'>
                    <div className="articles-page__image">
                      <img src={doc.content[appLanguage].image} alt="" className="articles-page__img"/>
                    </div>
                    <div className="articles-page__content">
                      <Link
                          onClick={()=>{
                            setChosenArticleNumber(doc.id);
                            history.push(`/article/${doc.id}`, { from: "/UserProfileArticlesPage" });
                          }}
                      >
                        <h3 className="articles-page__content-title">{doc.content[appLanguage].title}</h3>
                      </Link>
                      <div className="articles-page__content-info">
                      </div>
                        <p className="articles-page__content-text">
                          {doc.content[appLanguage].text}
                        </p>
                    </div>
                  </article>
                </li>
                  </>
                ))}
              </ul>

              <ul className="articles-page__tab-list" id="tab_2">
                {userPersonalArticlesArr && userPersonalArticlesArr.slice(0, 8).map(doc => (
                <li className="articles-page__tab-item">
                  <article className='articles-page__post'>
                    <div className="articles-page__image">
                      <img src={doc.content[appLanguage].image} alt="" className="articles-page__img"/>
                    </div>
                    <div className="articles-page__content">

                        <h3 className="articles-page__content-title">{doc.content[appLanguage].title}</h3>

                      <div className="articles-page__content-info">
                         <time className="articles-page__content-date"></time>
                      </div>
                        <p className="articles-page__content-text">
                          {doc.content[appLanguage].text}
                        </p>
                    </div>
                    {doc.approved===false&&<div>Not approve yet</div>}
                  </article>
                  <Link onClick={()=> {
                    setChosenModifyArticleNumber(doc.id);
                    history.push(`/edit-article/${doc.id}`, {from: "/ManageArticlesPage"});
                  }}>
                    <Button className='btn-article btn-upload'>
                      UPDATE
                    </Button>
                  </Link>
                  <Button
                    className='btn-article btn-upload'
                      variant="danger"
                      onClick={()=>{
                        projectFirestore.collection("articles").doc(doc.id).delete().then(() => {
                          console.log("Document successfully deleted!");
                        }).catch((error) => {
                          console.error("Error removing document: ", error);
                        });
                      }}
                  >
                    DELETE
                  </Button>
                </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default UserProfileArticlesPage;