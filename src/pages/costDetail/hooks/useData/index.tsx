import { FieldsProps } from "../../types";

export default function useData(fields: FieldsProps){

    const handleData = () => {
        return {
            id: fields?.id,
            name:  fields.name.value,
            description:  fields.description.value,
            price:  fields.price.value,
            amount:  fields.amount.value,
            priceResale: fields.priceResale.value,
        }
    }

    const handleDataCreateProduct = () => {
        return {
            id: fields?.id,
            price:  fields.price.value,
            amount:  fields.amount.value,
            priceResale: fields.priceResale.value,
            changeAllProducts: fields.changeAllProducts
        }
    }

    const handleDataChangePrice = () => {
        return {
            id: fields?.id,
            priceResale: fields.priceResale.value,
            changeAllProducts: fields.changeAllProducts
        }
    }

    return {
        handleDataChangePrice,
        handleData,
        handleDataCreateProduct
    }
}