//https://firebase.google.com/docs/firestore/data-model
//https://firebase.google.com/docs/firestore/query-data/index-overview
//https://www.pluralsight.com/guides/how-to-implement-a-read-more-link-in-react
import React from 'react';
import {useDataFromFirestore} from '../customHooks/useFirestore';
import {Link} from "react-router-dom";
import {useArticlesContext} from "../context/ArticlesContext";
import logo from '../assets/images/src/DragonLogo.png';
import {useHistory} from 'react-router-dom';
import {useLanguageContext} from "../context/LanguageContext";

export default function ShortArticlesList() {
  console.log("ShortArticlesList started");
  const {appLanguage} = useLanguageContext();
  const history = useHistory();
  const {setChosenArticleNumber} = useArticlesContext();
  const {docsFromHook} = useDataFromFirestore('articles');

  let articlesArr;

  if (docsFromHook) {
    articlesArr = docsFromHook.filter(function (article) {
      return article.approved === true;
    });
  }

  return (
    <>
      {articlesArr && articlesArr.slice(0, 4).map(doc => (
        <article className="article" key={doc.id}>
          <Link className="article__link" onClick={() => {
            setChosenArticleNumber(doc.id);
            history.push(`/article/${doc.id}`, {from: "/ShortArticlesList"});//check which one works!!!!
          }}>
            <img
              src={doc.content.image ? doc.content.image : "https://firebasestorage.googleapis.com/v0/b/aki-dragon.appspot.com/o/articles_pictures%2Fdefault-placeholder-image.png?alt=media&token=1ead64c5-c3cc-4213-ac97-a391f8c15bf2"}
              alt="" className="articles-page__img" alt="" className="article__image"/>
            <div className="article__content">
              <img className="article__logo" src={logo} alt="logo"/>
              <div className="article__box-text">
                <p className="article__text">
                  {doc.content[appLanguage].description}
                </p>
              </div>
            </div>
            <div className="article__footer">
              {/*<img src="" alt=""/>*/}
            </div>
          </Link>
        </article>
      ))}
    </>
  );
}