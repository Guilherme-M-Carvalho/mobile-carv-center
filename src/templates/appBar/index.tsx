import { Appbar, IconButton, Menu } from 'react-native-paper';
import { NativeStackHeaderProps } from '@react-navigation/native-stack';
import { Dimensions, Text, View } from 'react-native';
import { useContext, useRef, useState } from 'react';
import { AuthContext } from '../../contexts/AuthContext';

const AppBarSys = (props: NativeStackHeaderProps) => {
    const windowWidth = Dimensions.get('window').width;

    const { user, signOut } = useContext(AuthContext)
    const [visible, setVisible] = useState(false);

    const openMenu = () => setVisible(true);

    const closeMenu = () => setVisible(false);
    return (
        <>
            <Appbar.Header style={{
                zIndex: 1,
                backgroundColor: "#1B1C1F",
            }} >
                {props.options.headerBackVisible &&
                    <Appbar.BackAction color='#fff' onPress={() => {
                        props.navigation.goBack()
                    }} />
                }
                <Appbar.Content titleStyle={{
                    color: "#ffffff",
                    fontSize: 20,
                    fontWeight: "600",
                }} title={`${props.options.title}`} />
                <IconButton
                    size={16}
                    iconColor='#fff'
                    containerColor='#fff'
                    icon={() => <Text style={{
                        fontWeight: "600"
                    }}>{user.name[0]}</Text>}
                    onPress={openMenu}
                />
            </Appbar.Header>
            <View
                style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                }}>
                <Menu
                    contentStyle={{
                        backgroundColor: "#fff"
                    }}
                    style={{
                        zIndex: 11
                    }}
                    visible={visible}
                    onDismiss={closeMenu}
                    anchor={{
                        x: windowWidth - 8,
                        y: 50
                    }}>
                    <Menu.Item onPress={signOut} title="Sair" leadingIcon={"logout"} />
                </Menu>
            </View>
        </>
    )
};

export default AppBarSys;