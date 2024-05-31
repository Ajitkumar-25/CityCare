import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Alert
} from 'react-native';
import React,{useState,useContext} from 'react';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';

import InputField from '../components/InputField';

import COLORS from '../model/colors';
import LinearGradient from 'react-native-linear-gradient';
import Logo from '../assets/images/misc/login.svg';
import Feather from 'react-native-vector-icons/Feather'

import {AuthContext} from '../../Context/AuthContext';
import ROUTES from '../model/routes';
import CustomAlertModal from '../components/CustomModelReg';
import Spinner from 'react-native-loading-spinner-overlay';
import { Center, Box, Select, CheckIcon } from 'native-base';
import axios from 'axios';
import api from '../utils/Api';
const Signup = ({navigation}) => {
  const [isModalVisible, setModalVisible] = useState(false);
  

    const [fname, setFname] = useState(null);
    const [lname, setLname] = useState(null);
    const [email, setEmail] = useState(null);
    const[password,setPassword]=useState(null);
    const[location,setLocation]=useState(null);
    const[pincode,setPincode]=useState(null);
    const {isLoading,register,setIsLoading} = useContext(AuthContext);
    const[mobile,setMobile]=useState(null);
     const handleSignup = async () => {
     // handlePincode(pincode);
    setIsLoading(true);
    try {
      const isRegistered = await register(
        fname,
        lname,
        email,
        mobile,
        pincode,
        'noida',
        'sector 62',
        'up',
       'india',
        password
      );
      setIsLoading(false);
      if (!isRegistered) {
        // Navigate to home screen upon successful registration
        navigation.navigate(ROUTES.HOME);
      }
    } catch (error) {
      console.error('Error signing up: ', error);
      setIsLoading(false);
    }
  };
    
    const handleModalOkPress = () => {
      setModalVisible(false); // Close the modal
      navigation.navigate(ROUTES.LOGIN); // Navigate to Login Screen
    };
    
  return (
    <SafeAreaView style={{flex: 1, justifyContent: 'center',paddingTop:60,marginBottom:10}}>
    <Spinner visible={isLoading}/>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{paddingHorizontal: 25}}>
        <View style={{alignItems: 'center'}}>

        </View>
        <View style={styles.row}>
            <Logo width={55} height={55} style={styles.mr7} />
            <Text style={styles.brandName}>CityCare</Text>
          </View>

      

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            marginBottom: 30,
          }}>
          <Text> Already Registered? </Text>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={{color: COLORS.primary, fontWeight: '700'}}>Login</Text>
          </TouchableOpacity>
        </View>
        <InputField
          label={'First Name'}
          icon={
            <Ionicons
              name="person-outline"
              size={20}
              color="#666"
              style={{marginRight: 5}}
            />
          }
          value={fname}
          onChangeText={text=>setFname(text)}
        />
        <InputField
          label={'Last Name'}
          icon={
            <Ionicons
              name="person-outline"
              size={20}
              color="#666"
              style={{marginRight: 5}}
            />
          }
          value={lname}
          onChangeText={text=>setLname(text)}
        />
        <InputField
          label={'Email ID'}
          icon={
            <MaterialIcons
              name="alternate-email"
              size={20}
              color="#666"
              style={{marginRight: 5}}
            />
          }
          keyboardType="email-address"
          value={email}
          onChangeText={text=>setEmail(text)}
        />
        <InputField
          label={'Mobile'}
          icon={
            <Feather
              name="phone"
              size={20}
              color="#666"
              style={{marginRight: 5}}
            />
          }
          value={mobile}
          onChangeText={text=>setMobile(text)}
          keyboardType="number-pad"
        />
           <InputField
          label={'Enter Pincode'}
          icon={
            <Ionicons
              name="location-outline"
              size={20}
              color="#666"
              style={{marginRight: 5}}
            />
          }
          value={pincode}
          //onChangeText={text=>setPincode(text)}
          onChangeText={text=>setPincode(text)}

          keyboardType="number-pad"
        />
        {/* <InputField
          label={'Enter Address'}
          icon={
            <Ionicons
              name="location-outline"
              size={20}
              color="#666"
              style={{marginRight: 5}}
            />
          }
          value={location}
          onChangeText={text=>setLocation(text)}
          keyboardType="default"
        /> */}
     
        <InputField
          label={'Password'}
          icon={
            <Ionicons
              name="lock-closed-outline"
              size={20}
              color="#666"
              style={{marginRight: 5}}
            />
          }
          value={password}
          onChangeText={text=>setPassword(text)}
          inputType="password"
        />
        <InputField
          label={'Confirm Password'}
          icon={
            <Ionicons
              name="lock-closed-outline"
              size={20}
              color="#666"
              style={{marginRight: 5}}
            />
          }
          
          inputType="password"
        />
        {/* <View
          style={{
            flexDiection: 'row',
            borderBottomColor: '#ccc',
            borderBottomWidth: 1,
            paddingBottom: 8,
            marginBottom: 30,
          }}>
          <Ionicons
            name="calender-outline"
            size={20}
            color="#666"
            style={{marginRight: 5}}
          />
          <TouchableOpacity onPress={() => setOpen(true)}>
            <Text style={{color:'#666',marginLeft:5,marginTop:5}}>{dobLabel}</Text>
          </TouchableOpacity>
        </View>
        <DatePicker
        modal
        open={open}
        date={date}
        maximumDate={new Date('2005-01-01')}
        minimumDate={new Date('1980-01-01')}

        mode={'date'}
        onConfirm={(date) => {
          setOpen(false)
          setDate(date)
          setDobLabel(date.toDateString());
        }}
        onCancel={() => {
          setOpen(false)
        }} /> */}

    
<View style={styles.loginBtnWrapper}>
            <LinearGradient
              colors={[COLORS.gradientForm, COLORS.primary]}
              style={styles.linearGradient}
              start={{y: 0.0, x: 0.0}}
              end={{y: 1.0, x: 0.0}}>
              {/******************** register BUTTON *********************/}
              <TouchableOpacity
                onPress={() => {handleSignup()}}
                activeOpacity={0.7}
                style={styles.loginBtn}>
                <Text style={styles.loginText}>Sign Up</Text>
              </TouchableOpacity>
              <CustomAlertModal
        isVisible={isModalVisible}
        onDismiss={() => setModalVisible(false)}
        onOkPress={handleModalOkPress}
      />

            </LinearGradient>
          </View>
         
         
      </ScrollView>
    </SafeAreaView>
  );
};

export default Signup;
const styles=StyleSheet.create({
  loginBtnWrapper: {
    height: 55,
    marginTop: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
      
    },
    shadowOpacity: 0.4,
    shadowRadius: 3,
    elevation: 5,
  },
  linearGradient: {
    width: '100%',
    borderRadius: 50,
  },
  loginBtn: {
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: 55,
  },
  loginText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: '400',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  mr7: {
    marginRight: 7,
  },
  brandName: {
    fontSize: 42,
    textAlign: 'center',
    fontWeight: 'bold',
    color: COLORS.primary,
    opacity: 0.9,
  },
})