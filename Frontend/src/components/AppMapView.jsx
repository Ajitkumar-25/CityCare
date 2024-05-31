import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import axios from 'axios';
import React, { useEffect, useState, useRef,useCallback } from 'react';
import { StyleSheet, View, Text, Dimensions, TouchableOpacity,TextInput, SafeAreaView,KeyboardAvoidingView,Platform ,Image} from 'react-native';
import GetLocation from 'react-native-get-location';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { api } from '../utils/Api';
import { baseUrl } from '../utils/Api';

import Card from '../components/cards/card'
import Tabs from '../navigation/Tab';
import { useFocusEffect } from '@react-navigation/native';
import MapViewStyle from '../model/MapVIewStyle.json';
const Data = [
  {
    id: '1',
    name: 'Water',
    description: 'This is an amazing place with delicious food.',
    image: require('../assets/images/pokemon.jpeg'), // Ensure you have this image in your assets
    formatted_address: '123 Main St, New York, NY 10030',
    upvotes: 123,
  },
  {
    id: '2',
    name: 'Animals',
    description: 'Incredible flavors and unforgettable experiences.',
    image: require('../assets/images/pokemon.jpeg'),
    formatted_address: '456 Main St, New York, NY 10030',
    upvotes: 456,
  },
  {
    id: '3',
    name: 'Roads',
    description: 'Incredible flavors and unforgettable experiences.',
    image: require('../assets/images/pokemon.jpeg'),
    formatted_address: '789 Main St, New York, NY 10030',
    upvotes: 789,
    
  },
  {
    id: '4',
    name: 'Electricity',
    description: 'Incredible flavors and unforgettable experiences.',
    image: require('../assets/images/pokemon.jpeg'),
    formatted_address: '789 Main St, New York, NY 10030',
    upvotes: 789,
  },
  
];


