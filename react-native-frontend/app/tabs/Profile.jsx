import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import React, { useContext} from 'react';
import { deleteToken, getToken } from '../../services/tokenService';
import axios from 'axios';
import { useRouter } from 'expo-router';
import {UserContext} from '../../context/UserContext';


export default function Profile() {
    const {user, loading} = useContext(UserContext);
    const router = useRouter();

    if (loading) {
        return <ActivityIndicator size='large' />
    }

    const handleLogout =async () => {
        try {

            const token = await getToken();
            if (token){
                const response = await axios.post('http://192.168.178.81:8000/api/logout', {}, {
                    headers: {
                        'Accept': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
    
                })
                await deleteToken();
                router.push('/screens/Home'); 
        }
        } catch (err) {
                console.log('Error logging out', err)
        }
    }
    return (
        <View style={styles.container}>
            <Text style={styles.userInfo}>Profile</Text>
            <Text style={styles.username}>{user?.name}</Text>
            <Text style={styles.email}>{user?.email}</Text>
        <TouchableOpacity style={styles.logoutButton}
        onPress={handleLogout} ><Text>Logout</Text></TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',

    },
    logoutButton: {
        padding: 20,
        marginTop: 20,
        backgroundColor: 'red',
        color: 'white',
        borderRadius:25,
        width: '25%',
        alignItems: 'center'

    }
})