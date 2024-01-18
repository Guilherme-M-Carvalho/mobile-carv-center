import { useState } from "react"
import { FieldsProps, HandleDeleteServiceProps, HandleFindByPlateProps, HandleSetAllProps, OnChangeFieldsProps, OnChangeFieldsServiceDetailProps, OnDeleteImgProps, OnDeleteServiceImgProps, PickImageServiceProps } from "../../types"
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
            images: []
        }],
        images: []
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
            obj.images.splice(i, 1)
            return {
                ...obj
            }
        })
    }
    const onDeleteServiceImg: OnDeleteServiceImgProps = ({ index, i }) => {
        setFields(obj => {
            obj.serviceDetail[index].images.splice(i, 1)
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
                }
            })
            return {
                ...obj
            }
        })
    }

    const handleDeleteService: HandleDeleteServiceProps = ({ index }) => {
        setFields(obj => {
            obj.serviceDetail.splice(index, 1)
            return {
                ...obj
            }
        })
    }
    // console.log({fields});
    

    const handleFindByPlate: HandleFindByPlateProps = ({ description, images }) => {
        console.log({images});
        
        setFields(obj => {
            obj.description.value = description
            obj.images = images
            return {
                ...obj
            }
        })
    }

    const handleSetAllFields: HandleSetAllProps = (fields) => {
        setFields({ ...fields })
    }

    const total = fields.serviceDetail.reduce((accumulator, currentValue) => Number(accumulator) + Number(currentValue.price.value), 0);

    return {
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
        fields,
        total
    }
}