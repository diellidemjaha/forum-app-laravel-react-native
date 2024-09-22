import {View, Text, SafeAreaView, ScrollView, TextInput, Alert, ActivityIndicator} from 'react-native';
import React, { useEffect, useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { useNavigation, useRouter } from 'expo-router';
import axios from "../../services/api";
import { setToken } from '../../services/tokenService';

export default function Register() {
    const [name,setName]  = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [passwordConfirmation, setPasswordConfirmation] = useState();

    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});

    const navigation = useNavigation();

    const register = (data) => axios.post('/register', data);


    const handleRegistration = async()=> {

        try {
            setLoading(true);
            const response = await register({
                name: name,
                email: email,
                password: password,
                password_confirmation: passwordConfirmation,

            });
            console.log('Response:', response);
            setLoading(false);
            await setToken(response.data.token);
            router.push('/tabs/Front');
        } catch(e) {
            console.error("Unable to Register user", e)
            setErrors(e.response?.data?.errors);
            setLoading(false);
        }
        // navigation.navigate('tabs/Front');
          }

    return(
        <SafeAreaView style={{flex:1,padding:20,backgroundColor: 'aqua'}}>
            <ScrollView>

            <Text style={{marginTop: 50, textAlign:'center', fontSize: 20, fontWeight: 'bold', color:'white'}}>
                User Registration
            </Text>
            <TextInput placeholder='Full name' placeholderTextColor='white' value={name} onChangeText={setName} style={{borderWidth:1, marginBottom: 15, padding: 10, borderRadius:5,marginTop:10, backgroundColor: 'white',placeholderTextColor:'gray', color:'gray'}}></TextInput>
            {errors && <Text style={{color:'red', fontSize:10, }}>{errors.name}</Text>}
           
            <TextInput placeholder='Email' placeholderTextColor='white' value={email} onChangeText={setEmail} style={{borderWidth:1, marginBottom: 15, padding: 10, borderRadius:5,marginTop:10, backgroundColor: 'white',placeholderTextColor:'gray', color:'gray'}}></TextInput>
            {errors && <Text style={{color:'red', fontSize:10, }}>{errors.email}</Text>}

            <TextInput placeholder='Password' placeholderTextColor='white' value={password} onChangeText={setPassword} style={{borderWidth:1, marginBottom: 15, padding: 10, borderRadius:5,marginTop:10, backgroundColor: 'white',placeholderTextColor:'gray', color:'gray'}}></TextInput>
            {errors && <Text style={{color:'red', fontSize:10, }}>{errors.password}</Text>}

            <TextInput placeholder='Confirm Password' placeholderTextColor='white' value={passwordConfirmation} onChangeText={setPasswordConfirmation} style={{borderWidth:1, marginBottom: 15, padding: 10, borderRadius:5,marginTop:10, backgroundColor: 'white',placeholderTextColor:'gray', color:'gray'}}></TextInput>
            {errors && <Text style={{color:'red', fontSize:10, }}>{errors.passwordConfirmation}</Text>}

            <TouchableOpacity onPress={()=> console.log('hello world register')} style={{marginVertical:10, borderRadius:10, paddingVertical:10, backgroundColor:'white'}}>
                <Text style={{fontSize:20,textAlign:'center', color:'black'}} onPress={handleRegistration}>Register</Text>
            </TouchableOpacity>
            {loading ? <ActivityIndicator size='large' /> : <Text></Text>}
            </ScrollView>
        </SafeAreaView>
    )
}