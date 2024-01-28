import { useContext, useState } from "react"
import { GlobalAlertContext } from "../../../../contexts/GlobalAlertContext"
import { api } from "../../../../services/api"

export default function useFind() {

    const { showLoading, hideLoading } = useContext(GlobalAlertContext)
    const [home, setHome] = useState<{count: number; total: number}>({count: 0, total: 0})

    const handleFind = async ({ date }: { date: Date }) => {
        showLoading()
        const dateString = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
        
        try {
            const { data } = await api({ method: "get", url: "/service/date/" + dateString })
            setHome({
                count: data?.count,
                total: data?.total,
            })
        } catch (error) {

        }
        hideLoading()
    }

    return {
        handleFind,
        home
    }
}