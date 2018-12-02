import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import _ from 'lodash';
import {Navigation} from 'react-native-navigation';


export default class Result extends Component {

  constructor(props) {
    super(props);
    
   
  
  }

  render() {
    

    return (
      
        <View style={styles.container}>
          
          <View>
            
          </View>
            
        </View>
 
    );
  }
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  resultText: {
    fontSize: 48
  }
});
