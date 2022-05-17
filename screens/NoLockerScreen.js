import { Button, StyleSheet, Text, View } from 'react-native';

export default function NoLockerScreen({ navigation }) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Pas de casier disponible pour ce type de connecteur</Text>
        <View style={styles.space} />
        <Button
          title="Accueil"
          onPress={() => navigation.navigate('Home')}
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