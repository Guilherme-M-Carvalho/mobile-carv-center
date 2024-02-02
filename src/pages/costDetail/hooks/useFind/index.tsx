import { useContext } from "react"
import { GlobalAlertContext } from "../../../../contexts/GlobalAlertContext"
import { api } from "../../../../services/api"
import { FieldsContext } from "../../contexts/fields"
import { FieldsProps } from "../../types"

export default function useFind(){

    const { showLoading, hideLoading } = useContext(GlobalAlertContext)
    const { handleSetAllFields } = useContext(FieldsContext)

    const handleFind = async ({id}: {id: number}) => {
        showLoading()
        try {
            const { data } = await api({method: "get", url: `/cost/${id}`})
            const fields: FieldsProps = {
                amount: {
                    error: false,
                    helperText: "",
                    value: data?.amount
                },
                description: {
                    error: false,
                    helperText: "",
                    value: data?.description
                },
                name: {
                    error: false,
                    helperText: "",
                    value: data?.name
                },
                price: {
                    error: false,
                    helperText: "",
                    value: data?.price
                },
                id: id
            }

            handleSetAllFields({...fields})
            
        } catch (error) {
            
        }
        hideLoading()
    }

    return {
        handleFind
    }
}