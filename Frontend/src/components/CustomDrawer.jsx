import {
  View,
  Text,
  Image,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import React ,{useContext}from 'react';
import {
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import { ROUTES } from '../model';
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '../../Context/AuthContext';



const CustomDrawer = (props) => {
  const navigation =useNavigation();
  const {logout,userInfo} =useContext(AuthContext);
 
  return (
    <View style={{flex: 1}}>
      <DrawerContentScrollView
        {...props}
        contentContainerStyle={{backgroundColor: '#7d5fff'}}>
        <ImageBackground
          source={require('../assets/images/menu-bg.jpeg')}
          style={{padding: 20}}>
          <Image
            source={require('../assets/images/user-profile.jpg')}
            style={{width: 80, height: 80, borderRadius: 40, marginBottom: 10}}
          />
          <Text
            style={{color: '#fff', fontFamily: 'Roboto-Medium', fontSize: 40}}>
            {userInfo.user.fname}
          </Text>
          <View
            style={{
              flexDirection: 'row',
            }}>
            <Text
              style={{
                color: '#fff',
                fontSize: 20,
                marginRight: 5,
                fontFamily: 'Roboto-Regular',
              }}>
            {userInfo.user.city}
            </Text>
            <FontAwesome6 name="location-dot" size={14} color="#fff" />
          </View>
        </ImageBackground>
        <View style={{flex: 1, backgroundColor: '#fff', paddingTop: 10}}
        >
          <DrawerItemList {...props} />
        </View>
      </DrawerContentScrollView>
      <View style={{padding: 20, borderTopWidth: 1, borderTopColor: '#ccc'}}>
        <TouchableOpacity onPress={() => {}} style={{paddingVertical: 15}} >
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Ionicons name="share-social-outline" size={22} color="#333" />
          <Text
            style={{fontSize: 15, fontFamily: 'Roboto-Medium', marginLeft: 5}}>
            Share
          </Text>
        </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {logout()}} style={{paddingVertical: 15}} >
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Ionicons name="exit-outline" size={22} color="#333" />
          <Text
            style={{fontSize: 15, fontFamily: 'Roboto-Medium', marginLeft: 5}}>
        Sign Out
          </Text>
        </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CustomDrawer;
