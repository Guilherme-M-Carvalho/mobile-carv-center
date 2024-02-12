import { useContext } from "react"
import { FieldsContext } from "../../contexts/fields"
import { GlobalAlertContext } from "../../../../contexts/GlobalAlertContext"
import useData from "../useData"
import { api } from "../../../../services/api"

export default function useSave(){

    const { listCost } = useContext(FieldsContext)
    const { hideLoading, showAlert, showLoading } = useContext(GlobalAlertContext)
    const { handleData } = useData(listCost)

    const handleSave = async () => {
        showLoading()
        const data = handleData()
        const messagePost = "Venda criada com sucesso!"
        const messagePut = "Venda editada com sucesso!"
        try {
            const {data: dateRes} = await api({method: listCost.id ? "put" : "post", data, url: "/resale"})
            if(dateRes?.failed){
                console.log({
                    dateRes
                });
                
               return 
            }
            showAlert({text: listCost?.id ? messagePut : messagePost, type: "success"})
        } catch (error) {
            
        }
        hideLoading()
    }

    return {
        handleSave
    }
}