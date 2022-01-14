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
export default class AddHelper extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      emailId: firebase.auth().currentUser.email,
      helperName: '',
      helperContact: '',
      helperDesignation: '',
      
    };
  }

  addHelper = () => {
    db.collection('helpers').add({
      helperName: this.state.helperName,
      helperContact: this.state.helperContact,
      helperDesignation: this.state.helperDesignation,
    });
    alert('Helper Added');
    Alert.alert('Helper Added');
    this.props.navigation.navigate('HelperScreen');
  };


  render() {
    return (
      <SafeAreaProvider style={{ flex: 1, backgroundColor: 'white' }}>
        <View style={{ flex: 1 }}>
          <Header
            centerComponent={{
              text: 'Add Helper',
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
              placeholder={'Helper Name'}
              onChangeText={(text) => {
                this.setState({
                  helperName: text,
                });
              }}
              value={this.state.helperName}
            />
            <TextInput
              style={styles.textinput2}
              placeholder={'Helper Contact Number'}
              onChangeText={(text) => {
                this.setState({
                  helperContact: text,
                });
              }}
              value={this.state.helperContact}
            />
             <TextInput
              style={styles.textinput2}
              placeholder={'Helper Designation'}
              onChangeText={(text) => {
                this.setState({
                  helperDesignation: text,
                });
              }}
              value={this.state.helperDesignation}
            />
            <TouchableOpacity
              style={styles.updateButton}
              onPress={() => {
                this.addHelper();
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
