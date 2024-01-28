import { FieldsProps } from "../../types"

export default function useData(fields: FieldsProps) {

    const handleData = async () => {

        const serviceDetail: any[] = []

        fields.serviceDetail.forEach(service => {
            if (!fields.id && service.deleted) {
                return
            }
            const image: any[] = []
            service.images.forEach(img => {
                if (!img.id && img.deleted) {
                    return
                }
                image.push({
                    name: img.uri,
                    before: img.before,
                    id: img.id,
                    deleted: img.deleted
                })
            })
            serviceDetail.push({
                price: service.price.value,
                description: service.description.value,
                image,
                id: service.id,
                deleted: service.deleted
            })
        })

        const image: any[] = []
        fields.images.forEach((el) => {
            if (!el.id && el.deleted) {
                return
            }
            image.push({
                name: el.uri,
                id: el?.id,
                deleted: el.deleted
            })
        })

        const data = {
            id: fields.id,
            car: {
                plate: fields.plate.value,
                description: fields.description.value,
                image,
            },
            serviceDetail
        }

        const formData = new FormData() as any
        formData.append("car", JSON.stringify(data.car))
        formData.append("serviceDetail", JSON.stringify(data.serviceDetail))
        fields.images.map(async (img) => {
            if (!img.id && !img.deleted) {
                formData.append("vehicle", {
                    uri: img.uri,
                    type: 'image/jpeg',
                    name: 'profile-picture'
                })
                // await fetch(img.uri)
                //     .then(res => res.blob())
                //     .then(blob => {
                //         const file = new File([blob], "file.png", { type: "image/png" })
                //         console.log({
                //             uri: img.uri,
                //             type: 'image/jpeg',
                //             name: 'profile-picture'
                //         });

                //         formData.append("vehicle", {
                //             uri: img.uri,
                //             type: 'image/jpeg',
                //             name: 'profile-picture'
                //         })
                //         // formData.append("vehicle", file)

                //     })
            }
        })
        fields.serviceDetail.map(async ({ images }, index) => {
            images.map(async (img) => {
                if (!img.id && !img.deleted) {
                    formData.append("service", {
                        uri: img.uri,
                        type: 'image/jpeg',
                        name: 'profile-picture',
                    })
                    // await fetch(img.uri)
                    //     .then(res => res.blob())
                    //     .then(blob => {
                    //         const file = new File([blob], "file.png", { type: "image/png" })
                    //         console.log(file, blob);

                    //         formData.append("service", file)
                    //     })
                }
            })
        })

        return formData
    }

    return {
        handleData
    }
}