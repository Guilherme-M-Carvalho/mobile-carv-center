import { useContext } from "react"
import { FieldsContext } from "../../contexts/fields"
import { GlobalAlertContext } from "../../../../contexts/GlobalAlertContext"
import { api } from "../../../../services/api"
import { FieldsProps, ImageProps, PartsProps, ServiceDetailProps } from "../../types"
import { InputProps } from "../../../../types"
import useFindTypeService from "../useFindTypeService"
import useFindProducts from "../useFindProducts"

export default function useFind() {
    const { handleSetAllFields, handleSetAllProducts } = useContext(FieldsContext)
    const { hideLoading, showLoading, showAlert } = useContext(GlobalAlertContext)
    const { handleFindTypeService } = useFindTypeService()
    const { handleFind: handleFindProducts } = useFindProducts()

    const handleFind = async ({ id }: { id: number }) => {
        const typeService = await handleFindTypeService()
        const products = await handleFindProducts()

        showLoading()
        try {
            const { data } = await api.get("/service/" + id)
            const input: InputProps = {
                error: false,
                helperText: "",
                value: ""
            }
            const fields: FieldsProps = {
                idClient: data?.car?.client?.id,
                createdAt: new Date(data?.created_at),
                updatedAt: new Date(data?.updated_at),
                description: {
                    ...input,
                    value: data?.car?.description
                },
                typeService: typeService,
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
                    return {
                        ...image
                    }
                }),
                name: {
                    ...input,
                    value: data?.car?.client?.name,
                },
                phone: {
                    ...input,
                    value: data?.car?.client?.phone,
                },
                serviceDetail: data?.serviceDetail?.map((sev: any) => {
                    const servi: ServiceDetailProps = {
                        date: new Date(sev?.created_at),
                        description: {
                            ...input,
                            value: sev?.description
                        },
                        price: {
                            ...input,
                            value: sev?.price
                        },
                        customerParts: sev?.customerParts,
                        images: sev?.image?.map((img: any) => {
                            const image: ImageProps = {
                                uri: img?.name,
                                id: img?.id,
                                before: img?.before
                            }
                            return {
                                ...image
                            }
                        }),
                        parts: {
                            ...input
                        },
                        obs: {
                            ...input,
                            value: sev?.obs
                        },
                        typeService: sev?.type_service_id ? sev?.type_service_id : 0,
                        id: sev?.id,
                        partsList: sev?.parts?.map((el: any) => {
                            const parts: PartsProps = {
                                id: el?.id,
                                part: {
                                    ...input,
                                    value: el?.description
                                },
                                price: {
                                    ...input,
                                    value: el?.price
                                },
                                priceResale: {
                                    ...input,
                                    value: el?.priceResale
                                },

                            }
                            return {
                                ...parts
                            }
                        }),
                        products:sev?.costProduct?.map((el: any) => {
                            return {
                                id: el?.id,
                                amount: el?.amount,
                                amountSave: el?.amount
                            }
                        })
                    }
                    return {
                        ...servi
                    }
                })
            }

            handleSetAllFields(fields)
            handleSetAllProducts({products})
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