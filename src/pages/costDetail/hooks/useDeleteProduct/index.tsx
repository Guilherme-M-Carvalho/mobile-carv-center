import { useContext } from "react"
import { GlobalAlertContext } from "../../../../contexts/GlobalAlertContext"
import { api } from "../../../../services/api"
import { FieldsContext } from "../../contexts/fields"
import useFind from "../useFind"

export default function useDeleteProduct() {

    const { showAlert, hideLoading, showLoading } = useContext(GlobalAlertContext)
    const { fields } = useContext(FieldsContext)
    const { handleFind } = useFind()

    const handleDelete = async ({id}: {id: number}) => {
        showLoading()
        try {
            const { data } = await api({ method: "delete", url: "/cost/product/"+id})
            if(data?.failed){
                showAlert({
                    text: data?.message,
                    type: "error"
                })
            } else {
                showAlert({
                    text: "Produtos deletado com sucesso!",
                    type: "success"
                })
               await handleFind({id: Number(fields.id)})
            }
        } catch (error) {

        }
        hideLoading()
    }

    return {
        handleDelete
    }
}