import React from 'react';
import { View, Text, Button, StyleSheet, Dimensions, TouchableWithoutFeedback, Image } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import * as Animatable from 'react-native-animatable';
import cube from './assets/splash.png';

export default class MenuScreen extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Animatable.View animation="rotate" iterationCount="infinite" duration={2000} easing="linear" style={styles.logoContainer}>
          <Image source={cube} style={styles.logo}/>
        </Animatable.View>
        <TouchableWithoutFeedback>
          <View>
            <Text onPress={() => this.props.navigation.navigate('Game',{map: [[0,0,2,0,0],
                                                                           [100,1,2,0,200],
                                                                           [0,1,2,0,0],
                                                                           [0,1,3,3,3],
                                                                           [0,0,0,0,0]],level: 1})} style={styles.start}>Start</Text>
          </View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback>
          <View>
            <Text onPress={() => this.props.navigation.navigate('How')} style={styles.howto}>HowTo</Text>
          </View>
        </TouchableWithoutFeedback>
      </View>
    )
  }
}


const styles = StyleSheet.create({
  container: {
    height: Dimensions.get('window').height,
    flex: 1,
    backgroundColor: '#272727',
    alignItems: 'center',
    justifyContent: 'center',
  },
  start: {
    fontSize: 35,
    color: 'white',
    fontFamily: 'PressStart2P',
  },
  howto: {
    marginTop: 30,
    fontSize: 35,
    color: 'white',
    fontFamily: 'PressStart2P',
  },
  logo: {
    width: 70,
    height: 70,
  },
  logoContainer: {
    marginBottom: 30,
  }
})
