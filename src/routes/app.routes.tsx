import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "../pages/home";

const Stack = createNativeStackNavigator();

export default function AppRoutes(){
    return  (
        <Stack.Navigator>
            <Stack.Screen name="Home" component={Home} />
        </Stack.Navigator>
    )
}