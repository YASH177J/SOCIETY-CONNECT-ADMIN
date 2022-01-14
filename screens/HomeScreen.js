import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Image,
  ImageBackground,
} from 'react-native';
import { ListItem, Avatar, Header, Icon } from 'react-native-elements';
import firebase from 'firebase';
import db from '../config';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import {
  Entypo,
  Fontisto,
  FontAwesome5,
  Octicons,
  AntDesign,
  MaterialIcons,
  MaterialCommunityIcons,
  Feather,
} from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
export default class HomeScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      announcements: [],
    };
  }

  getAnnouncements = () => {
    db.collection('announcements').onSnapshot((snapshot) => {
      var announcements = [];
      snapshot.docs.map((doc) => {
        var announcement = doc.data();
        announcement["doc_id"]= doc.id;
        announcements.push(announcement);
      });
      this.setState({
        announcements: announcements,
      });
    });
  };

  componentDidMount() {
    this.getAnnouncements();
  }

  renderItem = ({ item }) => (
    <TouchableOpacity style={styles.cardContainer}
      onPress={() => {
        this.props.navigation.navigate('ViewAnnouncements', {
          announcement: item,
        });
      }}>
      <View
        style={{
          flexDirection: 'column',
          width: '100%',
        }}>
        <Text
          style={[styles.input, { fontWeight: 'bold' }]}
          ellipsizeMode="tail"
          numberOfLines={1}>
          Title: {item.announcementTitle}
        </Text>
        <Text
          style={[styles.input, { fontWeight: 'bold' }]}
          ellipsizeMode="tail"
          numberOfLines={1}>
          Description: {item.announcementDescription}
        </Text>
      </View>
    </TouchableOpacity>
  );

  keyExtractor = (item, index) => index.toString();

  render() {
    return (
      <SafeAreaProvider style={{ flex: 1, backgroundColor: 'white' }}>
          <Header
            centerComponent={{
              text: 'Welcome',
              style: {
                margin: 2,
                padding: 2,
                fontWeight: 'bold',
                fontSize: 19,
                color: '#fff',
              },
            }}
            backgroundColor={'#FFDD1C'}
          />

          <FlatList
            data={this.state.announcements}
            renderItem={this.renderItem}
            keyExtractor={this.keyExtractor}
          />

          <LinearGradient
            // Button Linear Gradient
            colors={['#2A299A','#FFDD1C']}
            start={{ x: -5, y: -1 }}
            end={{ x: 5, y: 1 }}
            style={styles.touchableOpacityStyle}>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => {
                this.props.navigation.navigate('AddAnnouncements');
              }}>
              <Text style={styles.fabText}>+</Text>
            </TouchableOpacity>
          </LinearGradient>
     
      </SafeAreaProvider>
    );
  }
}

const styles = StyleSheet.create({
  touchableOpacityStyle: {
    position: 'absolute',
    width: 50,
    height: 50,
    right: 30,
    bottom: 30,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#5ce1e6',
    borderRadius: 25,
  },
  fabText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 30,
  },
  cardContainer: {
    width: '90%',
    marginTop: 20,
    borderRadius: 10,
    alignItems: 'center',
    backgroundColor: 'white',
    justifyContent: 'center',
    elevation: 10,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.26,
    shadowRadius: 10,
    alignSelf: 'center',
  },
  input: {
    width: '85%',
    fontSize: 16,
    padding: 5,
  },
});
