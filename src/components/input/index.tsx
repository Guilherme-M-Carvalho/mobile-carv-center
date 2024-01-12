import { View } from "react-native";
import { HelperText, TextInput, TextInputProps } from "react-native-paper";

interface InputProps {
    error: boolean;
    helperText: string;
}

export default function Input({
    error,
    helperText, ...props
}: TextInputProps & InputProps) {
    return (
        <View>

            <TextInput
                mode="outlined"
                outlineColor="rgb(142, 142, 143)"
                activeOutlineColor="rgb(28, 27, 31)"
                error={error}
                style={{
                    backgroundColor: "transparent",
                    fontSize: 12
                }}
                {...props}
            />
            <HelperText type="error" visible={error}>
                {helperText}
            </HelperText>
        </View>
    )
}