const AppMapView = (props, route) => {
  const navigation = props.navigation;
  const mapRef = useRef();
  const [origin, setorigin] = useState(null);
  const [complaints, setComplaints] = useState([]);
  const [mainComplaints, setmainComplaints] = useState([]);

  const [userLocation, setUserLocation] = useState({
    latitude: 37.78825,
    longitude: -122.4324,
  });

  useEffect(() => {
    const getLocation = async () => {
      try {
        const location = await GetLocation.getCurrentPosition({
          enableHighAccuracy: false,
          timeout: 5000,
          maximumAge: 10000,
        });
        setUserLocation({
          latitude: location.latitude,
          longitude: location.longitude,
        });
        mapRef.current.animateToRegion({
          latitude: location.latitude,
          longitude: location.longitude,
          latitudeDelta: 0.005,
          longitudeDelta: 0.005,
        });
        const {data} =
        await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${location.latitude},${location.longitude}&key=${api}
      `);
     
      setorigin(data.results[0].formatted_address);
    

        
      } catch (error) {
        console.warn('Error fetching location:', error);
      }
    };
    getLocation();
  }, []);

  const homeComplaints=async()=>{
    try{
    const res=await axios.post(`${baseUrl}homeComplaintList`);
    // console.log(res.data.homeComplaints);
    setmainComplaints(res.data.homeComplaints);
    }catch (error) {
      console.error('Error fetching complaints:', error);
    }

  }
  useEffect(() => {
  homeComplaints();
},[]);

useFocusEffect(
  useCallback(() => {
    homeComplaints();
  }, [navigation])
);
  const fetchComplaints = useCallback(async () => {
    try {
      const response = await axios.post(`${baseUrl}all_complaints_coordinates`);
    
      setComplaints(response.data.allComplaints);
    } catch (error) {
      console.error('Error fetching complaints:', error);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      fetchComplaints();
    }, [fetchComplaints])
  );
  const getMarkerImage = (category) => {
    switch (category) {
      case 'water':
        return require('../assets/images/markers/water.png');
      case 'Road Maintaince':
        return require('../assets/images/markers/roads.png');
      case 'stray_animals':
        return require('../assets/images/markers/animal.png');
      case 'electricity':
        return require('../assets/images/markers/electricity.png');
        case 'garbage':
          return require('../assets/images/markers/garbage.png');
          case 'sanitation':
            return require('../assets/images/markers/garbage.png');
      default:
        return require('../assets/images/markers/map_marker.png'); // Default marker icon
    }
  };

  const handleLocationSelect = async (data, details = null) => {
    try {
      const response = await axios.get(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(details.description)}&key=${api}`
      );
      const location = response.data.results[0].geometry.location;
      const { lat, lng } = location;
     
      // Update the state with the selected location
      setUserLocation({ latitude: lat, longitude: lng });
  
      // Animate the map to the selected location
      mapRef.current.animateToRegion({
        latitude: lat,
        longitude: lng,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005,
      });
    } catch (error) {
      console.error('Error fetching coordinates:', error);
    }
  };

  return (
  
<View style={{flex:1 ,backgroundColor:'#fffff'}}>
      <View style={{ flex: 1 }}>
        <MapView
          ref={mapRef}
          style={styles.map}
          provider={PROVIDER_GOOGLE}
          customMapStyle={MapViewStyle}
          initialRegion={{
            latitude: userLocation.latitude,
            longitude: userLocation.longitude,
            latitudeDelta: 0.092,
            longitudeDelta: 0.041,
          }}
        >
           {complaints.map((complaint, index) => (
          <Marker
            key={index}
            coordinate={{ latitude: complaint.locationInfo.latitude, longitude: complaint.locationInfo.longitude }}
          >
            <Image
              source={getMarkerImage(complaint.type)}
              style={{ width: 40, height: 40 }}
            />
          </Marker>
        ))}
          <Marker
            coordinate={{
              latitude: userLocation.latitude,
              longitude: userLocation.longitude,
            }}
          />
        </MapView>
      </View>
 
      <View
          style={{
            position:'absolute',
            right: 20,
            top: 45,
            left: 20,
            flexDirection: 'row',
            alignItems: 'flex-start',
            gap: 10,
            //backgroundColor:'#ffffff',
            //flex:1,
            padding:10

          }}>
          <View
            style={{
              height: 45,
              width: 42,
              borderRadius: 10,
              backgroundColor: 'white',
              justifyContent: 'center',
              alignItems: 'center',
              
              
            }}>
            <TouchableOpacity onPress={() => navigation.openDrawer()}>
            <Ionicons name="menu" size={28} color="grey" />
          </TouchableOpacity>
          </View>

         
   <GooglePlacesAutocomplete
            placeholder='Enter Location'
            onPress={handleLocationSelect}
            query={{
              key: api,
              language: 'en',
            }}
            minLength={3}
            
            
          
            nearbyPlacesAPI={api}
            enablePoweredByContainer={false}
            debounce={300}
            styles={{
          textInputContainer: {
            backgroundColor: 'transparent',
            borderTopWidth: 0,
            borderBottomWidth: 0,
            flexDirection: 'row',
            alignItems: 'center',
            width: '100%',
            alignSelf: 'center',
            
          },
          textInput: {
            height: 48,
            color: '#5d5d5d',
            fontSize: 16,
            borderRadius: 10,
            borderWidth: 1.2,
            borderColor: '#CCCCCC',
            paddingLeft: 30,
          },
          listView: {
            width: '99%',
            
            alignSelf: 'center',
            height: 110, // Set a fixed height to enable vertical scrolling, adjust as needed
          },
          row: {
            backgroundColor: '#FFFFFF',
            padding: 10,
            height: 40, // Ensure the row height aligns with the intended number of items
          },
          separator: {
            height: 0.5,
            backgroundColor: '#c8c7cc',
          },
        }}
   
       />
        </View>
        
        
         <View style={styles.cardContainer}>
        
        <Card data={mainComplaints} navigation={navigation} />
      </View>
      </View>
   
 
 
  );
};

const styles = StyleSheet.create({
  map: {
    flex: 0.66,
  },
  searchContainer: {
    position: 'absolute',
    top: 20,
   
    left: 20,
    right: 20,
    flex: 0.7,
    flexDirection: 'row',
    alignItems: 'center',
    zIndex: 1,
  backgroundColor: 'transparent',
    alignItems: 'flex-start',
  },
  menuButton: {
    height: 40,
    width: 40,
    borderRadius: 100,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    // position: 'fixed',
  },
  searchInputContainer: {
    backgroundColor: 'white',
    flex: 1,
    borderRadius: 20,
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 10,
  },
  textInputContainer: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 20,
  },
  cardContainer: {
    position: 'absolute',
    bottom: 0,
    zIndex: 10,
    backgroundColor:'#ffffff',
   
    
  },
  textInput: {
    fontSize: 16,
    backgroundColor: 'white',
    borderRadius: 20,
    paddingLeft: 10,
  },
  listView: {
    backgroundColor: 'white',
    borderRadius: 10,
    marginTop: 10,
  },
});


export default AppMapView;
