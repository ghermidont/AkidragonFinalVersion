import React, {useState, useContext} from "react";

const newsContext = React.createContext();

export function useNewsContext(){
    return useContext(newsContext);
}

/*########################## Articles Context Provider ##########################*/
export function NewsContextProvider({ children }) {
    console.log("ArticlesContextProvider() worked!");

    const [contextDocs, setContextDocs] = useState('');
    const [gridNewsId, setGridNewsId] = useState('');
    const [newsContent, setNewsContent] = useState(null);

    const value = {
        contextDocs,
        setContextDocs,
        gridNewsId,
        setGridNewsId,
        newsContent,
        setNewsContent
    }

    return (
        <newsContext.Provider value={value}>
            {children}
        </newsContext.Provider>
    );
}