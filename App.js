import React, { useState, useEffect } from 'react';
import { View, FlatList, Modal, ScrollView, Text, Button, StyleSheet, ActivityIndicator, Dimensions, Switch, TextInput, SafeAreaView, Image, TouchableOpacity, TouchableHighlight, RootTagContext } from 'react-native';
let mobileW = Dimensions.get('window').width;

const HelloWorldApp = () => {
  const [Email, setEmail] = useState('');
  const [EResult, setEResult] = useState('');
  const [Password, setPassword] = useState('');
  const [Hide, setHide] = useState(true);
  const HideButton = () => {
    setHide(!Hide);
  }
  const handleSubmit = () => {
    var email = Email;
    var regx = /^([a-z A-Z 0-9 \. -]+)@([a-z A-Z 0-9 -]+).([a-z]{2,20})$/;
    if (email.match(regx)) {
      setEResult('');
    } else if (email == '') {
      setEResult('* E-mail can not be empty');
    } else {
      setEResult('* Invalid E-mail ID');
    }
    // write this next
  }
  return (
    <SafeAreaView>
      <ScrollView>
        <View
          style={[style.container]}>
          <Image
            source={require('./assets/logo.png')}
            style={{ width: mobileW * .8, height: mobileW * .3, margin: mobileW * .1 }}
          />
          <Text style={[
            style.Login
          ]}>Login</Text>
          <Text style={[
            style.LoginDesc
          ]}>Please sign in to continue.</Text>
          <View style={[style.Box]}>
            <Image
              source={require('./assets/email.png')}
              style={{ width: mobileW * .08, height: mobileW * .08, margin: mobileW * .02 }}
            />
            <TextInput
              value={Email}
              onChangeText={(Email) => setEmail(Email)}
              placeholder={'Enter Your Email'}
              style={{
              }} />
          </View>
          <Text style={[style.Warning]}>{EResult}</Text>
          <View style={[style.Box]}>
            <Image
              source={require('./assets/padlock.png')}
              style={{ width: mobileW * .08, height: mobileW * .08, margin: mobileW * .02, flex: 1 }}
            />
            <TextInput
              value={Password}
              secureTextEntry={Hide}
              onChangeText={(Password) => setPassword(Password)}
              placeholder={'Enter Your Password'}
              style={{
                flex: 7
              }} />
            <TouchableOpacity onPress={HideButton}><Image
              source={require('./assets/hide.png')}
              style={{ width: mobileW * .08, height: mobileW * .08, margin: mobileW * .02, flex: 1 }}
            /></TouchableOpacity>
          </View>
          <TouchableOpacity style={[style.LoignButton]} onPress={handleSubmit}>
            <Text style={{
              fontWeight: 'bold',
              fontSize: mobileW * .05,
              color: 'black'
            }}>Login</Text>
          </TouchableOpacity>
          <View style={{
            height: mobileW * 0.5
          }}>
          </View>
          <View style={[style.SignUp]}>
            <Text>Don't have an account? </Text>
            <TouchableOpacity><Text style={{ color: 'orange' }}>Sign up</Text></TouchableOpacity>
          </View>
          <View style={{
            height: mobileW * 0.15
          }}>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView >
  )
}
const style = StyleSheet.create({
  SignUp: {
    textAlign: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    flexDirection: 'row',
  },
  LoignButton: {
    backgroundColor: 'orange',
    height: mobileW * .1,
    width: mobileW * .3,
    borderRadius: mobileW * .05,
    textAlign: 'center',
    justifyContent: 'center',
    alignSelf: 'flex-end',
    alignItems: 'center',
    alignSelf: 'center',
    margin: mobileW * .05
  },
  Warning: {
    marginLeft: mobileW * .1,
    color: 'red',
    fontSize: mobileW * .03,
    fontWeight: '400'
  },
  Box: {
    flexDirection: 'row',
    borderColor: 'black',
    borderWidth: mobileW * .005,
    marginLeft: mobileW * .1,
    marginRight: mobileW * .1,
    marginTop: mobileW * .05,
  },
  container: {
    backgroundColor: 'white',
    flex: 1,
  },
  Login: {
    marginLeft: mobileW * .1,
    fontWeight: '900',
    fontSize: mobileW * .1,
    color: 'black',
  },
  LoginDesc: {
    marginLeft: mobileW * .1,
    fontWeight: '600',
    fontSize: mobileW * .05,
    color: 'grey',
  },

})

export default HelloWorldApp;