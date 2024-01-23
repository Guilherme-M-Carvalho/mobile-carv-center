import { ReactNode, createContext, useContext, useState, useEffect } from "react";
import { api } from "../services/api";
import { GlobalAlertContext } from "./GlobalAlertContext";
import AsyncStorage from "@react-native-async-storage/async-storage"

type CreateContextData = {
    user: UserProps;
    isAuthenticated: boolean;
    handleAuth: HandleAuthProps;
    signOut: () => Promise<void>;
}

type UserProps = {
    id?: number;
    name: string;
    email: string;
    token?: string;
}

type HandleAuthProps = ({ email, password }: {
    email: string;
    password: string;
}) => void

export const AuthContext = createContext({} as CreateContextData);

export default function AuthProvider({ children }: { children: ReactNode }) {

    const { showLoading, hideLoading, showAlert } = useContext(GlobalAlertContext)

    const [user, setUser] = useState<UserProps>({
        email: "",
        name: "",
    })

    const isAuthenticated = !!user.id

    useEffect(() => {
        async function getUser() {

            const userInfo = await AsyncStorage.getItem("@reactnative")
            const hasUser: UserProps = JSON.parse(userInfo || "{}")
            if (Object.keys(hasUser).length > 0) {
                api.defaults.headers.common['Authorization'] = `Bearer ${hasUser.token}`
                setUser({
                    email: hasUser.email,
                    name: hasUser.name,
                    id: hasUser.id,
                    token: hasUser.token
                })
            }
        }
        getUser()
    }, [])

    const handleAuth: HandleAuthProps = async ({
        email,
        password
    }) => {
        showLoading()
        try {
            const { data } = await api.post("/session", {
                email,
                password
            })
            if(data?.failed){
                hideLoading()
                showAlert({
                    text: data?.error,
                    type: "error"
                })
                return
            }

            const { name, id, email: emailRes, token } = data

            const local = {
                ...data
            }

            api.defaults.headers.common['Authorization'] = `Bearer ${token}`

            setUser({
                email: emailRes,
                name,
                id,
                token
            })

            await AsyncStorage.setItem("@reactnative", JSON.stringify(local))
            showAlert({
                text: "Login efetuado com sucesso!",
                type: "success"
            })
        } catch (error: any) {
            showAlert({
                text: error?.response?.data?.error,
                type: "error"
            })
        }
        hideLoading()
    }

    async function signOut() {
        await AsyncStorage.clear()
            .then(() => {
                setUser({
                    email: "",
                    name: "",
                })
            })
    }

    return (<AuthContext.Provider value={{ isAuthenticated, user, handleAuth, signOut }}>
        {children}
    </AuthContext.Provider>)
}