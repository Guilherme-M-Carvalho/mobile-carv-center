import { Text, View } from "react-native";

export default function SubTitle({text}: {text:string;}){
    return(
        <View style={{
            marginLeft: 8,
            marginBottom: 8,
            paddingBottom: 8,
            paddingRight: 16,
            flexDirection: "row",
            borderBottomColor: "rgb(28, 27, 31)",
            borderBottomWidth: 2,
            alignSelf: 'flex-start'
        }}>
            <Text style={{
                fontSize: 16,
                color: "rgb(28, 27, 31)",
                fontWeight: "600"
            }}>{text}</Text>
        </View>
    )
}