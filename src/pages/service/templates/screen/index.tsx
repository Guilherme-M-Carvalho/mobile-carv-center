import { useIsFocused, useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { AnimatedFAB, Divider, List, MD3Colors, Searchbar } from 'react-native-paper';
import { StackParamsList } from '../../../../routes/app.routes';
import SubTitle from '../../../../components/subTitle';
import useFind from '../../hooks/useFind';
import { useEffect, useState } from 'react';
import { Avatar } from 'react-native-paper';
import { apiUrl } from '../../../../services/apiUrl';
import { FontAwesome5 } from '@expo/vector-icons';


const Screen = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const navigation = useNavigation<NativeStackNavigationProp<StackParamsList>>()
    const { handleFind, data } = useFind()
    const isFocused = useIsFocused();


    useEffect(() => {
        if (isFocused)
            handleFind()
    }, [isFocused])

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
                    <List.Section>
                        {data.filter(el => {
                            const arr = []
                            Object.keys(el).forEach(key => {
                                if (searchQuery && String(el[key]).toUpperCase().includes(searchQuery.toUpperCase())) {
                                    arr.push(el[key])
                                } else if (!searchQuery) {
                                    arr.push(el[key])
                                }
                            })
                            return arr.length
                        }).map(service => {
                            return (
                                <Service key={service?.id} service={service} />
                            )
                        })}
                    </List.Section>
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

function Service({ service }: any) {
    const navigation = useNavigation<NativeStackNavigationProp<StackParamsList>>()

    return (<>
        <List.Accordion
            onLongPress={() => { navigation.navigate('editarService', { id: service.id }) }}
            description={service?.subTitle}
            titleStyle={{
                color: "rgb(28, 27, 31)"
            }}
            rippleColor={"rgb(28, 27, 31)"}
            style={{
                paddingHorizontal: 8,
                paddingVertical: 0,
                backgroundColor: "rgb(242 242 242)",
            }}
            left={() => service?.image ? <Avatar.Image
                size={50}
                source={{ uri: `${apiUrl}/files/${service.image}` }}
                style={{ backgroundColor: "rgb(28, 27, 31)" }}
            />
                : <Avatar.Icon
                    size={50}
                    style={{ backgroundColor: "rgb(28, 27, 31)" }}
                    icon={() => <FontAwesome5 name="car" color={"#fff"} size={24} />}
                    color='#fff'
                />
            }
            title={service?.title}
        >
            <View style={{
                marginHorizontal: 8,
                marginBottom: 8,
                padding: 8,
                borderWidth: 1,
                borderColor: "rgb(28, 27, 31)",
                backgroundColor: "#fff", borderRadius: 4
            }}>
                <View style={{ flexDirection: "row" }}>
                    <Text style={{
                        fontSize: 14,
                        color: "rgb(28, 27, 31)",
                        fontWeight: "600"
                    }}>Total: </Text>
                    <Text style={{
                        fontSize: 14,
                        color: "rgb(28, 27, 31)",
                        fontWeight: "400"
                    }}> R$ {service?.price}</Text>
                </View>
                <View style={{ flexDirection: "row" }}>
                    <Text style={{
                        fontSize: 14,
                        color: "rgb(28, 27, 31)",
                        fontWeight: "600"
                    }}>Criado em: </Text>
                    <Text style={{
                        fontSize: 14,
                        color: "rgb(28, 27, 31)",
                        fontWeight: "400"
                    }}>{new Intl.DateTimeFormat('pt-BR', {
                        dateStyle: 'short',
                        timeStyle: 'medium',
                    }).format(new Date(service?.createdAt))}</Text>
                </View>
                <View style={{ flexDirection: "row" }}>
                    <Text style={{
                        fontSize: 14,
                        color: "rgb(28, 27, 31)",
                        fontWeight: "600"
                    }}>Alterado em: </Text>
                    <Text style={{
                        fontSize: 14,
                        color: "rgb(28, 27, 31)",
                        fontWeight: "400"
                    }}>{new Intl.DateTimeFormat('pt-BR', {
                        dateStyle: 'short',
                        timeStyle: 'medium',
                        timeZone: 'GMT'
                    }).format(new Date(service?.updatedAt))}</Text>
                </View>


            </View>
            {/* <List.Item title={() => <Text>Total: R$ {service?.price} </Text>} />
            <List.Item title={() => <Text>Criado em: {new Intl.DateTimeFormat('pt-BR', {
                dateStyle: 'short',
                timeStyle: 'medium',
            }).format(new Date(service?.createdAt))} </Text>} />
            <List.Item title={() => <Text>Alterado em: {new Intl.DateTimeFormat('pt-BR', {
                dateStyle: 'short',
                timeStyle: 'medium',
                timeZone: 'GMT'
            }).format(new Date(service?.updatedAt))} </Text>} /> */}
        </List.Accordion>
        <Divider />
    </>)
}



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