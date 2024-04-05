import { useState } from "react"

export default function useModalProduct() {

    const [modalProduct, setModalProduct] = useState<{ visible: boolean; index: number }>({ visible: false, index: -1 })

    const handleVisibleProduct = ({index}: {index: number}) => {
        setModalProduct(obj =>{
            return { index, visible: true}
        })
    }

    const handleHideProduct = () => {
        setModalProduct(obj =>{
            return {...obj, visible: false}
        })
    }

    return {
        handleHideProduct,
        handleVisibleProduct,
        modalProduct: modalProduct.visible,
        modalProductIndex: modalProduct.index
    }
}