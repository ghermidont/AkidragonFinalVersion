import React, {useEffect} from 'react';
import {Link, useHistory} from "react-router-dom";
import {useDataFromFirestore} from "../../customHooks/useFirestore";
//import {useLanguageContext} from "../../context/LanguageContext";
import {useAuthContext} from "../../context/AuthContext";
import {useArticlesContext} from "../../context/ArticlesContext";

const NOUserProfileArticlesPage = () => {
  console.log("NOUserProfileArticlesPage ");
  const {docsFromHook} = useDataFromFirestore('articles');
  const {currentUser} = useAuthContext();
  //const {appLanguage} = useLanguageContext();
  const history = useHistory();
  const {setArticleContent, setChosenArticleNumber} = useArticlesContext();

  let generalLatestArticlesArr = [];
  let userPersonalArticlesArr = [];

  useEffect(() => {
    docsFromHook && setArticleContent(docsFromHook);
  }, [docsFromHook, setArticleContent] );

  if(docsFromHook&&currentUser) {
      console.log("first option worked");
    userPersonalArticlesArr = docsFromHook.filter(function (article) {
      return article.id === currentUser.uid;
    });
  }

  if(docsFromHook&&currentUser) {
    console.log("first option worked");
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
          <h1 className="articles-page__title title">Article</h1>
          <Link className='btn ' to='/AddArticlesForm'>Add Articles</Link>
          <div className="articles-page__tab tab">

            <div className="articles-page__tab-body">
              <div className="articles-page__tab-btn-inner">
                <button className="articles-page__tab-btn active" type="button" data-tab="#tab_1">All Article</button>
                <button className="articles-page__tab-btn" type="button" data-tab="#tab_2">Personal Article</button>
              </div>

              <ul className="articles-page__tab-list active" id="tab_1">
                {generalLatestArticlesArr && generalLatestArticlesArr.slice(0, 8).map(doc => (
                  <li className="articles-page__tab-item" key={doc.id}>
                  <article className='articles-page__post'>
                    <div className="articles-page__image">
                      <img src={doc.imageURL} alt="" className="articles-page__img"/>
                    </div>
                    <div className="articles-page__content">
                      <Link
                          onClick={()=>{
                            setChosenArticleNumber(doc.id);
                            history.push(`/article/${doc.id}`, { from: "/NOUserProfileArticlesPage" });//check which one works!!!!
                          }}
                      >
                        <h3 className="articles-page__content-title">{doc.content.en.title}</h3>
                      </Link>
                      <div className="articles-page__content-info">
                      </div>
                        <p className="articles-page__content-text">
                          {doc.content.en.text}
                        </p>
                    </div>
                  </article>
                </li>
                ))}
              </ul>

              <ul className="articles-page__tab-list" id="tab_2">
                {userPersonalArticlesArr && userPersonalArticlesArr.slice(0, 8).map(doc => ( //Consider pagination
                <li className="articles-page__tab-item">
                  <article className='articles-page__post'>
                    <div className="articles-page__image">
                      <img src={doc.imageURL} alt="" className="articles-page__img"/>
                    </div>
                    <div className="articles-page__content">

                        <h3 className="articles-page__content-title">{doc.content.en.title}</h3>

                      <div className="articles-page__content-info">
                         <time className="articles-page__content-date"></time>
                      </div>
                        <p className="articles-page__content-text">
                          {doc.content.en.text}
                        </p>
                    </div>
                  </article>
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


export default NOUserProfileArticlesPage;