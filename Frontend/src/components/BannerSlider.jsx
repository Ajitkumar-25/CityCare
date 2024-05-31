import { View, Text,FlatList ,Image,StyleSheet} from 'react-native'
import React from 'react'
import { sliderData } from '../model/data';
import windowWidth from '../utils/Dimensions'

const CARD_LENGTH=windowWidth*0.8;
const SPACING =windowWidth*0.02;
const SIDECARD_LENGTH= (windowWidth*0.18)/2;

function Item({item}){
    return(
        <View style={styles.card}>
            <Image source={require('../assets/images/misc/garbage3.jpg')}
            style={{width:windowWidth,height:200,}}
            />
        </View>
    )
}
const BannerSlider = () => {
  
   
        return(
            <View>
               <FlatList data={sliderData}
                horizontal={true}
                renderItem={()=>{return(<Item />)}}
                keyExtractor={(item,index)=>item.title}
               />
            </View>
        )
    
 
}
const styles = StyleSheet.create({
  card:{
    width:100,
    height:150,
    overflow:'hidden',
  }
});

export default BannerSlider