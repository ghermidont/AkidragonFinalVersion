import React, {useState, useContext} from "react";
import {projectFirestore} from "../fireBase";

const streamsContext = React.createContext();

export function useStreamsContext(){
    return useContext(streamsContext);
}

export function StreamsContextProvider({ children }) {
    console.log("StreamsContextProvider() worked!");
    const [latestStreams, setLatestStreams] =useState([]);
    const [entStreams, setEntStreams] = useState([]);
    const [latestTournamentStreams, setLatestTournamentStreams] = useState([]);
    const [latestEntertainmentStreams, setLatestEntertainmentStreams] = useState([]);
    const [chosenModifyStreamNumber, setChosenModifyStreamNumber] = useState('');

    const getLatestTournamentsForSwiper = async () => {
        console.log("getLatestTournamentsForSwiper worked");
        await projectFirestore.collection("matches-swiper")
            //onSnapshot rune every time a change in the db occurs. A real time monitor.
            .onSnapshot(snap => {
                //the array where all the data from the db will be stored.
                let documents = [];
                let orderNumb = 1;
                //Now we circle through the documents of the database that are there at this specific moment.
                snap.forEach(doc => {
                    documents.push({...doc.data(), id: doc.id,  slug: orderNumb++});
                });
                setLatestTournamentStreams(documents);
                console.log(latestTournamentStreams);
            });
    }

    const getLatestEntertainmentForSwiper = async () => {
        console.log("getLatestEntertainmentForSwiper worked");
        await projectFirestore.collection("entertainment")
            //onSnapshot rune every time a change in the db occurs. A real time monitor.
            .onSnapshot(snap => {
                //the array where all the data from the db will be stored.
                let documents = [];
                let orderNumb = 1;
                //Now we circle through the documents of the database that are there at this specific moment.
                snap.forEach(doc => {
                    documents.push({...doc.data(), id: doc.id,  slug: orderNumb++});
                });
                setLatestEntertainmentStreams(documents);
                console.log(latestTournamentStreams);
            });
    }

    const getLatestStreamsForSwiper = async () => {
        console.log("getLatestStreamsForSwiper worked");
        await projectFirestore.collection("latest-streams")
            //onSnapshot rune every time a change in the db occurs. A real time monitor.
            .onSnapshot(snap => {
                //the array where all the data from the db will be stored.
                let documents = [];
                let orderNumb = 1;
                //Now we circle through the documents of the database that are there at this specific moment.
                snap.forEach(doc => {
                    documents.push({...doc.data(), id: doc.id,  slug: orderNumb++});
                });
                setLatestStreams(documents);
                console.log(latestTournamentStreams);
            });
    }

    // const getLatestStreams = () => {
    //     console.log("getLatestStreams worked");
    //     projectFirestore.collection("matches-swiper")
    //         //onSnapshot rune every time a change in the db occurs. A real time monitor.
    //         .onSnapshot(snap => {
    //             //the array where all the data from the db will be stored.
    //             let documents = [];
    //             let orderNumb = 1;
    //             //Now we circle through the documents of the database that are there at this specific moment.
    //             snap.forEach(doc => {
    //                 documents.push({...doc.data(), id: doc.id,  slug: orderNumb++});
    //             });
    //             setLatestTournamentStreams(documents);
    //             console.log(latestTournamentStreams);
    //         });
    // }


    const value = {
        entStreams,
        setEntStreams,
        latestStreams,
        setLatestStreams,
        latestTournamentStreams,
        getLatestTournamentsForSwiper,
        latestEntertainmentStreams,
        getLatestEntertainmentForSwiper,
        getLatestStreamsForSwiper,
        chosenModifyStreamNumber,
        setChosenModifyStreamNumber
    }

    return (
        <streamsContext.Provider value={value}>
            {children}
        </streamsContext.Provider>
    );
}
