import React from 'react';
import { View, Text, Button, StyleSheet, Dimensions, TouchableHighlight, Image, BackHandler, AsyncStorage } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import cube from './assets/splash.png';
import { Font } from 'expo';

export default class SplashScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fontLoaded: false,
      text: '',
    };
  }

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', () => true);
    Font.loadAsync({
      'PressStart2P': require('./assets/PressStart2P-Regular.ttf'),
    }).then(()=>this.setState({fontLoaded: true}));
    setTimeout(()=>this.setState({text: "w"}),500);
    setTimeout(()=>this.setState({text: "we"}),1000);
    setTimeout(()=>this.setState({text: "web"}),1500);
    setTimeout(()=>this.setState({text: "webl"}),2000);
    setTimeout(()=>this.setState({text: "weblo"}),2500);
    setTimeout(()=>this.setState({text: "webloc"}),3000);
    setTimeout(()=>this.setState({text: "weblock"}),3500);
    setTimeout(()=>this.setState({text: "weblocks"}),4000);
    setTimeout(()=>this.props.navigation.navigate('Menu'),4500);
  }

  render() {
      if(this.state.fontLoaded)
        return (
          <View style={styles.container}>
            <View style={styles.splashLogo}>
              <Image source={cube} />
              <Text style={styles.splashText}>{this.state.text}</Text>
            </View>
          </View>
        )
      else {
        return (
          <View style={styles.container}>
            <View style={styles.splashLogo}>
              <Image source={cube} />
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
  splashText: {
    fontSize: 11,
    color: 'white',
    fontFamily: 'PressStart2P',
    position: 'absolute',
    top: '60%',
    left: '14%',
    transform: [{rotate: '8deg'}],
  },
  splashLogo: {
    position: 'absolute',
  }
})
