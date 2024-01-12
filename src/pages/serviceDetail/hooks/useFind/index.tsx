import { useContext } from "react"
import { FieldsContext } from "../../contexts/fields"
import { GlobalAlertContext } from "../../../../contexts/GlobalAlertContext"
import { api } from "../../../../services/api"
import { FieldsProps, ImageProps, ServiceDetailProps } from "../../types"
import { InputProps } from "../../../../types"

export default function useFind() {
    const { handleSetAllFields } = useContext(FieldsContext)
    const { hideLoading, showLoading, showAlert } = useContext(GlobalAlertContext)
    
    const handleFind = async ({ id }: { id: number }) => {
        showLoading()
        try {
            const { data } = await api.get("/service/" + id)
            const input: InputProps = {
                error: false,
                helperText: "",
                value: ""
            }
            const fields: FieldsProps = {
                description: {
                    ...input,
                    value: data?.car?.description
                },
                plate: {
                    ...input,
                    value: data?.car?.plate
                },
                id: id,
                images: [],
                serviceDetail: data?.serviceDetail?.map((sev: any) => {
                    const servi: ServiceDetailProps ={
                        description: {
                            ...input,
                            value: sev?.description
                        },
                        price: {
                            ...input,
                            value: sev?.price
                        },
                        images: sev?.image?.map((img: any) => {
                            const image: ImageProps = {
                                uri: img?.name,
                                id: img?.id,
                                before: img?.before
                            }
                            return  {
                                ...image
                            }
                        }),
                        id: sev?.id
                    }
                    return {
                        ...servi
                    }
                })
            }


            handleSetAllFields(fields)
        } catch (error: any) {
            showAlert({
                text: error?.response?.data?.error
            })
        }
        hideLoading()
    }
    return {
        handleFind
    }
}