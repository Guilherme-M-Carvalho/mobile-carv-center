import {
    View,
    Text,
    StyleSheet,
    Image,
    TextInput,
    TouchableOpacity
} from 'react-native'
import React, { useContext, useState } from 'react'
import { AuthContext } from '../../contexts/AuthContext'

export default function Signin() {

    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const { handleAuth } = useContext(AuthContext)

    return (
        <View style={styles.container}>
            <Image
                source={require("../../assets/logo.png")}
                style={styles.logo}
            />
            <View style={styles.inputContainer}>
                <TextInput value={email} onChangeText={(text) => setEmail(text)} placeholder='Digite seu e-mail' style={styles.input} placeholderTextColor={"#f0f0f0"} />
                <TextInput value={password} onChangeText={(text) => setPassword(text)} placeholder='Sua senha' style={styles.input} placeholderTextColor={"#f0f0f0"} secureTextEntry={true} />
                <TouchableOpacity style={styles.button} onPress={() => {
                    handleAuth({
                        email,
                        password
                    })
                }}>
                    <Text style={styles.buttonText}>
                        Acessar
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#1d1d2e"
    },
    logo: {
        marginBottom: 18,
        width: 100,
        height: 100,
        objectFit: "contain"
    },
    inputContainer: {
        width: "95%",
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 32,
        paddingHorizontal: 14
    },
    input: {
        width: "95%",
        height: 40,
        backgroundColor: "#101026",
        marginBottom: 12,
        borderRadius: 4,
        paddingHorizontal: 8,
        color: "#fff",
    },
    button: {
        width: "95%",
        height: 40,
        backgroundColor: "#3fffa3",
        borderRadius: 4,
        justifyContent: "center",
        alignItems: "center"
    },
    buttonText: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#1d1d2e"
    }
})