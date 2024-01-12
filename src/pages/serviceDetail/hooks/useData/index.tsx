import { FieldsProps } from "../../types"

export default function useData(fields: FieldsProps){

    const handleData = () => {
        const data = {
            id: fields.id,
            car: {
                plate: fields.plate.value,
                description: fields.description.value
            },
            image: fields.images.map(el =>{
                return {
                    name: 'el.uri',
                    id: el.id
                }
            }),
            serviceDetail: fields.serviceDetail.map(service => {
                return {
                    price: service.price.value,
                    description: service.description.value,
                    image: service.images.map(img =>{
                        return {
                            name:' img.uri',
                            before: img.before,
                            id: img.id
                        }
                    }),
                    id: service.id
                }
            }) 
        }
        return data
    }

    return {
        handleData
    }
}