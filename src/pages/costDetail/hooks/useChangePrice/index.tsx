import { useContext } from "react"
import { GlobalAlertContext } from "../../../../contexts/GlobalAlertContext"
import { api } from "../../../../services/api"
import useData from "../useData"
import { FieldsContext } from "../../contexts/fields"
import useFailed from "../useFailed"
import useFind from "../useFind"

export default function useChangePrice() {

    const { showAlert, hideLoading, showLoading } = useContext(GlobalAlertContext)
    const { fields } = useContext(FieldsContext)
    const { handleDataCreateProduct } = useData(fields)
    const { handleFailed } = useFailed()
    const { handleFind } = useFind()

    const handleSavePrice = async ({ id }: { id: number }) => {
        showLoading()
        const dataReq: any = handleDataCreateProduct()
        dataReq.cost_history_id = id
        try {
            const { data } = await api({ method: "put", url: "/cost/price", data: dataReq })
            if (data?.failed) {
                handleFailed({
                    field: data?.field,
                    message: data?.message,
                })
            } else {
                await handleFind({ id: Number(fields.id) })
                showAlert({
                    text: "Preço alterado com sucesso!",
                    type: "success"
                })
            }
        } catch (error) {

        }
        hideLoading()
    }

    return {
        handleSavePrice
    }
}