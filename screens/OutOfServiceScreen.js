import { Button, StyleSheet, TouchableOpacity, Text, TextInput, View } from 'react-native';
import React, { useEffect, useState } from 'react';


export default function OutOfServiceScreen({ navigation }) {
    const [id_locker, setIdLocker] = useState<String>('')
    const putOutOfService = async (id_locker) => {
        try {
            const requestOptions = {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
            };
            const response = await fetch('http://35.180.116.112:5000/locker?' + new URLSearchParams({id_locker: id_locker, new_state: 2}), requestOptions);
            const json = await response.json();
            if (json.result == 1){
                navigation.navigate('Home')
            }
            else {
                navigation.navigate('Error')
            }
            } catch (error) {
                    console.error(error);
            } 
      }

    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Indiquez l'ID du casier à mettre hors service</Text>
        <View style={styles.space} />
        <TextInput onChange={(text)=>setIdLocker(text)} placeholder='ID du casier'/>
        <Button
          title="Mettre hors service"
          onPress={putOutOfService(id_locker)}
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

  