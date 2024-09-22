import { useRouter } from 'expo-router';
import React from 'react';
import { Pressable, SafeAreaView, StyleSheet, Text, View, Alert } from 'react-native';


export default function Home() {
    const router = useRouter();
    
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.logo}>
                <Text style={{ textAlign: 'center', fontSize: 30, color: 'white', fontWeight: '600' }}>Forum for Developers</Text>
                <Text style={{ textAlign: 'center', fontSize: 20, color: 'white', fontStyle: 'italic', fontWeight: '600' }}>you can</Text>
                <Text style={{ textAlign: 'center', fontSize: 30, color: 'white', fontWeight: '600' }}>Post whatever you want</Text>
            </View>
            <View style={styles.card}>
                <Pressable style={styles.button} onPress={() => router.push('/screens/Register')}>
                    <Text style={styles.buttontxt}>Register</Text>
                </Pressable>

                <Pressable style={styles.button} onPress={() => router.push('/screens/Login')}>
                    <Text style={styles.buttontxt}>Login</Text>
                </Pressable>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'aqua',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 10,
    },
    logo: {
        width: '100%',
        marginTop: 50,
        marginHorizontal: 15,
    },
    card: {
        width: '100%',
        alignItems: 'center',
    },
    button: {
        marginTop: 10,
        padding: 15,
        marginBottom: 15,
        marginHorizontal: 20,
        backgroundColor: 'gray',
        borderRadius: 15, // This should be a number
    },
    buttontxt: {
        textAlign: 'center',
        fontSize: 20, // This should be a number
        color: 'white',
    },
});
