import { View, Text, SafeAreaView, ScrollView, StyleSheet, FlatList } from 'react-native';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { getToken } from '../../services/tokenService';

export default function Front() {

  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getToken();
        console.log('Token:', res);

        if (res) {
          const response = await axios.get("http://192.168.178.81:8000/api/posts", {
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

    fetchData();
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.list}>
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.body}>{item.body.slice(0, 200)}...</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
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
});
