import React, {Component} from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import { Navigation} from 'react-native-navigation';


export default class Drawer extends Component {

  constructor() {
    super();
  }

  goToScreen = (screenName) => {
    Navigation.push(this.props.componentId, {
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
//   tile: {
//     height: '10%',
//     width: '95%',
//     margin: 5,
//     borderWidth: 1,
//     borderColor: 'black',
//     borderStyle: 'solid',
//     backgroundColor: '#4F6D7A'
//   },

  
});
