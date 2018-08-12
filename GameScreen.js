import React from 'react';
import { StyleSheet, Text, View, TouchableWithoutFeedback, Dimensions, Alert, AsyncStorage } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';
import * as Animatable from 'react-native-animatable';
import { Font } from 'expo';

export default class GameScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      grid: this.props.navigation.state.params.map,
      level: this.props.navigation.state.params.level,
      win: false,
    };
  }

  grid() {
    let buttonList = [];
    for(let i = 0;i<this.state.grid.length;i++)
      for(let j = 0;j<this.state.grid.length;j++){
        let buttonColor = colors[this.state.grid[i][j]];
        if(!buttonColor)
          if(this.state.grid[i][j]===200)
            buttonColor = 'white';
          else
            buttonColor = 'turquoise';
        let buttonStyle = {
          width: (GRID_SIZE/this.state.grid.length)-1,
          height: (GRID_SIZE/this.state.grid.length)-1,
          backgroundColor: buttonColor,
          borderBottomWidth: 6,
          borderBottomColor: '#000',
          borderRightWidth: 6,
          borderRightColor: '#000',
        }
        let topPixelStyle = {
          width: '10%',
          height: '10%',
          backgroundColor: 'white',
          position: 'absolute',
          top: 0,
          left: 0,
        }
        let middlePixelStyle = {
          width: '20%',
          height: '10%',
          backgroundColor: 'white',
          position: 'absolute',
          top: '10%',
          left: '10%',
        }
        let bottomPixelStyle = {
          width: '10%',
          height: '10%',
          backgroundColor: 'white',
          position: 'absolute',
          top: '19%',
          left: '10%',
        }
        let pixels = [];
        if(this.state.grid[i][j]!=0)
          pixels = [<View style={topPixelStyle}></View>,
                    <View style={middlePixelStyle}></View>,
                    <View style={bottomPixelStyle}></View>];

        buttonList.push(
          <TouchableWithoutFeedback>
            <GestureRecognizer
             onSwipeUp={()=>this.onSwipeUp(i,j)}
             onSwipeDown={()=>this.onSwipeDown(i,j)}
             onSwipeLeft={()=>this.onSwipeLeft(i,j)}
             onSwipeRight={()=>this.onSwipeRight(i,j)}
             >
              <View style={buttonStyle}>
                {pixels}
              </View>
            </GestureRecognizer>
          </TouchableWithoutFeedback>
        )
      }
    return buttonList;
  }

  onSwipeUp(i,j) {
    if(this.state.grid[i][j]===200)
      return;
    if(this.state.grid[i][j]===0)
       return;
    if(this.state.grid[i][j]===this.state.grid[i][j+1] || this.state.grid[i][j]===this.state.grid[i][j-1])
       return;
    try {
      if(this.state.grid[i][j]==100 && this.state.grid[i-1][j]==200)
         this.setState({win: true});
      else {
        let x = i;
        let k = i;
        let temp = this.state.grid;
        while(true) {
          x--;
          if(temp[x][j]!=0 && temp[x][j]!=temp[i][j])
            return;
          if(temp[x][j]===0)
            break;
        }
        while(true) {
          if(temp[i][j]===0)
            break;
          else {
            i--;
          }
        }
        while(true) {
          if(k===temp.length || temp[k][j]!=temp[i+1][j])
            break;
          else {
            k++;
          }
        }
        temp[i][j] = temp[i+1][j];
        temp[k-1][j] = 0;
        this.setState({grid: temp});
      }
    } catch(error) {
      return;
    }
  }

  onSwipeDown(i,j) {
    if(this.state.grid[i][j]===200)
      return;
    if(this.state.grid[i][j]===0)
       return;
    if(this.state.grid[i][j]===this.state.grid[i][j+1] || this.state.grid[i][j]===this.state.grid[i][j-1])
       return;
    try {
      if(this.state.grid[i][j]==100 && this.state.grid[i+1][j]==200)
         this.setState({win: true});
      else {
        let x = i;
        let k = i;
        let temp = this.state.grid;
        while(true) {
          x++;
          if(temp[x][j]!=0 && temp[x][j]!=temp[i][j])
            return;
          if(temp[x][j]===0)
            break;
        }
        while(true) {
          if(temp[i][j]===0)
            break;
          else {
            i++;
          }
        }
        while(true) {
          if(k===-1 || temp[k][j]!=temp[i-1][j])
            break;
          else {
            k--;
          }
        }
        temp[i][j] = temp[i-1][j];
        temp[k+1][j] = 0;
        this.setState({grid: temp});
      }
    } catch(error) {
      return;
    }
  }

  onSwipeLeft(i,j) {
    if(this.state.grid[i][j]===200)
      return;
    if(this.state.grid[i][j]===0)
       return;
    if(this.state.grid[i][j]!=100)
      if(!(this.state.grid[i][j]===this.state.grid[i][j+1] || this.state.grid[i][j]===this.state.grid[i][j-1]))
        return;
    try {
      if(this.state.grid[i][j]==100 && this.state.grid[i][j-1]==200)
         this.setState({win: true});
      else {
        let x = j;
        let k = j;
        let temp = this.state.grid;
        while(true) {
          x--;
          if(temp[i][x]!=0 && temp[i][x]!=temp[i][j])
            return;
          if(temp[i][x]===0)
            break;
        }
        while(true) {
          if(temp[i][j]===0)
            break;
          else {
            j--;
          }
        }
        while(true) {
          if(k===temp.length || temp[i][k]!=temp[i][j+1])
            break;
          else {
            k++;
          }
        }
        temp[i][j] = temp[i][j+1];
        temp[i][k-1] = 0;
        this.setState({grid: temp});
      }
    } catch(error) {
      return;
    }
  }

  onSwipeRight(i,j) {
    if(this.state.grid[i][j]===200)
      return;
    if(this.state.grid[i][j]===0)
       return;
    if(this.state.grid[i][j]!=100)
      if(!(this.state.grid[i][j]===this.state.grid[i][j+1] || this.state.grid[i][j]===this.state.grid[i][j-1]))
        return;
    try {
      if(this.state.grid[i][j]==100 && this.state.grid[i][j+1]==200)
         this.setState({win: true});
      else {
        let x = j;
        let k = j;
        let temp = this.state.grid;
        while(true) {
          x++;
          if(temp[i][x]!=0 && temp[i][x]!=temp[i][j])
            return;
          if(temp[i][x]===0)
            break;
        }
        while(true) {
          if(temp[i][j]===0)
            break;
          else {
            j++;
          }
        }
        while(true) {
          if(k===-1 || temp[i][k]!=temp[i][j-1])
            break;
          else {
            k--;
          }
        }
        temp[i][j] = temp[i][j-1];
        temp[i][k+1] = 0;
        this.setState({grid: temp});
      }
    } catch(error) {
      return;
    }
  }

  render() {
    let currentMap = null;
    let nextMap = null;
    if(this.state.level===1) {
      currentMap = [[0,0,2,0,0],
                   [100,1,2,0,200],
                   [0,1,2,0,0],
                   [0,1,3,3,3],
                   [0,0,0,0,0]];
      nextMap = [[0,0,0,4,5,0],
                 [100,1,0,4,5,200],
                 [0,1,0,4,5,0],
                 [0,1,0,0,5,0],
                 [0,1,2,2,2,0],
                 [0,3,3,3,3,0]];
    }
    if(this.state.level===2) {
      currentMap = [[0,0,0,4,5,0],
                   [100,1,0,4,5,200],
                   [0,1,0,4,5,0],
                   [0,1,0,0,5,0],
                   [0,1,2,2,2,0],
                   [0,3,3,3,3,0]];
      nextMap = [[0,1,0,0,0,6,0],
                 [0,1,0,0,5,6,0],
                 [100,1,4,4,5,6,200],
                 [0,1,0,0,5,6,0],
                 [0,1,0,0,5,6,0],
                 [0,2,2,2,2,2,3],
                 [0,0,0,0,0,0,3]];
    }
    if(this.state.level===3){
      currentMap = [[0,1,0,0,0,6,0],
                   [0,1,0,0,5,6,0],
                   [100,1,4,4,5,6,200],
                   [0,1,0,0,5,6,0],
                   [0,1,0,0,5,6,0],
                   [0,2,2,2,2,2,3],
                   [0,0,0,0,0,0,3]];
    }
    if(this.state.win && this.state.level===3)
      return (
        <View style={styles.container}>
          <Animatable.Text style={styles.congratsText} animation="tada">Congrats</Animatable.Text>
          <Animatable.Text style={styles.congratsText} animation="tada">You are a block master</Animatable.Text>
          <TouchableWithoutFeedback>
            <View>
              <Animatable.Text style={styles.doneText} onPress={() => this.props.navigation.navigate('Menu')} animation="tada">Done</Animatable.Text>
            </View>
          </TouchableWithoutFeedback>
        </View>
      )
    if(this.state.win)
      return (
        <View style={styles.container}>
         <Animatable.Text animation="bounceInDown" style={styles.winningText}>GAMED</Animatable.Text>
         <TouchableWithoutFeedback>
           <View>
             <Animatable.Text animation="bounceInDown" style={styles.nextLevel} onPress={() => this.props.navigation.push('Game',{map: nextMap,level: this.state.level+1})}>Next Level</Animatable.Text>
           </View>
         </TouchableWithoutFeedback>
        </View>
      )
    else {
      return (
        <View style={styles.container}>
          <View style={styles.levelContainer}>
            <Text style={styles.levelText}>{"Level "+this.state.level}</Text>
          </View>
          <View style={styles.grid}>
            {this.grid()}
          </View>
          <TouchableWithoutFeedback>
            <View style={styles.resetContainer}>
              <Text style={styles.reset} onPress={() => this.setState({grid: currentMap})}>Reset</Text>
            </View>
          </TouchableWithoutFeedback>
        </View>
      );
    }
  }
}
const GRID_SIZE = 500;
const colors = ['#494949', 'red', 'orange', 'green', 'blue', 'yellow', 'purple', 'pink', 'brown', 'black'];
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#272727',
    alignItems: 'center',
    justifyContent: 'center',
  },
  grid: {
    height: 500,
    width: 500,
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    position: 'absolute',
    top: '25%'
  },
  winningText: {
    fontSize: 50,
    color: 'white',
    fontFamily: 'PressStart2P',
  },
  reset: {
    fontSize: 20,
    color: 'white',
    fontFamily: 'PressStart2P',
  },
  nextLevel: {
    marginTop: '10%',
    fontSize: 20,
    color: 'white',
    fontFamily: 'PressStart2P',
  },
  congratsText: {
    marginTop: '10%',
    fontSize: 30,
    color: 'white',
    fontFamily: 'PressStart2P',
  },
  doneText: {
    marginTop: '20%',
    fontSize: 20,
    color: 'white',
    fontFamily: 'PressStart2P',
  },
  levelText: {
    fontSize: 20,
    color: 'white',
    fontFamily: 'PressStart2P',
  },
  levelContainer: {
    position: 'absolute',
    top: '15%',
  },
  resetContainer: {
    position: 'absolute',
    top: '80%',
  }
});
