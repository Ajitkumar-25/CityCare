import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import LoginSvg from '../assets/images/misc/login.svg';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import GoogleSvg from '../assets/images/misc/google.svg';
import FacebookSvg from '../assets/images/misc/facebook.svg';
import TwitterSvg from '../assets/images/misc/twitter.svg';
import CustomButton from '../components/CustomButton';
const Signup = ({navigation}) => {
  return (
    <SafeAreaView style={{flex: 1, justifyContent: 'center'}}>
      <View style={{paddingHorizontal: 25}}>
        <View style={{alignItems: 'center'}}>
          <LoginSvg
            height={300}
            width={300}
            style={{transform: [{rotate: '-5deg'}]}}
          />
        </View>
        <Text
          style={{
            fontFamily: 'Roboto-Medium',
            fontSize: 28,
            fontWeight: '500',
            color: '#333',
            marginBottom: 30,
          }}>
          Login Screen
        </Text>

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
          
        />
           <InputField
          label={'Password'}
          icon={
            <MaterialIcons
            name="alternate-email"
            size={20}
            color="#666"
            style={{marginRight: 5}}
          />
          }
          inputType="password"
          fieldButtonLabel={"Forgot?"}
          fieldButtonFunction={()=>{}}
          
        />

     
        
     <CustomButton label={"Login"} onPress={()=>{}}/>
          <Text style={{textAlign: 'center', color: '#666', marginBottom: 30}}>
            Or,Login with ...
          </Text>
          
          <View style={{flexDirection:'row',justifyContent:'space-between',marginBottom:30}}>
          <TouchableOpacity
            onPress={() => {}}
            style={{
              borderColor: '#ddd',
              borderWidth: 20,
              paddingHorizontal: 30,
              paddingVertical: 10,
            }}>
            <GoogleSvg height={24} width={24} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {}}
            style={{
              borderColor: '#ddd',
              borderWidth: 20,
              paddingHorizontal: 30,
              paddingVertical: 10,
            }}>
            <FacebookSvg height={24} width={24} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {}}
            style={{
              borderColor: '#ddd',
              borderWidth: 20,
              paddingHorizontal: 30,
              paddingVertical: 10,
            }}>
            <TwitterSvg height={24} width={24} />
          </TouchableOpacity>
          </View>
     <View style={{flexDirection:'row',justifyContent:'center',marginBottom:30}}>
        <Text> New to the app? </Text>
        <TouchableOpacity onPress={()=>navigation.navigate('Register')}>
        <Text style={{color:'#AD40AF',fontWeight:'700'}}>Register</Text>
        </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Signup;
