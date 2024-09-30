import { View, Text, SafeAreaView, ScrollView, StyleSheet, FlatList,TextInput, TouchableOpacity} from 'react-native';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { getToken } from '../../services/tokenService';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Front() {

  const [data, setData] = useState([]);
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      const res = await getToken();
      console.log('Token:', res);

      if (res) {
        const response = await axios.get("http://192.168.178.81:8000/api/posts-of-friends", {
          headers: {
            'Accept': 'application/json',
            'Authorization': `Bearer ${res}`
          }
        });
        console.log("Fetched Data:", response.data);
        setData(response.data.posts); // Make sure this contains an array of posts
      }
    } catch (e) {
      console.error("Error fetching data", e);
    }
  };
  
  useEffect(() => {
    fetchData();
  }, []);


  const handlePostSubmit = async () => {
    if (!title || !body) {
      setError("Title and body are required");
      return;
    }

    

    try {
      const userId = await AsyncStorage.getItem('user_id'); 
      const token = await getToken();

      console.log({
        user_id: userId, 
        title: title,
        body: body,
      });

      const response = await axios.post('http://192.168.178.81:8000/api/post', {
        title: title,
        body: body,
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

      // Add the new post at the top of the list
      setData([response.data.post, ...data]);
    } catch (e) {
      console.error("Error creating post", e);
      setError("Error creating post");
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.list}>
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.body}>{item.body.slice(0, 200)}...</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>

      <Text style={{ fontWeight: 'bold', fontSize: 18 }}>Create a Post</Text>

      {/* Title Input */}
      <TextInput  style={[styles.input, styles.titleInput]}
        placeholder="Post Title"
        value={title}
        onChangeText={setTitle}
      />

      {/* Body Input */}
      <TextInput 
        placeholder="Post Body"
        value={body}
        onChangeText={setBody}
        multiline
        numberOfLines={4}
        style={[styles.input, styles.bodyInput]} 
      />

      {error && <Text style={{ color: 'red' }}>{error}</Text>}

      {/* Submit Button */}
      <TouchableOpacity onPress={handlePostSubmit} style={styles.button}>
        <Text style={styles.buttonText}>Submit Post</Text>
      </TouchableOpacity>


      <Text style={{ fontWeight: 'bold', fontSize: 15 }}>Posts</Text>
      <FlatList
        data={data} // Make sure this contains an array of posts
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        ListEmptyComponent={<Text>No posts available.</Text>}
        style={{ marginTop: 10 }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  list: {
    backgroundColor: '#fff',
    padding: 15,
    marginVertical: 10,
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  body: {
    fontSize: 14,
    color: '#333',
  },
 // Title input style
 input: {
  borderWidth: 1,
  borderColor: '#ddd',
  padding: 12,
  marginVertical: 10,
  borderRadius: 10,
  backgroundColor: '#fff',
  fontSize: 16,
  margin: 10,
},
titleInput: {
  fontSize: 16,
  fontWeight: 'bold',
  color: '#333',
  borderBottomWidth: 2,
  borderBottomColor: '#007BFF',  // Blue underline to highlight the title
  paddingBottom: 5,
  margin: 10,
},
// Body input style
bodyInput: {
  fontSize: 16,
  color: '#555',
  textAlignVertical: 'top',  // Ensure text starts at the top when multiline
  padding: 10,
  borderWidth: 1,
  borderColor: '#ddd',
  backgroundColor: '#fff',
  borderRadius: 8,
  marginVertical: 10,
},
button: {
  backgroundColor: 'blue',
  paddingHorizontal: 10,
  margin: 10,
  paddingVertical: 12,
  borderRadius: 10,
  marginBottom: 20,
},
buttonText: {
  textAlign: 'center',
  color: '#fff',
  fontSize: 18,
  fontWeight: 'bold',
},
}); 
