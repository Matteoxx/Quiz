import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import _ from 'lodash';
import {Navigation} from 'react-native-navigation';


export default class Result extends Component {

  constructor(props) {
    super(props);
    
    this.state = {
      
    };
  
  }
 

  render() {
    

    return (
      
        <View style={styles.container}>
          
          <Text >Twoj wynik to:  </Text>
            
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
  }
});
