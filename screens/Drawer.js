import React, {Component} from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import { Navigation} from 'react-native-navigation';
import LinearGradient from 'react-native-linear-gradient';

export default class Drawer extends Component {

  constructor() {
    super();
  }

  goToScreen = (screenName) => {
    Navigation.mergeOptions('drawerId', {
      sideMenu: {
        left: {
          visible: false
        }
      }
    })
    Navigation.push('MAIN_STACK',{
      component: {
        name: screenName,
        options: {
          topBar: {
            title: {
              text: screenName
            }
          }
        }
      }
    })
  }

  render() {
    return (
      // <LinearGradient colors={['#3a7bd5','#3a6073']} style={styles.linearGradient}>
      <LinearGradient colors={['#4c8ce6','#4B7284']} style={styles.linearGradient}>

        <View style={styles.container}>
          <Text style={styles.title}>Quiz </Text>

          <TouchableOpacity style={styles.tile} onPress={()=> this.goToScreen('App')}>
            <Text style={styles.tileText}>Home Page</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.tile} onPress={()=> this.goToScreen('Results')}>
            <Text style={styles.tileText}>Results</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.tile} onPress={()=> this.goToScreen('Test')}>
              <Text style={styles.tileText}>Test #1</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.tile} onPress={()=> this.goToScreen('Test')}>
              <Text style={styles.tileText}>Test #2</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.tile} onPress={()=> this.goToScreen('Test')}>
              <Text style={styles.tileText}>Test #3</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.tile} onPress={()=> this.goToScreen('Test')}>
              <Text style={styles.tileText}>Test #4</Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    );
  }
}

const styles = StyleSheet.create({
  linearGradient: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tile: {
    borderWidth: 1,
    padding: 10,
    marginTop: 10,
    width: '90%',
    borderRadius: 5
  },
  tileText: {
    textAlign: 'center',
    fontSize: 22,
  },
  title: {
    textAlign: 'center',
    fontSize: 48,
    marginBottom: 20
  }



});
