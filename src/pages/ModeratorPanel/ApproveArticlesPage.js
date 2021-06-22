import React, {useState} from "react";
import {useDataFromFirestore} from "../../customHooks/useFirestore";
import {functions} from "../../fireBase";
import {useLanguageContext} from "../../context/LanguageContext";

export default function ApproveArticlesPage() {
	const {docsFromHook} = useDataFromFirestore("articles");
	const {appLanguage} = useLanguageContext();
	const [readMore, setReadMore] = useState(false);

	let pendingArticlesArr;

	if (docsFromHook) {
		//Filter the articles object and select the article who's slug corresponds to the current window slug
		pendingArticlesArr = docsFromHook.filter(function (article) {
			return article.approved === false;
		});
	}

	const approveCloudFunctTrigger = (id) => {
		const addData = functions.httpsCallable("approveArticle");
		addData({
			articleId: id
		}).then(() => window.alert("Article approved")).catch(err => console.log("Aprovement process went wrong " + err));
	};

	const deleteCloudFunctTrigger = (id) => {
		const addData = functions.httpsCallable("deleteArticle");
		addData({
			articleId: id
		}).then(() => window.alert("Article deleted")).catch(err => window.alert("Aprovement process went wrong " + err));
	};

	const linkName = readMore ? "Read Less << " : "Read More >> ";

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
										<img src={doc.content[appLanguage].image} alt="" className="approve__img"/>
									</div>
									<div className="approve__content">
										<h3 className="approve__item-title">Title: {doc.content[appLanguage].title}</h3>
										<p className="approve__text">Description: {doc.content[appLanguage].description}</p>
										<br/>
										<a style={{marginBottom: "3em"}} className="read-more-link" onClick={() => {
											setReadMore(!readMore);
										}}><h2>{linkName}</h2></a>
										{readMore &&
                    <div style={{marginBottom: "10em"}}>
                    	<p className="extra-content">
                    		{doc.content[appLanguage].text}
                    	</p>
                    </div>
										}
									</div>
									<div className="approve__box-btn">
										<button className="approve__btn approve__btn--green"
											onClick={() => approveCloudFunctTrigger(doc.id)}>Approve
										</button>
										<button className="approve__btn approve__btn--red"
											onClick={() => deleteCloudFunctTrigger(doc.id)}>Delete
										</button>
									</div>
								</li>
							</>
						))}
					</ul>
				</div>
			</section>
		</>
	);
}

