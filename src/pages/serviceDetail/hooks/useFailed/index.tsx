import { useContext } from "react";
import { FieldsProps } from "../../types"
import { FieldsContext } from "../../contexts/fields";
import { GlobalAlertContext } from "../../../../contexts/GlobalAlertContext";
import { ModalContext } from "../../contexts/modal";

type HandleErrorProps = (props: { field: "phone" | "name" | "description" | "plate" | "price" | "part"; position?: number; message: string; child?: number }) => void

export default function useFailed() {

    const { fields, handleSetAllFields } = useContext(FieldsContext)
    const { showAlert } = useContext(GlobalAlertContext)
    const { showModalParts } = useContext(ModalContext)

    const handleError: HandleErrorProps = ({ field, message, position, child }) => {
        const newFields = { ...fields }
        if (field === "part" || field === 'price' && child !== undefined) {
            if(position === undefined){
                return
            }
            const parts = fields.serviceDetail[position].partsList
            if(child !== undefined && parts){
                const fieldNew = {
                    ...parts[child][field],
                    ...setMessage({ message })
                }
                parts[child][field] = fieldNew
                newFields.serviceDetail[position].partsList = parts
                handleSetAllFields(newFields)
                showModalParts(position)
            }
            return
        }
        if (field === "name" || field === "phone" || field === "plate" || field === "description" && position == undefined) {

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
        showAlert({ text: message, type: "error" })
        return {
            error: true,
            helperText: message
        }
    }

    return {
        handleError
    }
}