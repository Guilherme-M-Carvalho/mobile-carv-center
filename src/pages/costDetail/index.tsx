import FieldsProvider from "./contexts/fields";
import ModalProvider from "./contexts/modals";
import ModalProduct from "./templates/modalProduct";
import Screen from "./templates/screen";

export default function CostDetail() {

    return (<FieldsProvider>
        <ModalProvider>
            <Screen />
            <ModalProduct />
        </ModalProvider>
    </FieldsProvider>)
}