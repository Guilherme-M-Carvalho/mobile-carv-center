import { useContext, useState } from "react";
import { Divider, IconButton, Modal, Text, TextInput } from "react-native-paper";
import { FieldsContext } from "../../contexts/fields";
import { ScrollView, View } from "react-native";
import Input from "../../../../components/input";
import { InputProps } from "../../../../types";

export default function ModalParts({ visible, hideModal, index }: { visible: boolean; hideModal: () => void; index: number }) {

    const { fields, handleAddParts, deletePartsList, changePartsList } = useContext(FieldsContext)

    const [add, setAdd] = useState<{ part: InputProps; price: InputProps }>({
        part: {
            error: false,
            helperText: "",
            value: ""
        },
        price: {
            error: false,
            helperText: "",
            value: ""
        }
    })

    return <Modal style={{
        paddingHorizontal: 8,
    }} visible={visible} onDismiss={hideModal} contentContainerStyle={{ backgroundColor: 'white', padding: 20, minHeight: "95%", gap: 8 }}>
        <View style={{
            justifyContent: "space-between",
            flexDirection: "row",
            alignItems: "center",
        }}>
            <Text style={{
                fontSize: 18,
                fontWeight: "800"
            }}>Peças da Manutenção {index + 1}</Text>

            <IconButton icon={"close"} onPress={hideModal} />
        </View>
        <View style={{
            justifyContent: "space-between",
            flexDirection: "row",
            alignItems: "center",
            gap: 8,
        }}>
            <View style={{
                flex: 1,
            }}>
                <Input
                    label={"Peça"}
                    {...add.part}
                    onChangeText={(text) => setAdd(obj => {
                        obj.part.value = text
                        return {
                            ...obj
                        }
                    })}
                />
            </View>
            <View style={{
                flex: 1
            }}>
                <Input
                    left={<TextInput.Affix text="R$" />}
                    keyboardType="numeric"
                    label={"Preço"}
                    {...add.price}
                    onChangeText={(text) => setAdd(obj => {
                        obj.price.value = text
                        return {
                            ...obj
                        }
                    })}
                />
            </View>
            <IconButton icon={"plus"} onPress={() => {
                setAdd({
                    part: {
                        error: false,
                        helperText: "",
                        value: ""
                    },
                    price: {
                        error: false,
                        helperText: "",
                        value: ""
                    }
                });
                handleAddParts({ parts: add.part.value, index, price: add.price.value })
            }} />
        </View>
        <Divider />
        <ScrollView style={{
        }}>
            {fields.serviceDetail[index]?.partsList?.map((part, i) => !part.deleted && (
                <View style={{
                    gap: 8,
                    marginTop: 8
                }} key={i}>

                    <View style={{
                        flexDirection: "row",
                        gap: 8
                    }}>
                        <View style={{
                            flex: 1
                        }}>
                            <Input
                                label={"Peça"}
                                {...part.part}
                                onChangeText={(text) => changePartsList({
                                    field: "part",
                                    value: text,
                                    i,
                                    index
                                })}
                            />
                        </View>
                        <View style={{
                            flex: 1
                        }}>
                            <Input
                                left={<TextInput.Affix text="R$" />}
                                keyboardType="numeric"
                                label={"Preço"}
                                {...part.price}
                                onChangeText={(text) => changePartsList({
                                    field: "price",
                                    value: text,
                                    i,
                                    index
                                })}
                            />
                        </View>
                        <IconButton icon={"delete"} iconColor="#ff0000" onPress={() => deletePartsList({ index, i })} />
                    </View>
                    <Divider />

                </View>
            ))}
        </ScrollView>
    </Modal>
}