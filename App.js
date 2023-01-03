import React, { useState, useEffect } from 'react';
import { View, FlatList, Modal, ScrollView, Text, Button, StyleSheet, ActivityIndicator, Dimensions, Switch, TextInput, SafeAreaView, Image, TouchableOpacity, TouchableHighlight, RootTagContext } from 'react-native';
let mobileW = Dimensions.get('window').width;

const Data = [];

const App = () => {
  const [Id, setId] = useState(0);
  const [Email, setEmail] = useState('');
  const [Otpv, setOtpv] = useState('');
  const [EResult, setEResult] = useState('');
  const [OResult, setOResult] = useState('');
  const [Password, setPassword] = useState('');
  const [PResult, setPResult] = useState('');
  const [Hide, setHide] = useState(true);
  const [Check, setCheck] = useState(false);
  const [Timer, setTimer] = useState(15);
  const [RsOtp, setRsOtp] = useState(false);


  const HideButton = () => {
    setHide(!Hide);
  }
  const clearFun = () => {
    setOResult('')
    setOtpv('');
    setEResult('');
    setEmail('');
    setPassword('');
    setPResult('');
    setCheck(false);
  }
  const CombineSubmit = () => {
    setTimer(15);
    handleSubmit();
    TimerComponent();
  }
  function TimerComponent() {
    setTimeout(() => {
      setRsOtp(true);
    }, 15000)
  }
  const VerifyOtp = () => {
    let a = Id;
    let email = Email;
    let pass = Password;
    let otp = Otpv;
    var value = Otpv;
    if (value.length == 4) {
      setOResult('');
      Data.push({
        id: a,
        Email: email,
        Password: pass,
        Otp: otp,
        visible: false,
      })
      console.log(Data);
      setId(Id + 1);
    } else {
      setOResult('Enter a valid OTP')
    }
  }
  const handleSubmit = () => {
    let email = Email;
    let pass = Password;
    let regx = /^([a-z A-Z 0-9 \. -]+)@([a-z A-Z 0-9 -]+).([a-z]{2,20})$/;
    let regy = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
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
      setTimer((val) => val - 1);
    }, 1000);
    return () => clearInterval(myInterval);
  }, []);
  const handleResendOTP = () => {
    setTimer(15);
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
      {/* <ScrollView> */}
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
            style={{ width: mobileW * .08, height: mobileW * .08, margin: mobileW * .02, flex: 1 }}
          />
          <TextInput
            color={'black'}
            placeholderTextColor={'black'}
            value={Email}
            onChangeText={(Email) => setEmail(Email)}
            placeholder={'Enter Your Email'}
            style={{
              flex: 8
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

        {/* {this.dataFlatList()} */}
        <View>
          <FlatList
            data={Data} // array name 
            renderItem={({ item }) =>
              item.visible ? <View></View> : <View style={{ flexDirection: 'row', alignSelf: 'center', borderWidth: 2, width: mobileW, margin: mobileW * .01 }}>
                <Text style={{
                  borderWidth: 1,
                  margin: mobileW * .02,
                  color: 'black',
                  alignSelf: 'center',
                  flex: 6,
                }}>{item.Email}</Text>
                <Text style={{
                  borderWidth: 1,
                  margin: mobileW * .02,
                  color: 'black',
                  alignSelf: 'center',
                  flex: 5,
                }}>{item.Password}</Text>
                <Text style={{
                  borderWidth: 1,
                  margin: mobileW * .02,
                  color: 'black',
                  alignSelf: 'center',
                  flex: 2,
                }}>{item.Otp}</Text>
                <TouchableOpacity onPress={() => { item.visible = !item.visible }}>
                  <Image
                    source={require('./assets/remove.png')}
                    style={{ width: mobileW * .08, height: mobileW * .08, margin: mobileW * .02 }}
                  />
                </TouchableOpacity>
              </View>

            } // how the data item is to be render
            keyExtractor={item => item.id} // item id or array id or flat list id
          />
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
      {/* </ScrollView> */}
    </SafeAreaView >
  )
}
const style = StyleSheet.create({
  TextStyle: {

  },
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
    width: mobileW,
    height: Dimensions.get('window').height,
    backgroundColor: 'white',
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