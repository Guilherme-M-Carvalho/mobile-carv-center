import { useState } from "react"
import { FieldsProps, HandleSetAllFieldsProps, OnChangeFieldsProps } from "../../types"

export default function useFields() {

    const [fields, setFields] = useState<FieldsProps>({
        amount: {
            error: false,
            helperText: "",
            value: ""
        },
        description: {
            error: false,
            helperText: "",
            value: ""
        },
        name: {
            error: false,
            helperText: "",
            value: ""
        },
        price: {
            error: false,
            helperText: "",
            value: ""
        },
        priceResale: {
            error: false,
            helperText: "",
            value: ""
        },
        totalResale: 0,
        costHitory: []
    })

    const onChangeFields: OnChangeFieldsProps = ({ field, value }) => {
        setFields(obj => {
            obj[field].value = value
            obj[field].error = false
            return {
                ...obj
            }
        })
    }

    const handleSetAllFields: HandleSetAllFieldsProps = (fields) => {
        setFields({ ...fields })
    }

    const handleToggleCheck = () => {
        setFields(obj => {
            obj.changeAllProducts = !obj.changeAllProducts
            return { ...obj }
        })
    }
   
    const handleToggleCheckHistory = ({ index }: {index: number}) => {
        setFields(obj => {
            obj.costHitory[index].changePrice = !obj.costHitory[index].changePrice
            return { ...obj }
        })
    }

    const handleResetFieldsByCreate = () => {
        setFields(obj => {
            obj.priceResale.value = ""
            obj.amount.value = ""
            obj.price.value = ""
            obj.changeAllProducts = true
            return {...obj}
        })
    }

    return {
        handleToggleCheckHistory,
        handleResetFieldsByCreate,
        handleSetAllFields,
        onChangeFields,
        handleToggleCheck,
        fields
    }
}