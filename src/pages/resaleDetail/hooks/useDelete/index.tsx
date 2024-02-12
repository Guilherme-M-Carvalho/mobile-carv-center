import { useContext } from "react"
import { GlobalAlertContext } from "../../../../contexts/GlobalAlertContext"
import { api } from "../../../../services/api"
import { FieldsContext } from "../../contexts/fields"
import { useNavigation } from "@react-navigation/native"

export default function useDelete() {

    const { showAlert, hideLoading, showLoading } = useContext(GlobalAlertContext)
    const { listCost: fields } = useContext(FieldsContext)
    const navigation = useNavigation()

    const handleDelete = async () => {
        showLoading()
        try {
            const { data } = await api({ method: "delete", url: "/resale/"+fields?.id})
            if(data?.failed){
                showAlert({
                    text: data?.message,
                    type: "error"
                })
            } else {
                showAlert({
                    text: "Venda deletada com sucesso!",
                    type: "success"
                })
            }
            navigation.goBack()
        } catch (error) {

        }
        hideLoading()
    }

    return {
        handleDelete
    }
}