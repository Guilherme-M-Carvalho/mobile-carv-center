import { ReactNode, createContext } from "react";
import useFields from "../../hooks/useFields";
import { FieldsContextProps } from "../../types";

export const FieldsContext = createContext({} as FieldsContextProps)

export default function FieldsProvider({children}: {children: ReactNode}){

    const fields = useFields()

    return (<FieldsContext.Provider value={{...fields}}>
        {children}
    </FieldsContext.Provider>)
}