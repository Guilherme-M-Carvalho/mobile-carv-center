import { useContext } from "react"
import { GlobalAlertContext } from "../../../../contexts/GlobalAlertContext"
import { api } from "../../../../services/api"
import useData from "../useData"
import { FieldsContext } from "../../contexts/fields"
import { useNavigation } from "@react-navigation/native"
import useFailed from "../useFailed"

export default function useSave() {
    const { fields } = useContext(FieldsContext)
    const { hideLoading, showLoading, showAlert } = useContext(GlobalAlertContext)
    const { handleData } = useData(fields)
    const navigation = useNavigation()
    const { handleError } = useFailed()

    const handleSave = async () => {
        showLoading()
        const dados = await handleData()

        try {
            const { data } = await api({
                url: "/service" + (fields.id ? `/${fields.id}`: "") , data: dados, method: fields.id ? "put" : "post", headers: {
                    Accept: 'application/json',
                    'Content-Type': 'multipart/form-data',
                }
            })
            if (data.failed) {
                handleError({
                    field: data?.field,
                    message: data?.message,
                    position: data?.position
                })
            } else {
                showAlert({ text: fields.id ? "Serviço editado com sucesso!" : "Serviço cadastrado com sucesso!", type: "success" })
                navigation.goBack()
            }
        } catch (error: any) {
            console.log({
                error,
                message: error?.response?.status,
                message2: error?.response?.data?.error
            });

            showAlert({
                text: error?.response?.data?.error, type: "error"
            })
        }
        hideLoading()
    }

    return {
        handleSave
    }
}