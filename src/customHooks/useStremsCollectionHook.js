/** Hook to get streams from Firestore. Note: This code can be integrated in the useFirestore.js*/
import { useState, useEffect } from "react";
import { projectFirestore } from "../fireBase";

const useGetLatestStreams = (collection) => {
	const [latestStreamsArrayFromHook, setLatestStreamsArrayFromHook] = useState([]);

	useEffect( () => {
		const unsubFromCollection = projectFirestore.collection(collection)
			.onSnapshot(snap => {
				let documents = [];
				let orderNumb = 1;
				snap.forEach(doc => {
					documents.push({...doc.data(), id: doc.id,  slug: orderNumb++});
				});
				setLatestStreamsArrayFromHook(documents);
			});
		return () => unsubFromCollection();
	}, [collection]);
	return { latestStreamsArrayFromHook };
};

export {useGetLatestStreams};
