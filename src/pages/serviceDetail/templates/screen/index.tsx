import { ScrollView, Text, View } from "react-native";
import { Card, IconButton, TextInput, Checkbox, Button, List } from "react-native-paper";
import { RouteProp, useRoute } from "@react-navigation/native";
import SubTitle from "../../../../components/subTitle";
import Input from "../../../../components/input";
import { useContext, useEffect } from "react";
import { FieldsContext } from "../../contexts/fields";
import { FieldsProps, ServiceDetailProps } from "../../types";
import Actions from "../actions";
import useFindCarByPlate from "../../hooks/useFindCarByPlate";
import useFind from "../../hooks/useFind";
import { apiUrl } from "../../../../services/apiUrl";
import { ModalContext } from "../../contexts/modal";
import useFindTypeService from "../../hooks/useFindTypeService";

type ServiceDetailRProps = {
    editarService: {
        id: number
    }
}

type ServiceDetailRouteProps = RouteProp<ServiceDetailRProps, 'editarService'>

export default function Screen() {

    const route = useRoute<ServiceDetailRouteProps>()
    const { onChangeField, fields, pickImage, onDeleteImg, total, handleSetAllFields } = useContext(FieldsContext)
    const { handleFind } = useFindCarByPlate()
    const { handleFind: handleFindService } = useFind()
    const { handleFindTypeService } = useFindTypeService()

    useEffect(() => {
        if (!!route.params?.id) {
            handleFindService({
                id: route.params.id
            })
        } else {
            (async() => {
                const typeService = await handleFindTypeService()
                const newFields: FieldsProps = {
                    ...fields,
                    typeService: typeService
                }
                handleSetAllFields(newFields)
            })()
        }
    }, [])
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
                height: fields.id ? 50 : 30,
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
                elevation: 10,
                borderRadius: 8,
                width: "80%",
                padding: 8

            }}>
                <View style={{ flexDirection: "row" }}>
                    <Text style={{
                        fontSize: 14,
                        color: "#1B1C1F",
                        fontWeight: "600"
                    }}>Total: </Text>
                    <Text style={{
                        fontSize: 14,
                        color: "#1B1C1F",
                        fontWeight: "400"
                    }}>{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(total)}</Text>
                </View>
                <View style={{ flexDirection: "row" }}>
                    <Text style={{
                        fontSize: 14,
                        color: "#1B1C1F",
                        fontWeight: "600"
                    }}>Qtd: </Text>
                    <Text style={{
                        fontSize: 14,
                        color: "#1B1C1F",
                        fontWeight: "400"
                    }}>{fields.serviceDetail.length}</Text>
                </View>
                {fields?.createdAt &&
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
                        }}>{new Intl.DateTimeFormat('pt-BR', {
                            dateStyle: 'short',
                            timeStyle: 'medium',
                        }).format(new Date(fields?.createdAt))}</Text>
                    </View>

                }
                {fields?.updatedAt &&
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
                        }}>{new Intl.DateTimeFormat('pt-BR', {
                            dateStyle: 'short',
                            timeStyle: 'medium',
                            timeZone: 'GMT'
                        }).format(new Date(fields?.updatedAt))}</Text>
                    </View>

                }

            </View>
        </View>
        <View style={{
            paddingHorizontal: 8,
            marginTop: fields.id ? 60 : 40,
            flex: 1
        }}>
            <ScrollView>
                <View style={{
                    flexDirection: "row"
                }}>
                    <SubTitle text="Dados do veículo e cliente" />
                </View>
                <View style={{
                    gap: 8,
                    paddingHorizontal: 8,
                    marginVertical: 8,
                }}>
                    <Input
                        {...fields.name}
                        label={"Nome"}
                        disabled={(!!fields.id || !!fields.idClient)}
                        onChangeText={value => onChangeField({ value, field: "name" })}
                    />
                    <Input
                        {...fields.phone}
                        label={"Telefone"}
                        keyboardType="numeric"
                        maxLength={11}
                        disabled={(!!fields.id || !!fields.idClient)}
                        onChangeText={value => onChangeField({ value, field: "phone" })}
                    />
                    <Input
                        {...fields.description}
                        label={"Carro"}
                        onChangeText={value => onChangeField({ value, field: "description" })}
                    />
                    <Input
                        {...fields.plate}
                        maxLength={7}
                        disabled={!!fields.id}
                        label={"Placa"}
                        onChangeText={value => onChangeField({ value, field: "plate" })}
                        right={<TextInput.Icon icon={"magnify"} onPress={() => handleFind()} />}
                    />
                    <View style={{
                        flex: 1,
                        flexDirection: "row",
                        alignItems: "center",
                        paddingHorizontal: 16
                    }}>
                        <IconButton icon={"camera-plus"} onPress={pickImage} />
                        <ScrollView
                            horizontal={true}
                            style={{
                                padding: 8
                            }}
                        >
                            {fields.images.map((img, i) => !img.deleted && (
                                <View key={i} style={{
                                    position: "relative"
                                }}>
                                    <View style={{
                                        position: "absolute",
                                        right: 5,
                                        top: -13,
                                        zIndex: 10000
                                    }}>

                                        <IconButton iconColor={"#ba2222"} icon={"close-thick"} onPress={() => onDeleteImg({ i })} />
                                    </View>
                                    <Card style={{ width: 100, height: 100, marginRight: 16, }}>
                                        <Card.Cover source={{ uri: img?.id ? `${apiUrl}/files/${img.uri}` : img.uri }} style={{ height: 100 }} />
                                    </Card>
                                </View>
                            ))}

                        </ScrollView>
                    </View>
                </View>
                <View style={{
                    flexDirection: "row",
                    justifyContent: "space-between"
                }}>
                    <SubTitle text="Dados do serviço" />
                </View>

                <View style={{
                    gap: 16,
                    paddingHorizontal: 8,
                    marginVertical: 8,
                    marginBottom: 16
                }}>
                    {fields.serviceDetail.map((service, index) => !service.deleted && (<Service {...service} index={index} key={index} />))}
                </View>
            </ScrollView>
        </View>
        <Actions />
    </View>)
}


