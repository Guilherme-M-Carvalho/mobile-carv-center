import { useContext, useState } from "react"
import { GlobalAlertContext } from "../../../../contexts/GlobalAlertContext"
import { api } from "../../../../services/api"
import { CostListProps, HandleToggleSelectProps } from "../../types"
import useData from "../useData"
import { FieldsContext } from "../../contexts/fields"

export default function useFindProducts() {


    const { showLoading, hideLoading } = useContext(GlobalAlertContext)

    const handleFind = async (): Promise<CostListProps> => {
        showLoading()
        let products: CostListProps = []
        try {
            const { data } = await api({ method: "get", url: `/cost` })
            const res = data?.map((el: any) => {
                return {
                    ...el,
                    created_at: new Intl.DateTimeFormat('pt-BR', {
                        dateStyle: 'short',
                        timeStyle: 'medium',
                    }).format(new Date(el?.created_at)),
                    updated_at: new Intl.DateTimeFormat('pt-BR', {
                        dateStyle: 'short',
                        timeStyle: 'medium',
                    }).format(new Date(el?.updated_at))
                }
            })
            products = res
        } catch (error) {

        }
        hideLoading()
        return products
    }


    return {
        handleFind
    }


}