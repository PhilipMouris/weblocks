import React from 'react';
import { View, Text, Button, StyleSheet, Dimensions, TouchableWithoutFeedback, Image, AsyncStorage } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import * as Animatable from 'react-native-animatable';
import cube from './assets/splash.png';
import data from './maps.json';
import converter from './converter';

export default class MenuScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      level: 0,
      flag: true,
    };
  }

  async componentDidMount() {
    await AsyncStorage.getItem('weblocksLevel').then(res => this.setState({level: parseInt(res),flag: false}));
    if(!this.state.level) {
      await AsyncStorage.setItem('weblocksLevel','1').then(res => this.setState({level: 1,flag: false}));
    }
  }

  render() {
    if(this.state.flag)
      return <View style={styles.container}></View>
    else {
    let letterMap = data.maps[this.state.level-1];
    let mapArray = converter.convert(letterMap.substring(3,39));
    return (
      <View style={styles.container}>
        <Animatable.View animation="rotate" iterationCount="infinite" duration={2000} easing="linear" style={styles.logoContainer}>
          <Image source={cube} style={styles.logo}/>
        </Animatable.View>
        <TouchableWithoutFeedback>
          <View>
            <Text onPress={() => this.props.navigation.navigate('Game',{map: mapArray,level: this.state.level})} style={styles.start}>Start</Text>
          </View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback>
          <View>
            <Text onPress={() => this.props.navigation.navigate('How')} style={styles.howto}>HowTo</Text>
          </View>
        </TouchableWithoutFeedback>
        <View style={styles.levelsContainer}>
          <Text style={styles.levelsText}>Current Level: {this.state.level}</Text>
          <TouchableWithoutFeedback>
            <View>
              <Text style={styles.levelsText} onPress={() =>  {this.setState({level: 1})
                                     AsyncStorage.setItem('weblocksLevel','1')}}>Reset Levels</Text>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </View>
    )
   }
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
  },
  levelsContainer: {
    marginTop: 30,
  },
  levelsText: {
    fontSize: 15,
    marginBottom: 10,
    color: 'white',
    fontFamily: 'PressStart2P',
    textAlign: 'center',
  }
})
