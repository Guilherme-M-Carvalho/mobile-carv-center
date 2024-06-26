import { useIsFocused, useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { AnimatedFAB, Divider, Icon, List, MD3Colors, Searchbar } from 'react-native-paper';
import { CostStackParamsList, StackParamsList } from '../../../../routes/app.routes';
import SubTitle from '../../../../components/subTitle';
import useFind, { Cost, CostProps } from '../../hooks/useFind';
import { useContext, useEffect, useState } from 'react';
import { Avatar } from 'react-native-paper';
import { apiUrl } from '../../../../services/apiUrl';
import { FontAwesome5 } from '@expo/vector-icons';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { PageContext } from '../../contexts';
import useFindResale from '../../hooks/useFindResale';

const Tab = createMaterialTopTabNavigator();

function ListResale() {
    const navigation = useNavigation<NativeStackNavigationProp<CostStackParamsList>>()
    const { searchQuery, dataResale: data } = useContext(PageContext)

    return (<View style={{
        flex: 1
    }}>
        <ScrollView style={{
            flex: 1,
            paddingHorizontal: 8,
            backgroundColor: "#fff"
        }}>
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
                        <Resale key={service?.id} service={service} />
                    )
                })}
            </List.Section>
        </ScrollView>
        <AnimatedFAB
            icon={'plus'}
            label={'Label'}
            extended={false}
            onPress={() => navigation.navigate('createResale')}
            visible={true}
            animateFrom={'right'}
            iconMode={'static'}
            style={[styles.fabStyle]}
            rippleColor={"#1d1d2e"}
            color='#fff'
        />
    </View>)
}

function MyTabs() {
    return (
        <Tab.Navigator screenOptions={{
            tabBarIndicatorStyle: {
                backgroundColor: '#1c1b1f',
            }
        }} initialRouteName='listCost'>
            <Tab.Screen name="listCost" options={{
                tabBarLabel: "Lista de Produtos",
                tabBarLabelStyle: {
                    textTransform: "none"
                },
            }} component={ListCost} />
            <Tab.Screen options={{
                tabBarLabel: "Lista de Vendas",
                tabBarLabelStyle: {
                    textTransform: "none"
                },
            }} name="listResale" component={ListResale} />
        </Tab.Navigator>
    )
}

const Screen = () => {
    const { searchQuery, setSearchQuery, handleFind, handleFindResale } = useContext(PageContext)
    const isFocused = useIsFocused();


    useEffect(() => {
        if (isFocused) {
            handleFind()
            handleFindResale()
        }
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
                // paddingHorizontal: 8,
                flex: 1
            }}>
                <MyTabs />

            </View>
        </View>
    );
};

function ListCost() {
    const { searchQuery, setSearchQuery, data } = useContext(PageContext)
    const navigation = useNavigation<NativeStackNavigationProp<CostStackParamsList>>()


    return (<View style={{
        flex: 1,
        backgroundColor: "#fff"
    }}>
        <ScrollView style={{
            flex: 1,
            paddingHorizontal: 8,
            backgroundColor: "#fff"
        }}>
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
    </View>)
}

function Service({ service }: { service: Cost }) {
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
                left={() => <Avatar.Icon
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
                        }}>Custo: </Text>
                        <Text style={{
                            fontSize: 14,
                            color: "#1B1C1F",
                            fontWeight: "400"
                        }}>{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(Number(service.price))}</Text>
                    </View>
                    {service.priceResale.map(({ amount, price }, i) => (
                        <View style={{ flexDirection: "row" }} key={i}>
                            <Text style={{
                                fontSize: 14,
                                color: "#1B1C1F",
                                fontWeight: "600"
                            }}>{amount} {amount> 1 ? "Produtos": "Produto"} custando: </Text>
                            <Text style={{
                                fontSize: 14,
                                color: "#1B1C1F",
                                fontWeight: "400"
                            }}>{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(Number(price))} cada</Text>
                        </View>
                    ))}
                    <View style={{ flexDirection: "row" }}>
                        <Text style={{
                            fontSize: 14,
                            color: "#1B1C1F",
                            fontWeight: "600"
                        }}>Estoque: </Text>
                        <Text style={{
                            fontSize: 14,
                            color: "#1B1C1F",
                            fontWeight: "400"
                        }}>{service?.amountStock}</Text>
                    </View>
                    <View style={{ flexDirection: "row" }}>
                        <Text style={{
                            fontSize: 14,
                            color: "#1B1C1F",
                            fontWeight: "600"
                        }}>{service?.totalSold > 1 ? `${service?.totalSold} Revendas: ` : `${service?.totalSold} Revenda: `}</Text>
                        <Text style={{
                            fontSize: 14,
                            color: "#1B1C1F",
                            fontWeight: "400"
                        }}>{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(service?.totalResale)}</Text>
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
                        }}>{service?.created_at}</Text>
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
                        }}>{service?.updated_at}</Text>
                    </View>


                </View>
            </List.Accordion>
        </View>
    </>)
}

function Resale({ service }: any) {
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
                onLongPress={() => { navigation.navigate('editarResale', { id: service.id }) }}
                description={new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(service?.price)}
                titleStyle={{
                    color: "#1B1C1F"
                }}
                rippleColor={"#1B1C1F"}
                style={{

                    paddingVertical: 0,
                    backgroundColor: "#fff",
                }}
                left={() => <Avatar.Icon
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
                title={service?.products}
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
                        }}>Descrição: </Text>
                        <Text style={{
                            fontSize: 14,
                            color: "#1B1C1F",
                            fontWeight: "400"
                        }}>{service?.products}</Text>
                    </View>
                    <View style={{ flexDirection: "row" }}>
                        <Text style={{
                            fontSize: 14,
                            color: "#1B1C1F",
                            fontWeight: "600"
                        }}>Tipos de produto: </Text>
                        <Text style={{
                            fontSize: 14,
                            color: "#1B1C1F",
                            fontWeight: "400"
                        }}>{service?.amountTypeProduct}</Text>
                    </View>
                    <View style={{ flexDirection: "row" }}>
                        <Text style={{
                            fontSize: 14,
                            color: "#1B1C1F",
                            fontWeight: "600"
                        }}>Quantidade: </Text>
                        <Text style={{
                            fontSize: 14,
                            color: "#1B1C1F",
                            fontWeight: "400"
                        }}>{service?.amountProduct}</Text>
                    </View>
                    <View style={{ flexDirection: "row" }}>
                        <Text style={{
                            fontSize: 14,
                            color: "#1B1C1F",
                            fontWeight: "600"
                        }}>Custo: </Text>
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