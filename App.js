import React, {Component} from 'react';
import {StyleSheet, Text, View, Button} from 'react-native';
import {Navigation} from 'react-native-navigation';

export default class App extends Component {

  goToScreen = (screenName) => {
    Navigation.push(this.props.componentId, {
      component: {
        name: screenName
      }
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <Button title="Tests" onPress={()=> this.goToScreen('Tests')}></Button>
        <Button title="Results" onPress={()=> this.goToScreen('Results')}></Button>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
