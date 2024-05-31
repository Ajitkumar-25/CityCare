import { View, Text ,FlatList, TouchableOpacity} from 'react-native'
import React from 'react'
import Carousel from './Carousel'
import { Divider } from 'native-base';
import { COLORS } from '../../model';
import { useNavigation } from '@react-navigation/native';

const Card = ({data,navigation}) => {
  //const navigation=useNavigation();
  return (
    <View style={{marginTop:10}}>
      <View style={{display:'flex' ,flexDirection:'row',justifyContent:'flex-end',marginRight:20}}>
      
        <TouchableOpacity >
        <Text style={{color:COLORS.primary,fontWeight:800,fontSize:17}}> see all</Text>
        </TouchableOpacity>
      </View>
     <FlatList
      data={data}
      showsHorizontalScrollIndicator={false}
      horizontal={true}
      renderItem={({item,index})=>(
        <View key={index}>
     <Carousel item={item}/>

        </View>
      )
      }
     />
     
     
    </View>
  )
}

export default Card