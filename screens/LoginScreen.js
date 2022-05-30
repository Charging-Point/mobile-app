import { StyleSheet, Text, View, Image, TouchableOpacity, TextInput } from 'react-native'
import React, { useEffect, useState, useLayoutEffect } from 'react';

const LoginScreen = ({ navigation }) => {
    const [password, setPassword] = useState('')
    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false
        })
    }, [navigation])

    const handleLogin = () => {
        if (password === process.env.APP_PASSWORD) {
            navigation.navigate('Home')
        }
    }

    return (
        <View style={{ flex: 1, backgroundColor: '#64C1FF' }}>
            <View style={{ flex: 4, justifyContent: 'center', alignItems: 'center' }}>
                <Image source={require('../assets/images/chargingLogo.png')} style={{ width: 155, height: 155 }} />
                <Text style={{ fontSize: 40, fontWeight: '700', color: 'white', width: '100%', textAlign: 'center' }}>Charging Point</Text>
            </View>
            <View style={{ flex: 3, backgroundColor: 'white', padding: 50, borderTopLeftRadius: 20, borderTopRightRadius: 20 }}>
                <Text style={{ fontWeight: '600' }}>Mot de passe :</Text>
                <TextInput onChangeText={(text) => setPassword(text)} style={styles.inputpass} secureTextEntry={true} />
                <View style={{ width: '100%', alignItems: 'center', marginTop: 40 }}>
                    <TouchableOpacity style={{ backgroundColor: '#3DAAF2', width: 150, height: 40, justifyContent: 'center', borderRadius: 7 }} onPress={handleLogin}>
                        <Text style={{ fontWeight: '600', width: '100%', textAlign: 'center', color: 'white' }}>Se Connecter</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

export default LoginScreen

const styles = StyleSheet.create({
    inputpass: {
        backgroundColor: '#ECECEC',
        borderRadius: 5,
        paddingVertical: 10,
        paddingHorizontal: 40,
        color: 'black',
        marginTop: 5
    }
})