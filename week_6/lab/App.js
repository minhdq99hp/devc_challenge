import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import MapView from 'react-native-maps';
import * as Location from 'expo-location';

export default class App extends React.Component {
  constructor(props){
    super();

    this.state = {
      location: null,
      hasError: false,
      errorMsg: null,
    };
  }

  async componentDidMount(){
    let { status } = await Location.requestPermissionsAsync();
    if(status !== 'granted'){
      this.setState({hasError: true});
      this.setState({errorMsg: 'Permission to access location was denied.'});
    }

    let l = await Location.getCurrentPositionAsync();
    this.setState({location: l});
  }



  render(){

    if(this.state.hasError){
      return (
        <View style={styles.container}>
          <Text>{this.state.errorMsg}</Text>
        </View>
      );
    }

    let text = 'Waiting..';

    if(this.state.location){
      text = JSON.stringify(this.state.location);
    }

    return (
      <View style={styles.container}>
       <Text>{text}</Text>
      </View>
    );
  }
  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
