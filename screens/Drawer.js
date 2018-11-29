import React, {Component} from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import { Navigation} from 'react-native-navigation';


export default class Drawer extends Component {

  constructor() {
    super();
  }

  goToScreen = (screen) => {
    Navigation.mergeOptions('drawerId', {
      sideMenu: {
        left: {
          visible: false
        }
      }
    })
    Navigation.push('MAIN_STACK',{
      component: {
        name: screen
      }
    })
  }

  render() {
    return (

      <View style={styles.container}>

        <TouchableOpacity style={styles.tile} onPress={()=> this.goToScreen('Test')}>
            <Text>Tests</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.tile} onPress={()=> this.goToScreen('Results')}>
          <Text>Results</Text>
        </TouchableOpacity>

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



});
