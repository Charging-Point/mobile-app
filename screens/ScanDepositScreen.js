import { Button, StyleSheet, TouchableOpacity, Text, View } from 'react-native';
import NfcManager, {NfcTech} from 'react-native-nfc-manager';
import React, { useEffect, useState } from 'react';

// Pre-step, call this before any NFC operations
NfcManager.start();

export default function ScanDepositScreen({ route, navigation }) {
  const [isLoading, setLoading] = useState(true);
  const [idFreeLocker, setIdFreeLocker] = useState([]);
  const connector = route.params;

  const getIdFreeLocker = async () => {
    try {
     const response = await fetch('http://13.38.227.172:5000/locker?' + new URLSearchParams({connector: connector}));
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
      } catch (ex) {
        console.warn('Oops!', ex);
      } finally {
        // stop the nfc scanning
        NfcManager.cancelTechnologyRequest();
      }
    }

    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Scan Screen</Text>
        <Button
          title="Récupérer"
          onPress={readNdef}
        />
      </View>
    );
  }

  