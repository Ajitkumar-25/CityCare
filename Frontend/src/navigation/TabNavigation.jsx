import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { HomeScreen, Wallet, Notifications, SettingScreen } from '../screens';
import { ROUTES, COLORS } from '../model';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
//import Icon from 'react-native-vector-icons/Ionicons';
import Complaint from '../screens/Complaints/Complaint';
import ComplaintDetailsScreen from '../screens/Complaints/ComplaintDetailsScreen';
import ComplaintList from '../screens/Complaints/ComplaintsListScreen';
import {Box,HStack,Pressable ,Center,Icon} from "native-base";
import MaterialIcons  from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import LocationField from '../screens/Complaints/LocationField';
import { SafeAreaView } from 'react-native-safe-area-context';
//import Icon from 'react-native-vector-icons/Ionicons';
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const ComplaintStack = () => {
  return (
    <Stack.Navigator initialRouteName="ComplaintForm" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="ComplaintForm" component={Complaint} />
      <Stack.Screen name="Location" component={LocationField} />
    </Stack.Navigator>
  );
};
function TabNavigation() {
  return (
    <Tab.Navigator screenOptions={({route})=>({
      headerShown:false,
      tabBarActiveTintColor:COLORS.primary,
      tabBarIcon:({color,size,focused})=>{
        let iconName;
        if(route.name===ROUTES.HOME_TAB){
          iconName=focused?'home':'home-outline'
        }else if(route.name===ROUTES.WALLET){
          iconName=focused?'wallet':'wallet-outline'
        }else if(route.name===ROUTES.NOTIFICATIONS){
          iconName=focused?'notifications':'notifications-outline'
        }else if(route.name===ROUTES.SETTINGS){
          iconName=focused?'settings':'settings-outline'
        }
        return <Icon name={iconName} size={22} color={color} />
      }
    })}>
      <Tab.Screen name={ROUTES.HOME_TAB}component={HomeScreen} />
      <Tab.Screen name={ROUTES.WALLET}component={Wallet} />
      <Tab.Screen name={ROUTES.NOTIFICATIONS}component={Notifications} />
      <Tab.Screen name={ROUTES.SETTINGS_NAVIGATOR}component={SettingsNavigator} />
     
    </Tab.Navigator>
  );
}
export default TabNavigation;