import FieldsProvider from "./contexts/fields";
import Screen from "./templates/screen";


export default function ServiceDetail(){


    return (<FieldsProvider>
        <Screen />
    </FieldsProvider>)
}