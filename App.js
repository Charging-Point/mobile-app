import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen'
import ConnectorScreen from './screens/ConnectorScreen';
import ScanDepositScreen from './screens/ScanDepositScreen';
import NoLockerScreen from './screens/NoLockerScreen'
import PhoneDepositScreen from './screens/PhoneDepositScreen';
import ErrorScreen from './screens/ErrorScreen';
import NoPhoneScreen from './screens/NoPhoneScreen';
import PhonePickupScreen from './screens/PhonePickupScreen';
import ChoiceLetChargeScreen from './screens/ChoiceLetChargeScreen';
import ScanPickupScreen from './screens/ScanPickupScreen';
import PhoneAlreadyInChargeScreen from './screens/PhoneAlreadyInChargeScreen';
import OutOfServiceScreen from './screens/OutOfServiceScreen';
import BackIntoServiceScreen from './screens/BackIntoServiceScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Connector" component={ConnectorScreen} />
        <Stack.Screen name="ScanDeposit" component={ScanDepositScreen} />
        <Stack.Screen name="NoLocker" component={NoLockerScreen} />
        <Stack.Screen name="PhoneDeposit" component={PhoneDepositScreen} />
        <Stack.Screen name="Error" component={ErrorScreen} />
        <Stack.Screen name="NoPhone" component={NoPhoneScreen} />
        <Stack.Screen name="PhonePickup" component={PhonePickupScreen} />
        <Stack.Screen name="ChoiceLetCharge" component={ChoiceLetChargeScreen} />
        <Stack.Screen name="ScanPickup" component={ScanPickupScreen} />
        <Stack.Screen name="PhoneAlreadyInCharge" component={PhoneAlreadyInChargeScreen} />
        <Stack.Screen name="OutOfService" component={OutOfServiceScreen} />
        <Stack.Screen name="BackIntoService" component={BackIntoServiceScreen} />
      </Stack.Navigator>
      <StatusBar style="auto" />
    </NavigationContainer>
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
    width: 20,
    height: 20,
  },
});
