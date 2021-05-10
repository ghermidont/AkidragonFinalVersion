import React, {useState} from 'react';
import {useDataFromFirestore} from "../../customHooks/useFirestore";
import {functions} from "../../fireBase";
import {useLanguageContext} from "../../context/LanguageContext";

export default function NOApproveArticlesPage() {
    console.log("ApproveArticlesComponent");
      const {docsFromHook} = useDataFromFirestore('articles');
    //const {appLanguage} = useLanguageContext();
    const [readMore, setReadMore] = useState(false);

    let pendingArticlesArr;

    if(docsFromHook) {
        //Filter the articles object and select the article who's slug corresponds to the current window slug
        pendingArticlesArr = docsFromHook.filter(function (article) {
            return article.approved===false;
        });
    }

    console.log("Pending articles from ApproveArticlesComponent");
    console.log(pendingArticlesArr);

    const approveCloudFunctTrigger = (id) => {
        console.log("approveCloudFunctTrigger()");
        const addData = functions.httpsCallable('approveArticle');
        addData({
            articleId: id
        }).then().catch(err=>console.log("Improvement process went wrong "+err));
    }

    const deleteCloudFunctTrigger = (id) => {
        console.log("deleteCloudFunctTrigger()");
        const addData = functions.httpsCallable('deleteArticle');
        addData({
            articleId: id
        }).then().catch(err=>console.log("Improvement process went wrong "+err));
    }

    const linkName = readMore ? 'Read Less << ' : 'Read More >> ';

    return (
        <>
            <section className="approve">
                <div className="container">
                    <h1 className="approve__title title">Approve articles</h1>
                    <ul className="approve__list">
                        {pendingArticlesArr.map(doc => (
                            <>
                            <li className="approve__item">
                                <div className="approve__image">
                                    <img src={doc.pictureURL} alt="" className="approve__img"/>
                                </div>
                                <div className="approve__content">
                                    <h3 className="approve__item-title" >{doc.content.en.title}</h3>
                                    <p className="approve__text">{doc.content.en.description}</p>
                                </div>
                                <div className="approve__box-btn">
                                    <button className="approve__btn approve__btn--green" onClick={()=>approveCloudFunctTrigger(doc.id)}>Approve</button>
                                    <button className="approve__btn approve__btn--red" onClick={()=>deleteCloudFunctTrigger(doc.id)}>Delete</button>
                                </div>
                            </li>
                            <a className="read-more-link" onClick={()=>{setReadMore(!readMore)}}><h2>{linkName}</h2></a>
                            {readMore &&
                                <div>
                                    <p className="extra-content">
                                        {doc.content.en.text}
                                    </p>
                                </div>
                            }
                            </>
                        ))}
                    </ul>
                </div>
            </section>
        </>
    );
}

