import React from 'react';
import {Link} from "react-router-dom";
import {useDataFromFirestore} from "../../../customHooks/useFirestore";
import {useLanguageContext} from "../../../context/LanguageContext";
import {useArticlesContext} from "../../../context/ArticlesContext";

const UserProfileArticlesPage = () => {
    console.log("NOUserProfileArticlesPage ");
    const {docsFromHook} = useDataFromFirestore('articles');
    const {appLanguage} = useLanguageContext();
    const {setArticleContent, setChosenArticleNumber} = useArticlesContext();

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
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}


export default UserProfileArticlesPage;