import { InputProps } from "../../../types";


export interface CostHitory {
    id: number
    price: string
    priceResale: PriceResale[]
    amount: string
    updatePrice: boolean
    created_at: string
    updated_at: string
    amountSold: number
    totalSold: number
    amountStock: number;
    amountDelete: number;
    changePrice?: boolean
}

export interface PriceResale {
    amount: number
    price: number
}


export type FieldsProps = {
    id?: number;
    name: InputProps;
    description: InputProps;
    amount: InputProps;
    price: InputProps;
    costHitory: CostHitory[]
    priceResale: InputProps;
    lastPriceResale?: number;
    totalResale: number
    totalSold?: number;
    changeAllProducts?: boolean;
}

export type FieldsContextProps = {
    fields: FieldsProps;
    onChangeFields: OnChangeFieldsProps
    handleSetAllFields: HandleSetAllFieldsProps
    handleResetFieldsByCreate: () => void
    handleToggleCheck: () => void
    handleToggleCheckHistory: ({ index }: {
        index: number;
    }) => void
}

export type OnChangeFieldsProps = (props: { value: any; field: keyof (Omit<FieldsProps, "id" | "totalResale" | "totalSold" | "costHitory" | "changeAllProducts" | "lastPriceResale">) }) => void

export type HandleSetAllFieldsProps = (fields: FieldsProps) => void