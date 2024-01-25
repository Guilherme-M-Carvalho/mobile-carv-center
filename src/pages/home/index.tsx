import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native'
import React, { useContext, useEffect, useRef, useState } from 'react'
import { AuthContext } from '../../contexts/AuthContext'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { BottomNavigationParamsList } from '../../routes/app.routes'
import { Menu, Divider, Avatar, IconButton, PaperProvider, Icon, Badge, Button } from 'react-native-paper';
import { Dimensions } from 'react-native';
import { Chip } from 'react-native-paper';
import DatePicker from 'react-native-date-picker'
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function Home() {

  const navigation = useNavigation<NativeStackNavigationProp<BottomNavigationParamsList>>()

  const { signOut, user } = useContext(AuthContext)
  const [visible, setVisible] = useState(false);

  const openMenu = () => setVisible(true);

  const closeMenu = () => setVisible(false);

  const ref = useRef<any>()

  const [x, SetX] = useState<number>((windowWidth / 2))

  useEffect(() => {
    SetX(windowWidth - ref?.current?.offsetWidth - 200)
  }, [ref.current])

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <View style={{
        padding: 16,
        paddingBottom: 52,
        backgroundColor: "rgb(28, 27, 31)",
        justifyContent: "space-between",
        flexDirection: "row",
        alignItems: "center"
      }}>
        <Text style={{
          color: "#fff",
          fontSize: 16,
          fontWeight: "600",
          flex: 1
        }}>Olá, {user.name}</Text>
        <IconButton
          size={12}
          ref={ref}
          iconColor='#fff'
          containerColor='#fff'
          icon={() => <Text style={{
            fontWeight: "600"
          }}>{user.name[0]}</Text>}
          onPress={openMenu}
        />
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
          }}>
          <Menu
            contentStyle={{
              backgroundColor: "#fff"
            }}
            style={{
              zIndex: 11
            }}
            visible={visible}
            onDismiss={closeMenu}
            anchor={{
              x: x,
              y: 20
            }}>
            {/* <Menu.Item onPress={() => { }} title="Item 1" />
            <Menu.Item onPress={() => { }} title="Item 2" /> */}
            {/* <Divider /> */}
            <Menu.Item onPress={signOut} title="Sair" leadingIcon={"logout"} />
          </Menu>
        </View>
      </View>
      <View style={{
        position: "relative",
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}>
        <View style={{
          backgroundColor: "#ffffff",
          position: "absolute",
          top: -40,
          zIndex: 10,
          flex: 1,
          shadowColor: "rgba(0,0,0,.175)",
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowRadius: 4,
          shadowOpacity: 4,
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
            }).format(new Date())}</Text>} />
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
                  color={"rgba(28, 27, 31)"}
                  size={28}
                />
                <Badge style={{
                  position: "absolute",
                  right: -9,
                  top: -9
                }} size={18}>3</Badge>
              </View>
              <Text style={{
                fontWeight: "800",
                fontSize: 12,
                paddingRight: 16,
                color: "rgba(28, 27, 31)"
              }}>Vendas</Text>
            </View>
            <Text style={{
              fontWeight: "800",
              fontSize: 18,
              paddingRight: 16,
              color: "rgba(28, 27, 31)"
            }}>R$ 300</Text>
          </View>
          <TouchableOpacity style={{
            backgroundColor: "#1c1b1f",
            justifyContent: "center",
            alignItems: "center",
            padding: 6,
            borderRadius: 8
          }}> <Text style={{
            color: "#fff",
          }}>
              Alterar Data
            </Text>
          </TouchableOpacity>
        </View>
        <ScrollView style={{
          paddingHorizontal: 16,
          marginTop: 116,
          flex: 1,
          width: "100%"
        }}>
          <DatePicker
            modal
            date={new Date()}
            mode="date"
          />
          <Text>Home</Text>
        </ScrollView>
      </View>
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