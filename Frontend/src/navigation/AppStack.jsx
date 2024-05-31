
import React from 'react'
import { TouchableOpacity } from 'react-native';

import { createDrawerNavigator } from '@react-navigation/drawer';
import CustomDrawer from '../components/CustomDrawer';
import Homescreen from '../screens/Homescreen';
import ProfileScreen from '../screens/ProfileScreen';
import Complaint from '../screens/Complaints/Complaint';
import MomentsScreen from '../screens/MomentsScreen';
import SettingScreen from '../screens/SettingScreen';
import Iconicons from 'react-native-vector-icons/Ionicons';
import Tab from './Tab';

import { createStackNavigator } from '@react-navigation/stack';

import ComplaintsListScreen from '../screens/Complaints/ComplaintsListScreen';
import ComplaintDetailsScreen from '../screens/Complaints/ComplaintDetailsScreen';
import TabNavigation from './TabNavigation';
import LocationField from '../screens/Complaints/LocationField';
const Drawer = createDrawerNavigator();
const ComplaintStack = createStackNavigator();
const ComplaintStackScreen = () => (
  <ComplaintStack.Navigator screenOptions={{headerShown:false}} >
    <ComplaintStack.Screen name="ComplaintsList" component={ComplaintsListScreen} />
        <ComplaintStack.Screen name="ComplaintDetails" component={ComplaintDetailsScreen} />
    {/* <ComplaintStack.Screen name="Complaint" component={Complaint} /> */}
    {/* Add more screens if needed */}
    {/* <ComplaintStack.Screen name="Location" component={LocationField} /> */}
  </ComplaintStack.Navigator>
);
const AppStack = () => {
  return (
  
    <Drawer.Navigator drawerContent={props=><CustomDrawer{...props}/>} screenOptions={{
    drawerActiveBackgroundColor:'#7d5fff',
    drawerActiveTintColor:'#fff',
    drawerInactiveTintColor:'#333',
    drawerLabelStyle:{
      marginLeft:-1,
      fontFamily:'Roboto-Medium',
      fontSize:15,
      
    }}}>
        <Drawer.Screen
          name="Home"
          component={Tab}
          options={{
            drawerIcon:({color})=>{
            <Iconicons name="home-outline" size={22} color ={color}/>
          
            },
            headerShown:false
            
          }} 
                
        />
       
        <Drawer.Screen
  name="Complaints"
  component={ComplaintStackScreen}
  options={{
            drawerIcon:({color})=>{
            <Iconicons name="chatbox-ellipses-outline" size={22} color ={color}/>
          
            },
            headerShown:false
          }}   
            
/>
        <Drawer.Screen
          name="Alerts"
          component={MomentsScreen}
          options={{
            drawerIcon:({color})=>{
            <Iconicons name="timer-outline" size={22} color ={color}/>
          
            },
            headerShown:false
          }}     
    
        />
        <Drawer.Screen
          name="Settings"
          component={SettingScreen}
          options={{
            drawerIcon:({color})=>{
            <Iconicons name="settings-outline" size={22} color ={color}/>
          
            }
          }}     
        />
         {/* <Drawer.Screen
          name="Profile"
          component={ProfileScreen}
          options={{
            drawerIcon:({color})=>{
            <Iconicons name="person-outline" size={22} color ={color}/>
          
            },headerShown:false
            
          }}     
          
        />
        */}
      </Drawer.Navigator>

  )
}

export default AppStack