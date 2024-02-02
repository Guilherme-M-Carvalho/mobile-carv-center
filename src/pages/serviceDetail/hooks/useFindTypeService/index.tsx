import { useContext } from "react"
import { GlobalAlertContext } from "../../../../contexts/GlobalAlertContext"
import { api } from "../../../../services/api"
import { TypeServiceProps } from "../../types"

export default function useFindTypeService() {
    const { hideLoading, showLoading, showAlert } = useContext(GlobalAlertContext)

    const handleFindTypeService = async (): Promise<TypeServiceProps[]> => {
        showLoading()
        try {
            const { data } = await api.get("/typeService")
            const typeService: TypeServiceProps [] = data?.map((el: any) => {
                return {
                    id: el?.id,
                    description: el?.description
                }
            })
            hideLoading()
            return typeService
        } catch (error: any) {
            showAlert({
                text: error?.response?.data?.error, type: "error"
            })
        }
        hideLoading()
        return []
    }
    return {
        handleFindTypeService
    }
}