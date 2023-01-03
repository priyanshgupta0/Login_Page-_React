import React, { useState, useEffect } from 'react';
import { View, FlatList, Modal, ScrollView, Text, Button, StyleSheet, ActivityIndicator, Dimensions, Switch, TextInput, SafeAreaView, Image, TouchableOpacity, TouchableHighlight, RootTagContext } from 'react-native';
let mobileW = Dimensions.get('window').width;

const App = () => {
  const [Email, setEmail] = useState('');
  const [Otpv, setOtpv] = useState('');
  const [EResult, setEResult] = useState('');
  const [OResult, setOResult] = useState('');
  const [Password, setPassword] = useState('');
  const [PResult, setPResult] = useState('');
  const [Hide, setHide] = useState(true);
  const [Check, setCheck] = useState(false);
  const [Timer, setTimer] = useState(0);
  const [RsOtp, setRsOtp] = useState(false);

  const HideButton = () => {
    setHide(!Hide);
  }
  const clearFun = () => {
    setOResult('')
    setEResult('');
    setEmail('');
    setPassword('');
    setPResult('');
    setCheck(false);
  }
  const CombineSubmit = () => {
    setTimer(0);
    handleSubmit();
    TimerComponent();
  }
  function TimerComponent() {
    setTimeout(() => {
      setRsOtp(true);
    }, 30000)
  }
  const VerifyOtp = () => {
    var value = Otpv;
    if (value.length == 4) {
      setOResult('')
    } else {
      setOResult('Enter a valid OTP')
    }
  }
  const handleSubmit = () => {
    var email = Email;
    var check = Check;
    var pass = Password;
    var regx = /^([a-z A-Z 0-9 \. -]+)@([a-z A-Z 0-9 -]+).([a-z]{2,20})$/;
    var regy = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    // Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character
    if (email.match(regx)) {
      setEResult('');
      setCheck(true);
    } else if (email == '') {
      setEResult('* E-mail can not be empty');
      setCheck(false);
    } else {
      setEResult('* Invalid E-mail ID');
      setCheck(false);
    }
    if (pass.match(regy)) {
      setPResult('');
      setCheck(true);
    } else if (pass == '') {
      setPResult('* Password can not be empty')
      setCheck(false);
    } else {
      setPResult('* Password must be like Ex: Abc@123$')
      setCheck(false);
    }
    // write this next
  }

  useEffect(() => {
    const myInterval = setInterval(() => {
      setTimer((val) => val + 1);
    }, 1000);
    return () => clearInterval(myInterval);
  }, []);
  const handleResendOTP = () => {
    setTimer(0);
    setRsOtp(false);
    TimerComponent();
  }
  const ResendOtp = ({ Rotp }) => {
    if (Rotp) {
      return <TouchableOpacity onPress={handleResendOTP}>
        <Text style={{
          color: 'blue', marginLeft: mobileW * .1,
          marginRight: mobileW * .1,
          alignSelf: 'flex-end',
        }}>Resend OTP</Text>
      </TouchableOpacity>
    } else {
      return <Text style={{
        color: 'black', marginLeft: mobileW * .1,
        marginRight: mobileW * .1,
        alignSelf: 'flex-end',
      }}>Resend OTP {Timer}</Text>
    }
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
              color={'black'}
              placeholderTextColor={'black'}
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
              color={'black'}
              placeholderTextColor={'black'}
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

          <Text style={[style.Warning]}>{PResult}</Text>
          {
            Check == true &&
            <View>
              <ResendOtp Rotp={RsOtp} />
              <View style={{
                flexDirection: 'row',
                borderColor: 'black',
                borderWidth: mobileW * .005,
                marginLeft: mobileW * .1,
                marginRight: mobileW * .1,
              }}>
                <Image
                  source={require('./assets/otp.png')}
                  style={{ width: mobileW * .08, height: mobileW * .08, margin: mobileW * .02 }}
                />
                <TextInput
                  maxLength={4}
                  keyboardType={'number-pad'}
                  color={'black'}
                  placeholderTextColor={'black'}
                  value={Otpv}
                  onChangeText={(Otpv) => setOtpv(Otpv)}
                  placeholder={'Enter your 4 Digit OTP'}
                />
              </View>
              <Text style={[style.Warning]}>{OResult}</Text>
            </View>
          }

          <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
            {
              Check ? <TouchableOpacity style={[style.LoignButton]} onPress={VerifyOtp}>
                <Text style={{
                  fontWeight: 'bold',
                  fontSize: mobileW * .05,
                  color: 'black'
                }}>Verify</Text>
              </TouchableOpacity> : <TouchableOpacity style={[style.LoignButton]} onPress={CombineSubmit}>
                <Text style={{
                  fontWeight: 'bold',
                  fontSize: mobileW * .05,
                  color: 'black'
                }}>Login</Text>
              </TouchableOpacity>
            }
            <TouchableOpacity style={[style.LoignButton]} onPress={clearFun}>
              <Text style={{
                fontWeight: 'bold',
                fontSize: mobileW * .05,
                color: 'black'
              }}>Clear</Text>
            </TouchableOpacity>
          </View>
          <View style={{
            height: mobileW * 0.4
          }}>
          </View>
          <View style={[style.SignUp]}>
            <Text style={{ color: 'black' }}>Don't have an account? </Text>
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
    marginTop: mobileW * .01,
    marginLeft: mobileW * .1,
    marginRight: mobileW * .1,
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

export default App;