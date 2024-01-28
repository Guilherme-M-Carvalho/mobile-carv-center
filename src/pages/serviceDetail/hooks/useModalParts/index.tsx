import { useState } from "react";

export default function useModalParts() {
    const [visible, setVisible] = useState<{visible: boolean; index: number}>({index: 0, visible: false});

    const showModalParts = (index: number) => setVisible({index: index, visible: true});
    const hideModalParts = () => setVisible({index: 0, visible: false});
    return {
        showModalParts,
        hideModalParts,
        visibleParts: visible.visible,
        indexParts: visible.index
    }
}