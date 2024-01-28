import { ReactNode, createContext } from "react";
import ModalServiceType from "../../templates/modalServiceType";
import useModal from "../../hooks/useModal";
import useModalParts from "../../hooks/useModalParts";
import ModalParts from "../../templates/modalParts";

export const ModalContext = createContext({} as {
    showModal: (index: number) => void;
    hideModal: () => void;
    visible: boolean;
    index: number;
    showModalParts: (index: number) => void;
    hideModalParts: () => void;
    visibleParts: boolean;
    indexParts: number;
})

export default function ModalProvider({children}:{children: ReactNode}){

    const modalParts = useModalParts()
    const modal = useModal()

    return (<ModalContext.Provider value={{ ...modal, ...modalParts }}>
        {children}
        <ModalServiceType index={modal.index} hideModal={modal.hideModal} visible={modal.visible} />
        <ModalParts index={modalParts.indexParts} hideModal={modalParts.hideModalParts} visible={modalParts.visibleParts} />
    </ModalContext.Provider>)
}