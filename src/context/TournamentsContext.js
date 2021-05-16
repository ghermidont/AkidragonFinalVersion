import React, {useState, useContext} from "react";

const tournamentsContext = React.createContext();

export function useTournamentsContext(){
    return useContext(tournamentsContext);
}

/*########################## Articles Context Provider ##########################*/
export function TournamentsContextProvider({ children }) {
    console.log("TournamentsContextProvider() worked!");

    const [chosenTournamentNumber, setChosenTournamentNumber] = useState('');

    const value = {
        chosenTournamentNumber,
        setChosenTournamentNumber
    }

    return (
        <tournamentsContext.Provider value={value}>
            {children}
        </tournamentsContext.Provider>
    );
}