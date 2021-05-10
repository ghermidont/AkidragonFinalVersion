import React from 'react';
import {Link} from "react-router-dom";
import {useDataFromFirestore} from "../../customHooks/useFirestore";
import {Button} from "react-bootstrap";
import ReactPlayer from "react-player/youtube";
import {projectFirestore} from "../../fireBase";

const ManageStreamsPage = () => {
    console.log("ManageArticlesPage worked");
    const {docsFromHook} = useDataFromFirestore('TEMP-streams');

    return (
        <>
            <section className='articles-page'>
                <div className="container">
                    <h1 className="articles-page__title title">Manage streams</h1>
                    <Link className='btn ' to='/ModeratorAddStreamsForm'>Add streams</Link>
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
                                               <div className="articles-page__content-info">
                                                   <ReactPlayer
                                                       key={doc.id}
                                                       url = {doc.videoURL}
                                                       controls={true}
                                                       playing={false}/>
                                                </div>

                                            </div>
                                        </article>
                                        <Button
                                            variant="danger"
                                            onClick={()=>{
                                                projectFirestore.collection("TEMP-streams").doc(doc.id).delete().then(() => {
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


export default ManageStreamsPage;