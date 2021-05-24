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
    const {setChosenModifyArticleNumber} = useArticlesContext();
    const {docsFromHook} = useDataFromFirestore('articles');

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
                                    <>
                                    <li className="articles-page__tab-item" key={doc.id}>
                                        <article className='articles-page__post'>
                                            <div className="articles-page__image">
                                                <img src={doc.content.image?doc.content.image:"https://firebasestorage.googleapis.com/v0/b/aki-dragon.appspot.com/o/articles_pictures%2Fdefault-placeholder-image.png?alt=media&token=1ead64c5-c3cc-4213-ac97-a391f8c15bf2"} alt="" className="articles-page__img"/>
                                            </div>
                                            <div className="articles-page__content">
                                                <h3 className="articles-page__content-title">{doc.content[appLanguage].title}</h3>
                                                <p className="articles-page__content-text">
                                                    {doc.content[appLanguage].text}
                                                 </p>
                                            </div>
                                        </article>
                                        <Link onClick={()=> {
                                            //setChosenModifyArticleNumber(doc.id);
                                            history.push(`/edit-article/${doc.id}`, {from: "/ManageArticlesPage"});
                                        }}> Edit article >>>

                                        </Link>
                                        <Button
                                            style={{float: "right"}}
                                            variant="danger"
                                            onClick={()=>{
                                                projectFirestore.collection("articles").doc(doc.id).delete().then(() => {
                                                    console.log("Document successfully deleted!");
                                                }).catch((error) => {
                                                    console.error("Error removing document: ", error);
                                                });
                                            }}
                                        >
                                            Delete Article
                                        </Button>

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