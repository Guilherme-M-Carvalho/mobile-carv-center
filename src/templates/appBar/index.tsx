import { Appbar } from 'react-native-paper';
import { NativeStackHeaderProps } from '@react-navigation/native-stack';

const AppBarSys = (props: NativeStackHeaderProps) => {
    return (
        <>
            <Appbar.Header style={{
                backgroundColor: "transparent"
            }} >
                {props.options.headerBackVisible &&
                    <Appbar.BackAction onPress={() => {
                        props.navigation.goBack()
                    }} />
                }
                <Appbar.Content title={String(props.options.title)} />
            </Appbar.Header>
        </>
    )
};

export default AppBarSys;