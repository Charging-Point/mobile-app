import { Button, StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import React, { useEffect, useState, useLayoutEffect } from 'react';
import { useFocusEffect } from '@react-navigation/native';

export default function HomeScreen({ navigation }) {
  const [isLoading, setLoading] = useState(true);
  const [nbFreeLockers, setNbFreeLockers] = useState([]);

  const getNbFreeLockers = async () => {
    try {
      const response = await fetch('http://35.180.116.112:5000/avaibility');
      const json = await response.json();
      setNbFreeLockers(json.nb_free_locker);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false
    })
  }, [navigation])

  useFocusEffect(() => {
    getNbFreeLockers();
  });

  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 2, paddingVertical: 70, paddingHorizontal: 35, width: '100%' }}>
        <View style={{ flexDirection: 'row', width: '100%', alignItems: 'center' }}>
          <Image source={require('../assets/images/chargingLogo.png')} style={{ width: 40, height: 40 }} />
          <Text style={{ fontSize: 20, fontWeight: '700', width: '100%', marginLeft: 10 }} >Charging Point</Text>
        </View>
        <View style={{ width: '100%', marginTop: 60 }}>
          <Text style={{ fontSize: 15, fontWeight: '600', textAlign: 'center', color: '#5C5C5C' }} >Casiers Disponibles</Text>
          <Text style={{ fontSize: 70, fontWeight: '500', textAlign: 'center', color: '#3DAAF2' }} >{nbFreeLockers}</Text>
        </View>
      </View>
      <View style={{ flex: 5, backgroundColor: '#ECEBEB', borderTopLeftRadius: 20, borderTopRightRadius: 20, paddingVertical: 20, paddingHorizontal: 35 }}>
        <Text style={{ fontWeight: '700' }}>Actions Possibles : </Text>
        <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'row', marginVertical: 50 }}>
          <TouchableOpacity style={styles.btnAction} onPress={() => navigation.navigate('Connector')}>
            <Image source={require('../assets/images/depoLogo.png')} style={{ width: 45, height: 45 }} />
            <Text style={{ fontSize: 15, color: '#3DAAF2', fontWeight: 'bold', width: '100%', textAlign: 'center' }}>Déposer</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{ ...styles.btnAction, marginLeft: 30 }} onPress={() => navigation.navigate('ScanPickup')}>
            <Image source={require('../assets/images/recupLogo.png')} style={{ width: 45, height: 45 }} />
            <Text style={{ fontSize: 15, color: '#3DAAF2', fontWeight: 'bold', width: '100%', textAlign: 'center' }}>Récupérer</Text>
          </TouchableOpacity>
        </View>
        <View style={{ display: 'flex', alignItems: 'center' }}>
          <TouchableOpacity style={{ ...styles.btnOutOfService, backgroundColor: '#84CEFF', marginBottom: 20 }} onPress={() => navigation.navigate('FreeUpSpace')}>
            <Image source={require('../assets/images/freeSpace.png')} style={{ width: 25, height: 25, position: 'absolute', left: 16 }} />
            <Text style={{ color: 'white', fontWeight: 'bold', width: '100%', textAlign: 'center' }}>Libérer un Casier</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btnOutOfService} onPress={() => navigation.navigate('OutOfService')}>
            <Image source={require('../assets/images/hsLogo.png')} style={{ width: 20, height: 20, position: 'absolute', left: 20 }} />
            <Text style={{ color: 'white', fontWeight: 'bold', width: '100%', textAlign: 'center' }}>Casier Hors Service</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  space: {
    width: 20, // or whatever size you need
    height: 20,
  },
  btnAction: {
    backgroundColor: 'white',
    borderRadius: 10,
    width: 120,
    height: 110,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20
  },
  btnOutOfService: {
    borderRadius: 5,
    width: 240,
    height: 40,
    backgroundColor: 'rgba(255, 0, 0, 0.65)',
    color: 'white',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  }
});

