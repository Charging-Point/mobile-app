import { Button, StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import NfcManager, { NfcTech } from 'react-native-nfc-manager';
import React, { useEffect, useState, useLayoutEffect } from 'react';
import getValueFor from '../utils/getToken';

// Pre-step, call this before any NFC operations
NfcManager.start();

export default function ScanDepositScreen({ route, navigation }) {
  const [isLoading, setLoading] = useState(true);
  const [isScanning, setIsScanning] = useState(false);
  const [idFreeLocker, setIdFreeLocker] = useState([]);
  const { connector } = route.params;

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false
    })
  }, [navigation])

  const getIdFreeLocker = async () => {
    try {
      const requestOptions = {
        method: 'GET',
        headers: {'Authorization': 'Bearer '+ getValueFor('token')},
        };
      const response = await fetch('http://35.180.116.112:5000/locker?' + new URLSearchParams({ connector: connector }), requestOptions);
      const json = await response.json();
      if (json.free_locker == 'null') {
        navigation.navigate('NoLocker')
      }
      setIdFreeLocker(json.free_locker);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getIdFreeLocker();
  }, []);
  async function readNdef() {
    setIsScanning(true);
    try {
      // register for the NFC tag with NDEF in it
      await NfcManager.requestTechnology(NfcTech.Ndef);
      // the resolved tag object will contain `ndefMessage` property
      const tag = await NfcManager.getTag();
      setIsScanning(false);
      //console.warn('Tag found', tag.id);
      // Navigate to next screen : PhoneDeposit
      navigation.navigate('PhoneDeposit', { id_locker: idFreeLocker, user_uid: tag.id })
    } catch (ex) {
      console.warn('Oops!', ex);
      //navigation.navigate('PhoneDeposit', {id_locker : idFreeLocker, user_uid : '043D53A2936A80'})
    } finally {
      // stop the nfc scanning
      NfcManager.cancelTechnologyRequest();

    }
  }

  return (
    <View style={{ flex: 1, paddingVertical: 20, paddingHorizontal: 15 }}>
      <TouchableOpacity style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }} onPress={() => navigation.goBack()}>
        <Image source={require('../assets/images/arrowBack.png')} style={{ width: 25, height: 25 }} />
        <Text style={{ fontSize: 20, fontWeight: '500', marginLeft: 10 }}>Back</Text>
      </TouchableOpacity>
      <View style={{ flex: 1, paddingHorizontal: 15, width: '100%' }}>
        <Text style={{ fontSize: 25, fontWeight: '800', paddingHorizontal: 15, width: '100%', textAlign: 'center' }}>Déposer le Téléphone d'un festivalier</Text>
      </View>
      <View style={{ flex: 6, alignItems: 'center', marginTop: 60 }}>
        {!isScanning ?
          (<TouchableOpacity style={styles.btnNFC} onPress={readNdef}>
            <Image source={require('../assets/images/nfcScan.png')} style={{ width: 100, height: 100 }} />
            <Text style={{ fontSize: 30, color: '#565656', fontWeight: 'bold', width: '100%', textAlign: 'center' }}>Scan NFC</Text>
          </TouchableOpacity>)
          : (<View>
            <Text style={{ textAlign: 'center', fontWeight: '600', fontSize: 20 }}>Scan en cours...</Text>
            <Image source={require('../assets/images/scanGif.gif')} />
          </View>
          )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  space: {
    width: 20,
    height: 20,
  },
  btnNFC: {
    height: 180,
    width: 180,
    backgroundColor: 'white',
    borderRadius: 7,
    justifyContent: 'center',
    alignItems: 'center'

  }
});

