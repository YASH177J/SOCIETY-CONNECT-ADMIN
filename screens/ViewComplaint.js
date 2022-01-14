import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Alert,
  FlatList,
  Image,
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

import { ListItem } from 'react-native-elements';
export default class ViewComplaints extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      complaintTitle:
        this.props.navigation.getParam('complaints')['complaintTitle'],
      complaintDescription:
        this.props.navigation.getParam('complaints')['complaintDescription'],
      complaintReply:
        this.props.navigation.getParam('complaints')['complaintReply'],
      name: this.props.navigation.getParam('complaints')['name'],
      contact: this.props.navigation.getParam('complaints')['contact'],
      docId: this.props.navigation.getParam('complaints')['doc_id'],
      userId: firebase.auth().currentUser.email,
    };
    console.log(this.state.complaintTitle);
    console.log(this.props.navigation.navigate('complaints')['complaintTitle']);
  }

  updateComplaintReply = () => {
    db.collection('complaints').doc(this.state.docId).update({
      complaintReply: this.state.complaintReply,
    });

    Alert.alert('Replied!');
    alert('Replied!');
  };
  render() {
    return (
      <SafeAreaProvider style={{ flex: 1, backgroundColor: '#FFDD1Cbf' }}>
        <Header
          centerComponent={{
            text: 'Complaint Details',
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
            justifyContent: 'center',
            padding: 20,
            margin: 20,
            backgroundColor: '#fff',
            borderRadius: 20,
          }}>
          <Text style={{ margin: 10 }}>Member Name : {this.state.name}</Text>
          <Text style={{ margin: 10 }}>
            Member contact: {this.state.contact}
          </Text>
          <Text style={{ margin: 10 }}>
            Complaint Title: {this.state.complaintTitle}
          </Text>
          <Text style={{ margin: 10, color: 'black' }}>
            Complaint Description: {this.state.complaintDescription}
          </Text>
          <Text style={{ margin: 10, color: 'black' }}>Below is Society Reply</Text>
          <TextInput
            style={styles.input}
            placeholder={'Complaint Reply'}
            placeholderTextColor="black"
            multiline={true}
            onChangeText={(text) => {
              this.setState({
                complaintReply: text,
              });
            }}
            value={this.state.complaintReply}
          />
          <TouchableOpacity
            style={styles.updateButton}
            onPress={() => {
              this.updateComplaintReply();
            }}>
            <Text style={styles.buttonText}>Reply</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaProvider>
    );
  }
}

const styles = StyleSheet.create({
  input: {
    borderColor:"black", 
    padding:2,
    borderWidth:1,
    fontSize: 16,
    margin:10,
    color: 'black',
    justifyContent: 'center',
    alignItems: 'center',
  },
  updateButton: {
    width: '50%',
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2A299A',
    borderRadius: 10,
    marginTop: 20,
    alignSelf: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
