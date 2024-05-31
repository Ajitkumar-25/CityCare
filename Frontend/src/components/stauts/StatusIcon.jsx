import React from 'react';
import { View } from 'react-native';

const StatusIcon = ({ status }) => {
  let color;
  
  switch(status) {
    case 'Not Viewed':
      color = '#ff2d55';
      break;
    case 'Resolved':
      color = '#4cd964'; //green
      break;
    case 'in Progress':
      color = '#ff9500'; //in progess
      break;
    default:
      color = 'black';
  }

  return (
    <View style={{
      width: 20,
      height: 20,
      borderRadius: 25,
      backgroundColor: color
    }} />
  );
};

export default StatusIcon;
