import { useContext, useState } from "react"
import { FieldsContext } from "../../contexts/fields";

export default function useModalProduct() {

    const [modalProduct, setModalProduct] = useState<{ visible: boolean; }>({ visible: false  })
    const { handleResetFieldsByCreate } = useContext(FieldsContext)

    const handleVisibleProduct = () => {
        handleResetFieldsByCreate()
        setModalProduct(obj =>{
            return { visible: true}
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
    }
}