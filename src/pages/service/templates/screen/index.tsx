import { useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { AnimatedFAB, List, MD3Colors, Searchbar } from 'react-native-paper';
import { StackParamsList } from '../../../../routes/app.routes';
import SubTitle from '../../../../components/subTitle';
import useFind from '../../hooks/useFind';
import { useEffect, useState } from 'react';

const Screen = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const navigation = useNavigation<NativeStackNavigationProp<StackParamsList>>()
    const { handleFind, data } = useFind()
    const route = useRoute()
    console.log(route);
    

    useEffect(() => {
        if("serviceList" === route.name)
        handleFind()
    }, [route.name])

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
                    {data.map(service => (
                        <List.Accordion key={service?.id} onLongPress={() => {
                            navigation.navigate('editarService', {id: service.id})
                            
                        }} description={service?.serviceDetail?.reduce((accumulator: string, currentValue: any, index: number) => String(accumulator) + currentValue.description + (service?.serviceDetail?.length > 1 && index != service?.serviceDetail?.length - 1 ? ", " : ""), " ")} titleStyle={{
                            color: "rgb(28, 27, 31)"
                        }} rippleColor={"rgb(28, 27, 31)"} style={{
                            paddingHorizontal: 8,
                            paddingVertical: 0,
                            backgroundColor: "rgb(242 242 242)",
                            borderRadius: 8
                        }} left={() => <List.Icon color={MD3Colors.tertiary70} icon="folder" />} title={`${service?.car?.description} - ${service?.car?.plate}`} id={service?.id}>
                            <List.Item title="Item 1" />
                        </List.Accordion>
                    ))}
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