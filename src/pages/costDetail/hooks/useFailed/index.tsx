import { useContext } from "react"
import { GlobalAlertContext } from "../../../../contexts/GlobalAlertContext"
import { FieldsProps } from "../../types"
import { FieldsContext } from "../../contexts/fields"

export default function useFailed() {

    const { showAlert } = useContext(GlobalAlertContext)

    const { fields, handleSetAllFields } = useContext(FieldsContext)

    const handleFailed = ({ field, message }: { field: (keyof Omit<FieldsProps, "id">); message: string; }) => {
        const fieldsNew = {...fields}

        const fieldNew = {
            ...fields[field],
            ...handleMessage({message})
        }

        fieldsNew[field] = fieldNew

        handleSetAllFields({...fieldsNew})
    }

    const handleMessage = ({ message }: { message: string }) => {
        showAlert({ text: message, type: "error" })
        return {
            error: true,
            helperText: message
        }
    }

    return {
        handleFailed
    }
}