import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "../pages/home";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Entypo } from '@expo/vector-icons';
import Service from "../pages/service";
import { FontAwesome5 } from '@expo/vector-icons';
import AppBarService from "../templates/appBar";
import CreateService from "../pages/serviceDetail";
import AppBarBottomSys from "../templates/appBarBottom";
import { Icon } from "react-native-paper";
import Cost from "../pages/cost";
import CostDetail from "../pages/costDetail";
import Report from "../pages/report";

export type BottomNavigationParamsList = {
    home: undefined;
    ser: undefined
    cost: undefined
    report: undefined
}

const Tab = createBottomTabNavigator<BottomNavigationParamsList>();

export default function AppRoutes() {

    return (
        <Tab.Navigator sceneContainerStyle={{
        }} screenOptions={{
            tabBarActiveTintColor: "#fff",
            headerShown: false,
            tabBarLabelStyle: {
                fontSize: 14,
            },
            tabBarIconStyle: {
                fontSize: 16
            },
            tabBarStyle: {
                backgroundColor: "#1c1b1f",
                // borderTopLeftRadius: 8,
                // borderTopRightRadius: 8,
            }

        }} initialRouteName="home">
            <Tab.Screen options={{
                headerShown: true,
                header: (props) => <AppBarBottomSys  {...props} />,
                tabBarIcon: ({ color, size }) => (<Entypo name="home" color={color} size={size} />),
                tabBarLabel: "Home"
            }} name="home" component={Home} navigationKey="home" />

            <Tab.Screen options={{
                tabBarIcon: ({ color, size }) => (<FontAwesome5 name="car" color={color} size={size} />),
                tabBarLabel: "Serviço",
            }} name="ser" component={ServiceRoutes} />
            <Tab.Screen options={{
                tabBarIcon: ({ color, size }) => (<Icon
                    source="currency-usd"
                    color={color}
                    size={size}
                />),
                tabBarLabel: "Custo",
            }} name="cost" component={CostRoutes} />
            <Tab.Screen options={{
                headerShown: true,
                header: (props) => <AppBarBottomSys  {...props} />,
                tabBarIcon: ({ color, size }) => (<Icon
                    source="chart-line"
                    color={color}
                    size={size}
                />),
                tabBarLabel: "Relatório",
            }} name="report" component={Report} />
        </Tab.Navigator>
    )
}

export type StackParamsList = {
    serviceList: undefined
    createService: undefined
    editarService: {
        id: number
    }
}

const Stack = createNativeStackNavigator<StackParamsList>();

function ServiceRoutes() {

    return (
        <Stack.Navigator screenOptions={{
            headerShown: true,
            headerBackVisible: true,
            header: (props) => <AppBarService  {...props} />,
        }} initialRouteName="serviceList" >
            <Stack.Screen options={{
                title: "Lista de serviços",
                headerBackVisible: false,
            }} name="serviceList" component={Service} />
            <Stack.Screen options={{
                title: "Criar Serviço",
            }} name="createService" component={CreateService} />
            <Stack.Screen options={{
                title: "Editar Serviço",
            }} name="editarService" component={CreateService} />
        </Stack.Navigator>
    )
}

export type CostStackParamsList = {
    costList: undefined
    createCost: undefined
    editarCost: {
        id: number
    }
}

const CostStack = createNativeStackNavigator<CostStackParamsList>();

function CostRoutes() {
    return (
        <CostStack.Navigator screenOptions={{
            headerShown: true,
            headerBackVisible: true,
            header: (props) => <AppBarService  {...props} />,
        }} initialRouteName="costList" >
            <CostStack.Screen options={{
                title: "Lista de custos",
                headerBackVisible: false,
            }} name="costList" component={Cost} />
            <CostStack.Screen options={{
                title: "Criar custo",
            }} name="createCost" component={CostDetail} />
            <CostStack.Screen options={{
                title: "Editar custo",
            }} name="editarCost" component={CostDetail} />
        </CostStack.Navigator>
    )
}