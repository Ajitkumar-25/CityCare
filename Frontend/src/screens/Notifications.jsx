import React, {useState, useEffect, useContext} from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  Modal,
  TouchableOpacity,
  Text,
  ActivityIndicator,
  SafeAreaView,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useFocusEffect} from '@react-navigation/native';
import {COLORS} from '../model';
import axios from 'axios';
import {baseUrl} from '../utils/Api';
import {AuthContext} from '../../Context/AuthContext';
import Entypo from 'react-native-vector-icons/Entypo';
import { ScrollView } from 'react-native-gesture-handler';


const Notifications = ({navigation}) => {
  // const userInfo = await AsyncStorage.getItem('userInfo');
  // console.log('userInfor',userInfo);

  const [loading, setLoading] = useState(false);

  const [alerts, setAlerts] = useState([]);
  const fetchData = async () => {
    setLoading(true); // Assuming setLoading is a defined function

    try {
        const userInfo = await AsyncStorage.getItem('userInfo');
        let userInfoJson = JSON.parse(userInfo);
       // console.log('userInfor',userInfoJson);
      //  console.log('userINfo user ',userInfoJson.status);
        let pincode=userInfoJson.user.pincode;
        //console.log('pincode',pincode);
      //console.log('inside try');
      const response = await axios.post(
        `${baseUrl}show_all_alert_pincode_wise`,
        {pincode: pincode},
      );
     // console.log(response.data.allAlerts);
      const newData = response.data.allAlerts;

      
      setAlerts(newData); // Assuming setAlerts is a defined function
    } catch (error) {
      console.error('Error fetching data: ', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      setAlerts([]);
      fetchData();
    }, [navigation]),
  );

  const renderComplaintCard = ({item}) => (
    <ScrollView>
    <TouchableOpacity
      style={styles.card}
      >
      {loading && (
        <ActivityIndicator
          size="large"
          color={COLORS.primary}
          style={styles.loader}
        />
      )}

      <View style={styles.cardContent}>
        <AntDesign name="notification" size={30} color="#7d5fff" />

        <Text style={styles.cardDescription}>{item.message}</Text>
          </View>
          <View style={{display:'flex',flexDirection:'row',gap:3}}>
            <Entypo name="back-in-time" size={16} color="#7d5fff" style={{marginLeft:8}}/>
          <Text>{item.diffDays} day ago..</Text>

          </View>
    </TouchableOpacity>
    </ScrollView>
  );
  return (
    <SafeAreaView style={{flex: 1, paddingTop: 40,backgroundColor:'#ede8ff',marginBottom:80}}>
    
      <FlatList
        data={alerts}
        renderItem={renderComplaintCard}
        keyExtractor={item => item._id.toString()}
        showsVerticalScrollIndicator={false}
      />
      
    </SafeAreaView>
  );
};

export default Notifications;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    paddingTop: 50,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  searchBar: {
    flex: 1,
    marginRight: 10,
  },
  filterIcon: {
    backgroundColor: 'transparent',
    marginLeft: -10,
  },
  card: {
    backgroundColor: '#ffffff',
    marginBottom: 5,
    padding: 15,
    borderRadius: 10,
    elevation: 4,
    marginTop:10,
    margin:15,   
     overflow: 'hidden', 
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerText: {
    marginLeft: 10,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  cardUser: {
    fontSize: 14,
    color: '#888',
  },
  headerRight: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  cardContent: {
    marginBottom: 10,
    padding: 5,
    display: 'flex',
    flexDirection: 'row',
    gap: 10,
    overflow: 'hidden',
  },
  cardCategory: {
    fontWeight: 'bold',
    marginBottom: 10,
    padding: 5,
    display: 'flex',
    flexDirection: 'row',
    gap: 10,
  },
  cardDescription: {
    marginBottom: 7,
    fontFamily: 'Poppins-Medium',
    fontSize: 17,
    fontWeight:'600',
    color: 'black',
    overflow: 'hidden', // Prevents text from overflowing the cardDescription
   // textOverflow: 'ellipsis', // Adds ellipsis (...) for overflowed text
   // whiteSpace: 'nowrap',
  },
  additionalInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 3,
  },
  additionalText: {
    marginLeft: 5,
    color: '#555',
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 2,
  },
  footerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  badge: {
    marginHorizontal: 3,
  },
  statusIndicator: status => ({
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: getStatusColor(status),
    justifyContent: 'center',
    alignItems: 'center',
  }),
  statusText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '80%',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalItem: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  loader: {
    marginTop: 10,
  },
});
