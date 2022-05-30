import { Button, StyleSheet, FlatList, TouchableOpacity, Text, TextInput, View, Image } from 'react-native';
import React, { useEffect, useState, useLayoutEffect } from 'react';


export default function BackIntoServiceScreen({ navigation }) {
  const [id_locker, setIdLocker] = useState("");
  const [outOfServiceLockers, setoutOfServiceLockers] = useState([]);
  const [isLoading, setLoading] = useState(true);

  const getOutOfServiceLockers = async () => {
      try {
        const requestOptions = {
          method: 'GET',
          headers: {'Authorization': 'Bearer '+ process.env.TOKEN_API21},
        }; 
       const response = await fetch('http://35.180.116.112:5000/out-of-service', requestOptions);
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
                headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer '+ process.env.TOKEN_API21 },
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

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false
    })
  }, [navigation])


  return (
    <View style={{ flex: 1 }}>
      <TouchableOpacity style={{ flex: 1, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 20, paddingVertical: 20 }} onPress={() => navigation.goBack()}>
        <Image source={require('../assets/images/arrowBack.png')} style={{ width: 25, height: 25 }} />
        <Text style={{ fontSize: 20, fontWeight: '500', marginLeft: 10 }}>Back</Text>
      </TouchableOpacity>
      <View style={{ flex: 3, paddingHorizontal: 40, alignItems: 'center' }} >
        <FlatList
          data={outOfServiceLockers}
          renderItem={({ item }) => <Text style={styles.item}>Casier {item}</Text>}
        />
      </View>
      <View style={{ flex: 9, paddingHorizontal: 40, alignItems: 'center' }} >

        <View style={{ backgroundColor: 'white', padding: 30, borderRadius: 5, alignItems: 'center' }}>
          <Text style={{ fontSize: 15, fontWeight: 'bold', width: '100%', textAlign: 'center', height: 40 }}>ID du casier à remettre Service :</Text>
          <TextInput onChangeText={(text) => setIdLocker(text)} placeholder='ID du casier...' style={styles.inputIdLocker} placeholderTextColor='black' />
          <View style={styles.space} />
          <TouchableOpacity style={styles.btnOutOfService} onPress={putBackInService}>
            <Text style={{ color: 'white', fontWeight: 'bold', width: '100%', textAlign: 'center' }}>Remettre en Service</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  space: {
    width: 20,
    height: 20,
  },
  inputIdLocker: {
    marginTop: 10,
    backgroundColor: '#A9DCFE',
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 40,
    color: 'white'
  },
  btnOutOfService: {
    borderRadius: 5,
    width: 150,
    height: 40,
    backgroundColor: 'rgba(1, 185, 63, 0.84);',
    color: 'white',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  item: {
    textAlign: 'center',
    backgroundColor: 'rgba(160, 160, 160, 0.24);',
    marginVertical: 5,
    padding: 10,
    width: '100%'
  }
});

