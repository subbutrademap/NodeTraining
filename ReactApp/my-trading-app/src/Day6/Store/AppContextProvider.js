import { createContext, useContext, useReducer } from "react";
import Reducers from "./Reducers";

const AppContext = createContext();
const AppDispatch = createContext();


export function AppContextProvider({children}) {
    const [state , dispatch] = useReducer(Reducers,{session: null}) ;
    return (
        <>
        <AppContext.Provider value={state}>
            <AppDispatch.Provider value={dispatch}>
                {children}
            </AppDispatch.Provider>
        </AppContext.Provider> 
        </>
    )
}



export function useAppState() {
    return {
        session : useContext(AppContext).session || {},
        upddateStore : useContext(AppDispatch)
    }
}
