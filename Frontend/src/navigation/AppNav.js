import { View, Text, ActivityIndicator } from 'react-native'
import React,{useContext} from 'react'


import AuthStack from './AuthStack'
import AppStack from './AppStack'
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import  COLORS  from '../model/colors';
import { AuthContext } from '../../Context/AuthContext';
const AppNav = () => {
  const {isLoading ,userToken}= useContext(AuthContext); 
  if(isLoading){
    return(
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ActivityIndicator size="large" color="#7d5fff" />
    </View>
    )
  }
  return (

    <NavigationContainer>
    {userToken !== null ? <AppStack /> : <AuthStack />}
     <StatusBar barStyle="light-content" backgroundColor={COLORS.primary} />
  
  </NavigationContainer>
    )
}

export default AppNav;