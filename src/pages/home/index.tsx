import { View, Text, TouchableOpacity, StyleSheet, Button, Image } from 'react-native'
import React, { useContext, useState } from 'react'
import { AuthContext } from '../../contexts/AuthContext'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { BottomNavigationParamsList } from '../../routes/app.routes'
import * as ImagePicker from 'expo-image-picker';
export default function Home() {

  const navigation = useNavigation<NativeStackNavigationProp<BottomNavigationParamsList>>()

  const { signOut } = useContext(AuthContext)
  const [image, setImage] = useState<any>(null);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log({
      result
    });
    

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  return (
    <View>
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Button title="Pick an image from camera roll" onPress={pickImage} />
        {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
      </View>
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