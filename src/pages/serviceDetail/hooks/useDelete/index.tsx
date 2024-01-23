import { useContext } from "react"
import { GlobalAlertContext } from "../../../../contexts/GlobalAlertContext"
import { api } from "../../../../services/api"
import { FieldsContext } from "../../contexts/fields"
import { useNavigation } from "@react-navigation/native"

export default function useDelete() {
    const { fields } = useContext(FieldsContext)
    const { hideLoading, showLoading, showAlert } = useContext(GlobalAlertContext)
    const navigation = useNavigation()

    const handleDelete = async () => {
        showLoading()

        try {
            const { data } = await api({ url: "/service/" + fields.id, method: "delete" })
            showAlert({ text: "Serviço deletado com sucesso!", type: "success" })
            navigation.goBack()
        } catch (error: any) {
            console.log({
                error,
                message: error?.response?.status,
                message2: error?.response?.data?.error
            });

            showAlert({
                text: error?.response?.data?.error
                , type: "error"
            })
        }
        hideLoading()
    }

    return {
        handleDelete
    }
}