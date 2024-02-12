import { useContext, useState } from "react"
import { api } from "../../../../services/api"
import { GlobalAlertContext } from "../../../../contexts/GlobalAlertContext"

export default function useFindResale() {

    const [dataResale, setData] = useState<any[]>([])

    const { showLoading, hideLoading } = useContext(GlobalAlertContext)

    const handleFindResale = async () => {
        showLoading()
        try {
            const { data } = await api.get("/resale")
            const res = data?.map((el: any) =>{

                return {
                    ...el,
                    createdAt: new Intl.DateTimeFormat('pt-BR', {
                        dateStyle: 'short',
                        timeStyle: 'medium',
                    }).format(new Date(el?.created_at)),
                    updatedAt: new Intl.DateTimeFormat('pt-BR', {
                        dateStyle: 'short',
                        timeStyle: 'medium',
                    }).format(new Date(el?.updated_at)),
                }
            })
            setData(res)
        } catch (error) {
            console.log({
                error
            });

        }
        hideLoading()
    }

    return {
        dataResale,
        handleFindResale
    }
}