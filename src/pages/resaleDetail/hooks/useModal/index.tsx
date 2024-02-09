import { useState } from "react"

export default function useModal(){

    const [modal, setModal] = useState<boolean>(false)

    const handleVisible = () => {
        setModal(true)
    }

    const handleHide = () => {
        setModal(false)
    }

    return {
        handleVisible,
        handleHide,
        modal
    }
}