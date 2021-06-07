import React from 'react';
import {Link, useHistory} from "react-router-dom";
import {useDataFromFirestore} from "../../../customHooks/useFirestore";
import {useLanguageContext} from "../../../context/LanguageContext";
import {Button} from "react-bootstrap";
import {projectFirestore} from "../../../fireBase";
import classes from './styles/ManageArticlesPage.module.scss';

const ManageArticlesPage = () => {
  console.log("ManageArticlesPage worked");
  const {appLanguage} = useLanguageContext();
  const history = useHistory();

  const {docsFromHook} = useDataFromFirestore('articles');

  return (
    <>
      <section className='articles-page'>
        <div className="container">
          <h1 className={classes.title}>Manage articles</h1>
          <Link className={classes.btn} to='/AddArticlesForm'>Add Articles</Link>
          <div className="articles-page__tab tab">
            <div className="articles-page__tab-body">
              <ul className="articles-page__tab-list active">
                {docsFromHook && docsFromHook.map(doc => (
                  <>
                    {/*<li className="articles-page__tab-item" key={doc.id}>*/}
                    <li className={classes.item} key={doc.id}>
                      <article className={classes.article}>
                        <div className="articles-page__image">
                          <img
                            src={doc.content[appLanguage].image ? doc.content[appLanguage].image : "https://firebasestorage.googleapis.com/v0/b/aki-dragon.appspot.com/o/articles_pictures%2Fdefault-placeholder-image.png?alt=media&token=1ead64c5-c3cc-4213-ac97-a391f8c15bf2"}
                            alt="" className="articles-page__img"/>
                        </div>
                        <div className="articles-page__content">
                          <h3 className="articles-page__content-title">{doc.content[appLanguage].title}</h3>
                          <p className="articles-page__content-text">
                            {doc.content[appLanguage].text}
                          </p>
                        </div>
                      </article>
                      <div className={classes.btnInner}>
                        <Link className={classes.btn} onClick={() => {
                          //setChosenModifyArticleNumber(doc.id);
                          history.push(`/edit-article/${doc.id}`, {from: "/ManageArticlesPage"});
                        }}> Edit article >>>
                        </Link>
                        <Button
                          className={classes.btnDel}
                          style={{float: "right"}}
                          variant="danger"
                          onClick={() => {
                            projectFirestore.collection("articles").doc(doc.id).delete().then(() => {
                              console.log("Document successfully deleted!");
                            }).catch((error) => {
                              console.error("Error removing document: ", error);
                            });
                          }}
                        >
                          Delete Article
                        </Button>
                      </div>
                    </li>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                  </>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}


export default ManageArticlesPage;