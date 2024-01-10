import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Signin from "../pages/signin";

const Stack = createNativeStackNavigator();

export default function AuthRoutes() {
    return (
        <Stack.Navigator>
            <Stack.Screen options={{
                headerShown: false
            }} name="SignIn" component={Signin} />
        </Stack.Navigator>
    )
}