import { Children, ReactNode, createContext } from "react"
import usePage from "../hooks/usePage"

export const PageContext = createContext({} as {
    searchQuery: string;
    setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
})

export default function PageProvider({children}: {children: ReactNode}){

    const page = usePage()

    return(<PageContext.Provider value={{...page}}>
        {children}
    </PageContext.Provider>)
}