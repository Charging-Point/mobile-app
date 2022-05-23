import { Button, StyleSheet, TouchableOpacity, Text, View } from 'react-native';
import NfcManager, {NfcTech} from 'react-native-nfc-manager';
import React, { useEffect, useState } from 'react';

// Pre-step, call this before any NFC operations
NfcManager.start();

export default function ScanDepositScreen({ route, navigation }) {
  const [isLoading, setLoading] = useState(true);
  const [idFreeLocker, setIdFreeLocker] = useState([]);
  const { connector } = route.params;

  const getIdFreeLocker = async () => {
    try {
     const response = await fetch('http://35.180.116.112:5000/locker?' + new URLSearchParams({connector: connector}));
     const json = await response.json();
     if (json.free_locker == 'null'){
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
      try {
        // register for the NFC tag with NDEF in it
        await NfcManager.requestTechnology(NfcTech.Ndef);
        // the resolved tag object will contain `ndefMessage` property
        const tag = await NfcManager.getTag();
        console.warn('Tag found', tag.id);
        // Navigate to next screen : PhoneDeposit
        navigation.navigate('PhoneDeposit', {id_locker : idFreeLocker, user_uid : tag.id})
      } catch (ex) {
        console.warn('Oops!', ex);
        //navigation.navigate('PhoneDeposit', {id_locker : idFreeLocker, user_uid : '043D53A2936A80'})
      } finally {
        // stop the nfc scanning
        NfcManager.cancelTechnologyRequest();
      }
    }

    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Scannez la puce NFC du festivalier</Text>
        <View style={styles.space} />
        <Button
          title="Scanner"
          onPress={readNdef}
        />
      </View>
    );
  }

  const styles = StyleSheet.create({
    space: {
      width: 20,
      height: 20,
    },
  });

  