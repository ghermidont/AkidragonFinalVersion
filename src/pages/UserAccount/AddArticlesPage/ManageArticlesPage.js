import React from 'react';
import {Link, useHistory} from "react-router-dom";
import {useDataFromFirestore} from "../../../customHooks/useFirestore";
import {useLanguageContext} from "../../../context/LanguageContext";
import {useArticlesContext} from "../../../context/ArticlesContext";
import {Button} from "react-bootstrap";
import {projectFirestore} from "../../../fireBase";

const ManageArticlesPage = () => {
    console.log("ManageArticlesPage worked");
    const {appLanguage} = useLanguageContext();
    const history = useHistory();
    const {setChosenArticleNumber} = useArticlesContext();
    const {docsFromHook} = useDataFromFirestore('TEMP-articles');

    return (
        <>
            <section className='articles-page'>
                <div className="container">
                    <h1 className="articles-page__title title">Manage articles</h1>
                    <Link className='btn' to='/AddArticlesForm'>Add Articles</Link>
                    <div className="articles-page__tab tab">
                        <div className="articles-page__tab-body">
                            <ul className="articles-page__tab-list active">
                                {docsFromHook && docsFromHook.map(doc => (
                                    <li className="articles-page__tab-item" key={doc.id}>
                                        <article className='articles-page__post'>
                                            <div className="articles-page__image">
                                                <img src={doc.imageURL?doc.imageURL:"https://firebasestorage.googleapis.com/v0/b/aki-dragon.appspot.com/o/articles_pictures%2Fdefault-placeholder-image.png?alt=media&token=1ead64c5-c3cc-4213-ac97-a391f8c15bf2"} alt="" className="articles-page__img"/>
                                            </div>
                                            <div className="articles-page__content">
                                                <Link
                                                    onClick={()=>{
                                                        setChosenArticleNumber(doc.id);
                                                        history.push(`/article/${doc.id}`, { from: "/ManageArticlesPage" });//check which one works!!!!
                                                    }}
                                                >
                                                    <h3 className="articles-page__content-title">{doc[appLanguage].title}</h3>
                                                </Link>
                                                <div className="articles-page__content-info">
                                                </div>
                                                <p className="articles-page__content-text">
                                                    {doc[appLanguage].text}
                                                </p>
                                            </div>
                                        </article>
                                        <Button
                                            variant="danger"
                                            onClick={()=>{
                                                projectFirestore.collection("TEMP-articles").doc(doc.id).delete().then(() => {
                                                    console.log("Document successfully deleted!");
                                                }).catch((error) => {
                                                    console.error("Error removing document: ", error);
                                                });
                                            }}
                                        >DELETE</Button>
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


export default ManageArticlesPage;