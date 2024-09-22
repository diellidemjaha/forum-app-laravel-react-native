import { View, Text, StyleSheet, FlatList } from 'react-native';
import React from 'react';

export default function PostList(posts) {
    return (
        <View style={styles.postlist}>
        <FlatList
            data={posts} // Correctly pass the posts array
            keyExtractor={(item) => item.id.toString()} // Use correct keyExtractor
            renderItem={({ item }) => (
                <View style={styles.list}>
                    <Text style={styles.title}>{item.title}</Text>
                    <Text style={styles.body}>{item.body.slice(0, 200)}...</Text>
                </View>
            )}
        />
    </View>
    )
}

const styles = StyleSheet.create({
    postlist: {
        flex: 1,
        padding: 20,
        marginVertical: 10,

    },

    list: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 10,
        margin: 10,

    },
    title: {
        fontSize: 20,
        fontWeight: 'bold'

    },
    body: {
        fontSize: 13,
    }
})