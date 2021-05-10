import React, {useState, useContext} from "react";

const navBarContext = React.createContext({});

export function useNavBarContext(){
    return useContext(navBarContext);
}

/*########################## NavBar Context Provider ##########################*/
export function NavBarContextProvider({ children }) {
    console.log("NavBarContextProvider() worked!");

    const [showSearch, setShowSearch] = useState(false);

    const value = {
        showSearch,
        setShowSearch
    }

    return (
        <navBarContext.Provider value={value}>
            {children}
        </navBarContext.Provider>
    );
}
