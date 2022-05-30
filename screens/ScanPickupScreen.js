import { Button, StyleSheet, TouchableOpacity, Text, View } from 'react-native';
import NfcManager, {NfcTech} from 'react-native-nfc-manager';
import React, { useEffect, useState } from 'react';

// Pre-step, call this before any NFC operations
NfcManager.start();

export default function ScanPickupScreen({ route, navigation }) {
  const [isLoading, setLoading] = useState(true);
  const [idLocker, setIdLocker] = useState([]);

  async function readNdef() {
      try {
        // register for the NFC tag with NDEF in it
        await NfcManager.requestTechnology(NfcTech.Ndef);
        // the resolved tag object will contain `ndefMessage` property
        const tag = await NfcManager.getTag();
        // console.warn('Tag found', tag.id);
        //Retrieve id_locker if user has already depose his phone
        try {
            const response = await fetch('http://35.180.116.112:5000/device?' + new URLSearchParams({user_uid: tag.id}));
            const json = await response.json();
            if (json.id_locker == 'null'){
                navigation.navigate('NoPhone')
            } else {
                navigation.navigate('PhonePickup', {id_locker: json.id_locker, user_uid: tag.id})
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
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Scannez la puce NFC du festivalier pour retrouver son téléphone</Text>
        <Button
          title="Scanner"
          onPress={readNdef}
        />
      </View>
    );
  }

  