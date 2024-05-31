import {View, Text} from 'react-native';
import React, {createContext, useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import  {baseUrl}  from '../src/utils/Api';
export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [userToken, setUserToken] = useState(null);
  const [userInfo, setUserInfo] = useState(null);
  const [editable, setEditable] = useState(false);
  const [addField, setAddField] = useState(null);
  const register = async (fname, lname, email, mobile, pincode, locality, city, state, country, password) => {
    try {
      setIsLoading(true);
      const res = await axios.post(`${baseUrl}api_citizen_registration`, {
        fname,
        lname,
        email,
        mobile,
        pincode,
        city,
        locality,
        state,
        country,
        password,
        setEditable,
        editable,
      });
  
      setIsLoading(false);
  
      if (res.status === 404) {
        // User is already registered
        return true;
      } else {
        // New user registered successfully
        let userInfo = res.data;
        setUserInfo(userInfo);
        AsyncStorage.setItem('userInfo', JSON.stringify(userInfo));
        return false;
      }
    } catch (e) {
      console.error('register error ', e);
      setIsLoading(false);
      throw e;
    }
  };
  
  const login = async (email, password) => {
    setIsLoading(true);
  
    try {
      const res = await axios.post(`${baseUrl}api_citizen_login`, {
        email,
        password,
      });
  
      let userInfo = res.data;
      // console.log(userInfo);
      setUserInfo(userInfo);
      setUserToken(userInfo.token);
      AsyncStorage.setItem('userToken', userInfo.token);
      AsyncStorage.setItem('userInfo', JSON.stringify(userInfo));
    } catch (e) {
      console.error('login error ', e);
      throw new Error('Wrong credentials'); // Throw an error if login fails
    } finally {
      setIsLoading(false);
    }
  };
  
  const logout = () => {
    setIsLoading(true);
    setUserToken(null);
    AsyncStorage.removeItem('userInfo');
    AsyncStorage.removeItem('userToken');
    setIsLoading(false);
  };

  const isLoggedIn = async () => {
    try {
      setIsLoading(true);
      let userInfo = await AsyncStorage.getItem('userInfo');
      let userToken = await AsyncStorage.getItem('userToken');
      userInfo = JSON.parse(userInfo);
      if (userInfo) {
        setUserToken(userToken);
        setUserInfo(userInfo);
      }

      setIsLoading(false);
    } catch (e) {
      console.log(`isLoggedIn error ${e}`);
    }
  };
  useEffect(() => {
    isLoggedIn();
  }, []);
  return (
    <AuthContext.Provider
      value={{login, logout, isLoading, userToken, userInfo,register,setIsLoading,addField,setAddField}}>
      {children}
    </AuthContext.Provider>
  );
};