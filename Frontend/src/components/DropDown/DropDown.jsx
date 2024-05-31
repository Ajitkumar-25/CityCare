import { View, Text,  TouchableOpacity} from 'react-native'
import React from 'react'
import EvilIcons from 'react-native-vector-icons/EvilIcons';


const DropDown = ({extraStyle}) => {
  return (
    <TouchableOpacity onPress={()=>console.log('Select Category')}>
    <View style={[{
        borderColor:'#D5D8DC',
        borderWidth:1,
        paddingHorizontal:15,
        paddingVertical:8,
        borderRadius:20,
        flexDirection:'row',
        justifyContent:'space-between'


    },extraStyle]}>
      <Text>Select Category Of Complaint</Text>
      <EvilIcons name='chevron-down' size={20} color='#000'/>
    </View>
    </TouchableOpacity>
  )
}

export default DropDown