import { Image,SafeAreaView,View, Text,TouchableOpacity ,ScrollView,ImageBackground,TextInput} from 'react-native'
import React, { useContext } from 'react'
import { AuthContext } from '../../Context/AuthContext';

import Feather from 'react-native-vector-icons/Feather';
import BannerSlider from '../components/BannerSlider';
import AppMapView from '../components/AppMapView';

import Tabs from '../navigation/Tab';

const Homescreen = ({navigation}) => {
  const {userInfo}=useContext(AuthContext);
  // const renderBanner = ({item, index}) => {
  //   return <BannerSlider data={item} />;
  // };

  return (
    
   
    <AppMapView navigation={navigation}/>
    
    
  )
}

export default Homescreen