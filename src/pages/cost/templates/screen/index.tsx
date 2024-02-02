import { useIsFocused, useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { AnimatedFAB, Divider, Icon, List, MD3Colors, Searchbar } from 'react-native-paper';
import { CostStackParamsList, StackParamsList } from '../../../../routes/app.routes';
import SubTitle from '../../../../components/subTitle';
import useFind from '../../hooks/useFind';
import { useEffect, useState } from 'react';
import { Avatar } from 'react-native-paper';
import { apiUrl } from '../../../../services/apiUrl';
import { FontAwesome5 } from '@expo/vector-icons';


const Screen = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const navigation = useNavigation<NativeStackNavigationProp<CostStackParamsList>>()
    const { handleFind, data } = useFind()
    const isFocused = useIsFocused();

    useEffect(() => {
        if (isFocused)
            handleFind()
    }, [isFocused])

    return (
        <View style={{
            flex: 1,
            backgroundColor: "#fff"
        }}>
            <View style={{
                position: "relative",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
            }}>

                <View style={{
                    width: "100%",
                    backgroundColor: "#1c1b1f",
                    height: 28,
                }} />
                <View style={{
                    backgroundColor: "#ffffff",
                    position: "absolute",
                    top: 0,
                    zIndex: 100000,
                    flex: 1,
                    shadowColor: '#171717',
                    shadowOffset: { width: -2, height: 4 },
                    shadowOpacity: 0.2,
                    shadowRadius: 3,
                    elevation: 20,
                    borderRadius: 28,
                    width: "80%",
                }}>

                    <Searchbar
                        placeholder="Buscar"
                        onChangeText={setSearchQuery}
                        value={searchQuery}
                        iconColor='#1B1C1F'
                        placeholderTextColor={"#1B1C1F"}
                        inputStyle={{
                            color: "#1B1C1F"
                        }}
                        onLayout={(e) => {
                            const { height } = e.nativeEvent.layout
                        }}
                        style={{
                            backgroundColor: "#fff",
                        }}
                    />
                </View>

            </View>
            <View style={{
                marginTop: 30,
                paddingHorizontal: 8,
                flex: 1
            }}>
                {/* <SubTitle text="Lista de serviços" /> */}
                <ScrollView>
                    <List.Section style={{
                        padding: 8,
                        gap: 8
                    }}>
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
                onPress={() => navigation.navigate('createCost')}
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
    const navigation = useNavigation<NativeStackNavigationProp<CostStackParamsList>>()

    return (<>
        <View style={{
            backgroundColor: "#ffffff",
            shadowColor: '#171717',
            shadowOffset: { width: -2, height: 4 },
            shadowOpacity: 0.2,
            shadowRadius: 3,
            elevation: 5,
            padding: 8,
            borderRadius: 8,
        }}>
            <List.Accordion
                onLongPress={() => { navigation.navigate('editarCost', { id: service.id }) }}
                description={service?.description}
                titleStyle={{
                    color: "#1B1C1F"
                }}
                rippleColor={"#1B1C1F"}
                style={{

                    paddingVertical: 0,
                    backgroundColor: "#fff",
                }}
                left={() =>  <Avatar.Icon
                        size={50}
                        style={{ backgroundColor: "#1B1C1F" }}
                        icon={() => <Icon
                            source="currency-usd"
                            color={"#fff"}
                            size={24}
                          />}
                        color='#fff'
                    />
                }
                title={service?.name}
            >
                <View style={{
                    // marginHorizontal: 8,
                    marginTop: 8,
                    marginBottom: 8,
                    paddingVertical: 8,
                    backgroundColor: "#fff"
                }}>
                    <View style={{ flexDirection: "row" }}>
                        <Text style={{
                            fontSize: 14,
                            color: "#1B1C1F",
                            fontWeight: "600"
                        }}>Produto: </Text>
                        <Text style={{
                            fontSize: 14,
                            color: "#1B1C1F",
                            fontWeight: "400"
                        }}>{service?.name}</Text>
                    </View>
                    <View style={{ flexDirection: "row" }}>
                        <Text style={{
                            fontSize: 14,
                            color: "#1B1C1F",
                            fontWeight: "600"
                        }}>Descrição: </Text>
                        <Text style={{
                            fontSize: 14,
                            color: "#1B1C1F",
                            fontWeight: "400"
                        }}>{service?.description}</Text>
                    </View>
                    <View style={{ flexDirection: "row" }}>
                        <Text style={{
                            fontSize: 14,
                            color: "#1B1C1F",
                            fontWeight: "600"
                        }}>Preço: </Text>
                        <Text style={{
                            fontSize: 14,
                            color: "#1B1C1F",
                            fontWeight: "400"
                        }}>{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(service?.price)}</Text>
                    </View>
                    <View style={{ flexDirection: "row" }}>
                        <Text style={{
                            fontSize: 14,
                            color: "#1B1C1F",
                            fontWeight: "600"
                        }}>Criado em: </Text>
                        <Text style={{
                            fontSize: 14,
                            color: "#1B1C1F",
                            fontWeight: "400"
                        }}>{service?.createdAt}</Text>
                    </View>
                    <View style={{ flexDirection: "row" }}>
                        <Text style={{
                            fontSize: 14,
                            color: "#1B1C1F",
                            fontWeight: "600"
                        }}>Alterado em: </Text>
                        <Text style={{
                            fontSize: 14,
                            color: "#1B1C1F",
                            fontWeight: "400"
                        }}>{service?.updatedAt}</Text>
                    </View>


                </View>
            </List.Accordion>
        </View>
    </>)
}



const styles = StyleSheet.create({
    fabStyle: {
        bottom: 16,
        right: 16,
        position: 'absolute',
        backgroundColor: "#1B1C1F",
        color: "#1B1C1F"
    },
});

export default Screen;