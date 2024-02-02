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

    return (<View style={{
        flex: 1,
        backgroundColor: "#fff"
    }}>
        <View style={{
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
                        label={"Quantidade"}
                        keyboardType="numeric"
                        onChangeText={value => onChangeFields({ value: value.replace(/[^0-9\.]+/g, ""), field: "amount", })}
                    />
                    <Input
                        {...fields.price}
                        label={"Valor"}
                        keyboardType="numeric"
                        left={<TextInput.Affix
                            text="R$" />}
                        onChangeText={value => onChangeFields({ value: value.replace(/[^0-9\.]+/g, ""), field: "price" })}
                    />
                </View>
            </ScrollView>
            <Actions />
        </View>
    </View>)
}