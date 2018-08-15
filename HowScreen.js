import React from 'react';
import { View, Text, Button, StyleSheet, Dimensions, TouchableWithoutFeedback, BackHandler } from 'react-native';
import { createStackNavigator } from 'react-navigation';

export default class HowScreen extends React.Component {

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', () => true);
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.howText}>Your goal is to get the single light blue block to the cell marked by the arrow</Text>
        <TouchableWithoutFeedback>
          <View>
            <Text style={styles.backText} onPress={() => this.props.navigation.navigate('Menu')}>Back</Text>
          </View>
        </TouchableWithoutFeedback>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#272727',
    alignItems: 'center',
    justifyContent: 'center',
  },
  howText: {
    width: '70%',
    fontSize: 20,
    color: 'white',
    fontFamily: 'PressStart2P',
    lineHeight: 50,
  },
  backText: {
    marginTop: 40,
    fontSize: 20,
    color: 'white',
    fontFamily: 'PressStart2P',
  }
});
