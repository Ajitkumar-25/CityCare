import { View, Text,Image ,Dimensions,KeyboardAvoidingView,Platform} from 'react-native'
import React from 'react'
import { COLORS } from '../../model'
import LinearGradient from 'react-native-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import { TouchableOpacity } from 'react-native-gesture-handler';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Divider } from 'native-base';
import StatusIcon from '../stauts/StatusIcon';
const Carousel = ({item}) => {
  // console.log('item',item);
  return (
  //   <KeyboardAvoidingView
  //   style={{ flex: 1 }}
  //   behavior={Platform.OS === 'ios' ? 'padding' : undefined}
  //   keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}
  // >
 
    <View style={{
        width: Dimensions.get('window').width*0.9,
        backgroundColor: 'white',
        margin:5,
        boorderRadius:10,
        marginBottom:55,
        paddingBottom:8,
      
   

    }}>
     

    
    <View>
    
   <Image source={{uri:item.media}} style={{ borderRadius:10,height: 80,zIndex:-1,width:350}} />
   {/* <View style={{
            position: 'absolute', // Positioning icon absolutely to float over the image
            right: 10, // Place it towards the right corner
            top: 140, // Adjust this value as needed to place it correctly over the image
            alignItems: 'center', // Center the items (icon and text)
          }}>
          <TouchableOpacity>
            <MaterialIcon name="read-more" size={24} color={COLORS.primary }  style={{
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 1,
  }}/>
  </TouchableOpacity>
            <Text style={{
              color: COLORS.gray,
              fontSize: 12,
              fontFamily: 'Poppins-Bold', // Assuming you have this font, adjust as necessary
            }}>See All</Text>
          </View> */}
       
   </View>

   
   <View style={{padding:15}}>
    <Text style={
        {
            fontSize:20,
            fontFamily:'Poppins-Medium',
            color:COLORS.black

        }
    }>{item.title}</Text>
    <View style={{display:'flex',
    flexDirection:'row',
      gap:2,
    alignItems:'center'}}>
    <View >
    <Text style={{color:COLORS.gray}}>{item.locationInfo.address.slice(0,50)}..see more</Text>
    </View>

    <View style={{padding:8,backgroundColor:'white',borderRadius:10,paddingHorizontal:10}}>
    <TouchableOpacity>
    <FontAwesome name="location-arrow" size={16} color={COLORS.black}/>
    </TouchableOpacity>

    </View>
    </View>
    <View style={{marginTop:4,
    display:'flex',
    flexDirection:'row',
    gap:10,
    alignItems:'center'
    

    }}>
    
    <View style={{padding:8,borderRadius:10}} >
     <LinearGradient
              colors={[COLORS.gradientForm, COLORS.primary]}
              style={{padding:5,borderRadius:10}}
              start={{y: 0.0, x: 0.0}}
              end={{y: 1.0, x: 0.0}}>
              <TouchableOpacity>
    <Text style={{fontFamily:'Poppins-Medium',
    color:COLORS.white,fontSize:12,}}>Upvotes</Text>
    </TouchableOpacity>
    </LinearGradient>
 
    </View>
    
     <View style={{display:'flex',flexDirection:'row',justifyContent:'center',alignItems:'center',gap:100}}>
      <Text style={{fontFamily:'Poppins-Bold',fontSize:19,color:COLORS.black,marginRight:50}}>{item.upVotes}</Text>
  
      <StatusIcon status={item.status}/>
    </View> 
    
    
    </View>
   
   </View>
  
    </View>
   // </KeyboardAvoidingView>

  )
}

export default Carousel