function Service({ description, index, price, images, typeService, parts, obs, customerParts, pressDelete, partsList, date
}: ServiceDetailProps & { index: number }) {

    const { fields, onChangeFieldServiceDetail, pickImageService, onDeleteServiceImg, handleDeleteService, valueTypeService, toggleCustomerParts, toggleDelete } = useContext(FieldsContext)
    const { showModal, showModalParts } = useContext(ModalContext)
    const naSelected = typeService === 0
    const partsListsFilter = partsList?.filter(el => !el.deleted)
    const totalParts = partsListsFilter?.reduce((accumulator, currentValue) => Number(accumulator) + Number(currentValue.price.value), 0)
    const descriptionAccordion = Number(price.value) + Number(parts.value) + (totalParts && !customerParts ? totalParts : 0)



    return (
        <>
            <View style={{
                flexDirection: "row",
                alignItems: "center",
                ...(pressDelete && {
                    backgroundColor: "rgba(28, 27, 31, 0.139)",
                    padding: 8,
                    borderRadius: 8
                })
            }}>
                {pressDelete &&
                    <IconButton icon={"close"} iconColor="#000" onPress={() => toggleDelete(index)} />
                }
                {pressDelete && fields.serviceDetail.length > 1 ?
                    <IconButton icon={"delete"} iconColor="#ff0000" onPress={() => handleDeleteService({ index })} />
                    : null}
                <View style={{
                    backgroundColor: "#ffffff",
                    shadowColor: '#171717',
                    shadowOffset: { width: -2, height: 4 },
                    shadowOpacity: 0.2,
                    shadowRadius: 3,
                    elevation: 5,
                    padding: 8,
                    borderRadius: 8,
                    // width: "100%"
                    flex: 1
                }}>
                    <List.Accordion
                        titleStyle={{
                            color: "#1B1C1F"
                        }}
                        rippleColor={"#1B1C1F"}
                        style={{
                            paddingVertical: 0,
                            backgroundColor: "#fff",
                        }}
                        onLongPress={() => {
                            toggleDelete(index)
                        }}
                        title={`Manutenção ${index + 1}`}
                        description={`${new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(descriptionAccordion)}${fields.id && date ? " - " + new Intl.DateTimeFormat('pt-BR', {
                            dateStyle: 'short',
                            timeStyle: 'medium',
                        }).format(date) : ""}`}
                    >
                        <View style={{
                            gap: 8
                        }}>

                            <Input
                                label={"Tipo de serviço"}
                                error={false}
                                helperText=""
                                value={valueTypeService(typeService)}
                                disabled={true}
                                right={<TextInput.Icon icon={"menu-down"} onPress={() => {
                                    showModal(index)
                                }} />}
                            />
                            {naSelected && <Input
                                {...description}
                                label={"Descrição"}
                                onChangeText={value => onChangeFieldServiceDetail({ value, field: "description", index })}
                            />}
                            <View style={{
                                borderRadius: 4,
                                borderColor: "rgb(142, 142, 143)",
                                borderWidth: 1,
                                paddingHorizontal: 16,
                                marginTop: 8,
                                position: "relative"
                            }}>
                                <Text style={{
                                    position: "absolute",
                                    paddingHorizontal: 8,
                                    top: -10,
                                    left: 8,
                                    backgroundColor: "#fff",
                                    color: "#1B1C1F",
                                    fontSize: 12
                                }}>
                                    Antes
                                </Text>

                                <View style={{
                                    flex: 1,
                                    flexDirection: "row",
                                    alignItems: "center"
                                }}>
                                    <IconButton icon={"camera-plus"} onPress={() => pickImageService({
                                        index,
                                        before: true
                                    })} />
                                    <ScrollView
                                        horizontal={true}
                                        style={{
                                            padding: 8
                                        }}
                                    >
                                        {images.map((img, i) => {
                                            return img.before && !img.deleted ? (
                                                <View key={i} style={{
                                                    position: "relative"
                                                }}>
                                                    <View style={{
                                                        position: "absolute",
                                                        right: 5,
                                                        top: -13,
                                                        zIndex: 10000
                                                    }}>

                                                        <IconButton iconColor={"#ba2222"} icon={"close-thick"} onPress={() => onDeleteServiceImg({ i, index })} />
                                                    </View>
                                                    <Card style={{ width: 100, height: 100, marginRight: 16, }}>
                                                        <Card.Cover source={{ uri: img?.id ? `${apiUrl}/files/${img.uri}` : img.uri }} style={{ height: 100, width: 100 }} />
                                                    </Card>
                                                </View>
                                            ) : null
                                        })}
                                    </ScrollView>
                                </View>
                            </View>
                            <View style={{
                                borderRadius: 4,
                                borderColor: "rgb(142, 142, 143)",
                                borderWidth: 1,
                                paddingHorizontal: 16,
                                marginTop: 8,
                                position: "relative"
                            }}>
                                <Text style={{
                                    position: "absolute",
                                    paddingHorizontal: 8,
                                    top: -10,
                                    left: 8,
                                    backgroundColor: "#fff",
                                    color: "#1B1C1F",
                                    fontSize: 12
                                }}>
                                    Depois
                                </Text>

                                <View style={{
                                    flex: 1,
                                    flexDirection: "row",
                                    alignItems: "center"
                                }}>
                                    <IconButton icon={"camera-plus"} onPress={() => pickImageService({
                                        index,
                                    })} />
                                    <ScrollView
                                        horizontal={true}
                                        style={{
                                            padding: 8
                                        }}
                                    >
                                        {images.map((img, i) => !img.before && !img.deleted ? (
                                            <View key={i} style={{
                                                position: "relative"
                                            }}>
                                                <View style={{
                                                    position: "absolute",
                                                    right: 5,
                                                    top: -13,
                                                    zIndex: 10000
                                                }}>

                                                    <IconButton iconColor={"#ba2222"} icon={"close-thick"} onPress={() => onDeleteServiceImg({ i, index })} />
                                                </View>
                                                <Card style={{ width: 100, height: 100, marginRight: 16, }}>
                                                    <Card.Cover source={{ uri: img?.id ? `${apiUrl}/files/${img.uri}` : img.uri }} style={{ height: 100 }} />
                                                </Card>
                                            </View>
                                        ) : null)}
                                    </ScrollView>
                                </View>
                            </View>
                            <Input
                                {...obs}
                                multiline
                                label={"Observações"}
                                onChangeText={value => onChangeFieldServiceDetail({ value: value, field: "obs", index })}
                            />
                            <View style={{
                                flexDirection: "row",
                                justifyContent: "space-between",
                                alignItems: "center"
                            }}>
                                <Checkbox.Item
                                    label="Peças do cliente"
                                    status={customerParts ? 'checked' : "unchecked"}
                                    color="#1c1b1f"
                                    onPress={() => toggleCustomerParts(index)}
                                />
                                {!customerParts &&
                                    <View>
                                        <Button buttonColor="rgba(28, 27, 31, 0.439)" mode="contained" textColor="#1c1b1f" onPress={() => showModalParts(index)}>
                                            {partsListsFilter?.length ? `${partsListsFilter?.length} Peças` : "Peças"}
                                        </Button>
                                    </View>
                                }
                            </View>
                            <View style={{
                                flexDirection: "row",
                                justifyContent: "space-between",
                                gap: 8
                            }}>
                                <View style={{
                                    flex: 1,
                                }}>
                                    <Input
                                        {...price}
                                        label={"Mão de obra"}
                                        keyboardType="numeric"
                                        left={<TextInput.Affix text="R$" />}
                                        onChangeText={value => onChangeFieldServiceDetail({ value: value.replace(/[^0-9\.]+/g, ""), field: "price", index })}
                                    />
                                </View>
                                {!customerParts && <View style={{
                                    flex: 1
                                }}>
                                    <Input
                                        {...parts}
                                        value={totalParts ? String(totalParts) : "0"}
                                        disabled={true}
                                        label={"Peças"}
                                        left={<TextInput.Affix text="R$" />}
                                        keyboardType="numeric"
                                        onChangeText={value => onChangeFieldServiceDetail({ value: value.replace(/[^0-9\.]+/g, ""), field: "parts", index })}
                                    />
                                </View>}
                            </View>
                        </View>
                    </List.Accordion>
                </View>
            </View>
        </>
    )
}
