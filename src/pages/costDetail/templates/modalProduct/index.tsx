import { View, Text } from "react-native";
import { Checkbox, IconButton, Modal, TextInput, Tooltip } from "react-native-paper";
import Input from "../../../../components/input";
import { useContext } from "react";
import { FieldsContext } from "../../contexts/fields";
import useCreateProducts from "../../hooks/useCreateProducts";
import { ModalContext } from "../../contexts/modals";

export default function ModalProduct() {

    const { handleHideProduct: hideModal, modalProduct: visible } = useContext(ModalContext)
    const { fields, onChangeFields, handleToggleCheck } = useContext(FieldsContext)
    const { handleSave } = useCreateProducts()
    const costUnit = (Number(fields.price.value) / Number(fields.amount.value)) || 0

    return <Modal style={{
        paddingHorizontal: 8,
    }} visible={visible} onDismiss={hideModal} contentContainerStyle={{ backgroundColor: 'white', padding: 8, height: "95%", gap: 8, display: "flex", justifyContent: "flex-start" }}>
        <View style={{
            justifyContent: "space-between",
            flexDirection: "row",
            paddingHorizontal: 8,
        }}>
            <View style={{
                flexDirection: "row",
                flex: 1,
            }}>
                <Text style={{
                    fontSize: 18,
                    fontWeight: "800"
                }}>Adicionar produtos</Text>
            </View>
            <View style={{
                flexDirection: "row",
                gap: 8,
                justifyContent: "flex-end",
            }}>
                <Tooltip title="Cancelar">
                    <IconButton size={18} style={{
                        margin: 0
                    }} icon={"close"} onPress={hideModal} />
                </Tooltip>
                <Tooltip title="Salvar">
                    <IconButton size={18} style={{
                        margin: 0
                    }} icon={"check"} onPress={handleSave} />
                </Tooltip>
            </View>
        </View>
        <View style={{
            paddingHorizontal: 8,
            gap: 8
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
                }}>{"Custo unitário"}</Text>
                <Text style={{
                    fontWeight: "800",
                    fontSize: 18,
                    color: "#1B1C1F"
                }}>{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(costUnit)}</Text>
            </View>

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
            <View>
                <Checkbox.Item onPress={handleToggleCheck} label="Alterar o valor unitário de todos produtos em estoque?" color={"#171717"} status={fields.changeAllProducts ? "checked" : "unchecked"} />
            </View>
        </View>
    </Modal>
}





