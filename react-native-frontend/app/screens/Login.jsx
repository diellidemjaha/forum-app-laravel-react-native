import {View, Text, SafeAreaView, ScrollView, TextInput, Alert, ActivityIndicator} from 'react-native';
import React, { useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { useNavigation, useRouter } from 'expo-router';
import axios from '../../services/api';
import { setToken } from '../../services/tokenService';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Login() {
   

    const [email,setEmail]  = useState('');
    const [password,setPassword]  = useState('');
    const [loading, setLoading] = useState(false);
    const [loginToken, setLoginToken] = useState(null);
    const [userId, setUserId] = useState(null);
    const [errors, setErrors] = useState({});



    const navigation = useNavigation();
    const router = useRouter();

        const login = (data) => axios.post('/login', data);


        const handleLogin = async ()=> {
            try {
                setLoading(true);
                const response = await login({
                    email: email.toLocaleLowerCase(),
                    password: password,
                })

                setLoading(false);
                await setToken(response?.data?.token);
                setLoginToken(response?.data?.token);

                const userId = response?.data?.user?.id;
                setUserId(userId);
    
                // Store user ID in AsyncStorage
                await AsyncStorage.setItem('user_id', userId.toString());
    
                console.log('User ID stored in local storage:', userId);

                router.push('tabs/Profile');

            } catch(err) {
                setLoading(true);
                setErrors(err.response?.data?.errors)
                console.log("error logging in", err);
                setLoading(false);
            }
              }


    return(
            <ScrollView>
        <SafeAreaView style={{flex:1,padding:20,backgroundColor: 'aqua', height: '100%'}}>
            <Text style={{marginTop: 50, textAlign:'center', fontSize: 20, fontWeight: 'bold', color:'white'}}>
                Login to your Account
            </Text>
            <TextInput placeholder='Email' placeholderTextColor='white' value={email} onChangeText={setEmail} style={{borderWidth:1, marginBottom: 15, padding: 10, borderRadius:5,marginTop:10, backgroundColor: 'white',placeholderTextColor:'gray', color:'gray'}}></TextInput>
            {errors && <Text style={{color:'red', fontSize:10, }}>{errors.email}</Text>}

            <TextInput placeholder='Password' placeholderTextColor='white' value={password} onChangeText={setPassword} style={{borderWidth:1, marginBottom: 15, padding: 10, borderRadius:5,marginTop:10, backgroundColor: 'white',placeholderTextColor:'gray', color:'gray'}}></TextInput>
            {errors && <Text style={{color:'red', fontSize:10, }}>{errors.password}</Text>}

            <TouchableOpacity onPress={()=> console.log('hello world register')} style={{marginVertical:10, borderRadius:10, paddingVertical:10, backgroundColor:'white'}}>
                <Text style={{fontSize:20,textAlign:'center', color:'black'}} onPress={handleLogin}>Login</Text>
            </TouchableOpacity>
            {loading ? <ActivityIndicator size='large' /> : <Text></Text>}
        </SafeAreaView>
        {errors && <Text style={{fontSize:20,textAlign:'center', color:'black'}}>{errors.message}</Text>}
        </ScrollView>

    )
}