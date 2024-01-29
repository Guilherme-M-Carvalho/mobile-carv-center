import { useContext } from "react"
import { FieldsContext } from "../../contexts/fields"
import { api } from "../../../../services/api"
import { GlobalAlertContext } from "../../../../contexts/GlobalAlertContext"

export default function useFindCarByPlate(){
    const { fields, handleFindByPlate } = useContext(FieldsContext)
    const { hideLoading, showLoading, showAlert } = useContext(GlobalAlertContext)

    const handleFind = async () => {
        showLoading()
        try {
            const { data } =  await api.get("/car/"+fields.plate.value)
            if(!data?.failed){
                handleFindByPlate({
                    description: data?.description,
                    images: data?.image?.map((el: any) => {
                        return {
                            id: el?.id,
                            uri: el?.name
                        }
                    }),
                    name: data?.client?.name,
                    phone: data?.client?.phone,
                    idClient: data?.client?.id,
                })
            } else {
                handleFindByPlate({
                    description: fields.description.value,
                    images: [],
                    name: fields.name.value,
                    phone: fields.phone.value,
                    idClient: undefined,
                })
            }
            
        } catch (error: any) {
            showAlert({
                text: error?.response?.data?.error, type: "error"
            })
        }
        hideLoading()
    }

    return {
        handleFind
    }
}