import React from "react";
import {useDataFromFirestore} from "../customHooks/useFirestore";
import ReactPlayer from "react-player/youtube";

const FullStreamsList = () => {
	const {docsFromHook} = useDataFromFirestore("streams");

	return (
		<>
			<section className="articles-page">
				<div className="container">
					<h1 className="articles-page__title title">Streams</h1>
					<div className="articles-page__tab tab">
						<div className="articles-page__tab-body">
							<ul className="articles-page__tab-list active">
								{docsFromHook && docsFromHook.map(doc => (
									<>
										<li style={{marginTop: "5em"}} className="articles-page__tab-item stream__item" key={doc.id}>
											<article className="articles-page__post stream__inner">
												<div className="stream__content">
													<h4 className="stream__title"><span>Category: </span>{doc.category}</h4>
													<div className="stream__image">
														<img
															src={doc.imageURL ? doc.imageURL : "https://firebasestorage.googleapis.com/v0/b/aki-dragon.appspot.com/o/articles_pictures%2Fdefault-placeholder-image.png?alt=media&token=1ead64c5-c3cc-4213-ac97-a391f8c15bf2"}
															alt="" className="articles-page__img"/>
													</div>
												</div>
												<div className="stream__video">
													<div className="stream__player">
														<ReactPlayer
															key={doc.id}
															url={doc.videoURL}
															controls={true}
															playing={false}
															width='100%'
															height='100%'
														/>
													</div>
												</div>
											</article>
										</li>
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
};


export default FullStreamsList;