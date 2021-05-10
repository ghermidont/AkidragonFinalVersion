import React, {useState, useContext} from "react";

const languageContext = React.createContext();

export function useLanguageContext(){
    return useContext(languageContext);
}

/*########################## Articles Context Provider ##########################*/
export function LanguageContextProvider({ children }) {
    console.log("LanguageContextProvider() worked!");
    const [appLanguage, setAppLanguage] = useState('en');

    const value = {
        appLanguage,
        setAppLanguage
    }

    return (
        <languageContext.Provider value={value}>
            {children}
        </languageContext.Provider>
    );
}