import { View, Text } from 'react-native'
import React from 'react'
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Onboarding from '../screens/OnboardingScreen';
import Login from '../screens/Login';
import { NavigationContainer ,useNavigation,DrawerActions} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Entypo';
import ROUTES from '../model/routes';
import ForgotPassword from '../screens/ForgotPassword';
import Register from '../screens/Register';
import COLORS from '../model/colors';
import TabNavigation from './TabNavigation';
import AppStack from './AppStack';
import { HomeScreen } from '../screens';
import Tabs from './Tab';
import ComplaintDetailScreen from '../screens/Complaints/ComplaintDetailsScreen';
const Stack = createNativeStackNavigator();

const AuthStack = () => {
  const navigation = useNavigation();
  return (
  
    <Stack.Navigator screenOptions={{
 headerTintColor: COLORS.white,
  headerBackTitle: false,
      headerStyle: {
        backgroundColor: COLORS.primary,
       


      },
     
   }}>
   

        
   
        <Stack.Screen
          name="Onboarding"
          component={Onboarding}
          options={{headerShown:false}}
        />
        <Stack.Screen
          name={ROUTES.LOGIN}
          component={Login}
        
        />
        <Stack.Screen
          name={ROUTES.FORGOT_PASSWORD}
          component={ForgotPassword}
           options={({route})=>({headerTineColor:COLORS.white,
           headerBackTitle:false,
           headerStyle:{backgroundColor:COLORS.primary},
           title:route.params.userId,})}
        />
         <Stack.Screen
          name={ROUTES.REGISTER}
          component={Register}
        
        />
    
    <Stack.Screen
          name={ROUTES.HOME}
          component={AppStack}
         options ={{headerShown:false}}
        />
        
       
      </Stack.Navigator>
     
     
  )
}

export default AuthStack