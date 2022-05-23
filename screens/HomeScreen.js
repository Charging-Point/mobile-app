import { Button, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';

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

  useEffect(() => {
    getNbFreeLockers();
  }, []);

    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>{nbFreeLockers} casiers disponibles</Text>
        <View style={styles.space} />
        <Button
          title="Déposer"
          onPress={() => navigation.navigate('Connector')}
        />
        <View style={styles.space} />
        <Button
          title="Récupérer"
          onPress={() => navigation.navigate('ScanPickup')}
        />
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
  });