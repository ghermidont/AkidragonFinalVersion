import React, {useState, useContext} from "react";
const languageContext = React.createContext();

export function useLanguageContext(){
	return useContext(languageContext);
}

// eslint-disable-next-line react/prop-types
export function LanguageContextProvider({ children }) {
	const [appLanguage, setAppLanguage] = useState("en");

	const value = {
		appLanguage,
		setAppLanguage
	};

	return (
		<languageContext.Provider value={value}>
			{children}
		</languageContext.Provider>
	);
}