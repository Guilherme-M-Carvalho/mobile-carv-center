import { useContext } from "react"
import { GlobalAlertContext } from "../../../../contexts/GlobalAlertContext"
import { api } from "../../../../services/api"
import useData from "../useData"
import { FieldsContext } from "../../contexts/fields"
import useFailed from "../useFailed"
import { useNavigation } from "@react-navigation/native"

export default function useSave() {

    const { showAlert, hideLoading, showLoading } = useContext(GlobalAlertContext)
    const { fields } = useContext(FieldsContext)
    const { handleData } = useData(fields)
    const { handleFailed } = useFailed()
    const navigation = useNavigation()

    const handleSave = async () => {
        showLoading()
        const dataReq = handleData()
        try {
            const { data } = await api({ method: dataReq.id ? "put" : "post", url: "/cost", data: dataReq })
            if(data?.failed){
                handleFailed({
                    field: data?.field,
                    message: data?.message,
                })
            } else {
                showAlert({
                    text:  dataReq.id ? "Custo editado com sucesso!" :  "Custo cadastrado com sucesso!",
                    type: "success"
                })
                navigation.goBack()
            }
        } catch (error) {

        }
        hideLoading()
    }

    return {
        handleSave
    }
}