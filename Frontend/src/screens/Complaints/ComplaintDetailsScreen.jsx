import React, { useState, useRef,useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, StatusBar ,SafeAreaView} from 'react-native';
import { Avatar, IconButton } from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MapView ,{Marker} from 'react-native-maps';
import { Linking, Platform } from 'react-native';
import { COLORS } from '../../model';
//import Progress from '../components/ProgressTracker/Progress';
import StatusIcon from '../../components/stauts/StatusIcon';
import {useFocusEffect} from '@react-navigation/native';
import { baseUrl } from '../../utils/Api';
import { get } from 'react-native/Libraries/TurboModule/TurboModuleRegistry';
const ComplaintDetailScreen = ({ route, navigation }) => {
  const mapRef = useRef();

  const { itemData } = route.params;
  
  const getLocation = () => {
     
    mapRef.current.animateToRegion({
      latitude: itemData.locationInfo.latitude,
      longitude: itemData.locationInfo.longitude,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01,
    });
   
   

    
  } 
  useEffect(() => {
  
    
    getLocation();
  }, []);
  useFocusEffect(
    React.useCallback(() => {
     
    getLocation();
    }, [navigation])
  );

  const getMarkerImage = (category) => {
    switch (category) {
      case 'water':
        return require('../../assets/images/markers/water.png');
      case 'Road Maintaince':
        return require('../../assets/images/markers/roads.png');
      case 'stray_animals':
        return require('../../assets/images/markers/animal.png');
      case 'electricity':
        return require('../../assets/images/markers/electricity.png');
        case 'garbage':
          return require('../../assets/images/markers/garbage.png');
          case 'sanitation':
            return require('../../assets/images/markers/garbage.png');
      default:
        return require('../../assets/images/markers/map_marker.png'); // Default marker icon
    }
  };
  const [isExpanded, setIsExpanded] = useState(false);
  const scrollViewRef = useRef();

  const handleUpvote = (id) => {
    // Handle upvote
  };

  const handleChat = (id) => {
    // Handle chat
  };

  const openGoogleMap = () => {
    const scheme = Platform.select({ ios: 'maps:0,0?q=', android: 'geo:0,0?q=' });
    const latLng = `${itemData.locationInfo.latitude},${itemData.locationInfo.longitude}`;
    const label = 'Custom Label';
    const url = Platform.select({
      ios: `${scheme}${label}@${latLng}`,
      android: `${scheme}${latLng}(${label})`,
    });

    Linking.openURL(url);
  };

  const handleExpand = () => {
    setIsExpanded(!isExpanded);
    if (scrollViewRef.current && !isExpanded) {
      setTimeout(() => {
        scrollViewRef.current.scrollTo({ y: scrollViewRef.current.scrollHeight, animated: true });
      }, 100); // Adding a small delay for the animation to be smooth
    }
  };

  return (
    <SafeAreaView style={{ flex: 1,backgroundColor:'white' }}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.primary}  />
<View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: COLORS.primary, padding: 20,marginTop:20 }}>
  <TouchableOpacity onPress={() => navigation.navigate('ComplaintsList')}>
    <MaterialCommunityIcons name="arrow-left" size={24} color="white" />
  </TouchableOpacity>
  <Text style={{ fontSize: 18, fontWeight: 'bold', marginLeft: 10,color:'#ffffff' }}>Complaints</Text>
</View>
      <ScrollView style={{ flex: 1 }} ref={scrollViewRef}>
        <View style={{ padding: 20 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
            <Avatar.Image size={40} source={{ uri: `${baseUrl}${itemData.categoryMedia}`}} />
            <View style={{ marginLeft: 10 }}>
              <Text style={{ fontSize: 16, fontWeight: 'bold' }}>{itemData.title}</Text>
              <Text style={{ color: 'grey' }}>By {itemData.citizenId.fname + ' ' + itemData.citizenId.lname}</Text>
            </View>
          </View>
          <View style={{ borderBottomWidth: 1, borderBottomColor: 'lightgrey', marginBottom: 10 }} />
          <Image
            source={{ uri: itemData.media} }
            style={{ width: '100%', height: 200, marginBottom: 10 }}
            resizeMode="cover"
          />
          <View style={{ borderBottomWidth: 1, borderBottomColor: 'lightgrey', marginBottom: 10 }} />
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
            <MaterialCommunityIcons name="map-marker-outline" size={20} color="#555" />
            <Text style={{ marginLeft: 5 }}>{itemData.locationInfo.address}</Text>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
            <IconButton
              icon={() => <MaterialCommunityIcons name="arrow-up-bold-circle-outline" size={24} color="#007bff" />}
              onPress={() => handleUpvote(itemData.id)}
            />
            <Text style={{ marginHorizontal: 5 }}>{itemData.upVotes}</Text>
            <IconButton
              icon={() => <MaterialCommunityIcons name="message-reply-text" size={24} color="#007bff" />}
              onPress={() => handleChat(itemData.id)}
            />
            <Text style={{ marginHorizontal: 5 }}>0</Text>
          </View>
          <View  style={{borderWidth:1 ,borderRadius:3,borderColor:'gray'}}>
          <MapView
            style={{ width: '100%', height: 200 ,borderColor:'#0000',borderRadius:20,borderWidth:3}}
            ref={mapRef}
            onPress={openGoogleMap}
            initialRegion={{
              latitude: itemData.locationInfo.latitude,
              longitude: itemData.locationInfo.longitude,
              latitudeDelta: 0.01,
              longitudeDelta: 0.01,
            }}
            >
                 
            <Marker
            key={itemData.id}
            coordinate={{ latitude: itemData.locationInfo.latitude, longitude: itemData.locationInfo.longitude }}
          >
            <Image
              source={getMarkerImage(itemData.type)}
              style={{ width: 40, height: 40 }}
            />
          </Marker>
       
            </MapView>

</View>
{itemData.myComplaint ? (
  <View style={{ flex: 1, marginTop: 10 }}>
    <View style={{ display: 'flex', justifyContent: 'space-between', flexDirection: 'row' }}>
      <Text style={{ marginTop: 10, fontSize: 18, fontWeight: 400, color: 'white', marginBottom: 10, padding: 5, backgroundColor: COLORS.primary, borderRadius: 10 }}>Status</Text>
      <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 4 }}>
        <Text style={{ fontSize: 15, fontWeight: 400, color: 'gray', marginRight: 2 }}>{itemData.status}</Text>
        <StatusIcon status={itemData.status} />
      </View>
    </View>
    <TouchableOpacity
      style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 10 }}
      onPress={handleExpand}>
      <Text style={{ fontWeight: 400, fontSize: 15, color: 'white', marginBottom: 5, padding: 6, backgroundColor: COLORS.primary, borderRadius: 10 }}>Updates</Text>
      <MaterialCommunityIcons name={isExpanded ? "chevron-up" : "chevron-down"} size={30} color="black" />
    </TouchableOpacity>
    {isExpanded && (
      <ScrollView style={{ marginTop: 10, backgroundColor: 'white', padding: 10, marginBottom: 40 }}>
        <Text style={{ fontSize: 16, padding: 10, fontWeight: 500, color: 'black', margin: 5, fontFamily: 'Poppins-Medium' }}>
          {itemData.message ? itemData.message : 'No Recent Updates'}
        </Text>
      </ScrollView>
    )}
  </View>
) : null}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ComplaintDetailScreen;
