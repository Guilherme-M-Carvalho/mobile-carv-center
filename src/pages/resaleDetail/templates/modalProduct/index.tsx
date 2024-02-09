import { useContext, useState } from "react";
import { Avatar, Button, Divider, Icon, IconButton, List, Modal, Searchbar } from "react-native-paper";
import { ScrollView, Text, View } from "react-native";
import { InputProps } from "../../../../types";
import { FieldsContext } from "../../contexts/fields";
import { CostProps } from "../../types";
import Product from "../product";

export default function ModalProduct({ visible, hideModal }: { visible: boolean; hideModal: () => void; }) {

    const [searchQuery, setSearchQuery] = useState('');
    const { listCost, handleCleanSelect } = useContext(FieldsContext)

    const productsSelected = listCost.products.filter(el => el.select).reduce((acc, val) => acc + Number(val.amountSelect), 0)

    return <Modal style={{
        paddingHorizontal: 8,
    }} visible={visible} onDismiss={hideModal} contentContainerStyle={{ backgroundColor: 'white', padding: 8, height: "95%", gap: 8 }}>
        <View style={{
            justifyContent: "space-between",
            flexDirection: "row",
            alignItems: "center",
            paddingHorizontal: 8,
        }}>
            <View style={{
                flexDirection: "row",
                flex: 1,
            }}>
                <Text style={{
                    fontSize: 18,
                    fontWeight: "800"
                }}>Selecione os produtos</Text>
            </View>
            <View style={{
                flexDirection: "row",
                justifyContent: "flex-end",
            }}>
                <IconButton size={18} style={{
                    margin: 0
                }} icon={"close"} onPress={hideModal} />
            </View>
        </View>
        <View style={{
            paddingHorizontal: 8,
            flexDirection: "row",
        }}>

            <View style={{
                backgroundColor: "#ffffff",
                flex: 1,
                shadowColor: '#171717',
                shadowOffset: { width: -2, height: 4 },
                shadowOpacity: 0.2,
                shadowRadius: 3,
                elevation: 8,
                borderRadius: 28,
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
        {/* <Divider /> */}
        {/* <View style={{
            paddingHorizontal: 8
        }}>
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
                <Text style={{
                    fontSize: 18,
                    fontWeight: "800"
                }}>Peças da Manutenção</Text>
            </View>
        </View> */}
        <ScrollView style={{
        }}>
            <List.Section style={{
                paddingHorizontal: 8,
                gap: 8
            }}>

                {listCost.products.filter((el: any) => {
                    const arr = []
                    Object.keys(el).forEach((key) => {
                        if (searchQuery && String(el[key]).toUpperCase().includes(searchQuery.toUpperCase())) {
                            arr.push(el[key])
                        } else if (!searchQuery) {
                            arr.push(el[key])
                        }
                    })
                    return arr.length
                }).map((service, index) => (service.amountStock > 1 ? <Product
                    divider={(listCost.products.length - 1) !== index}
                    key={index}
                    index={index}
                    service={service}
                /> : null))}
            </List.Section>
        </ScrollView>
        {productsSelected > 0 ? (<View style={{
            marginTop: 8,
            paddingHorizontal: 8,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center"
        }}>
            {productsSelected > 1 ? <Text children={`${productsSelected} Produtos selecionados`} /> : <Text children={`${productsSelected} Produto selecionado`} />}
            <Button textColor="#171717" onPress={handleCleanSelect} >
                Limpar
            </Button>
        </View>) : null}
    </Modal>
}





