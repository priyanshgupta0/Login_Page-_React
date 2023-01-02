import React, { useState, useEffect } from 'react';
import { View, FlatList, Modal, ScrollView, Text, Button, StyleSheet, ActivityIndicator, Dimensions, Switch, TextInput, SafeAreaView, Image, TouchableOpacity, TouchableHighlight } from 'react-native';
let mobileW = Dimensions.get('window').width;

const HelloWorldApp = () => {
  return (
    <SafeAreaView>
      <ScrollView>
        <View
          style={[style.container]}>
          <Image
            source={require('./assets/logo.png')}
            style={{ width: mobileW * .8, height: mobileW * .3, margin: mobileW * .1 }}
          />
          <Text style={{
            marginLeft: mobileW * .1,
            fontWeight: '900',
            fontSize: mobileW * .1,
            color: 'black',
          }}>Login</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}
const style = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
  }
})

export default HelloWorldApp;