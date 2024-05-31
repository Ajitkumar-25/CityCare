import * as React from 'react';

import 'react-native-gesture-handler';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { PaperProvider } from 'react-native-paper';

import { COLORS } from './src/model';
import { AuthProvider } from './Context/AuthContext';
import AppNav from './src/navigation/AppNav';
import { NativeBaseProvider, Box } from "native-base";
import { SafeAreaView } from 'react-native-safe-area-context';
import {LogBox} from 'react-native';
function App() {
  LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
  return (
    
     <AuthProvider >
   <NativeBaseProvider>
   {/* <SafeAreaView style={{flex: 1, backgroundColor: '#292929'}}> */}
        <StatusBar
          translucent
          backgroundColor="#292929"
          barStyle="light-content"
        />
   <AppNav />
   {/* </SafeAreaView> */}
   </NativeBaseProvider>

   </AuthProvider>
  );
}
export default App;
