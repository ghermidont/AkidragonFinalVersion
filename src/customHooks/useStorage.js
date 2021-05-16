import { useState, useEffect } from 'react';
import {projectStorage} from '../fireBase';
//import {useAuthContext} from '../context/AuthContext';

const useStorage = (file, userId) => {
  console.log("useStorage() custom hook worked!");
  const [error, setError] = useState(null);
  //Here we will tore the url we get from the storage after the file has fully uploaded.
  const [url, setUrl] = useState();
  //const {setUserPictureUrl} = useAuthContext();

  //This function will handle all the file upload and will run every time the user uploads a file thus the file dependency changes.
  useEffect(() => {
    console.log("useStorage custom hook/useEffect() worked!");
    //reference to the storage bucket where a reference to the file has been created.
    const storageRef = projectStorage.ref('profile_pictures/').child(userId.uid);//file.name

    //const collectionRef = projectFirestore.collection('user-profiles');
    //put() puts the file in the reference defined in the storageRef.
      storageRef.put(file).on('state_changed', (err) => {
      setError(err);
    },  () => {
      const finalUrl = storageRef.getDownloadURL();
        console.log("finalUrl:")
        console.log(finalUrl);
        setUrl(finalUrl);
        localStorage.setItem("userPicture", JSON.stringify(finalUrl));
     });
  }, [file]);
  return { url, error };
}

export default useStorage;