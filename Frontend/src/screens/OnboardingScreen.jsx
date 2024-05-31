import React from 'react';
import MaterialIcos from 'react-native-vector-icons/MaterialIcons';
import {View, Text, SafeAreaView, TouchableOpacity, Image} from 'react-native';
import ROUTES from '../model/routes';
import COLORS from '../model/colors';
const Onboarding = ({navigation}) => {
  return (
    <SafeAreaView
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
      }}>
      <View style={{marginTop: 90}}>
        <Text
          style={{
            fontSize: 42,
    textAlign: 'center',
    fontWeight: 'bold',
    color: COLORS.primary,
    opacity: 0.9,
          }}>
          CityCare
        </Text>
      </View>
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Image
          source={require('../assets/images/splashfinalpng.png')}
          style={{width: 410, height: 380}}
        />
      </View>

      <TouchableOpacity
        onPress={() => navigation.navigate(ROUTES.LOGIN)}
        style={{
          backgroundColor: COLORS.primary,
          padding: 20,
          width: '90%',
          borderRadius: 50,
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginBottom: 50,
        }}>
        <Text
          style={{
            fontWeight: 600,
            fontSize: 18,
            color: COLORS.white,
            fontFamily: 'Roboto-Italic',
          }}>
          Get Started
        </Text>
        <MaterialIcos name="arrow-forward" size={22} color="#fff" />
      </TouchableOpacity>
    </SafeAreaView>
  );
};
export default Onboarding;
