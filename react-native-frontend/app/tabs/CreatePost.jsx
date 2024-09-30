import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, SafeAreaView, StyleSheet } from 'react-native';
import axios from 'axios';
import { getToken } from '../../services/tokenService'; // Assuming you have a function to get the token
import { useNavigation, useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function CreatePost() {   // Ensure the default export is named correctly
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [error, setError] = useState(null);
  const [data, setData] = useState([]); // Assuming you want to display the posts


  const navigation = useNavigation();
  const router = useRouter();

  const handlePostSubmit = async () => {
    if (!title || !body) {
      setError("Title and body are required");
      return;
    }

    try {
      const userId = await AsyncStorage.getItem('user_id'); 
      const token = await getToken();
      const response = await axios.post('http://192.168.178.81:8000/api/post', {
        title,
        body,
        user_id: userId,
      }, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      // Clear input fields after submission
      setTitle('');
      setBody('');
      setError(null);

      router.push('tabs/Front')

      // Add the new post at the top of the list
      setData([response.data.post, ...data]);
    } catch (e) {
      console.error("Error creating post", e);
      setError("Error creating post", e);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={{ fontWeight: 'bold', fontSize: 18 }}>Create a Post</Text>

      <TextInput
        style={[styles.input, styles.titleInput]}
        placeholder="Post Title"
        value={title}
        onChangeText={setTitle}
      />

      <TextInput
        placeholder="Post Body"
        value={body}
        onChangeText={setBody}
        multiline
        numberOfLines={4}
        style={[styles.input, styles.bodyInput]}
      />

      {error && <Text style={{ color: 'red' }}>{error}</Text>}

      <TouchableOpacity onPress={handlePostSubmit} style={styles.button}>
        <Text style={styles.buttonText}>Submit Post</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5,
    marginVertical: 10,
  },
  titleInput: {
    height: 40,
  },
  bodyInput: {
    height: 100,
  },
  button: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
    margin: 10,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});
