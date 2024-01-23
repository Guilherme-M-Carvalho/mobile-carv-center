import { useContext } from "react";
import { FieldsProps } from "../../types"
import { FieldsContext } from "../../contexts/fields";
import { GlobalAlertContext } from "../../../../contexts/GlobalAlertContext";

type HandleErrorProps = (props: { field: "description" | "plate" | "price"; position?: number; message: string }) => void

export default function useFailed() {

    const { fields, handleSetAllFields } = useContext(FieldsContext)
    const { showAlert } = useContext(GlobalAlertContext)

    const handleError: HandleErrorProps = ({ field, message, position }) => {
        const newFields = { ...fields }
        if (field === "plate" || field === "description" && position == undefined) {

            const fieldNew = {
                ...fields[field],
                ...setMessage({ message })
            }
            newFields[field] = fieldNew
            handleSetAllFields(newFields)
            return
        }

        if (position != undefined) {
            const fieldNew = {
                ...fields["serviceDetail"][position][field],
                ...setMessage({ message })
            }
            fields["serviceDetail"][position][field] = fieldNew
        }
        handleSetAllFields(newFields)
    }

    const setMessage = ({ message }: { message: string }) => {
        showAlert({text: message, type: "error"})
        return {
            error: true,
            helperText: message
        }
    }

    return {
        handleError
    }
}