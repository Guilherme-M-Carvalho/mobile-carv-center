import { CostListProps } from "../../types";

export default function useData(fields: {id?: Number; products: CostListProps}){

    const handleData = () => {
        return {
            products: fields.products.filter(el => el.select).map(el => {
                return {
                    id: el.id,
                    amount: el.amountSelect
                }
            }),
            id: fields.id
        }
    }

    return {
        handleData
    }
}