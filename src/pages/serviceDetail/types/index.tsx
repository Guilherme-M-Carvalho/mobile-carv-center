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
    handleTypeService: OnChangeTypeServiceProps;
    valueTypeService: (value: number) => string;
    toggleCustomerParts: (index: number) => void;
    toggleDelete: (index: number) => void;
    changePartsList: OnChangePartsListProps;
    deletePartsList: HandlleDeletePartsProps;
    handleAddParts: HandlleAddPartsProps;
    fields: FieldsProps;
    total: number;
}

export type FieldsProps = {
    id?: number
    idClient?: number;
    name: InputProps
    phone: InputProps
    description: InputProps
    plate: InputProps
    images: ImageProps[]
    serviceDetail: ServiceDetailProps[];
    createdAt?: Date;
    updatedAt?: Date;
    typeService: TypeServiceProps[]
}

export type ServiceDetailProps = {
    parts: InputProps;
    price: InputProps;
    id?: number;
    obs: InputProps;
    description: InputProps;
    images: ImageProps[];
    deleted?: boolean
    typeService: TypeService
    customerParts: boolean;
    pressDelete?: boolean;
    partsList?: PartsProps[]
    date?: Date
}

export type ImageProps = {
    before?: boolean;
    uri: string;
    id?: number;
    deleted?: boolean
}

export enum TypeService {
    na = 0,
    oil = 1,
    align = 2,
    balancing = 3,
    camber = 4
}

export type HandleSetAllProps = (fields: FieldsProps) => void
export type HandleFindByPlateProps = ({ description, images, name, phone, idClient }: { description: string; images: ImageProps[]; idClient?: number; name: string; phone: string; }) => void
export type HandleDeleteServiceProps = ({ index }: { index: number }) => void
export type OnDeleteImgProps = ({ i }: { i: number }) => void
export type OnDeleteServiceImgProps = ({ index, i }: { i: number; index: number }) => void
export type PickImageServiceProps = ({ index }: { index: number; before?: boolean; }) => void
export type OnChangeFieldsProps = ({ field, value }: { value: any; field: keyof (Omit<FieldsProps, "typeService" | "idClient" | "id" | "serviceDetail" | "images" | "createdAt" | "updatedAt">) }) => void
export type OnChangeFieldsServiceDetailProps = ({ field, value, index }: { index: number; value: any; field: keyof (Omit<ServiceDetailProps, "date" | "partsList" | "pressDelete" | "id" | "before" | "images" | "deleted" | "typeService" | "customerParts">) }) => void
export type OnChangeTypeServiceProps = (props: { value: number, index: number }) => void
export type OnChangePartsListProps = (props: { value: any, field: keyof (Omit<PartsProps, "id" | "deleted">); index: number; i: number }) => void
export type HandlleAddPartsProps = (props: { index: number; parts: any; price: any }) => void
export type HandlleDeletePartsProps = (props: { index: number; i: number }) => void
export type PartsProps = {
    id?: number
    part: InputProps;
    price: InputProps;
    deleted?: boolean;
}

export type TypeServiceProps = {
    id?: number;
    description: string
}