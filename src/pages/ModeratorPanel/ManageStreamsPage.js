import React from "react";
import {Link} from "react-router-dom";
import {useDataFromFirestore} from "../../customHooks/useFirestore";
import {Button} from "react-bootstrap";
import ReactPlayer from "react-player/youtube";
import {projectFirestore} from "../../fireBase";
import {useStreamsContext} from "../../context/StreamsContext";

const ManageStreamsPage = () => {
	//Get data from the database.
	const {docsFromHook} = useDataFromFirestore("streams");
	//Getting vars from the context.
	const {setChosenModifyStreamNumber} = useStreamsContext();

	return (
		<>
			<section className="articles-page">
				<div className="container">
					<h1 className="articles-page__title title">Manage streams</h1>
					<Link className="btn btn__stream" to="/ModeratorAddStreamsForm">Add streams</Link>
					<div className="articles-page__tab tab">
						<div className="articles-page__tab-body">
							<ul className="articles-page__tab-list active">
								{docsFromHook && docsFromHook.map(doc => (
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
										<div className="stream__box-btn">
											<Link to={`/edit-stream/${doc.id}`} className='btn-upload stream__btn'
												onClick={()=>setChosenModifyStreamNumber(doc.id)}
											> Update stream
											</Link>
											<Button
												className="btn-upload stream__btn"
												onClick={() => {
													projectFirestore.collection("streams").doc(doc.id).delete().then(() => {
														window.alert("Document successfully deleted!");
													}).catch((error) => {
														window.alert("Error removing document: " + error);
													});
												}}
											>DELETE</Button>
										</div>
									</li>
								))}
							</ul>
						</div>
					</div>
				</div>
			</section>
		</>
	);
};


export default ManageStreamsPage;