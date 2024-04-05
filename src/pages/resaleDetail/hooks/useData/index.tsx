import { CostListProps } from "../../types";

export default function useData(fields: {id?: Number; products: CostListProps}){

    const handleData = () => {
        return {
            products: fields.products.filter(el => (el.select && fields.id) || true).map(el => {
                return {
                    id: el.cost_history_id,
                    amount: el.amountSelect,
                    priceResale: el.priceResale,
                    amountSave: el.save
                }
            }),
            id: fields.id
        }
    }

    return {
        handleData
    }
}