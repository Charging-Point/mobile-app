import { Button, StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import React, { useLayoutEffect } from 'react';


export default function ConnectorScreen({ navigation }) {

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false
    })
  }, [navigation])

  return (
    <View style={{ flex: 1, paddingVertical: 20, paddingHorizontal: 15 }}>
      <TouchableOpacity style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }} onPress={() => navigation.goBack()}>
        <Image source={require('../assets/images/arrowBack.png')} style={{ width: 25, height: 25 }} />
        <Text style={{ fontSize: 20, fontWeight: '500', marginLeft: 10 }}>Back</Text>
      </TouchableOpacity>
      <Text style={{ fontSize: 20, fontWeight: 'bold', paddingHorizontal: 25, marginTop: 20 }}>Choose Connector :</Text>
      <View style={{ flex: 9, justifyContent: 'center', alignItems: 'center', display: 'flex', flexDirection: 'row', flexWrap: 'wrap', marginTop: 20 }}>

        <TouchableOpacity style={styles.btnConnector} onPress={() => navigation.navigate('ScanDeposit', { connector: 'usb-c' })}>
          <Image source={require('../assets/images/typeC.png')} style={{ width: 60, height: 60 }} />
          <Text style={{ fontSize: 15, fontWeight: 'bold', width: '100%', textAlign: 'center' }}>USB Type-C</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btnConnector} onPress={() => navigation.navigate('ScanDeposit', { connector: 'iphone' })}>
          <Image source={require('../assets/images/iphone.png')} style={{ width: 60, height: 60 }} />
          <Text style={{ fontSize: 15, fontWeight: 'bold', width: '100%', textAlign: 'center' }}>Iphone</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btnConnector} onPress={() => navigation.navigate('ScanDeposit', { connector: 'micro-usb' })}>
          <Image source={require('../assets/images/microUsb.png')} style={{ width: 60, height: 60 }} />
          <Text style={{ fontSize: 15, fontWeight: 'bold', width: '100%', textAlign: 'center' }}>Micro USB</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  space: {
    width: 20,
    height: 20,
  },
  btnConnector: {
    height: 200,
    width: '40%',
    margin: 10,
    borderWidth: 3,
    borderColor: "#84CEFF",
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20
  }
});