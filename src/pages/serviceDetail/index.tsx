import FieldsProvider from "./contexts/fields";
import ModalProvider from "./contexts/modal";
import Screen from "./templates/screen";


export default function ServiceDetail() {


    return (<FieldsProvider>
        <ModalProvider>
            <Screen />
        </ModalProvider>
    </FieldsProvider>)
}