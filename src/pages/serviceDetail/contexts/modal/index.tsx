import { ReactNode, createContext } from "react";
import ModalServiceType from "../../templates/modalServiceType";
import useModal from "../../hooks/useModal";
import useModalParts from "../../hooks/useModalParts";
import ModalParts from "../../templates/modalParts";
import useModalProduct from "../../hooks/useModalProduct";
import ModalProduct from "../../templates/modalProduct";

export const ModalContext = createContext({} as {
    showModal: (index: number) => void;
    hideModal: () => void;
    visible: boolean;
    index: number;
    showModalParts: (index: number) => void;
    hideModalParts: () => void;
    visibleParts: boolean;
    indexParts: number;
    handleHideProduct: () => void;
    handleVisibleProduct: ({ index }: {
        index: number;
    }) => void;
    modalProduct: boolean;
    modalProductIndex: number;
})

export default function ModalProvider({children}:{children: ReactNode}){

    const modalParts = useModalParts()
    const modal = useModal()
    const modalProduct = useModalProduct()

    return (<ModalContext.Provider value={{ ...modal, ...modalParts, ...modalProduct }}>
        {children}
        <ModalServiceType index={modal.index} hideModal={modal.hideModal} visible={modal.visible} />
        <ModalProduct hideModal={modalProduct.handleHideProduct} visible={modalProduct.modalProduct} indexDetail={modalProduct.modalProductIndex} />
        <ModalParts index={modalParts.indexParts} hideModal={modalParts.hideModalParts} visible={modalParts.visibleParts} />
    </ModalContext.Provider>)
}