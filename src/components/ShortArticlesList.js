//https://firebase.google.com/docs/firestore/data-model
//https://firebase.google.com/docs/firestore/query-data/index-overview
//https://www.pluralsight.com/guides/how-to-implement-a-read-more-link-in-react
import React, {useEffect} from 'react';
import {useDataFromFirestore} from '../customHooks/useFirestore';
import {Link} from "react-router-dom";
import {useArticlesContext} from "../context/ArticlesContext";
import logo from '../assets/images/src/DragonLogo.png';
import {useHistory} from 'react-router-dom';
import {useLanguageContext} from "../context/LanguageContext";

export default function ShortArticlesList() {
  console.log("ArticlesList started");
  const {appLanguage} = useLanguageContext();
  const history = useHistory();
  const {setArticleContent, setChosenArticleNumber} = useArticlesContext();
  //We pass the name of the collection we want to work with to the useDataFromFirestore hook
  const {docsFromHook} = useDataFromFirestore('TEMP-articles');

  //Put out the articles objects array to the context.
  useEffect(() => {
    docsFromHook && setArticleContent(docsFromHook);
  }, [docsFromHook, setArticleContent] );

  console.log("Articles extracted from ShortArticlesList component.");
  console.log(docsFromHook);

  return (
    <>
      {docsFromHook && docsFromHook.slice(0, 4).map(doc => (
        <article className="article" key={doc.id}>
          <Link onClick={()=>{
            setChosenArticleNumber(doc.id);
            history.push(`/article/${doc.id}`, { from: "/ShortArticlesList" });//check which one works!!!!
          }}>
            <a className="article__link">
              <img src={doc.imageURL?doc.imageURL:"https://firebasestorage.googleapis.com/v0/b/aki-dragon.appspot.com/o/articles_pictures%2Fdefault-placeholder-image.png?alt=media&token=1ead64c5-c3cc-4213-ac97-a391f8c15bf2"} alt="" className="articles-page__img" alt="" className="article__image"/>
              <div className="article__content">
                <img className="article__logo" src={logo} alt="logo"/>
                <div className="article__box-text">
                  <p className="article__text">
                    {doc[appLanguage].description}
                  </p>
                </div>
              </div>
              <div className="article__footer">
                {/*<img src="" alt=""/>*/}
              </div>
            </a>
          </Link>
        </article>
      ))}
    </>
  );
}