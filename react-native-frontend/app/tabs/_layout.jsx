import { View, Text } from 'react-native';
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Front from "./Front";
import Profile from "./Profile";
import { Ionicons } from '@expo/vector-icons';
import { UserProvider } from '../../context/UserContext';
import CreatePost from './CreatePost';



export default function TabsLayout() {

  console.log(Front, CreatePost, Profile);
  const Tab = createBottomTabNavigator();
  
  return (
    <UserProvider>
    <Tab.Navigator screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
        let iconName;
        
        if (route.name === 'Front') {
          iconName = focused
          ? 'home'
          : 'home-outline';
        }  else if (route.name === 'CreatePost') {
          iconName = focused 
          ? 'add-circle' 
          : 'add-circle-outline'; 
        } else if (route.name === 'Profile') {
          iconName = focused
          ? 'person'
          : 'person-outline';
        }
        
        // You can return any component that you like here!
        return <Ionicons name={iconName} size={size} color={color} />;
      },
      tabBarActiveTintColor: 'blue',
      tabBarInactiveTintColor: 'gray',
    })}
    >
      <Tab.Screen name='Front' component={Front} />
      <Tab.Screen name='CreatePost' component={CreatePost} />
      <Tab.Screen name='Profile' component={Profile} />
    </Tab.Navigator>
      </UserProvider>
  )
}
