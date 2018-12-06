import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import _ from 'lodash';
import {Navigation} from 'react-native-navigation';
import LinearGradient from 'react-native-linear-gradient';

export default class Result extends Component {

  constructor(props) {
    super(props);
  }

  render() {


    return (
        <LinearGradient colors={['#fbc2eb','#a6c1ee']} style={styles.linearGradient}>
          <View style={styles.container}>

            <View>
              <Text style={styles.resultText}>Twój wynik to: </Text>
              <Text style={styles.resultText2}>{this.props.points} punkty</Text>
            </View>

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
    alignItems: 'center'
  },
  resultText: {
    fontSize: 48,
    fontFamily: 'Lato-Bold',
    textAlign: 'center'
  },
  resultText2: {
    marginTop: 30,
    fontSize: 32,
    fontFamily: 'Lato-Regular',
    textAlign: 'center'
  }
});
