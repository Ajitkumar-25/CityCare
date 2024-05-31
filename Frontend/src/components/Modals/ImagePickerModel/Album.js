import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, Image, TouchableOpacity, ActivityIndicator } from 'react-native'
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { CameraRoll } from '@react-native-camera-roll/camera-roll';
import FastImage from 'react-native-fast-image';


const Album = ({ item, onPress }) => {
    const [uri, setUri] = useState("");

    const loadAlbumIcon = async (album) => {
        const result = await CameraRoll.getPhotos({
            first: 1,
            groupName: album.title,
        });
        setUri(result.edges[0].node.image.uri);
    }

    useEffect(() => {
        loadAlbumIcon(item);
        return () => { }
    }, [])

    if (!uri) return (
        <View style={styles.container}>
            <ActivityIndicator size="large" color="#5B9092" />
        </View>
    );

    return (
        <TouchableOpacity activeOpacity={0.8} style={styles.container} onPress={() => onPress(item.title)}>
            <View style={styles.imageContainer}>
                <FastImage source={{ uri: uri }} style={styles.image} />
            </View>
            <Text numberOfLines={1} style={styles.text}>{item.title || "Recent"}</Text>
        </TouchableOpacity>
    )
}

export default Album

const styles = StyleSheet.create({
    container: { position: "relative", width: wp(48), height: wp(32), padding: wp(2) },
    imageContainer: { backgroundColor: "#fff", elevation: 5, borderRadius: 5 },
    image: { width: wp(44), height: wp(28), borderRadius: 5 },
    text: { color: "#5B9092", fontSize: 14, fontWeight: "700", position: "absolute", left: wp(4), bottom: wp(4), right: wp(4) },
})