import { View, Text } from 'react-native'
import React from 'react'
import FormField from '../../components/FormInputField/FormField';
import DropDown from '../../components/DropDown/DropDown';
const NewForm = () => {
  return (
    <View style={{flex:1}}>
    <>
      <View style={{flex:1,padding:15}}>
      <FormField placeholder='Complaint Title'/>
      <FormField placeholder='Complaint Description' extraStyle={{marginTop:10}}/>
      {/* <FormField placeholder='Complaint Title'/> */}
      <FormField placeholder={'Address'} extraStyle={{marginTop:10}}/>
      
<DropDown extraStyle={{marginTop:20}}/>


      </View>
      </>
    </View>
  )
}

export default NewForm