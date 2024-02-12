import { useContext, useState } from "react"
import { GlobalAlertContext } from "../../../../contexts/GlobalAlertContext"
import { api } from "../../../../services/api"
import { CostListProps, HandleToggleSelectProps } from "../../types"
import useData from "../useData"

export default function useFindProducts() {

    const [listCost, setListCost] = useState<{id?: Number; products: CostListProps}>({
        products: []
    })
    const { showLoading, hideLoading, showAlert } = useContext(GlobalAlertContext)
    const { handleData } = useData(listCost)

    const handleFind = async () => {
        showLoading()
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
            setListCost(obj => {
                obj.products = res
                return {...obj}
            })
        } catch (error) {

        }
        hideLoading()
    }

    const handleFindFirst = async (id: number) => {
        showLoading()
        try {
            const { data } = await api({ method: "get", url: `/cost` })
            const { data: dataResale } = await api({ method: "get", url: `/resale/${id}` })
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
            setListCost(obj => {
                obj.id = id
                obj.products = res?.map((el: any) => {
                    const select = dataResale?.products?.find((item: any) => item?.id == el?.id)
                    return {
                        ...el,
                        select: !!select,
                        amountSelect: select?.amount ? select?.amount : 0,
                        save: select?.amount ? select?.amount : 0
                    }
                })
                return {
                    ...obj
                }
            })
        } catch (error) {

        }
        hideLoading()
    }

    const handleToggleSelect: HandleToggleSelectProps = ({ index }) => {
        setListCost(arr => {
            arr.products[index].select = !arr.products[index].select
            if (arr.products[index].select) {
                arr.products[index].amountSelect = 1
            }
            return {...arr}
        })
    }

    const handleMinusSelect: HandleToggleSelectProps = ({ index }) => {
        setListCost(arr => {
            let value = arr.products[index].amountSelect
            if(value !== undefined){
                value--
            }
            arr.products[index].amountSelect = value
            if(!value){
                arr.products[index].select = false
            }
            return {...arr}
        })
    }

    const handleCleanSelect = () => {
        setListCost(arr => {
            arr.products = arr.products.map(el => {
                return {
                    ...el,
                    select: false,
                    amountSelect: 0
                }
            })
            return {...arr}
        })
    }

    const handleAddSelect = ({index}: {index: number}) => {
        setListCost(arr => {
            const maxAmount = arr.products[index].amountStock
            const save = arr.products[index].save
            let value = Number(arr.products[index].amountSelect)
            const valueCompar = Number(arr.products[index].amountSelect) - Number(arr.products[index].save)
            if(valueCompar < maxAmount ){
                value++
            }
            arr.products[index].amountSelect = value
            return {...arr}
        })
    }


    return {
        handleFindFirst,
        handleAddSelect,
        handleCleanSelect,
        handleMinusSelect,
        handleToggleSelect,
        handleFind,
        listCost
    }
}