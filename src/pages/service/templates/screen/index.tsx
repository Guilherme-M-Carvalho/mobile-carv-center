import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import * as React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { AnimatedFAB, List, MD3Colors, Searchbar } from 'react-native-paper';
import { StackParamsList } from '../../../../routes/app.routes';
import SubTitle from '../../../../components/subTitle';

const Screen = () => {
    const [searchQuery, setSearchQuery] = React.useState('');
    const navigation = useNavigation<NativeStackNavigationProp<StackParamsList>>()

    return (
        <View style={{
            flex: 1
        }}>
            <View style={{
                paddingHorizontal: 8,
                flex: 1
            }}>
                <Searchbar
                    placeholder="Buscar"
                    onChangeText={setSearchQuery}
                    value={searchQuery}
                    iconColor='#fff'
                    placeholderTextColor={"#fff"}
                    inputStyle={{
                        color: "#fff"
                    }}
                    style={{
                        backgroundColor: "rgb(28, 27, 31)",
                        marginBottom: 8
                    }}
                />
                <SubTitle text="Lista de serviços" />
                <ScrollView>
                    <List.Accordion description="sdsadsad" titleStyle={{
                        color: "rgb(28, 27, 31)"
                    }} rippleColor={"rgb(28, 27, 31)"} style={{
                        paddingHorizontal: 8,
                        paddingVertical: 0,
                        backgroundColor: "rgb(242 242 242)",
                        borderRadius: 8
                    }} left={() => <List.Icon color={MD3Colors.tertiary70} icon="folder" />} title="Accordion 1" id="1">
                        <List.Item title="Item 1" />
                    </List.Accordion>
                </ScrollView>
            </View>
            <AnimatedFAB
                icon={'plus'}
                label={'Label'}
                extended={false}
                onPress={() => navigation.navigate('createService')}
                visible={true}
                animateFrom={'right'}
                iconMode={'static'}
                style={[styles.fabStyle]}
                rippleColor={"#1d1d2e"}
                color='#fff'
            />
        </View>
    );
};

const styles = StyleSheet.create({
    fabStyle: {
        bottom: 16,
        right: 16,
        position: 'absolute',
        backgroundColor: "rgb(28, 27, 31)",
        color: "rgb(28, 27, 31)"
    },
});

export default Screen;