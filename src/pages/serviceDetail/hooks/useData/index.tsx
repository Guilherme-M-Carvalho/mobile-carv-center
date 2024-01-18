import { FieldsProps } from "../../types"

export default function useData(fields: FieldsProps) {

    const handleData = async () => {

        const data = {
            id: fields.id,
            car: {
                plate: fields.plate.value,
                description: fields.description.value
            },
            image: fields.images.map(el => {
                return {
                    name: 'el.uri',
                    id: el?.id
                }
            }),
            serviceDetail: fields.serviceDetail.map(service => {
                return {
                    price: service.price.value,
                    description: service.description.value,
                    image: service.images.map(img => {
                        return {
                            name: ' img.uri',
                            before: img.before,
                            id: img.id
                        }
                    }),
                    id: service.id
                }
            })
        }

        const formData = new FormData() as any
        formData.append("car", JSON.stringify(data.car))
        formData.append("serviceDetail", JSON.stringify(data.serviceDetail))
        await Promise.all(fields.images.map(async (img) => {
            if (!img.id) {
                await fetch(img.uri)
                    .then(res => res.blob())
                    .then(blob => {
                        const file = new File([blob], "file.png", { type: "image/png" })
                        console.log({
                            uri: img.uri,
                            type: 'image/jpeg',
                            name: 'profile-picture'
                        });
                        
                        formData.append("vehicle", {
                            uri: img.uri,
                            type: 'image/jpeg',
                            name: 'profile-picture'
                        })
                    })
            }
        }))
        await Promise.all(fields.serviceDetail.map(async ({ images }) => {
            await Promise.all(images.map(async (img) => {
                if (!img.id) {
                    await fetch(img.uri)
                        .then(res => res.blob())
                        .then(blob => {
                            const file = new File([blob], "file.png", { type: "image/png" })
                            console.log(file, blob);
                            formData.append("service",{
                                uri: img.uri,
                                type: 'image/jpeg',
                                name: 'profile-picture'
                            })
                        })
                }
            }))
        }))


        return formData
    }

    return {
        handleData
    }
}