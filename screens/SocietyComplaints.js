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
export default class SocietyComplaints extends React.Component {
  constructor() {
    super();
    this.state = {
      complaints: [],
    };
  }

  getcomplaints = () => {
    db.collection('complaints').onSnapshot((snapshot) => {
      var complaints = [];
      snapshot.docs.map((doc) => {
        var complaint = doc.data();
        complaint['doc_id'] = doc.id;
        complaints.push(complaint);
      });
      this.setState({
        complaints: complaints,
      });
      console.log(this.state.complaints);
    });
  };

  componentDidMount() {
    this.getcomplaints();
  }

  renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.cardContainer}
      onPress={() => {
        console.log(item);
        this.props.navigation.navigate('ViewComplaint', {
          complaints: item,
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
          Title: {item.complaintTitle}
        </Text>
        <Text
          style={[styles.input, { fontWeight: 'bold' }]}
          ellipsizeMode="tail"
          numberOfLines={1}>
          Description: {item.complaintDescription}
        </Text>
      </View>
    </TouchableOpacity>
  );

  keyExtractor = (item, index) => index.toString();

  render() {
    return (
      <SafeAreaProvider style={{ flex: 1, backgroundColor: 'white' }}>
        <View style={{ flex: 1 }}>
          <Header
            centerComponent={{
              text: 'Society Complaints',
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
            data={this.state.complaints}
            renderItem={this.renderItem}
            keyExtractor={this.keyExtractor}
          />
        </View>
      </SafeAreaProvider>
    );
  }
}

const styles = StyleSheet.create({
  cardContainer: {
    width: '90%',
    marginTop: 20,
    borderRadius: 10,
    borderColor: '#38b6ff',
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
    flex: 1,
    width: '60%',
    fontSize: 16,
    padding: 5,
  },
  img: {
    width: '40%',
    resizeMode: 'cover',
    borderRadius: 10,
  },
});
