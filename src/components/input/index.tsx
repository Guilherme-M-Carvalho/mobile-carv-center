import { View } from "react-native";
import { HelperText, TextInput, TextInputProps } from "react-native-paper";
import { transparent } from "react-native-paper/lib/typescript/styles/themes/v2/colors";

interface InputProps {
    error: boolean;
    helperText: string;
}

export default function Input({
    error,
    helperText, ...props
}: TextInputProps & InputProps) {
    return (
        <View style={{
            height: "auto"
        }}>
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
            {error &&
                <HelperText type="error" visible={error}>
                    {helperText}
                </HelperText>
            }
        </View>
    )
}