import { Button, StyleSheet, Text, View } from 'react-native';

export default function PhoneAlreadyInChargeScreen({ navigation }) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Ce festivalier a déjà déposé un téléphone au stand.</Text>
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
      width: 20,
      height: 20,
    },
  });