import { Button, StyleSheet, TouchableOpacity, Text, View, Image } from 'react-native';
import NfcManager, { NfcTech } from 'react-native-nfc-manager';
import React, { useEffect, useState, useLayoutEffect } from 'react';

// Pre-step, call this before any NFC operations
NfcManager.start();

export default function ScanPickupScreen({ route, navigation }) {
  const [isLoading, setLoading] = useState(true);
  const [isScanning, setIsScanning] = useState(false);
  const [idLocker, setIdLocker] = useState([]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false
    })
  }, [navigation])

  async function readNdef() {

    setIsScanning(true);
    //navigation.navigate('PhonePickup', { id_locker: 'A2', user_uid: '043D53A2936A80' })
    try {
      // register for the NFC tag with NDEF in it
      await NfcManager.requestTechnology(NfcTech.Ndef);
      // the resolved tag object will contain `ndefMessage` property
      const tag = await NfcManager.getTag();
      //console.warn('Tag found', tag.id);
      //Retrieve id_locker if user has already depose his phone
      try {
        const response = await fetch('http://35.180.116.112:5000/device?' + new URLSearchParams({ user_uid: tag.id }));
        const json = await response.json();
        if (json.id_locker == 'null') {
          navigation.navigate('NoPhone')
          setIsScanning(false);
        } else {
          navigation.navigate('PhonePickup', { id_locker: json.id_locker, user_uid: tag.id })
          setIsScanning(false);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    } catch (ex) {
      console.warn('Oops!', ex);
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
        <Text style={{ fontSize: 25, fontWeight: '800', paddingHorizontal: 15, width: '100%', textAlign: 'center' }}>Récupérer le Téléphone d'un festivalier</Text>
      </View>
      <View style={{ flex: 6, alignItems: 'center', marginTop: 30 }}>
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

