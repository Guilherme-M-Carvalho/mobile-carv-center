import { Text, View } from "react-native";
import { CostProps } from "../../types";
import { useContext } from "react";
import { FieldsContext } from "../../contexts/fields";
import { Avatar, Divider, Icon, IconButton, List } from "react-native-paper";

export default function Product({ service, divider = true, index, indexDetail }: { indexDetail: number; service: CostProps; divider?: boolean; index: number }) {

    const { handleToggleSelect, handleMinusSelect, handleAddSelect, fields } = useContext(FieldsContext)
    const products = fields.serviceDetail[indexDetail]?.products
    const indexProduct = products?.findIndex(el => el.id == service.id)
    let amountSelect = 0
    if (products && Number(indexProduct) > -1) {
        amountSelect = products[Number(indexProduct)].amount
    }



    const resaleMoney = service.priceResale * Number(amountSelect)

    return (<>
        <View style={{
            backgroundColor: "#fff",
            ...(Number(amountSelect) > 0 && {
                shadowColor: '#171717',
                shadowOffset: { width: -2, height: 4 },
                shadowOpacity: 0.2,
                shadowRadius: 3,
                elevation: 5,
                flexDirection: "row",
            }),
            padding: 8,
            borderRadius: 8,
        }}>
            <View style={{
                flex: 1,
            }}>
                {Number(amountSelect) > 0 &&
                    <>
                        <View style={{
                            flexDirection: "row",
                            justifyContent: "space-between",
                            alignItems: "center",
                            paddingLeft: 8
                        }}>
                            <View style={{
                                flexDirection: "row",
                                alignItems: "center",
                                gap: 2
                            }}>

                                <Text>
                                    Quantidade
                                </Text>
                                <IconButton size={14} style={{
                                    margin: 0
                                }} icon={"minus"} onPress={() => handleMinusSelect({ index, indexDetail })} />
                                <Text>
                                    {amountSelect}
                                </Text>
                                <IconButton style={{
                                    margin: 0
                                }} size={14} icon={"plus"} onPress={() => handleAddSelect({ index, indexDetail })} />
                            </View>
                            <Text>
                                {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(resaleMoney)}
                            </Text>
                            <IconButton size={18} style={{
                                margin: 0
                            }} icon={"close"} onPress={() => handleToggleSelect({ index, indexDetail })} />
                        </View>

                        <Divider />
                    </>

                }
                <List.Accordion
                    onLongPress={() => !service.select && handleToggleSelect({ index, indexDetail })}
                    description={service?.description}
                    titleStyle={{
                        color: "#1B1C1F"
                    }}
                    rippleColor={"#1B1C1F"}
                    style={{
                        paddingVertical: 0,
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
                    />}
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
                            }}>{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(service?.price)}</Text>
                        </View>
                        <View style={{ flexDirection: "row" }}>
                            <Text style={{
                                fontSize: 14,
                                color: "#1B1C1F",
                                fontWeight: "600"
                            }}>Custo Unitário: </Text>
                            <Text style={{
                                fontSize: 14,
                                color: "#1B1C1F",
                                fontWeight: "400"
                            }}>{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(service?.priceResale)}</Text>
                        </View>
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
        </View>
        {divider && !service?.select ?
            <Divider />
            : false}
    </>)
}