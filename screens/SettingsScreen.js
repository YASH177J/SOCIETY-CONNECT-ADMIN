import * as React from 'react';
import {
  View,
  ScrollView,
  TouchableOpacity,
  Text,
  TextInput,
  KeyboardAvoidingView,
  Alert,
  StyleSheet,
} from 'react-native';
import firebase from 'firebase';
import { Header, Icon, Avatar } from 'react-native-elements';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
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
export default class SettingsScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      emailId: firebase.auth().currentUser.email,
      name: '',
      contact: '',
      address: '',
      docID: '',
    };
  }

  updateUserDetails = () => {
    db.collection('users')
      .where('email', '==', this.state.emailId)
      .get()
      .then((snapshot) => {
        snapshot.docs.map((doc) => {
          db.collection('users').doc(doc.id).update({
            name: this.state.name,
            address: this.state.address,
            contact: this.state.contact,
          });
        });
      });

    Alert.alert('Profile Updated Successfully');
  };

  getUserDetails = () => {
    var email = firebase.auth().currentUser.email;
    db.collection('users')
      .where('email', '==', email)
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          var data = doc.data();
          this.setState({
            emailId: data.email,
            name: data.name,
            contact: data.contact,
            address: data.address,
            docId: doc.id,
          });
        });
      });
  };

  componentDidMount() {
    this.getUserDetails();
  }

  logout = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        this.props.navigation.navigate('Login');
      })
      .catch((error) => {
        console.log(error);
      });
  };

  render() {
    return (
      <SafeAreaProvider style={{ flex: 1, backgroundColor: 'white' }}>
        <View style={{ flex: 1 }}>
          <Header
            centerComponent={{
              text: 'Profile',
              style: {
                margin: 2,
                padding: 2,
                fontWeight: 'bold',
                fontSize: 19,
                color: '#fff',
              },
            }}
            backgroundColor={'#FFDD1C'}
            rightComponent={
              <MaterialCommunityIcons
                name="logout"
                size={24}
                color="#fff"
                style={{ marginTop: 5 }}
                onPress={() => {
                  this.props.navigation.navigate('LoginScreen');
                  this.logout();
                }}
              />
            }
          />
          <ScrollView
            style={{
              width: '100%',
              backgroundColor: 'white',
              justifyContent: 'center',
            }}>
            <KeyboardAvoidingView>
              <TextInput
                style={styles.textinput}
                placeholder={'Name'}
                onChangeText={(text) => {
                  this.setState({
                    name: text,
                  });
                }}
                value={this.state.name}
              />
              <TextInput
                style={styles.textinput}
                placeholder={'Contact'}
                maxLength={10}
                keyboardType={'numeric'}
                onChangeText={(text) => {
                  this.setState({
                    contact: text,
                  });
                }}
                value={this.state.contact}
              />
              <TextInput
                style={styles.textinput}
                multiline={true}
                numberOfLines={2}
                placeholder={'Address'}
                onChangeText={(text) => {
                  this.setState({
                    address: text,
                  });
                }}
                value={this.state.address}
              />
              <TouchableOpacity
                style={styles.updateButton}
                onPress={() => {
                  this.updateUserDetails();
                }}>
                <Text style={styles.buttonText}>Update</Text>
              </TouchableOpacity>
            </KeyboardAvoidingView>
          </ScrollView>
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
    width: '80%',
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
    width: '85%',
    height: 50,
    borderColor: 'black',
    borderRadius: 20,
    borderBottomWidth: 1.5,
    alignItems: 'center',
    alignSelf: 'center',
    padding: 10,
  },
});
