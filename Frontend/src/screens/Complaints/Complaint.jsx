 import React, {useState, useEffect,useContext} from 'react';
 import { showMessage } from 'react-native-toast-message'; // Import showMessage function

import {
  Text,
  TextInput,
  TouchableOpacity,
  View,
  StyleSheet,
  Modal,
  KeyboardAvoidingView,
  ScrollView,
  Image,
  ActivityIndicator,
} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import {launchImageLibrary, launchCamera} from 'react-native-image-picker';

import LinearGradient from 'react-native-linear-gradient';
// import LoaderKit from 'react-native-loader-kit'

import Feather from 'react-native-vector-icons/Feather';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {AuthContext} from '../../../Context/AuthContext';
import { COLORS } from '../../model';
import { baseUrl } from '../../utils/Api';



const ComplaintForm = ({navigation, route}) => {
  const {addField , setAddField}  = useContext(AuthContext);
  const {location,origin,address,pinCode} = route.params||{};
  
  const [complaintTitle, setComplaintTitle] = useState('');
  const [description, setDescription] = useState('');
  const [complaintType, setComplaintType] = useState('');

  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
 
  const [selectedImages, setSelectedImages] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  
  
  const [mediaType, setMediaType] = useState(null);
  const [media, setMedia] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [uploading,setUploading]=useState(false);
  const[editable,setEditable]=useState(false);
  
  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(false);
    setDate(currentDate);
  };
  
  const handleSubmit = async () => {
    setLoading(true);
    setError(null);
  
    try {
   
      setComplaintTitle('');
      setDescription('');
      setComplaintType('');
      setDate(new Date());
     setAddField('');
      setMediaType(null);
      setMedia(null);
      setTimeout(()=>{

        setLoading(false);
        setTimeout(()=>{
          //  showToast();
        },1000)
      
      },3000);
      
     
    } catch (error) {
      console.error('There was an error!', error);
      setError(
        'There was an error while submitting the form. Please try again.',
      );
      
    }
   
  };
  

    
 
  const openGallery = async () => {
    const options = {
      title: 'Select Image or Video\n(mixed)',
      type: 'library',
      options: {
        selectionLimit: 0,
        mediaType: 'mixed',
       
      }
    }
    launchImageLibrary(options, async (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorCode) {
        console.log('ImagePicker Error: ', response.errorCode);
      } else {
      
        const media = response.assets[0];
        console.log('media url ',media.uri);
   
        let form = new FormData();
        form.append('title', complaintTitle);
        form.append('type', complaintType);
        form.append('description', description);
        form.append('latitude', location && location.latitude);
        form.append('longitude', location && location.longitude);
        form.append('address', address);
        form.append('pincode', pinCode);
        form.append('files', {
          uri: media.uri,
          type: media.type,
          name: media.fileName,
        });

        const token = await AsyncStorage.getItem('userToken');

        axios.post(`${baseUrl}create_new_complaint`, form, {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${token}`,
          },
        })
    
      }
    });
    setTimeout(() => {
      setUploading(true);
    }, 1000);
   // setUploading(true);
    setTimeout(() => {
      setUploading(false);
    }, 5000);
  }
       
  return    (  
     
<View style={{flex:1,paddingBottom:90,paddingTop:20}}>
        <ScrollView  contentContainerStyle={{flexGrow:1}}
        >
          <View style={styles.container}>
            {error && <Text style={styles.error}>{error}</Text>}
            <Text style={styles.label}>Complaint Title:</Text>
            <TextInput
              style={[styles.input, complaintTitle ? {borderColor: '#7d5fff'} : null]}
              onChangeText={text => setComplaintTitle(text)}
              value={complaintTitle}
            />

            <Text style={styles.label}>Complaint Type:</Text>
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={complaintType}
                onValueChange={itemValue => setComplaintType(itemValue)}
                style={styles.picker}>
                <Picker.Item style={{color:'grey'}}label="Select Category Of Complaint" value="" />
                <Picker.Item label="Water" value="water" />
                <Picker.Item label="Electricity" value="electricity" />
                <Picker.Item label="Garbage" value="garbage" />
                <Picker.Item label="Sanitation" value="sanitation" />
                <Picker.Item label="Stray Animals" value="stray_animals" />
                <Picker.Item label="Road Maintaince" value="Road Maintaince" />
              </Picker>
            </View>

            <Text style={styles.label}>Description of Complaint:</Text>
            <TextInput
              style={[styles.input, {height: 100, textAlignVertical: 'top'}]}
              onChangeText={text => setDescription(text)}
              value={description}
              multiline
            />

            <Text style={styles.label}>Location:</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Location')}>
              <View
                style={{
                  padding: 5,
                  marginTop: 3,
                  marginBottom: 9,
                  borderWidth: 1,
                  borderColor: '#ccc',
                  borderRadius: 5,
                }}>
                <TextInput editable={false} placeholder=' Selection Location' value={addField}></TextInput>
              </View>
            </TouchableOpacity>

            <Text style={styles.label}>Date and Time:</Text>
            <TouchableOpacity
              style={styles.input}
              onPress={() => setShowDatePicker(true)}>
              <Text>
                {date ? date.toLocaleString() : 'Select Date and Time'}
              </Text>
            </TouchableOpacity>
            {showDatePicker && (
              <DateTimePicker
                value={date || new Date()}
                mode="datetime"
                is24Hour={true}
                display="default"
                onChange={handleDateChange}
              />
            )}

            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                height: 200,
                backgroundColor: '#fffff',
                borderWidth: 1,
                borderRadius: 20,
                marginTop: 10,
                marginBottom: 20,
                padding: 20,
                borderColor: '#ccc',
              }}>
                {uploading?(<>
                {/* <LoaderKit   style={{ width: 50, height: 50 }}
  name={'BallPulse'} 
  color={COLORS.primary} /> */}

  <Text style={{color:'COLORS.primary',fontSize:17}}>Uploading...</Text>
</>):( <TouchableOpacity
                style={{justifyContent: 'center', alignItems: 'center'}}
                onPress={openGallery}>
                 
                <Feather name="upload-cloud" size={70} color="black" />
                
                <Text style={{fontSize: 20, fontWeight: 'bold'}}>
                  Upload Media
                </Text>
              </TouchableOpacity>)}
             
            </View>

            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={[styles.button, {backgroundColor: '#7d5fff'}]}
                onPress={handleSubmit}
                disabled={loading}>
                <LinearGradient
                  colors={['#7d5fff', '#8961ff']}
                  start={{x: 0, y: 0}}
                  end={{x: 1, y: 0}}
                  style={styles.gradient}>
                   
                  <Text style={styles.buttonText}>
                   
                    {loading ? 'Submitting...'
//                     <LoaderKit
//   style={{ width: 30, height: 30 }}
//   name={'BallBeat'} // Optional: see list of animations below
//   color={'White'} // Optional: color can be: 'red', 'green',... or '#ddd', '#ffffff',...
// /> 
: 'Submit'}
                  </Text>
                </LinearGradient>
              </TouchableOpacity>
             
            </View>
          </View>
        </ScrollView>
        
        </View>
    
  
   );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    
    margin: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  error: {
    color: 'red',
    marginBottom: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    width: '80%',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  mediaPicker: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  button: {
    flex: 1,
    borderRadius: 20,
    paddingVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 5,
    textAlign: 'center',
    
  },
  gradient: {
    flex: 1,
    borderRadius: 20,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 10,
    padding: 6,
    justifyContent: 'center',
   
  },
  picker: {
    height: 40, // Adjust the height as needed
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: -7,
  },
});


export default ComplaintForm;