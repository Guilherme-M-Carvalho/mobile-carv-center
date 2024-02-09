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
        totalResale: 0
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
        setFields({...fields})
    }

    return {
        handleSetAllFields,
        onChangeFields,
        fields
    }
}