import { SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import { AnimatedFAB, Card, Divider, IconButton, MD3Colors, TextInput, Tooltip } from "react-native-paper";
import { LinearGradient } from 'expo-linear-gradient';
import { RouteProp, useRoute } from "@react-navigation/native";
import SubTitle from "../../../../components/subTitle";
import Input from "../../../../components/input";
import { useContext, useEffect } from "react";
import { FieldsContext } from "../../contexts/fields";
import { ServiceDetailProps } from "../../types";
import Actions from "../actions";
import useFindCarByPlate from "../../hooks/useFindCarByPlate";
import useFind from "../../hooks/useFind";
import { apiUrl } from "../../../../services/apiUrl";

type ServiceDetailRProps = {
    editarService: {
        id: number
    }
}

type ServiceDetailRouteProps = RouteProp<ServiceDetailRProps, 'editarService'>

export default function Screen() {

    const route = useRoute<ServiceDetailRouteProps>()


    const { onChangeField, fields, pickImage, onDeleteImg, total } = useContext(FieldsContext)
    const { handleFind } = useFindCarByPlate()
    const { handleFind: handleFindService } = useFind()
    useEffect(() => {
        if (!!route.params?.id) {
            handleFindService({
                id: route.params.id
            })
        }
    }, [])
    return (<View style={{
        flex: 1
    }}>
        <View style={{
            paddingHorizontal: 8,
            flex: 1
        }}>
            {/* {fields.id && */}
            <View style={{
                marginHorizontal: 8,
                marginBottom: 8,
                padding: 8,
                borderWidth: 1,
                borderColor: "rgb(28, 27, 31)",
                backgroundColor: "#fff", borderRadius: 4
            }}>
                <View style={{ flexDirection: "row" }}>
                    <Text style={{
                        fontSize: 14,
                        color: "rgb(28, 27, 31)",
                        fontWeight: "600"
                    }}>Total: </Text>
                    <Text style={{
                        fontSize: 14,
                        color: "rgb(28, 27, 31)",
                        fontWeight: "400"
                    }}> R$ {total}</Text>
                </View>
                <View style={{ flexDirection: "row" }}>
                    <Text style={{
                        fontSize: 14,
                        color: "rgb(28, 27, 31)",
                        fontWeight: "600"
                    }}>Qtd: </Text>
                    <Text style={{
                        fontSize: 14,
                        color: "rgb(28, 27, 31)",
                        fontWeight: "400"
                    }}>{fields.serviceDetail.length}</Text>
                </View>
                {fields?.createdAt &&
                    <View style={{ flexDirection: "row" }}>
                        <Text style={{
                            fontSize: 14,
                            color: "rgb(28, 27, 31)",
                            fontWeight: "600"
                        }}>Criado em: </Text>
                        <Text style={{
                            fontSize: 14,
                            color: "rgb(28, 27, 31)",
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
                            color: "rgb(28, 27, 31)",
                            fontWeight: "600"
                        }}>Alterado em: </Text>
                        <Text style={{
                            fontSize: 14,
                            color: "rgb(28, 27, 31)",
                            fontWeight: "400"
                        }}>{new Intl.DateTimeFormat('pt-BR', {
                            dateStyle: 'short',
                            timeStyle: 'medium',
                            timeZone: 'GMT'
                        }).format(new Date(fields?.updatedAt))}</Text>
                    </View>

                }

            </View>
            <ScrollView>
                <SubTitle text="Dados do veículo" />
                <View style={{
                    gap: 8,
                    paddingHorizontal: 8,
                    marginBottom: 8,
                }}>
                    <Input
                        {...fields.description}
                        label={"Descrição"}
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
                    gap: 8,
                    paddingHorizontal: 8,
                    marginBottom: 8,
                }}>
                    {fields.serviceDetail.map((service, index) => !service.deleted && (<Service {...service} index={index} key={index} />))}
                </View>
            </ScrollView>
            <Actions />
        </View>
    </View>)
}


function Service({ description, index, price, images }: ServiceDetailProps & { index: number }) {

    const { onChangeFieldServiceDetail, pickImageService, onDeleteServiceImg, handleDeleteService } = useContext(FieldsContext)

    return (
        <>
            <Input
                {...description}
                label={"Descrição"}
                onChangeText={value => onChangeFieldServiceDetail({ value, field: "description", index })}
            />
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
                    backgroundColor: "rgb(242 242 242)",
                    color: "rgb(28, 27, 31)",
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
                    backgroundColor: "rgb(242 242 242)",
                    color: "rgb(28, 27, 31)",
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
                {...price}
                label={"Preço"}
                keyboardType="numeric"
                onChangeText={value => onChangeFieldServiceDetail({ value: value.replace(/[^0-9\.]+/g, ""), field: "price", index })}
            />
            <View style={{
                position: "relative",
                justifyContent: "center",
                alignItems: "center",
                marginVertical: 20
            }}>
                {index > 0 &&
                    <View style={{
                        position: "absolute",
                        zIndex: 10000,
                        top: -25,
                    }}>
                        <IconButton containerColor="rgb(242 242 242)" iconColor={"rgb(28, 27, 31)"} icon={"close-thick"} onPress={() => handleDeleteService({ index })} />
                    </View>
                }
                <Divider style={{
                    width: "100%"
                }} />
            </View>

        </>
    )
}