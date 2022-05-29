import { Button, StyleSheet, FlatList, TouchableOpacity, Text, TextInput, View } from 'react-native';
import React, { useEffect, useState } from 'react';


export default function BackIntoServiceScreen({ navigation }) {
    const [id_locker, setIdLocker] = useState("");
    const [outOfServiceLockers, setoutOfServiceLockers] = useState([])
    const [isLoading, setLoading] = useState(true);

    const getOutOfServiceLockers = async () => {
        try {
         const response = await fetch('http://35.180.116.112:5000/outofservice');
         const json = await response.json();
         setoutOfServiceLockers(json.out_of_service_lockers);
       } catch (error) {
         console.error(error);
       } finally {
         setLoading(false);
       }
      }
        
      useEffect(() => {
        getOutOfServiceLockers();
      }, []);

    const putBackInService = async () => {
        try {
            const requestOptions = {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
            };
            const response = await fetch('http://35.180.116.112:5000/locker?' + new URLSearchParams({id_locker: id_locker, new_state: 0}), requestOptions);
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
        <Text>Indiquez l'ID du casier à remettre en service</Text>
        <View style={styles.space} />
        <TextInput onChangeText={(text)=>setIdLocker(text)} placeholder='ID du casier'/>
        <View style={styles.space} />
        <Button
          title="Remettre en service"
          onPress={putBackInService}
        />
        <View style={styles.space} />
        <Text>Casiers hors service :</Text>
        <FlatList
        data={outOfServiceLockers}
        renderItem={({item}) => <Text style={styles.item}>{item}</Text>}
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

  