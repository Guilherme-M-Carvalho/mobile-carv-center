import { ReactNode, createContext } from "react";
import ModalProduct from "../../templates/modalProduct";
import useModal from "../../hooks/useModal";

export const ModalContext = createContext({} as {
    handleVisible: () => void;
    handleHide: () => void;
    modal: boolean;
})

export default function ModalProvider({children}: {children: ReactNode}){

    const modal = useModal()

    return(<ModalContext.Provider value={{...modal}}>
        {children}
        <ModalProduct hideModal={modal.handleHide} visible={modal.modal} />
    </ModalContext.Provider>)
}