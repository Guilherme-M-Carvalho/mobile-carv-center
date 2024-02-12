import { Children, ReactNode, createContext } from "react"
import usePage from "../hooks/usePage"
import useFind from "../hooks/useFind";
import useFindResale from "../hooks/useFindResale";

export const PageContext = createContext({} as {
    searchQuery: string;
    setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
    dataResale: any[];
    handleFindResale: () => Promise<void>;
    data: any[];
    handleFind: () => Promise<void>;
})

export default function PageProvider({children}: {children: ReactNode}){

    const page = usePage()
    const find = useFind()
    const findResale = useFindResale()

    return(<PageContext.Provider value={{...page, ...findResale, ...find}}>
        {children}
    </PageContext.Provider>)
}