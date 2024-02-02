import { useContext, useState } from "react"
import { GlobalAlertContext } from "../../../../contexts/GlobalAlertContext"
import { api } from "../../../../services/api"
import { ReportProps } from "../../types"

export default function useFindReport() {

    const { showLoading, hideLoading } = useContext(GlobalAlertContext)
    const [report, setReport] = useState<ReportProps>({
        chart: [],
        totalCost: 0,
        totalLiquid: 0,
        totalPart: 0,
        totalProfit: 0
    })

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