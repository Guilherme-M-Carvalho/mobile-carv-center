import { useContext } from "react"
import { GlobalAlertContext } from "../../../../contexts/GlobalAlertContext"
import { api } from "../../../../services/api"
import useData from "../useData"
import { FieldsContext } from "../../contexts/fields"
import useFailed from "../useFailed"
import { useNavigation } from "@react-navigation/native"
import { ModalContext } from "../../contexts/modals"
import useFind from "../useFind"

export default function useCreateProducts() {

    const { showAlert, hideLoading, showLoading } = useContext(GlobalAlertContext)
    const { fields } = useContext(FieldsContext)
    const { handleHideProduct } = useContext(ModalContext)
    const { handleDataCreateProduct } = useData(fields)
    const { handleFailed } = useFailed()
    const { handleFind } = useFind()

    const handleSave = async () => {
        showLoading()
        const dataReq = handleDataCreateProduct()
        try {
            const { data } = await api({ method: "post", url: "/cost/product", data: dataReq })
            if(data?.failed){
                handleFailed({
                    field: data?.field,
                    message: data?.message,
                })
            } else {
                await handleFind({id: Number(fields.id)})
                handleHideProduct()
                showAlert({
                    text:  "Produtos criado com sucesso!",
                    type: "success"
                })
            }
        } catch (error) {

        }
        hideLoading()
    }

    return {
        handleSave
    }
}