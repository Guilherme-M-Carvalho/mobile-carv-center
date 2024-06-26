import { useContext, useState } from "react"
import { api } from "../../../../services/api"
import { GlobalAlertContext } from "../../../../contexts/GlobalAlertContext"

export type CostProps = Cost[]

export interface Cost {
  id: number
  name: string
  description: string
  created_at: string
  updated_at: string
  totalResale: number
  totalSold: number
  price: string
  priceResale: PriceResale[]
  amountStock: number
}

export interface PriceResale {
  amount: number
  price: number
}


export default function useFind() {

    const [data, setData] = useState<CostProps[]>([])

    const { showLoading, hideLoading } = useContext(GlobalAlertContext)

    const handleFind = async () => {
        showLoading()
        try {
            const { data } = await api.get("/cost")
            const res = data?.map((el: any) =>{

                return {
                    ...el,
                    created_at: new Intl.DateTimeFormat('pt-BR', {
                        dateStyle: 'short',
                        timeStyle: 'medium',
                    }).format(new Date(el?.created_at)),
                    updated_at: new Intl.DateTimeFormat('pt-BR', {
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
        data,
        handleFind
    }
}