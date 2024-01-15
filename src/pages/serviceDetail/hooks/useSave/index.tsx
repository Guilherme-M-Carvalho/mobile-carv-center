import { useContext } from "react"
import { GlobalAlertContext } from "../../../../contexts/GlobalAlertContext"
import { api } from "../../../../services/api"
import useData from "../useData"
import { FieldsContext } from "../../contexts/fields"
import { useNavigation } from "@react-navigation/native"

export default function useSave(){
    const { fields } = useContext(FieldsContext)
    const { hideLoading, showLoading, showAlert } = useContext(GlobalAlertContext)
    const { handleData } = useData(fields)
    const navigation = useNavigation()

    const handleSave = async () => {
        showLoading()
        const dados = await handleData()
        try {
            const { data } =  await api.post("/service", dados)
            showAlert({text: "Serviço cadastrado com sucesso!"})
            navigation.goBack()
        } catch (error: any) {
            showAlert({
                text: error?.response?.data?.error
            })
        }
        hideLoading()
    }

    return {
        handleSave
    }
}