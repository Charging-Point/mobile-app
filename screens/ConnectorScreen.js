import { Button, StyleSheet, Text, View } from 'react-native';

export default function ConnectorScreen({ navigation }) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Connector Screen</Text>
        <Button
          title="USB C"
          onPress={() => navigation.navigate('ScanDeposit', {connector: 'usb-c'})}
        />
        <View style={styles.space} />
        <Button
          title="iPhone"
          onPress={() => navigation.navigate('ScanDeposit', {connector: 'iphone'})}
        />
        <View style={styles.space} />
        <Button
          title="Micro USB"
          onPress={() => navigation.navigate('ScanDeposit', {connector: 'micro-usb'})}
        />
      </View>
    );
  }

  const styles = StyleSheet.create({
    space: {
      width: 20, // or whatever size you need
      height: 20,
    },
  });