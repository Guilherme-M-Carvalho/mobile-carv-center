import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useIsFocused, useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { BottomNavigationParamsList } from '../../routes/app.routes'
import { Icon, Badge, IconButton } from 'react-native-paper';
import { Chip } from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';
import useFind from './hooks/useFind'
import { VictoryChart, VictoryGroup, VictoryLabel, VictoryLegend, VictoryBar, VictoryTheme, VictoryTooltip, VictoryVoronoiContainer, VictoryLine } from 'victory-native'
import SubTitle from '../../components/subTitle'
import useFindReport from './hooks/useFindReport'


export default function Home() {

  const [date, setDate] = useState<Date | undefined>(new Date())
  const [dateReport, setDateReport] = useState<{ start?: Date; end?: Date; visibleStart: boolean; visibleEnd: boolean }>({ start: new Date(), end: new Date(), visibleEnd: false, visibleStart: false })
  const [visibleDate, setVisibleDate] = useState<boolean>(false)


  const navigation = useNavigation<NativeStackNavigationProp<BottomNavigationParamsList>>()

  const isFocused = useIsFocused();

  const { handleFind, home } = useFind()
  const { handleFindReport, report } = useFindReport()

  useEffect(() => {
    if (isFocused && date) {
      handleFind({ date })
    }
    if (isFocused && dateReport.start && dateReport.end) {
      handleFindReport({ start: dateReport.start, end: dateReport.end })
    }
  }, [isFocused])

  useEffect(() => {
    if (date) {
      handleFind({ date })
    }
  }, [date])


  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <View style={{
        position: "relative",
        flex: 1,
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
            <Chip icon={() => <Icon
              source="calendar-alert"
              color={"#000"}
              size={18}
            />} style={{ backgroundColor: "rgba(28, 27, 31, 0.439)" }} children={<Text style={{
              fontSize: 10,
              fontWeight: "600",
              color: "#000"
            }}>{new Intl.DateTimeFormat('pt-BR', {
              dateStyle: 'medium',
            }).format(date ? date : new Date())}</Text>} />
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
                <Badge style={{
                  position: "absolute",
                  right: -9,
                  top: -9
                }} size={18}>{home.count}</Badge>
              </View>
              <Text style={{
                fontWeight: "800",
                fontSize: 12,
                paddingRight: 16,
                color: "#1B1C1F"
              }}>Vendas</Text>
            </View>
            <Text style={{
              fontWeight: "800",
              fontSize: 18,
              color: "#1B1C1F"
            }}>{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(home.total)}</Text>
          </View>
          <TouchableOpacity style={{
            backgroundColor: "#1c1b1f",
            justifyContent: "center",
            alignItems: "center",
            padding: 6,
            borderRadius: 8
          }} onPress={() => setVisibleDate(true)}>
            <Text style={{
              color: "#fff",
            }}>
              Escolher Data
            </Text>
          </TouchableOpacity>

        </View>
        <ScrollView style={{
          paddingHorizontal: 8,
          marginTop: 91,
          flex: 1,
          width: "100%"
        }}>
          <View style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}>
            <SubTitle text="Relatório" />
            <IconButton onPress={() => {
              if (dateReport.start && dateReport.end) {
                handleFindReport({ start: dateReport.start, end: dateReport.end })
              }
            }} iconColor='#1B1C1F' icon={"magnify"} />
          </View>
          <View style={{
            justifyContent: "space-between",
            flexDirection: "row",
            paddingHorizontal: 8
          }}>
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

        </ScrollView>
      </View>
      {visibleDate &&
        <DateTimePicker
          onChange={(e, date) => {
            const {
              type,
              nativeEvent
            } = e;
            setDate(date);

            if (type == "dismissed" || type == "set") {

              setVisibleDate(false)
            }
          }}
          // display='calendar'
          value={date ? date : new Date()}
          mode={"date"}
        />
      }
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
    </View >
  )
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
  },
  video: {
    alignSelf: 'center',
    width: 320,
    height: 200,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});