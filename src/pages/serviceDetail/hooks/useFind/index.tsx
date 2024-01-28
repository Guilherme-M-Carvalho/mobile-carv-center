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
                createdAt: new Date(data?.created_at),
                updatedAt: new Date(data?.updated_at),
                description: {
                    ...input,
                    value: data?.car?.description
                },
                plate: {
                    ...input,
                    value: data?.car?.plate
                },
                id: id,
                images: data?.car?.image?.map((img: any) => {
                    const image: ImageProps = {
                        uri: img?.name,
                        id: img?.id,
                    }
                    return  {
                        ...image
                    }
                }),
                name: {
                    ...input
                },
                phone: {
                    ...input
                },
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
                        customerParts: true,
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
                        parts: {
                            ...input
                        },
                        obs: {
                            ...input
                        },
                        typeService: 0,
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
                text: error?.response?.data?.error, type: "error"
            })
        }
        hideLoading()
    }
    return {
        handleFind
    }
}