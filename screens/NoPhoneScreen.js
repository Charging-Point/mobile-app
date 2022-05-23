import { Button, StyleSheet, Text, View } from 'react-native';

export default function NoPhoneScreen({ navigation }) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Ce festivalier n'a pas déposé de téléphone au stand.</Text>
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