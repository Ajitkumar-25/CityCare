import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import React,{useState} from 'react';
import RegisterSvg from '../assets/images/misc/registration.svg';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import GoogleSvg from '../assets/images/misc/google.svg';
import FacebookSvg from '../assets/images/misc/facebook.svg';
import TwitterSvg from '../assets/images/misc/twitter.svg';
import InputField from '../components/InputField';
import CustomButton from '../components/CustomButton';
import DatePicker from 'react-native-date-picker';

const Signup = ({navigation}) => {
    const [date, setDate] = useState(new Date())
    const [open, setOpen] = useState(false)
    const [dobLabel,setDobLabel] =useState('Date of Birth');
  
  return (
    <SafeAreaView style={{flex: 1, justifyContent: 'center'}}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{paddingHorizontal: 25}}>
        <View style={{alignItems: 'center'}}>
          <RegisterSvg
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
          Register
        </Text>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginBottom: 30,
          }}>
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
          <Text style={{textAlign: 'center', color: '#666', marginBottom: 30}}>
            Or,register with email ...
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            marginBottom: 30,
          }}>
          <Text> Already Registered? </Text>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={{color: '#AD40AF', fontWeight: '700'}}>Login</Text>
          </TouchableOpacity>
        </View>
        <InputField
          label={'Full Name'}
          icon={
            <Ionicons
              name="person-outline"
              size={20}
              color="#666"
              style={{marginRight: 5}}
            />
          }
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
        />

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
        <View
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
        }} />

        <CustomButton label={'Register'} onPress={() => {}} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Reg;
