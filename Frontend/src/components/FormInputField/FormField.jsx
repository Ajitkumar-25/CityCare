import { View, Text } from 'react-native'
import React from 'react'

import {TextInput} from 'react-native-gesture-handler';

const FormField = ({placeholder,extraStyle}) => {
  return (
    <View style={[{borderBottomColor:'#D5D8DC',
    borderBottomWidh:1,

    },
    extraStyle]}>
      <TextInput placeholder={placeholder}/>
    </View>
  )
}

export default FormField