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
// 
        console.log(dados);
        
        

        try {
            const { data } =  await api({url: "/service", data:dados, method: "post", headers: {
                Accept: 'application/json',
                'Content-Type': 'multipart/form-data',
            } })
            showAlert({text: "Serviço cadastrado com sucesso!"})
            navigation.goBack()
        } catch (error: any) {
            console.log({
                error,
                message: error?.response?.status,
                message2: error?.response?.data?.error
            });
            
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