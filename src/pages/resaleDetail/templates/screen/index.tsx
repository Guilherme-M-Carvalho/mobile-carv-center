import { ScrollView, Text, View } from "react-native";
import Input from "../../../../components/input";
import SubTitle from "../../../../components/subTitle";
import { IconButton } from "react-native-paper";
import { useContext, useEffect } from "react";
import { ModalContext } from "../../contexts/modal";
import { FieldsContext } from "../../contexts/fields";
import Product from "../product";
import { RouteProp, useRoute } from "@react-navigation/native";
import Actions from "../actions";

type ResaleDetailRProps = {
    editarResale: {
        id: number
    }
}

type ResaleDetailRouteProps = RouteProp<ResaleDetailRProps, 'editarResale'>


export default function Screen() {

    const { handleVisible } = useContext(ModalContext)
    const { handleFind, listCost, handleFindFirst } = useContext(FieldsContext)
    const route = useRoute<ResaleDetailRouteProps>()

    useEffect(() => {
        if (!!route.params?.id) {
            handleFindFirst(route.params?.id)
        } else {
            handleFind()
        }
    }, [])

    const resaleMoney = listCost.products.filter(el => el.select).reduce((acc, val) => acc + (Number(val.priceResale) * Number(val.amountSelect)), 0)
    const amount = listCost.products.filter(el => el.select).reduce((acc, val) => acc + Number(val.amountSelect), 0)

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
                height: 32,
            }} />
            <View style={{
                backgroundColor: "#ffffff",
                position: "absolute",
                top: 0,
                flex: 1,
                shadowColor: '#171717',
                shadowOffset: { width: -2, height: 4 },
                shadowOpacity: 0.2,
                shadowRadius: 3,
                elevation: 20,
                padding: 8,
                borderRadius: 8,
                width: "80%",
                height: 64,
                flexDirection: "column",
                justifyContent: "space-between",
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
                    }}>Quantidade</Text>
                    <Text style={{
                        fontWeight: "800",
                        fontSize: 18,
                        color: "#1B1C1F"
                    }}>{amount}</Text>
                </View>
                <View style={{
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
                    }}>{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(resaleMoney)}</Text>
                </View>
            </View>
        </View>
        <View style={{
            marginTop: 40,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            paddingHorizontal: 8,
        }}>
            <SubTitle text="Lista de produtos" />
            <View>
                <IconButton onPress={handleVisible} icon={"plus"} />
            </View>
        </View>
        <View style={{
            paddingHorizontal: 8,
            flex: 1,
        }}>
            <ScrollView>
                <View style={{
                    gap: 8,
                    paddingHorizontal: 8,
                    paddingVertical: 8
                }}>
                    {listCost.products.filter(el => el.select).map((product, index) => (
                        <Product index={index} service={product} key={index} divider={(listCost.products.length - 1) !== index} />
                    ))}
                </View>
            </ScrollView>
        </View>
        <Actions />
    </View>)
}