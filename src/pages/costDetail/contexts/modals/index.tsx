import { createContext, ReactNode } from "react";
import useModalProduct from "../../hooks/useModalProduct";
import ModalProduct from "../../templates/modalProduct";

export const ModalContext = createContext({} as {
    handleHideProduct: () => void;
    handleVisibleProduct: () => void;
    modalProduct: boolean;
})

export default function ModalProvider({children}: {children: ReactNode}){
    const modal = useModalProduct()
    return <ModalContext.Provider value={{...modal}}>
        {children}
    </ModalContext.Provider>
}