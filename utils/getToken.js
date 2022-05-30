import * as SecureStore from 'expo-secure-store';

async function getValueFor(key) {
    let result = await SecureStore.getItemAsync(key);
    if (result) {
      return result;
    } else {
      alert('No values stored under that key.');
    }
  }

export default getValueFor;