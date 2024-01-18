import { InputProps } from "../../../types"

export type FieldsContextProps = {
    onChangeField: OnChangeFieldsProps;
    onChangeFieldServiceDetail: OnChangeFieldsServiceDetailProps;
    pickImage: () => void;
    handleAddService: () => void;
    onDeleteImg: OnDeleteImgProps;
    pickImageService: PickImageServiceProps;
    onDeleteServiceImg: OnDeleteServiceImgProps;
    handleDeleteService: HandleDeleteServiceProps;
    handleFindByPlate: HandleFindByPlateProps;
    handleSetAllFields: HandleSetAllProps;
    fields: FieldsProps;
    total: number;
}

export type FieldsProps = {
    id?: number
    description: InputProps
    plate: InputProps
    images: ImageProps[]
    serviceDetail: ServiceDetailProps[]
}

export type ServiceDetailProps = {
    price: InputProps;
    id?: number;
    description: InputProps;
    images: ImageProps[];
}

export type ImageProps = {
    before?: boolean;
    uri: string;
    id?: number
}

export type HandleSetAllProps = (fields: FieldsProps) => void
export type HandleFindByPlateProps = ({description, images}: {description: string; images: ImageProps[]}) => void
export type HandleDeleteServiceProps = ({index}: {index: number}) => void
export type OnDeleteImgProps = ({i}: {i: number}) => void
export type OnDeleteServiceImgProps = ({index, i}: {i: number; index: number}) => void
export type PickImageServiceProps = ({index}: {index: number;before?: boolean;}) => void
export type OnChangeFieldsProps = ({field, value}: {value: any; field:  keyof(Omit<FieldsProps, "id" | "serviceDetail" | "images">)}) => void
export type OnChangeFieldsServiceDetailProps = ({field, value, index}: {index: number; value: any; field:  keyof(Omit<ServiceDetailProps, "id" | "before" | "images">)}) => void