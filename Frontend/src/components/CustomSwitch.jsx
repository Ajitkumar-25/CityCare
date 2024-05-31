import { View, Text } from 'react-native'
import React from 'react'

const CustomSwitch = ({
    selectionMode,
    option1,
    option2,
    onSelectSwitch,
}) => {
    const [getSelectionMode,setSelectionMode]=useState(selectionMode);
  return (
    <View>
      <Text>CustomSwitch</Text>
    </View>
  )
}

export default CustomSwitch