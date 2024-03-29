import { useContext } from "react";
import { Checkbox, IconButton, Modal, Text } from "react-native-paper";
import { FieldsContext } from "../../contexts/fields";
import { ScrollView, View } from "react-native";

export default function ModalServiceType({ visible, hideModal, index }: { visible: boolean; hideModal: () => void; index: number }) {

    const containerStyle = { backgroundColor: 'white', padding: 20 };
    const { fields, handleTypeService } = useContext(FieldsContext)

    const typeService = fields.serviceDetail[index].typeService

    return <Modal style={{
        paddingHorizontal: 8
    }} visible={visible} onDismiss={hideModal} contentContainerStyle={containerStyle}>
        <View style={{
            justifyContent: "space-between",
            flexDirection: "row",
            alignItems: "center"
        }}>
            <Text style={{
                fontSize: 18,
                fontWeight: "800"
            }}>Selecione um tipo de serviço:</Text>
            <IconButton icon={"close"} onPress={hideModal} />
        </View>
        <ScrollView>
            <Checkbox.Item
                label="N/A"
                color="#1c1b1f"
                status={typeService === 0 ? 'checked' : "unchecked"}
                onPress={() => {
                    if (typeService != 0) {
                        handleTypeService({
                            index,
                            value: 0
                        })
                        hideModal()
                    }
                }}
            />
            {fields.typeService.map((type, i) => (
                <Checkbox.Item
                    key={i}
                    label={type.description}
                    color="#1c1b1f"
                    status={typeService == type?.id ? 'checked' : "unchecked"}
                    onPress={() => {
                        if (typeService != type?.id) {
                            handleTypeService({
                                index,
                                value: Number(type?.id)
                            })
                            hideModal()

                        } else {
                            hideModal()
                        }
                    }}
                />
            ))}
        </ScrollView>

    </Modal>
}