import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, Image } from 'react-native';
import {Picker} from '@react-native-picker/picker';

export default function App() {
  const [summa, setSumma] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState();
  const [muunnos, setMuunnos] = useState();
  const [valuutat1, setValuutat1] = useState();

  const haeValuutat = () => {
    fetch('http://api.exchangeratesapi.io/v1/latest?access_key=02c3d5d46666633de5b4773701289149&format=1')
    .then(response => response.json())
    .then(responseJson =>  setValuutat1(responseJson.items))
    .catch(error => { 
        Alert.alert('Error', error.message);
    });    
  }

  

  const convertValue = () => {
    const [valuutta] = [Number(valuutta)]
    setMuunnos(summa/selectedLanguage)
  }

const valuutat = [

    { name: 'AUD', extension: 1.547854 },
    { name: 'GBP', extension: 0.855877 },
    { name: 'USD', extension: 1.155263 },
    { name: 'JPY', extension: 131.024147 },
    { name: 'CNY', extension: 7.392414 },
  ];

console.log(Object.keys(haeValuutat));

  return (
    <View style={styles.container}>

<Image style={{  width:250, height:100 }}source={{  uri: 'https://www.southampton-airport-guide.co.uk/content/uploads/sites/5/2018/04/currency-1680786_1280.png'}} />

      <Text>  </Text>
      <Button title="fetch" onPress={haeValuutat} />
      <Text> {muunnos} € </Text>

      <TextInput style={{fontSize: 18, width: 200}} placeholder='€' 
        onChangeText={text => setSumma(text)} />

      <Picker
        selectedValue={selectedLanguage}
        style={{ height: 50, width: 200 }}
        onValueChange={(itemValue, itemIndex) => {
          if (itemIndex != 0) {
            setSelectedLanguage(itemValue)
          }
        }}>
        <Picker.Item label="Valitse valuutta" value="" />
        <Picker.Item label="EUR = default" value= '1' />
        {valuutat.map(valuutta => (<Picker.Item label={valuutta.name} value={valuutta.extension} key={valuutta.name} />))}
      </Picker>

      <Button title="Convert" onPress={convertValue} />

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
