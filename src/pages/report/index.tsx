import { ScrollView, TouchableOpacity, View } from "react-native";
import { Badge, Chip, Icon, IconButton, Text } from "react-native-paper";
import useFindReport from "./hooks/useFindReport";
import SubTitle from "../../components/subTitle";
import { useEffect, useState } from "react";
import { useIsFocused } from "@react-navigation/native";
import { VictoryChart, VictoryLine, VictoryTheme, VictoryTooltip, VictoryVoronoiContainer } from "victory-native";
import DateTimePicker from '@react-native-community/datetimepicker';

export default function Report() {

    const { handleFindReport, report } = useFindReport()
    const [dateReport, setDateReport] = useState<{ start?: Date; end?: Date; visibleStart: boolean; visibleEnd: boolean }>({ start: new Date(), end: new Date(), visibleEnd: false, visibleStart: false })
    const isFocused = useIsFocused();

    useEffect(() => {
        if (isFocused && dateReport.start && dateReport.end) {
            handleFindReport({ start: dateReport.start, end: dateReport.end })
        }
    }, [isFocused])

    const colors = ["#2bff00", "#ff0000", "#2b00ff", "#29c9cc"]

    return (<View style={{
        backgroundColor: "#fff",
        flex: 1
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
                height: 75,
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
                height: 150,
                flexDirection: "column",
                justifyContent: "space-between"
            }}>
                <View style={{
                    flexDirection: "row",
                    justifyContent: "space-between"
                }}>
                    {/* <Chip icon={() => <Icon
                        source="calendar-alert"
                        color={"#000"}
                        size={18}
                    />} style={{ backgroundColor: "rgba(28, 27, 31, 0.439)" }} children={<Text style={{
                        fontSize: 10,
                        fontWeight: "600",
                        color: "#000"
                    }}>{new Intl.DateTimeFormat('pt-BR', {
                        dateStyle: 'medium',
                    }).format(date ? date : new Date())}</Text>} /> */}
                    <Chip icon={() => <Icon
                        source="currency-usd"
                        color={"#000"}
                        size={18}
                    />} style={{ backgroundColor: "rgba(28, 27, 31, 0.439)" }} children={<Text style={{
                        fontSize: 10,
                        fontWeight: "600",
                        color: "#000"
                    }}>Lucro</Text>} />
                </View>
                <View style={{
                    flexDirection: "row",
                    justifyContent: "space-between"
                }}>
                    <View style={{
                        flexDirection: "row",
                        gap: 8,
                        paddingLeft: 8,
                        alignItems: "center"
                    }}>
                        <View style={{ position: "relative" }}>
                            <Icon
                                source="cart"
                                color={"#1B1C1F"}
                                size={28}
                            />
                            {/* <Badge style={{
                                position: "absolute",
                                right: -9,
                                top: -9
                            }} size={18}>{home.count}</Badge> */}
                        </View>
                        <Text style={{
                            fontWeight: "800",
                            fontSize: 12,
                            paddingRight: 16,
                            color: "#1B1C1F"
                        }}>Vendas</Text>
                    </View>
                    {/* <Text style={{
                        fontWeight: "800",
                        fontSize: 18,
                        color: "#1B1C1F"
                    }}>{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(home.total)}</Text> */}
                </View>
                <TouchableOpacity style={{
                    backgroundColor: "#1c1b1f",
                    justifyContent: "center",
                    alignItems: "center",
                    padding: 6,
                    borderRadius: 8
                }}
                // onPress={() => setVisibleDate(true)}
                >
                    <Text style={{
                        color: "#fff",
                    }}>
                        Escolher Data
                    </Text>
                </TouchableOpacity>
            </View>

        </View>
        <ScrollView style={{
            marginTop: 91,
            flex: 1,
            width: "100%",
            flexDirection: "column"
        }}>
            {/* <View style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
            }}>
                <SubTitle text="Relatório" />

            </View> */}
            <View style={{
                justifyContent: "space-between",
                alignItems: "center",
                flexDirection: "row",
                paddingHorizontal: 16
            }}>
                <View>
                    <Chip onPress={() => {
                        setDateReport(obj => {
                            obj.visibleStart = true
                            return {
                                ...obj
                            }
                        })
                    }} icon={() => <Icon
                        source="calendar-alert"
                        color={"#000"}
                        size={18}
                    />} style={{ backgroundColor: "rgba(28, 27, 31, 0.439)" }} children={<Text style={{
                        fontSize: 10,
                        fontWeight: "600",
                        color: "#000"
                    }}>{new Intl.DateTimeFormat('pt-BR', {
                        dateStyle: 'medium',
                    }).format(dateReport?.start ? dateReport?.start : new Date())}</Text>} />
                </View>
                <View>

                    <Chip onPress={() => {
                        setDateReport(obj => {
                            obj.visibleEnd = true
                            return {
                                ...obj
                            }
                        })
                    }} icon={() => <Icon
                        source="calendar-alert"
                        color={"#000"}
                        size={18}
                    />} style={{ backgroundColor: "rgba(28, 27, 31, 0.439)" }} children={<Text style={{
                        fontSize: 10,
                        fontWeight: "600",
                        color: "#000"
                    }}>{new Intl.DateTimeFormat('pt-BR', {
                        dateStyle: 'medium',
                    }).format(dateReport?.end ? dateReport?.end : new Date())}</Text>} />
                </View>

                <IconButton onPress={() => {
                    if (dateReport.start && dateReport.end) {
                        handleFindReport({ start: dateReport.start, end: dateReport.end })
                    }
                }} iconColor='#1B1C1F' icon={"magnify"} />
            </View>
            {report.chart.map((chart, index) => (
                <View key={index} style={{
                    backgroundColor: "#ffffff",
                    // shadowColor: '#171717',
                    // shadowOffset: { width: -2, height: 4 },
                    // shadowOpacity: 0.2,
                    // shadowRadius: 3,
                    // elevation: 5,
                    borderRadius: 8,
                    // marginBottom: 16,
                    padding: 8,
                    // paddingTop: 16,
                    // marginHorizontal: 16,
                    marginTop: index === 0 ? 16 : 0
                }}>
                    <View style={{
                        flexDirection: "row",
                    }}>

                        <SubTitle text={chart.title} />
                    </View>
                    <VictoryChart
                        theme={VictoryTheme.material}
                        containerComponent={<VictoryVoronoiContainer
                            voronoiDimension="x"
                            labels={(d: any) => { return `${d?.datum?.qtd} ${d?.datum?.legend}\n${new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(d?.datum?.y)}` }}
                            labelComponent={
                                <VictoryTooltip
                                    cornerRadius={0}
                                    flyoutStyle={{
                                        stroke: '#C0AB8E',
                                        fill: '#F0EDE5',
                                    }}
                                    width={400}
                                    renderInPortal={true}
                                />
                            }
                        />}
                        domain={{ y: [chart.domain.min ? (chart.domain.min - 100) : 0, chart.domain.max ? (chart.domain.max + 100) : 100] }}
                        // domainPadding={{ x: 2, y: [-10000, -10000] }}
                        minDomain={{ y: 0, x: 0 }}
                    >
                        <VictoryLine
                            key={index}
                            // domainPadding={{ x: [10, -10], y: 5 }}
                            style={{
                                data: { stroke: colors[index] },
                                parent: { border: "1px solid #ccc" },

                            }}
                            // labels={(el: any) => {
                            //   return `${new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(el?.datum?.y)}`
                            // }}
                            data={chart.chart}
                        />
                    </VictoryChart>
                </View>

            ))}
        </ScrollView>
        {dateReport.visibleStart &&
            <DateTimePicker
                onChange={(e, date) => {
                    const {
                        type,
                        nativeEvent
                    } = e;
                    if (type == "dismissed" || type == "set") {
                        setDateReport(obj => {
                            obj.visibleStart = false
                            obj.start = date
                            return {
                                ...obj
                            }
                        })
                    }
                }}
                // display='calendar'
                value={dateReport.start ? dateReport.start : new Date()}
                mode={"date"}
            />
        }
        {dateReport.visibleEnd &&
            <DateTimePicker
                onChange={(e, date) => {
                    const {
                        type,
                        nativeEvent
                    } = e;
                    if (type == "dismissed" || type == "set") {
                        setDateReport(obj => {
                            obj.visibleEnd = false
                            obj.end = date
                            return {
                                ...obj
                            }
                        })
                    }
                }}
                // display='calendar'
                value={dateReport.end ? dateReport.end : new Date()}
                mode={"date"}
            />
        }
    </View>)
}