import { Button, StyleSheet, Text, View } from 'react-native';
import getValueFor from '../utils/getToken';

export default function ChoiceLetChargeScreen({ route, navigation }) {
    const {id_locker, user_uid, deposit_time} = route.params;

    const phoneRetrieved = async () => {
        try {
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer '+ getValueFor('token') },
                body: JSON.stringify({ id_locker: id_locker, user_uid: user_uid, deposit_time: deposit_time })
            };
            const response = await fetch('http://35.180.116.112:5000/charge', requestOptions);
            const json = await response.json();
            if (json.result == 1){
                navigation.navigate('Home')
            } else {
                navigation.navigate('Error')
            }
       } catch (error) {
            console.error(error);
       }
      }

    const letCharge = async () => {
        try {
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer '+ getValueFor('token') },
                body: JSON.stringify({ id_locker: id_locker, user_uid: user_uid, deposit_time: deposit_time })
            };
            const response = await fetch('http://35.180.116.112:5000/charge', requestOptions);
            const json = await response.json();
            if (json.result == 1){
                navigation.navigate('Connector')
            } else {
                navigation.navigate('Error')
            }
       } catch (error) {
            console.error(error);
       }
      }


    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Button
          title="Laisser charger" //same locker
          onPress={letCharge}
        />
        <View style={styles.space} />
        <Button
          title="Téléphone rendu"
          onPress={phoneRetrieved}
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