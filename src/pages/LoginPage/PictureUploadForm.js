import React, { useState } from 'react';
import {useAuthContext} from '../../context/AuthContext';

const PictureUploadForm = () => {
    //store file in a local state
    const {setSignUpFormUserUploadedFile} = useAuthContext();
    const [error, setError] = useState(null);
    const fileTypesArray = ['image/png', 'image/jpeg'];
    console.log("PictureUploadForm worked");

    //use the event object. 'target' is the imported object. [0] is because we want the first element of the array, and the only one in our case.
    //'e' stands for the event Object that we get automatically.
    const fileUploadEventListener = (e) => {
        let userUploadedFilesArray = e.target.files[0];
        //'image/png', 'image/jpeg' are also some default values we can see in the uploadedFilesArray object.
        if (userUploadedFilesArray && fileTypesArray.includes(userUploadedFilesArray.type)) {
            setSignUpFormUserUploadedFile(userUploadedFilesArray);
            setError('');
        } else {
            //reset the value.
            setSignUpFormUserUploadedFile(null);
            setError('Please select an image file (png or jpg)');
        }
    };

    return (
        <form>
            <label>
                <input type="file" onChange={fileUploadEventListener} />
            </label>
            <div className="output">
                { error && <div className="error">{ error }</div>}
            </div>
        </form>
    );
}

export default PictureUploadForm;