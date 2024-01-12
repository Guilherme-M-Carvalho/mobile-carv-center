import { useContext, useState } from "react"
import { api } from "../../../../services/api"
import { GlobalAlertContext } from "../../../../contexts/GlobalAlertContext"

export default function useFind() {

    const [data, setData] = useState<any[]>([])

    const { showLoading, hideLoading } = useContext(GlobalAlertContext)

    const handleFind = async () => {
        showLoading()
        try {
            const { data } = await api.get("/service")
            setData(data)
        } catch (error) {
            console.log({
                error
            });

        }
        hideLoading()
    }

    return {
        data,
        handleFind
    }
}