import { useState } from "react"
import { FieldsProps, HandleDeleteServiceProps, HandleFindByPlateProps, HandleSetAllProps, HandlleAddPartsProps, HandlleDeletePartsProps, OnChangeFieldsProps, OnChangeFieldsServiceDetailProps, OnChangePartsListProps, OnChangeTypeServiceProps, OnDeleteImgProps, OnDeleteServiceImgProps, PickImageServiceProps } from "../../types"
import * as ImagePicker from 'expo-image-picker';

export default function useFields() {

    const [fields, setFields] = useState<FieldsProps>({
        description: {
            error: false,
            helperText: "",
            value: ""
        },
        plate: {
            error: false,
            helperText: "",
            value: ""
        },
        serviceDetail: [{
            description: {
                error: false,
                helperText: "",
                value: ""
            },
            price: {
                error: false,
                helperText: "",
                value: ""
            },
            parts: {
                error: false,
                helperText: "",
                value: ""
            },
            obs: {
                error: false,
                helperText: "",
                value: ""
            },
            images: [],
            typeService: 0,
            customerParts: true
        }],
        images: [],
        name: {
            error: false,
            helperText: "",
            value: ""
        },
        phone: {
            error: false,
            helperText: "",
            value: ""
        }
    })

    const onChangeField: OnChangeFieldsProps = ({ field, value }) => {
        setFields(obj => {
            obj[field].value = value
            obj[field].error = false
            return {
                ...obj
            }
        })
    }
    const onChangeFieldServiceDetail: OnChangeFieldsServiceDetailProps = ({ field, value, index }) => {
        setFields(obj => {
            obj.serviceDetail[index][field].value = value
            obj.serviceDetail[index][field].error = false
            return {
                ...obj
            }
        })
    }


    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            const img = {
                uri: result.assets[0].uri
            }
            setFields(obj => {
                obj.images = [...obj.images, img]
                return {
                    ...obj
                }
            })
        }
    };

    const valueTypeService = (value: number) => {
        let valueText = "N/A"
        switch (value) {
            case 1:
                valueText = "Troca de óleo"
                return valueText
            case 2:
                valueText = "Alinhamento"
                return valueText
            case 3:
                valueText = "Balanceamento"
                return valueText
            case 4:
                valueText = "Cambagem"
                return valueText

            default:
                valueText = "N/A"
                return valueText
        }
    }

    const pickImageService: PickImageServiceProps = async ({ index, before }) => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });


        if (!result.canceled) {
            const img = {
                uri: result.assets[0].uri,
                before
            }
            setFields(obj => {
                obj.serviceDetail[index].images = [...obj.serviceDetail[index].images, img]
                return {
                    ...obj
                }
            })
        }
    }

    const onDeleteImg: OnDeleteImgProps = ({ i }) => {
        setFields(obj => {
            if (obj.images[i].id) {
                obj.images[i].deleted = true
            } else {
                obj.images.splice(i, 1)
            }
            return {
                ...obj
            }
        })
    }
    const onDeleteServiceImg: OnDeleteServiceImgProps = ({ index, i }) => {
        setFields(obj => {
            if (obj.serviceDetail[index].images[i].id) {
                obj.serviceDetail[index].images[i].deleted = true
            } else {
                obj.serviceDetail[index].images.splice(i, 1)
            }
            return {
                ...obj
            }
        })
    }

    const handleAddService = () => {
        setFields(obj => {
            obj.serviceDetail.push({
                description: {
                    error: false,
                    helperText: "",
                    value: ""
                },
                images: [],
                price: {
                    error: false,
                    helperText: "",
                    value: ""
                },
                parts: {
                    error: false,
                    helperText: "",
                    value: ""
                },
                obs: {
                    error: false,
                    helperText: "",
                    value: ""
                },
                typeService: 0,
                customerParts: true
            })
            return {
                ...obj
            }
        })
    }

    const handleDeleteService: HandleDeleteServiceProps = ({ index }) => {
        setFields(obj => {
            if (obj.serviceDetail[index].id) {
                obj.serviceDetail[index].deleted = true
            } else {
                obj.serviceDetail.splice(index, 1)
            }
            return {
                ...obj
            }
        })
    }

    const handleFindByPlate: HandleFindByPlateProps = ({ description, images, name, phone, idClient }) => {
        setFields(obj => {
            obj.description.value = description
            obj.images = images
            obj.idClient = idClient
            obj.name.value = name
            obj.phone.value = phone
            return {
                ...obj
            }
        })
    }

    const handleSetAllFields: HandleSetAllProps = (fields) => {
        setFields({ ...fields })
    }

    const handleTypeService: OnChangeTypeServiceProps = ({ index, value }) => {
        setFields(obj => {

            obj.serviceDetail[index].typeService = value

            return {
                ...obj
            }
        })
    }

    const toggleCustomerParts = (index: number) => {
        setFields(obj => {
            obj.serviceDetail[index].customerParts = !obj.serviceDetail[index].customerParts
            return {
                ...obj
            }
        })
    }

    const toggleDelete = (index: number) => {
        setFields(obj => {
            obj.serviceDetail[index].pressDelete = !obj.serviceDetail[index].pressDelete
            return {
                ...obj
            }
        })
    }

    const changePartsList: OnChangePartsListProps = ({ field, index, value, i }) => {
        setFields(obj => {
            const partsList = obj.serviceDetail[index]?.partsList
            if (partsList !== undefined) {
                partsList[i][field].error = false
                partsList[i][field].value = value
            }
            obj.serviceDetail[index].partsList = partsList
            return {
                ...obj
            }
        })
    }

    const handleAddParts: HandlleAddPartsProps = ({ price, parts: partsValue, index }) => {
        setFields(obj => {
            let parts = obj.serviceDetail[index].partsList
            if (parts) {
                parts.push({
                    part: {
                        error: false,
                        helperText: "",
                        value: partsValue
                    },
                    price: {
                        error: false,
                        helperText: "",
                        value: price
                    }
                })
            } else {
                parts = [{
                    part: {
                        error: false,
                        helperText: "",
                        value: partsValue
                    },
                    price: {
                        error: false,
                        helperText: "",
                        value: price
                    }
                }]
            }
            obj.serviceDetail[index].partsList = parts
            return {
                ...obj
            }
        })
    }

    const deletePartsList: HandlleDeletePartsProps = ({ index, i }) => {
        setFields(obj => {
            const parts = obj.serviceDetail[index].partsList
            if (parts) {
                if (parts[i].id) {
                    parts[i].deleted = true
                } else {
                    parts.splice(i, 1)
                }
            }
            obj.serviceDetail[index].partsList = parts
            return {
                ...obj
            }
        })
    }

    let partPrice = 0
    const serviceFilter = fields.serviceDetail.filter(el => !el.deleted)
    const serviceDetail = serviceFilter.filter(el => el?.partsList?.length)
    serviceDetail.forEach(el => {
        if (el.partsList && !el.customerParts) {
            const parts = el?.partsList?.filter(el => !el.deleted)
            partPrice += parts?.reduce((accumulator, currentValue) => Number(accumulator) + Number(currentValue.price.value), 0);
        }
    })


    const total = serviceFilter.reduce((accumulator, currentValue) => Number(accumulator) + Number(currentValue.price.value), 0) + partPrice;

    return {
        deletePartsList,
        changePartsList,
        handleSetAllFields,
        handleFindByPlate,
        handleAddService,
        onDeleteServiceImg,
        pickImageService,
        onDeleteImg,
        onChangeField,
        onChangeFieldServiceDetail,
        pickImage,
        handleDeleteService,
        handleTypeService,
        valueTypeService,
        toggleCustomerParts,
        toggleDelete,
        handleAddParts,
        fields,
        total
    }
}