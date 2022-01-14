import * as React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Alert,
  StyleSheet,
  Modal,
  ScrollView,
  KeyboardAvoidingView,
  ImageBackground,
  Image,
} from 'react-native';
import firebase from 'firebase';
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
import db from '../config';

export default class LoginScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: 'ad@t.com',
      password: 'qwertyui',
    };
  }

  login = (email, password) => {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        try {
          this.props.navigation.navigate('Home');
        } catch (e) {
          console.log(e);
        }
      })
      .catch((error) => {
        var errorcode = error.code;
        var errorM = error.message;
        console.log(errorM);
      });
  };

  render() {
    return (
      <View style={{ flex: 1 }}>
        <ImageBackground
          source={require('../assets/loginScreen.png')}
          style={styles.image}>
          <KeyboardAvoidingView style={{ marginTop: 20, alignItems: 'center' }}>
            <View style={styles.inputContainer}>
              <View style={styles.iconStyle}>
                <Entypo name={'mail'} size={25} color="#2A299A" />
              </View>
              <TextInput
                style={styles.input}
                placeholder="email id"
                placeholderTextColor="white"
                onChangeText={(text) => {
                  this.setState({ email: text });
                }}
                value={this.state.email}
              />
            </View>

            <View style={styles.inputContainer}>
              <View style={styles.iconStyle}>
                <AntDesign name={'eye'} size={25} color="#2A299A" />
              </View>
              <TextInput
                style={styles.input}
                placeholder="password"
                placeholderTextColor="white"
                secureTextEntry={true}
                onChangeText={(text) => {
                  this.setState({
                    password: text,
                  });
                }}
                value={this.state.password}
              />
            </View>

            <TouchableOpacity
              onPress={() => {
                this.login(this.state.email, this.state.password);
              }}
              style={styles.loginButton}>
              <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>
             <TouchableOpacity
              style={{
                width: '55%',
                height: 50,
                justifyContent: 'center',
                alignItems: 'center',
                marginBottom: 0,
                marginTop: 0,
              }}
              onPress={() => {
                this.props.navigation.navigate('Signup');
              }}>
              <Text style={{ fontSize: 14, color: 'white' }}>
                Not a user? Sign up
              </Text>
            </TouchableOpacity>
          </KeyboardAvoidingView>
        </ImageBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  loginButton: {
    width: '50%',
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2A299A',
    borderRadius: 10,
    marginTop: 50,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  image: {
    flex: 1,
    resizeMode: 'contain',
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputContainer: {
    marginTop: 5,
    marginBottom: 10,
    width: '95%',
    height: 50,
    borderColor: '#2A299A',
    borderRadius: 10,
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconStyle: {
    padding: 5,
    justifyContent: 'center',
    alignItems: 'center',
    borderRightColor: '#2A299A',
    borderRightWidth: 1,
    width: 50,
  },
  input: {
    padding: 5,
    flex: 1,
    fontSize: 18,
    color: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
