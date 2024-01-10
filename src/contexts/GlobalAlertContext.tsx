import { ReactNode, createContext, useState } from "react";
import { ActivityIndicator } from "react-native";
import { Modal, Snackbar } from "react-native-paper";
import { Portal } from 'react-native-paper';

interface CreateContextProps {
    showAlert: (props: {text: string}) => void
    showLoading: () => void
    hideLoading: () => void
}

export const GlobalAlertContext = createContext({} as CreateContextProps)

export default function GlobalAlertProvider({ children }: { children: ReactNode }) {

    const [toast, setToast] = useState<{
        visible: boolean,
        text: string
    }>({
        text: "",
        visible: false
    })

    const [loading, setLoading] = useState<boolean>(false)

    const handleDismiss = () => {
        setToast({
            text: "",
            visible: false
        })
    }

    const showAlert = ({ text }: { text: string }) => {
        setToast({
            text,
            visible: true
        })
    }

    const hideLoading = () => {
        setLoading(false)
    }

    const showLoading = () => {
        setLoading(true)
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
        >
            {toast.text}
        </Snackbar>
    </GlobalAlertContext.Provider>)
}