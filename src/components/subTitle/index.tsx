import { Text, View } from "react-native";

export default function SubTitle({text}: {text:string;}){
    return(
        <View style={{
            marginLeft: 8,
            paddingBottom: 8,
            paddingRight: 16,
            flexDirection: "row",
            borderBottomColor: "#1B1C1F",
            borderBottomWidth: 2,
        }}>
            <Text style={{
                fontSize: 16,
                color: "#1B1C1F",
                fontWeight: "600"
            }}>{text}</Text>
        </View>
    )
}