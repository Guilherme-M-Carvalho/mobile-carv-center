import FieldsProvider from "./contexts/fields";
import Screen from "./templates/screen";

export default function CostDetail() {

    return (<FieldsProvider>
        <Screen />
    </FieldsProvider>)
}