import React, {Component} from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import _ from 'lodash';
import {Navigation} from 'react-native-navigation';
import LinearGradient from 'react-native-linear-gradient';

let payload = {
  "nick": "Jan",
  "score": 5,
  "total": 20,
  "type": "historia",
  "date": "2018-12-01"
}

// pobrac dane z rozwiazanego testu i zapisac w obiekcie

export default class Result extends Component {

  constructor(props) {
    super(props);
  }


  _sendResult(res){

    fetch('https://pwsz-quiz-api.herokuapp.com/api/result', {
      method: 'POST',
      body: JSON.stringify(res),
    });

  }

  render() {


    return (
        <LinearGradient colors={['#fbc2eb','#a6c1ee']} style={styles.linearGradient}>
          <View style={styles.container}>

            <Text style={styles.resultText}>Twój wynik to: </Text>
            <Text style={styles.resultText2}>{this.props.points} punkty</Text>
            <TouchableOpacity style={styles.saveBtn} onPress={()=>this._sendResult(payload)}>
              <Text style={styles.saveBtnTxt}>Save result</Text>
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
  },
  saveBtn: {
    borderWidth: 1,
    width: '40%',
    padding: 10,
    marginTop: 20,
  },
  saveBtnTxt: {
    fontSize: 18,
    textAlign: 'center'
  }
});
