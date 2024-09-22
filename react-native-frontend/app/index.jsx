import 'react-native-gesture-handler';  // Correct import for gesture handler
import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './screens/Home';  // Assuming this path is correct
import Register from './screens/Register';
import Login from './screens/Login';
import TabsLayout from './tabs/_layout'; // Your tab navigation layout
import { useNavigation, useRouter } from 'expo-router';
import { getToken } from '../services/tokenService';

const Stack = createStackNavigator();  // Capitalize the Stack variable

export default function Index() {
    const [token, setToken] = useState('');
    const router = useRouter();
    const navigation = useNavigation();

    useEffect(() => {
        const fetchToken = async () => {
            const res = await getToken();
            setToken(res);
        }
        fetchToken();
    }, [])


    return (
        <NavigationContainer independent={true}>
<Stack.Navigator>
            {!token ? 
            <>
            <Stack.Screen name="Home" component={Home} options={{ title: 'Home' }} />
            <Stack.Screen name="Register" component={Register} options={{ headerShown: false }} />
            <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
            
            </> :

                <Stack.Screen name="Tabs" component={TabsLayout} options={{ headerShown: false }} />
            }
            </Stack.Navigator>
        </NavigationContainer>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
