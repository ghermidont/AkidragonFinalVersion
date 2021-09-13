import React, {useState, useContext} from "react";

const teamsContext = React.createContext({
	teamsContent: [],
	setTeamsContent: () => {},
});

export function useTeamsContext(){
	return useContext(teamsContext);
}

// eslint-disable-next-line react/prop-types
export function TeamsContextProvider({ children }) {
	const [chosenTeamNumber, setChosenTeamNumber] = useState();

	const value = {
		chosenTeamNumber,
		setChosenTeamNumber
	};

	return (
		<teamsContext.Provider value={value}>
			{children}
		</teamsContext.Provider>
	);
}