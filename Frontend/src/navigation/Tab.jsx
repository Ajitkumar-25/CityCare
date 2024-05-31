import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import {HomeScreen, Wallet, Notifications, SettingScreen} from '../screens';
import {ROUTES, COLORS} from '../model';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  KeyboardAvoidingView,
} from 'react-native';
//import Icon from 'react-native-vector-icons/Ionicons';
import Complaint from '../screens/Complaints/Complaint';
import ComplaintDetailsScreen from '../screens/Complaints/ComplaintDetailsScreen';
import ComplaintList from '../screens/Complaints/ComplaintsListScreen';

import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import LocationField from '../screens/Complaints/LocationField';
import {SafeAreaView} from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';
import {ScrollView} from 'react-native-gesture-handler';
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const ComplaintStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="ComplaintForm"
      screenOptions={{headerStyle: {
    backgroundColor:COLORS.primary,
     
      },
      headerTintColor:'white'}}>
      <Stack.Screen name="ComplaintForm" component={Complaint}options={{title:'Add New Complaint',
    headerBackTitle:'Home'}} />
      <Stack.Screen name="Location" options={{title:'Enter Your Location'}}component={LocationField} />
    </Stack.Navigator>
  );
};

const Tabs = () => {
  return (


    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarHideOnKeyboard: true,
        tabBarStyle: {
          position: 'absolute',
          bottom: 0, // Changed bottom value to 0
          left: 5,
          right: 5,
          elevation: 0,
          backgroundColor: '#ffffff',
          borderRadius: 10,
          height: 70,

          ...styles.shadow,
        },
      }}>
      <Tab.Screen
        name="Home2"
        component={HomeScreen}
        options={{
          tabBarIcon: ({focused}) => (
            <View
              style={{alignItems: 'center', justifyContent: 'center', top: 10}}>
              <Icon
                name="home"
                size={25}
                color={focused ? COLORS.primary : '#748c94'}
              />
              <Text
                style={{
                  color: focused ? COLORS.primary : '#748c94',
                  fontSize: 12,
                }}>
                HOME
              </Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Complaints"
        component={ComplaintStack}
        options={{
          tabBarIcon: ({focused}) => (
            <View
              style={{alignItems: 'center', justifyContent: 'center', top: 10}}>
              <Icon
                name="add-circle"
                size={29}
                color={focused ? COLORS.primary : '#748c94'}
              />
              <Text
                style={{
                  color: focused ? COLORS.primary : '#748c94',
                  fontSize: 12,
                }}>
                ADD COMPLAINT
              </Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Alerts"
        component={Notifications}
        options={{
          tabBarIcon: ({focused}) => (
            <View
              style={{alignItems: 'center', justifyContent: 'center', top: 10}}>
              <Icon
                name="notifications"
                size={25}
                color={focused ? COLORS.primary : '#748c94'}
              />
              <Text
                style={{
                  color: focused ? COLORS.primary : '#748c94',
                  fontSize: 12,
                }}>
                ALERTS
              </Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Setting"
        component={SettingScreen}
        options={{
          tabBarIcon: ({focused}) => (
            <View
              style={{alignItems: 'center', justifyContent: 'center', top: 10}}>
              <Icon
                name="settings"
                size={25}
                color={focused ? COLORS.primary : '#748c94'}
              />
              <Text
                style={{
                  color: focused ? COLORS.primary : '#748c94',
                  fontSize: 12,
                }}>
                SETTINGS
              </Text>
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  shadow: {
    shadowColor: '#7F5DF0',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5,
  },
});

export default Tabs;
