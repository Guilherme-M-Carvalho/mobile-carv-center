import { InputProps } from "../../../types";

export type FieldsProps = {
    id?: number;
    name: InputProps;
    description: InputProps;
    amount: InputProps;
    price: InputProps;
}

export type FieldsContextProps = {
    fields: FieldsProps;
    onChangeFields: OnChangeFieldsProps
    handleSetAllFields: HandleSetAllFieldsProps
}

export type OnChangeFieldsProps = (props: { value: any; field: keyof (Omit<FieldsProps, "id">) }) => void

export type HandleSetAllFieldsProps = (fields: FieldsProps) => void