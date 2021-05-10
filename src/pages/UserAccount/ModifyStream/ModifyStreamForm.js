import React from 'react';
//set({
//  ...
//  createdAt: firebase.firestore.FieldValue.serverTimestamp()
//})

export default function ModeratorAddStreamsForm(){
    return (
        <>
            <div className='form-update__body form-login__body'>
                <h1 className="title form-title">Add Stream</h1>
                <form className="form-update">
                    <label className='form-update__label'>
                        Link
                        <input className='form-update__input' type="text" required/>
                    </label>
                    <div className="form-article__box-btn">
                        <label className='form-article__label btn-upload'> <span className='icon-upload2'></span> Upload thumbnail
                            <input className='form-article__btn visually-hidden' type="file" placeholder='file'/>
                        </label>
                        <button className="form-article__btn">Submit</button>
                    </div>
                </form>
            </div>
        </>
    );
}