import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import Input from "../../../../components/input";
import SubTitle from "../../../../components/subTitle";
import { TextInput, List, Divider, Button, Checkbox, IconButton, Tooltip } from "react-native-paper";
import { RouteProp, useRoute } from "@react-navigation/native";
import { useContext, useEffect } from "react";
import useFind from "../../hooks/useFind";
import { FieldsContext } from "../../contexts/fields";
import Actions from "../actions";
import { ModalContext } from "../../contexts/modals";
import useChangePrice from "../../hooks/useChangePrice";
import useDeleteProduct from "../../hooks/useDeleteProduct";


type CostDetailRProps = {
    editarCost: {
        id: number
    }
}

type CostDetailRouteProps = RouteProp<CostDetailRProps, 'editarCost'>

export default function Screen() {


    const { fields, onChangeFields, handleToggleCheck, handleToggleCheckHistory } = useContext(FieldsContext)
    const { handleVisibleProduct } = useContext(ModalContext)
    const { handleSavePrice } = useChangePrice()
    const route = useRoute<CostDetailRouteProps>()
    const { handleFind } = useFind()
    const { handleDelete } = useDeleteProduct()

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
                height: fields.id ? 75 : 25,
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
                height: fields.id ? 150 : 55,
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
                    }}>{fields.id ? "Último custo unitário" : "Custo unitário"}</Text>
                    <Text style={{
                        fontWeight: "800",
                        fontSize: 18,
                        color: "#1B1C1F"
                    }}>{!fields?.id ? new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(costUnit) : new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(Number(fields.lastPriceResale))}</Text>
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
                    }}>Quantidade em estoque</Text>
                    <Text style={{
                        fontWeight: "800",
                        fontSize: 18,
                        color: "#1B1C1F"
                    }}>{fields.costHitory.reduce((acc, val) => acc + Number(val.amountStock), 0)}</Text>
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
                {fields.id && <TouchableOpacity style={{
                    backgroundColor: "#1c1b1f",
                    justifyContent: "center",
                    alignItems: "center",
                    padding: 6,
                    borderRadius: 8
                }} onPress={handleVisibleProduct}>
                    <Text style={{
                        color: "#fff",
                    }}>
                        Adicionar mais produtos
                    </Text>
                </TouchableOpacity>}
            </View>
        </View>
        <View style={{
            marginTop: fields.id ? 75 : 36,
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
                    {!fields.id && <>
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
                    </>}
                    {fields.id && <View style={{
                        flexDirection: "row"
                    }}>
                        <SubTitle text="Histórico" />
                    </View>}
                    {fields.costHitory.map((el, index) => (
                        <View key={index} style={{
                            backgroundColor: "#fff",
                            shadowColor: '#171717',
                            shadowOffset: { width: -2, height: 4 },
                            shadowOpacity: 0.2,
                            shadowRadius: 3,
                            elevation: 2,
                            flexDirection: "row",
                            padding: 8,
                            borderRadius: 8,
                        }}>
                            <View style={{
                                flex: 1,
                            }}>

                                <List.Accordion
                                    description={`Quantidade total cadastrada: ${el.amount}`}
                                    titleStyle={{
                                        color: "#1B1C1F"
                                    }}
                                    rippleColor={"#1B1C1F"}
                                    style={{
                                        paddingVertical: 0,
                                    }}
                                    title={`Custo: ${new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(Number(el.price))}`}
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
                                            }}>Custo unitário: </Text>
                                            <Text style={{
                                                fontSize: 14,
                                                color: "#1B1C1F",
                                                fontWeight: "400"
                                            }}>{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format((Number(el.price) / Number(el.amount)))}</Text>
                                        </View>
                                        <View style={{ flexDirection: "row" }}>
                                            <Text style={{
                                                fontSize: 14,
                                                color: "#1B1C1F",
                                                fontWeight: "600"
                                            }}>Quantidade em estoque: </Text>
                                            <Text style={{
                                                fontSize: 14,
                                                color: "#1B1C1F",
                                                fontWeight: "400"
                                            }}>{el.amountStock}</Text>
                                        </View>
                                        <View style={{ flexDirection: "row" }}>
                                            <Text style={{
                                                fontSize: 14,
                                                color: "#1B1C1F",
                                                fontWeight: "600"
                                            }}>Quantidade vendido: </Text>
                                            <Text style={{
                                                fontSize: 14,
                                                color: "#1B1C1F",
                                                fontWeight: "400"
                                            }}>{el.amountSold}</Text>
                                        </View>
                                        <View style={{ flexDirection: "row" }}>
                                            <Text style={{
                                                fontSize: 14,
                                                color: "#1B1C1F",
                                                fontWeight: "600"
                                            }}>Quantidade excluido: </Text>
                                            <Text style={{
                                                fontSize: 14,
                                                color: "#1B1C1F",
                                                fontWeight: "400"
                                            }}>{el.amountDelete}</Text>
                                        </View>
                                        <View style={{ flexDirection: "row" }}>
                                            <Text style={{
                                                fontSize: 14,
                                                color: "#1B1C1F",
                                                fontWeight: "600"
                                            }}>Total em vendas: </Text>
                                            <Text style={{
                                                fontSize: 14,
                                                color: "#1B1C1F",
                                                fontWeight: "400"
                                            }}>{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(el.totalSold)}</Text>
                                        </View>
                                        {el.priceResale.map(({ amount, price }, i) => (
                                            <View style={{ flexDirection: "row" }} key={i}>
                                                <Text style={{
                                                    fontSize: 14,
                                                    color: "#1B1C1F",
                                                    fontWeight: "600"
                                                }}>{amount} {amount > 1 ? "Produtos" : "Produto"} custando: </Text>
                                                <Text style={{
                                                    fontSize: 14,
                                                    color: "#1B1C1F",
                                                    fontWeight: "400"
                                                }}>{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(Number(price))} cada</Text>
                                            </View>
                                        ))}
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
                                            }).format(new Date(el.created_at))}</Text>
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
                                            }}>{new Intl.DateTimeFormat('pt-BR', {
                                                dateStyle: 'short',
                                                timeStyle: 'medium',
                                            }).format(new Date(el.updated_at))}</Text>
                                        </View>
                                        {!el.changePrice ?
                                            <>
                                                {el.priceResale.length ?
                                                    <>
                                                        <View style={{ flexDirection: "row", paddingTop: 8 }}>
                                                            <TouchableOpacity onPress={() => handleToggleCheckHistory({ index })} style={{
                                                                backgroundColor: "#1c1b1f",
                                                                justifyContent: "center",
                                                                alignItems: "center",
                                                                padding: 6,
                                                                borderRadius: 8,
                                                                flex: 1
                                                            }}>
                                                                <Text style={{
                                                                    color: "#fff",
                                                                }}>
                                                                    Alterar preço de revenda
                                                                </Text>
                                                            </TouchableOpacity>

                                                        </View>
                                                            <Button textColor="rgb(211, 47, 47)" onPress={() => handleDelete({ id: el.id })}>
                                                                Excluir produtos em estoque
                                                            </Button>
                                                    </>
                                                    : null}
                                            </>
                                            : (
                                                <View style={{
                                                    padding: 4,
                                                }}>
                                                    <Divider />
                                                    <View style={{
                                                        flexDirection: "row",
                                                        gap: 8,
                                                        justifyContent: "space-between",
                                                    }}>
                                                        <Tooltip title="Cancelar">
                                                            <IconButton size={18} style={{
                                                                margin: 0
                                                            }} icon={"close"} onPress={() => handleToggleCheckHistory({ index })} />
                                                        </Tooltip>
                                                        <Tooltip title="Salvar">
                                                            <IconButton size={18} style={{
                                                                margin: 0
                                                            }} icon={"check"} onPress={() => handleSavePrice({ id: el.id })} />
                                                        </Tooltip>
                                                    </View>
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
                                            )}
                                    </View>
                                </List.Accordion>
                            </View>
                        </View>
                    ))}
                </View>
            </ScrollView >
        </View >
        <Actions />
    </View >)
}