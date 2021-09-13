import React, {useState, useContext} from "react";
const navBarContext = React.createContext({});

export function useNavBarContext(){
	return useContext(navBarContext);
}

/*########################## NavBar Context Provider ##########################*/
// eslint-disable-next-line react/prop-types
export function NavBarContextProvider({ children }) {
	const [showSearch, setShowSearch] = useState(false);

	const value = {
		showSearch,
		setShowSearch
	};

	return (
		<navBarContext.Provider value={value}>
			{children}
		</navBarContext.Provider>
	);
}
