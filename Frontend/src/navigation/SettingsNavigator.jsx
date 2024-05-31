import {View, Text} from 'react-native';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Settings,SettingScreen} from '../screens';
import {ROUTES ,COLORS} from '../model';
import {
  NavigationContainer,
  useNavigation,
  DrawerActions,
} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Entypo';

import ForgotPassword from '../screens/ForgotPassword';
import Register from '../screens/Register';


const Stack = createNativeStackNavigator();

const SettingsNavigator = () => {
  const navigation = useNavigation();
  return (
    <Stack.Navigator
      screenOptions={{
        headerTintColor: COLORS.white,
        headerBackTitle: false,
        headerStyle: {
          backgroundColor: COLORS.primary,
        },
      }}>
     
      <Stack.Screen name={ROUTES.SETTINGS} component={Settings} />
      <Stack.Screen name={ROUTES.SETTINGS_DETAIL} component={SettingScreen} />
    
    </Stack.Navigator>
  );
};

export default SettingsNavigator;
