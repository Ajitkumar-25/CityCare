import React, {useState, useEffect, useCallback} from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  Modal,
  TouchableOpacity,
  Text,
  ActivityIndicator,
} from 'react-native';
import {Searchbar, IconButton, Button, Avatar} from 'react-native-paper';
import CustomSwitch from '../../components/CustomSwitch/CustomComplaintSwitch';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {Fonts} from '../../assets/Fonts/index';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useFocusEffect} from '@react-navigation/native';
import { COLORS } from '../../model';
import StatusIcon from '../../components/stauts/StatusIcon';
import {baseUrl} from '../../utils/Api';
import Entypo from 'react-native-vector-icons/Entypo';



const ComplaintList = ({navigation}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [complaints, setComplaints] = useState([]);
  const [mycomplaints, setMyComplaints] = useState([]); // Add this line
  const [categoryFilter, setCategoryFilter] = useState('');
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [complaintTab, setComplaintTab] = useState(1);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [fetching, setFetching] = useState(false);
  const [refreshCount, setRefreshCount] = useState(0);
 
 
  const fetchData = async () => {
    if (fetching || page === -1) return; 
    setFetching(true);
    setLoading(true);
    try {
      const token = await AsyncStorage.getItem('userToken');
      const response = await axios.post(
        `${baseUrl}api_all_complaints`,
        {
          searchQuery,
          page,
        },
        {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        },
      );
      const newData = response.data.complaints;
      if (page === 1) {
        setComplaints(newData); // Set new data if it's the first page
      } else {
        setComplaints(prevData => [...prevData, ...newData]); // Append new data to existing data
      }
      setPage(response.data.lastPage);
    } catch (error) {
      console.error('Error fetching data: ', error);
    }
    setLoading(false);
    setFetching(false);
  };
  

  useEffect(() => {
    fetchData(); // Fetch data on initial render
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      setComplaints([]);
      fetchData(); // Fetch data on navigation focus
    }, [navigation])
  );
  const fetchMyData = async () => {
    if (fetching || page === -1) return; 
    setFetching(true);
    setLoading(true);
    try {
      const token = await AsyncStorage.getItem('userToken');
      const response = await axios.post(
        `${baseUrl}api_my_complaints`,
        {
          searchQuery,
          page,
        },
        {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        },
      );
      const newData = response.data.complaints;
      if (page === 1) {
        setMyComplaints(newData); // Set new data if it's the first page
      } else {
        setMyComplaints(prevData => [...prevData, ...newData]); // Append new data to existing data
      }
      setPage(response.data.lastPage);
    } catch (error) {
      console.error('Error fetching data: ', error);
    }
    setLoading(false);
    setFetching(false);
  };
  

  useEffect(() => {
    fetchMyData(); // Fetch data on initial render
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      setMyComplaints([]);
      fetchMyData(); // Fetch data on navigation focus
    }, [navigation])
  );

  const handleSearch = async query => {
    setSearchQuery(query);
    setLoading(true);
    try {
      const token = await AsyncStorage.getItem('userToken');
      const response = await axios.post(
        `${baseUrl}api_all_complaints`,
        {
          searchQuery: query,
          page: 1,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      setComplaints(response.data.complaints);
      setPage(response.data.lastPage);
    } catch (error) {
      console.error('Error fetching data: ', error);
    }
    setLoading(false);
  };

  const handleFilter = async category => {
    const token = await AsyncStorage.getItem('userToken');
    setCategoryFilter(category);
    setLoading(true);
    try {
      const response = await axios.post(
        `${baseUrl}api_all_complaints`,
        {
          searchQuery,
          //  filter: {category},
          page: 1,
          //  limit: 10,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      setComplaints(response.data);
    } catch (error) {
      console.error('Error fetching data: ', error);
    }
    setLoading(false);
  };

  const openFilterModal = () => {
    setShowFilterModal(true);
  };

  const closeFilterModal = () => {
    setShowFilterModal(false);
  };

  const onSelectSwitch = value => {
    setComplaintTab(value);
  };

  const renderComplaintCard = ({item}) => (
  
    <TouchableOpacity style={styles.card}   onPress={()=> navigation.navigate('ComplaintDetails', {itemData: item})}>
      <View style={styles.cardHeader}>
        <View style={styles.headerLeft}>
          <Avatar.Image size={40} source={{uri: `${baseUrl}${item.categoryMedia}`}} />
          <View style={styles.headerText}>
            <Text style={styles.cardTitle}>{item.title}</Text>
            <Text style={styles.cardUser}>
              By {item.citizenId.fname + ' ' + item.citizenId.lname}
            </Text>
          </View>
        </View>
        <View style={{display:'flex',flexDirection:'row',gap:3}}>
            <Entypo name="back-in-time" size={16} color="#7d5fff" style={{marginLeft:8}}/>
          <Text>{item.diffDays} day ago..</Text>

          </View>
      </View>
      <View style={styles.cardContent}>
        <Text style={styles.cardCategory}>{item.type}</Text>
        <Text style={styles.cardDescription}>{item.description}</Text>
        <View style={styles.additionalInfo}>
          <MaterialCommunityIcons
            name="map-marker-outline"
            size={16}
            color="#555"
          />
          <Text style={styles.additionalText}>{item.locationInfo.address}</Text>
        </View>
        <View style={styles.additionalInfo}>
          <MaterialCommunityIcons name="calendar" size={16} color="#555" />
          <Text style={styles.additionalText}>
            Date and Time: {item.createdAt}
          </Text>
        </View>
      </View>
      <View style={styles.cardFooter}>
        <View style={styles.footerLeft}>
          <IconButton
            icon={() => (
              <MaterialCommunityIcons
                name="arrow-up-bold-circle-outline"
                size={24}
                color="#007bff"
              />
            )}
            onPress={() => handleUpvote(item._id)}
          />
          <Text style={styles.badge}>{item.upVotes}</Text>
          <IconButton
            icon={() => (
              <MaterialCommunityIcons
                name="message-reply-text"
                size={24}
                color="#007bff"
              />
            )}
            onPress={() => handleChat(item.id)}
          />
          <Text style={styles.badge}>0</Text>
        </View>
        <View style={styles.statusIndicator(item.status)}>
          <StatusIcon status={item.status} />
        </View>
      </View>
    </TouchableOpacity>
  );

  const handleUpvote = async(complaintId) => {
    
    const token = await AsyncStorage.getItem('userToken');
    try {
      const response = await axios.post(
        `${baseUrl}upVoteComplaint`,
        {
          complaintId,
          //  filter: {category},
          
          //  limit: 10,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
     setRefreshCount(refreshCount+1);
    } catch (error) {
      console.error('Error fetching data: ', error);
    }
   
      
  };
  useEffect(()=>{
fetchData();

  },[refreshCount])

  // useEffect(() => {handleUpvote}, []);
  // useFocusEffect(
  //   React.useCallback(() => {
      
  //     handleUpvote(); // Fetch data on navigation focus
  //   }, [navigation])
  // );

  const handleChat = id => {
    // Handle chat action
  };

  const getStatusColor = status => {
    switch (status) {
      case 'resolved':
        return 'green';
      case 'pending':
        return 'yellow';
      case 'rejected':
        return 'red';
      default:
        return 'grey';
    }
  };

  const getStatusText = status => {
    switch (status) {
      case 'resolved':
        return 'Resolved';
      case 'pending':
        return 'Pending';
      case 'rejected':
        return 'Rejected';
      default:
        return 'Unknown';
    }
  };

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
      marginBottom: 10,
      padding: 15,
      borderRadius: 10,
      elevation: 4,
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
    cardContent: {},
    cardCategory: {
      fontWeight: 'bold',
      marginBottom: 5,
    },
    cardDescription: {
      marginBottom: 7,
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
  const handleLoadMore = () => {
   
    fetchData();
  };

  return (
    <View style={styles.container} >
     
      <View style={styles.searchContainer}>
        <Searchbar
          placeholder="Search"
          onChangeText={handleSearch}
          value={searchQuery}
          style={styles.searchBar}
        />
        {/* <IconButton
          icon="filter"
          onPress={openFilterModal}
          color="#007bff"
          style={styles.filterIcon}
        /> */}
      </View>
      <View style={{marginVertical: 7}}>
        <CustomSwitch
          selectionMode={1}
          option1="All Complaints"
          option2="My Complaints"
          onSelectSwitch={onSelectSwitch}
        />
      </View>
      {complaintTab == 1 && (
      
        <FlatList
          data={complaints}
          renderItem={renderComplaintCard}
          keyExtractor={item => item._id.toString()}
          onEndReached={handleLoadMore}
          showsVerticalScrollIndicator={false}
          onEndReachedThreshold={0.8}
          ListFooterComponent={ ()=>{
            <View>
    
              <Text onPress={fetchData} style={{alignSelf:'center',fontSize:20,color:COLORS.primary}}>..Load More</Text>
              </View>
          }         }
        />
      )}
      {complaintTab == 2 &&(
        <FlatList
          data={mycomplaints}
          renderItem={renderComplaintCard}
          keyExtractor={item => item._id.toString()}
          onEndReached={handleLoadMore}
          onEndReachedThreshold={0.8}
          showsVerticalScrollIndicator={false}
          ListFooterComponent={ ()=>{
            <View>
           
  
              <Text onPress={fetchData} style={{alignSelf:'center',fontSize:20,color:COLORS.primary}}>..Load More</Text>
              </View>
          }         }
        />
      )}
      
      

      <Modal visible={showFilterModal} animationType="slide" transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Filter</Text>
            <TouchableOpacity
              style={styles.modalItem}
              onPress={() => setCategoryFilter('Water')}>
              <Text>Water</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.modalItem}
              onPress={() => setCategoryFilter('Electricity')}>
              <Text>Electricity</Text>
            </TouchableOpacity>
            {/* Add more filter options as needed */}
            <Button mode="contained" onPress={handleFilter}>
              Apply Filter
            </Button>
            <Button mode="outlined" onPress={closeFilterModal}>
              Cancel
            </Button>
          </View>
        </View>
      </Modal>
    </View>
  );
};


export default ComplaintList;
