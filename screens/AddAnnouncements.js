import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Alert,
} from 'react-native';
import { Header, Icon } from 'react-native-elements';
import firebase from 'firebase';
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
import db from '../config';
export default class AddAnnouncements extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      emailId: firebase.auth().currentUser.email,
      announcementTitle: '',
      announcementDescription: '',
    };
  }

  addAnnouncements = () => {
    db.collection('announcements').add({
      announcementTitle: this.state.announcementTitle,
      announcementDescription: this.state.announcementDescription,
      userId: this.state.emailId,
    });
    alert('Announcement Added');
    Alert.alert('Announcement Added');
    this.props.navigation.navigate('HomeScreen');
  };


  render() {
    return (
      <SafeAreaProvider style={{ flex: 1, backgroundColor: 'white' }}>
        <View style={{ flex: 1 }}>
          <Header
            centerComponent={{
              text: 'Add Announcements',
              style: {
                fontWeight: 'bold',
                fontSize: 19,
                color: 'white',
              },
            }}
             leftComponent={
              <Icon
                name="arrow-left"
                type="feather"
                color="white"
                size={24}
                onPress={() => this.props.navigation.goBack()}
              />
            }
            backgroundColor={'#FFDD1C'}
          />
          <View
            style={{
              flex: 1,
              alignContent: 'center',
              justifyContent: 'center',
            }}>
            <TextInput
              style={styles.textinput}
              placeholder={'Announcement Title'}
              onChangeText={(text) => {
                this.setState({
                  announcementTitle: text,
                });
              }}
              value={this.state.announcementTitle}
            />
            <TextInput
              style={styles.textinput2}
              placeholder={'Announcement Details'}
              multiline="true"
              onChangeText={(text) => {
                this.setState({
                  announcementDescription: text,
                });
              }}
              value={this.state.announcementDescription}
            />
            <TouchableOpacity
              style={styles.updateButton}
              onPress={() => {
                this.addAnnouncements();
              }}>
              <Text style={styles.buttonText}>Add</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaProvider>
    );
  }
}

const styles = StyleSheet.create({
  buttonText: {
    color: 'white',
    fontSize: 20,
  },
  updateButton: {
    width: '60%',
    height: 50,
    marginTop: 30,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: '#2A299A',
    borderRadius: 20,
  },
  textinput: {
    marginTop: 5,
    marginBottom: 5,
    width: '80%',
    height: 50,
    borderColor: 'black',
    borderBottomWidth: 1.5,
    alignItems: 'center',
    alignSelf: 'center',
    padding: 10,
  },
  textinput2: {
    marginTop: 5,
    marginBottom: 5,
    width: '80%',
    height: 100,
    borderColor: 'black',
    borderBottomWidth: 1.5,
    alignItems: 'center',
    alignSelf: 'center',
    padding: 10,
  },
});
