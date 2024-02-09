import { ReactNode, createContext } from "react";
import useFindProducts from "../../hooks/useFindProducts";
import { CostListProps, HandleToggleSelectProps } from "../../types";

export const FieldsContext = createContext({} as {
    handleFind: () => Promise<void>;
    handleCleanSelect: () => void;
    listCost: {
        id?: Number | undefined;
        products: CostListProps;
    }
    handleToggleSelect: HandleToggleSelectProps
    handleMinusSelect: HandleToggleSelectProps
    handleAddSelect: ({ index }: {
        index: number;
    }) => void;
    handleFindFirst: (id: number) => Promise<void>
})

export default function FieldsProvider({children}: {children: ReactNode}){

    const listProps = useFindProducts()

    return(<FieldsContext.Provider value={{...listProps}}>
        {children}
    </FieldsContext.Provider>)
}