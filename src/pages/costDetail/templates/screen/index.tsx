import { ScrollView, Text, View } from "react-native";
import Input from "../../../../components/input";
import SubTitle from "../../../../components/subTitle";
import { TextInput } from "react-native-paper";
import { RouteProp, useRoute } from "@react-navigation/native";
import { useContext, useEffect } from "react";
import useFind from "../../hooks/useFind";
import { FieldsContext } from "../../contexts/fields";
import Actions from "../actions";


type CostDetailRProps = {
    editarCost: {
        id: number
    }
}

type CostDetailRouteProps = RouteProp<CostDetailRProps, 'editarCost'>

export default function Screen() {

    const { fields, onChangeFields } = useContext(FieldsContext)

    const route = useRoute<CostDetailRouteProps>()
    const { handleFind } = useFind()

    useEffect(() => {
        if (!!route.params?.id) {
            handleFind({ id: Number(route.params.id) })
        }
    }, [])

    const costUnit = (Number(fields.price.value) / Number(fields.amount.value)) || 0

    return (<View style={{
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
                height: fields.id ? 50 : 25,
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
                padding: 8,
                borderRadius: 8,
                width: "80%",
                height: fields.id ? 100 : 55,
                flexDirection: "column",
                justifyContent: fields.id ? "space-between" : "center",
            }}>
                <View style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center"
                }}>
                    <Text style={{
                        fontWeight: "800",
                        fontSize: 14,
                        color: "#1B1C1F"
                    }}>Custo Unitário</Text>
                    <Text style={{
                        fontWeight: "800",
                        fontSize: 18,
                        color: "#1B1C1F"
                    }}>{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(costUnit)}</Text>
                </View>
                {fields.id && <View style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center"
                }}>
                    <Text style={{
                        fontWeight: "800",
                        fontSize: 14,
                        color: "#1B1C1F"
                    }}>Revendas</Text>
                    <Text style={{
                        fontWeight: "800",
                        fontSize: 18,
                        color: "#1B1C1F"
                    }}>{fields.totalSold}</Text>
                </View>}
                {fields.id && <View style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center"
                }}>
                    <Text style={{
                        fontWeight: "800",
                        fontSize: 14,
                        color: "#1B1C1F"
                    }}>Lucro em revendas</Text>
                    <Text style={{
                        fontWeight: "800",
                        fontSize: 18,
                        color: "#1B1C1F"
                    }}>{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(fields.totalResale)}</Text>
                </View>}
            </View>
        </View>
        <View style={{
            marginTop: fields.id ? 55 : 36,
            paddingHorizontal: 8,
            flex: 1,
            paddingTop: 16
        }}>
            <ScrollView>
                <View style={{
                    flexDirection: "row"
                }}>
                    <SubTitle text="Dados do custo" />
                </View>
                <View style={{
                    gap: 8,
                    paddingHorizontal: 8,
                    marginVertical: 8,
                }}>
                    <Input
                        {...fields.name}
                        label={"Nome do custo"}
                        onChangeText={value => onChangeFields({ value, field: "name" })}
                    />
                    <Input
                        {...fields.description}
                        multiline
                        label={"Descrição"}
                        onChangeText={value => onChangeFields({ value, field: "description" })}
                    />
                    <Input
                        {...fields.amount}
                        label={"Quantidade em estoque"}
                        keyboardType="numeric"
                        onChangeText={value => onChangeFields({ value: value.replace(/[^0-9\.]+/g, ""), field: "amount", })}
                    />
                    <Input
                        {...fields.price}
                        label={"Custo"}
                        keyboardType="numeric"
                        left={<TextInput.Affix
                            text="R$" />}
                        onChangeText={value => onChangeFields({ value: value.replace(/[^0-9\.]+/g, ""), field: "price" })}
                    />
                    <Input
                        {...fields.priceResale}
                        label={"Valor de revenda unitário"}
                        keyboardType="numeric"
                        left={<TextInput.Affix
                            text="R$" />}
                        onChangeText={value => onChangeFields({ value: value.replace(/[^0-9\.]+/g, ""), field: "priceResale" })}
                    />
                </View>
            </ScrollView>
            <Actions />
        </View>
    </View>)
}