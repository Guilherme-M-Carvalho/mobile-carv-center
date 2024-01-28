import { useState } from "react";

export default function useModal() {
    const [visible, setVisible] = useState<{visible: boolean; index: number}>({index: 0, visible: false});

    const showModal = (index: number) => setVisible({index: index, visible: true});
    const hideModal = () => setVisible({index: 0, visible: false});
    return {
        showModal,
        hideModal,
        visible: visible.visible,
        index: visible.index
    }
}