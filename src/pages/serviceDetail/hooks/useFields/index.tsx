import { useContext, useState } from "react"
import { CostListProps, FieldsProps, HandleDeleteServiceProps, HandleFindByPlateProps, HandleSetAllProps, HandleToggleSelectProps, HandlleAddPartsProps, HandlleDeletePartsProps, OnChangeFieldsProps, OnChangeFieldsServiceDetailProps, OnChangePartsListProps, OnChangeTypeServiceProps, OnDeleteImgProps, OnDeleteServiceImgProps, PickImageServiceProps } from "../../types"
import * as ImagePicker from 'expo-image-picker';
import { GlobalAlertContext } from "../../../../contexts/GlobalAlertContext";

export default function useFields() {

    const { showAlert } = useContext(GlobalAlertContext)

    const [listCost, setListCost] = useState<{ id?: Number; products: CostListProps }>({
        products: []
    })
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
        },
        typeService: []
    })

    const handleSetAllProducts = ({ products }: {
        products: CostListProps
    }) => {
        setListCost(obj => {
            obj.products = products
            return { ...obj }
        })
    }


    const handleToggleSelect: HandleToggleSelectProps = ({ index, indexDetail }) => {
        let listCostOld = { ...listCost }
        let update = true
        setListCost(arr => {
            const value = arr.products[index].amountSelect !== undefined ? Number(arr.products[index].amountSelect) : 0
            const serviceDetail = fields.serviceDetail[indexDetail]?.products?.find(el => el.id === arr.products[index].id)
            if (arr.products[index].amountSelect == arr.products[index].amountStock && !serviceDetail?.amount && (serviceDetail?.amountSave == undefined || serviceDetail.amountSave == serviceDetail.amount)) {
                update = false
                return { ...arr }
            }
            if(!serviceDetail?.amountSave){

                if (!Number(serviceDetail?.amount)) {
                    arr.products[index].amountSelect = value + 1
                } else if (serviceDetail) {
                    arr.products[index].amountSelect = value - serviceDetail.amount
                }
            } else {
                if (Number(serviceDetail?.amount) < Number(serviceDetail?.amountSave)) {
                    arr.products[index].amountSelect = value + 1
                } else if (serviceDetail) {
                    arr.products[index].amountSelect = value - serviceDetail.amount
                }
            }
            listCostOld = { ...arr }
            return { ...arr }
        })
        setFields(obj => {
            if (!update) {
                return { ...obj }
            }
            const indexProduct = obj.serviceDetail[indexDetail]?.products?.findIndex(el => el.id == listCostOld.products[index].id)
            if (!obj.serviceDetail[indexDetail]?.products) {
                obj.serviceDetail[indexDetail].products = [{
                    id: listCostOld.products[index].id,
                    amount: 1
                }]
            }
            else if (indexProduct != undefined) {
                if (indexProduct < 0) {
                    const prod = obj.serviceDetail[indexDetail]?.products
                    if (prod !== undefined) {
                        prod.push({
                            amount: 1,
                            id: listCostOld.products[index].id,
                        })
                        obj.serviceDetail[indexDetail].products = prod
                    }
                } else {
                    const prod = obj.serviceDetail[indexDetail]?.products
                    if (prod !== undefined) {
                        prod[indexProduct].amount = 0
                        obj.serviceDetail[indexDetail].products = prod
                    }
                }
            }
            return { ...obj }
        })
        if(!update){
            showAlert({ type: "warning", text: "Limite de estoque atingido!" })
        }
    }


    const handleMinusSelect: HandleToggleSelectProps = ({ index, indexDetail }) => {
        setListCost(arr => {
            let value = arr.products[index].amountSelect
            if (value !== undefined) {
                value--
            }
            arr.products[index].amountSelect = value
            return { ...arr }
        })

        setFields(obj => {
            if (Array.isArray(obj.serviceDetail[indexDetail]?.products)) {
                const prod = obj.serviceDetail[indexDetail]?.products
                if (prod !== undefined) {
                    const indexFind = prod.findIndex(el => el.id == listCost.products[index].id)
                    prod[indexFind].amount--
                    obj.serviceDetail[indexDetail].products = prod
                }
            }
            return { ...obj }
        })
    }

    const handleCleanSelect = ({ indexDetail }: { indexDetail: number }) => {
        setListCost(arr => {
            const products = fields.serviceDetail[indexDetail]?.products
            if (products) {
                arr.products = arr.products.map(el => {
                    const amount = products.find(item => item.id == el.id)?.amount
                    if (amount) {
                        el.amountSelect = Number(el.amountSelect) - amount
                    }
                    return {
                        ...el,
                        amountSelect: el.amountSelect
                    }
                })
            }
            return { ...arr }
        })
        setFields(obj => {
            if (Array.isArray(obj.serviceDetail[indexDetail]?.products)) {
                const prod = obj.serviceDetail[indexDetail].products
                if(prod){

                    obj.serviceDetail[indexDetail].products = prod.map(el => {
                        return {
                            ...el,
                            amount: 0
                        }
                    })
                }
            }
            return { ...obj }
        })
    }

    const handleAddSelect = ({ index, indexDetail }: { index: number; indexDetail: number }) => {
        let listCostOld = { ...listCost }
        let updateAmount = false
        setListCost(arr => {
            const maxAmount = arr.products[index].amountStock
            const serviceDetail = fields.serviceDetail[indexDetail]?.products?.find(el => el.id === arr.products[index].id)

            const save = arr.products[index]?.save
            let value = Number(arr.products[index].amountSelect)
            const valueCompar = Number(arr.products[index].amountSelect) - Number(save ? save : 0)
            if (valueCompar < maxAmount) {
                value++
                updateAmount = true
            } else if(Number(serviceDetail?.amount) < Number(serviceDetail?.amountSave)) {
                value++
                updateAmount = true
            }
            arr.products[index].amountSelect = value
            listCostOld = { ...arr }
            return { ...arr }
        })
        setFields(obj => {
            const products = obj.serviceDetail[indexDetail]?.products
            if (products) {
                const indexFind = products.findIndex(el => el.id == listCostOld.products[index].id)
                if (updateAmount && indexFind > -1) {
                    products[indexFind].amount++
                    obj.serviceDetail[indexDetail].products = products
                }
            }
            return {
                ...obj
            }
        })
    }

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
        const type = fields.typeService.find(el => el.id == value)
        if (type) {
            return type?.description
        }
        return "N/A"
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
                    },
                    priceResale: {
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
                    },
                    priceResale: {
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
    let productPrice = 0
    const serviceFilter = fields.serviceDetail.filter(el => !el.deleted)
    const serviceDetail = serviceFilter.filter(el => el?.partsList?.length)
    const serviceDetailProducts = serviceFilter.filter(el => el?.products?.length)
    serviceDetail.forEach(el => {
        if (el.partsList && !el.customerParts) {
            const parts = el?.partsList?.filter(el => !el.deleted)
            partPrice += parts?.reduce((accumulator, currentValue) => Number(accumulator) + Number(currentValue.price.value), 0);
        }
    })
    serviceDetailProducts.forEach(el => {
        if(el.products){
            productPrice += el.products?.reduce((accumulator, currentValue) => Number(accumulator) + (Number(listCost.products.find(item => item.id == currentValue.id)?.priceResale) * Number(currentValue.amount)), 0);
        }
    })


    const total = serviceFilter.reduce((accumulator, currentValue) => Number(accumulator) + Number(currentValue.price.value), 0) + partPrice + productPrice;

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
        total,
        handleSetAllProducts,
        handleAddSelect,
        handleCleanSelect,
        handleMinusSelect,
        handleToggleSelect,
        listCost
    }
}