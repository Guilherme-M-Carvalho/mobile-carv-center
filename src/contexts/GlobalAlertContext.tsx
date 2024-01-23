import { ReactNode, createContext, useState } from "react";
import { ActivityIndicator, Text } from "react-native";
import { Modal, Snackbar } from "react-native-paper";
import { Portal } from 'react-native-paper';

interface CreateContextProps {
    showAlert: (props: { text: string; type: "success" | "error" | "warning" }) => void
    showLoading: () => void
    hideLoading: () => void
}

export const GlobalAlertContext = createContext({} as CreateContextProps)

export default function GlobalAlertProvider({ children }: { children: ReactNode }) {

    const [toast, setToast] = useState<{
        visible: boolean,
        text: string,
        type: "success" | "error" | "warning"
    }>({
        text: "",
        visible: false,
        type: "success"
    })

    const [loading, setLoading] = useState<boolean>(false)

    const handleDismiss = () => {
        setToast({
            text: "",
            visible: false,
            type: toast.type
        })
    }

    const showAlert = ({ text, type }: {
        text: string;
        type: "success" | "error" | "warning"
    }) => {
        setToast({
            text,
            visible: true,
            type
        })
    }

    const hideLoading = () => {
        setLoading(false)
    }

    const showLoading = () => {
        setLoading(true)
    }

    let backgroundColor = "#00e676"

    switch (toast.type) {
        case "warning":
            backgroundColor = "#eeff41"
            break;
        case "error":
            backgroundColor = "#b71c1c"
            break
        default:
            backgroundColor = "#3fffa3"
            break;
    }


    return (<GlobalAlertContext.Provider value={{ showAlert, showLoading, hideLoading }}>
        {children}
        <Portal>
            <Modal dismissable={false} visible={loading} onDismiss={hideLoading} contentContainerStyle={{
                shadowColor: "transparent"
            }}>
                <ActivityIndicator size={60} color="#fff" />
            </Modal>
        </Portal>
        <Snackbar
            visible={toast.visible}
            onDismiss={handleDismiss}
            duration={1500}
            style={{
                backgroundColor,

            }}
        >
            <Text style={{
                color: "#1d1d2e"
            }}>
                {toast.text}
            </Text>
        </Snackbar>
    </GlobalAlertContext.Provider>)
}