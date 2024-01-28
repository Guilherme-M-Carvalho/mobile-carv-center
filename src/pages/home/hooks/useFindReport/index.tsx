import { useContext, useState } from "react"
import { GlobalAlertContext } from "../../../../contexts/GlobalAlertContext"
import { api } from "../../../../services/api"

export default function useFindReport() {

    const { showLoading, hideLoading } = useContext(GlobalAlertContext)
    const [report, setReport] = useState<{qtd: number; y: number; x: string}[]>([])

    const handleFindReport = async ({ start, end }: { start: Date, end: Date }) => {
        showLoading()
        const dateString = `${start.getFullYear()}-${start.getMonth() + 1}-${start.getDate()}`
        const dateEndString = `${end.getFullYear()}-${
            end.getMonth() + 1}-${end.getDate()}`
        try {
            const { data } = await api({ method: "get", url: "/service/report", params: {
                start: dateString,
                end: dateEndString
            } })
            const res: {qtd: number; y: number; x: string}[] = Array.isArray(data) ? data : []
            // res.unshift({x: "", qtd:0, y: 0})
            setReport(data)
        } catch (error) {

        }
        hideLoading()
    }

    return {
        handleFindReport,
        report
    }
}