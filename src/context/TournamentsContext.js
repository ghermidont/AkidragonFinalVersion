import React, {useState, useContext} from "react";
const tournamentsContext = React.createContext();

export function useTournamentsContext(){
	return useContext(tournamentsContext);
}

/*########################## Articles Context Provider ##########################*/
// eslint-disable-next-line react/prop-types
export function TournamentsContextProvider({ children }) {
	const [chosenTournamentNumber, setChosenTournamentNumber] = useState("");

	const value = {
		chosenTournamentNumber,
		setChosenTournamentNumber
	};

	return (
		<tournamentsContext.Provider value={value}>
			{children}
		</tournamentsContext.Provider>
	);
}