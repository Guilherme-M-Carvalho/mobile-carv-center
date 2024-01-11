import { View, Text, TouchableOpacity } from 'react-native'
import React, { useContext } from 'react'
import { AuthContext } from '../../contexts/AuthContext'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { BottomNavigationParamsList } from '../../routes/app.routes'


export default function Home() {

  const navigation = useNavigation<NativeStackNavigationProp<BottomNavigationParamsList>>()

  const { signOut } = useContext(AuthContext)

  return (
    <View>
      <Text>Home</Text>
      <TouchableOpacity onPress={signOut}>
        <Text>
          Sair
        </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("service")}>
        <Text>
          Service
        </Text>
      </TouchableOpacity>
    </View>
  )
}