import MapView, { PROVIDER_GOOGLE, Marker ,} from 'react-native-maps';
import axios from 'axios';
import React, { useEffect, useState, useRef,useContext } from 'react';
import { StyleSheet, View, Text, Dimensions, TouchableOpacity,TextInput } from 'react-native';
import GetLocation from 'react-native-get-location';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { api } from '../../utils/Api';
import { AuthContext } from '../../../Context/AuthContext';

  // Add more restaurants as needed


const LocationField = (props, route) => {
  const {addField , setAddField}  = useContext(AuthContext);
  const navigation = props.navigation;
  const mapRef = useRef();
  const [origin, setorigin] = useState(null);
  const [userLocation, setUserLocation] = useState({
    latitude: 37.78825,
    longitude: -122.4324,
  });
  const [loading, setLoading] = useState(false);
  const [address, setAddress] = useState('');
  const [pinCode,setPinCode]=useState('');
  const [selectedLocation, setSelectedLocation] = useState(null);
  useEffect(() => {
    const getLocation = async () => {
      try {
        setLoading(true);
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
        const { data } = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${location.latitude},${location.longitude}&key=${api}`);
        setorigin(data.results[0].formatted_address);
      } catch (error) {
        console.warn('Error fetching location:', error);
      } finally {
        setLoading(false);
      }
    };
    getLocation();
  }, []);

  const getAddressFromLatLng = async (latitude, longitude) => {
    try {
      let address='';
      let pinCode='';
       await axios.get(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=AIzaSyC-T23lK4Ay-1--rq6EsQPL8BPUVWEJygY`,
      ).then((response) => {
        address = response.data.results[0].formatted_address;
        pinCode=response.data.results[0].address_components[response.data.results[0].address_components.length-1].long_name;
         
      setAddress(address);
      setPinCode(pinCode);
      }).catch((error) => {
        console.error('Error fetching address:', error);
      });
  
      
    
    } catch (error) {
      console.error('Error fetching address:', error);
      return null;
    }
  };
  const handleLocationSelect = async (data, details = null) => {
    try {
      setLoading(true);
      const response = await axios.get(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(details.description)}&key=${api}`
      );
      const location = response.data.results[0].geometry.location;
      const { lat, lng } = location;
     // await getAddressFromLatLng(lat, lng);
     const pinCode = response.data.results[0].address_components.find(
      (component) => component.types.includes('postal_code')
    ).long_name;
    setAddField(details.description);
     setSelectedLocation({ latitude: lat, longitude: lng, address: details.description });
      navigation.navigate('ComplaintForm', { location: { latitude: lat, longitude: lng } ,address:details.description,pinCode});
      mapRef.current.animateToRegion({
        latitude: lat,
        longitude: lng,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005,
      });
    } catch (error) {
      console.error('Error fetching coordinates:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    
    <View style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        <MapView
          ref={mapRef}
          style={styles.map}
          provider={PROVIDER_GOOGLE}
          initialRegion={{
            latitude: userLocation.latitude,
            longitude: userLocation.longitude,
            latitudeDelta: 0.092,
            longitudeDelta: 0.041,
          }}
        >
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
            top: 35,
            left: 20,
            flexDirection: 'row',
            alignItems: 'flex-start',
            gap: 10,
            backgroundColor:'#fffff'
          }}>
          

         
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
        
    </View>
  );
};

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
  searchContainer: {
    position: 'absolute',
    top: 35,
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


export default LocationField;
