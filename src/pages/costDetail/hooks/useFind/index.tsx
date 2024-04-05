import { useContext } from "react"
import { GlobalAlertContext } from "../../../../contexts/GlobalAlertContext"
import { api } from "../../../../services/api"
import { FieldsContext } from "../../contexts/fields"
import { CostHitory, FieldsProps } from "../../types"

export default function useFind() {

    const { showLoading, hideLoading } = useContext(GlobalAlertContext)
    const { handleSetAllFields } = useContext(FieldsContext)

    const handleFind = async ({ id }: { id: number }) => {
        showLoading()
        try {
            const { data } = await api({ method: "get", url: `/cost/${id}` })
            const fields: FieldsProps = {
                amount: {
                    error: false,
                    helperText: "",
                    value: ""
                },
                description: {
                    error: false,
                    helperText: "",
                    value: String(data?.description)
                },
                name: {
                    error: false,
                    helperText: "",
                    value: String(data?.name)
                },
                price: {
                    error: false,
                    helperText: "",
                    value: ''
                },
                priceResale: {
                    error: false,
                    helperText: "",
                    value: ""
                },
                changeAllProducts: true,
                lastPriceResale: Number(data?.priceResale),
                costHitory: data?.costHitory?.map((item: any) => {
                    const history: CostHitory = {
                        id: item?.id,
                        price: item?.price,
                        priceResale: item?.priceResale,
                        amount: item?.amount,
                        updatePrice: item?.updatePrice,
                        created_at: item?.created_at,
                        updated_at: item?.updated_at,
                        amountSold: item?.amountSold,
                        totalSold: item?.totalSold,
                        amountStock: item?.amountStock,
                        amountDelete: item?.amountDelete,
                    }
                    return {
                        ...history
                    }
                }),
                totalResale: data?.totalSold,
                totalSold: data?.amountSold,
                id: id
            }

            handleSetAllFields({ ...fields })

        } catch (error) {

        }
        hideLoading()
    }

    return {
        handleFind
    }
}