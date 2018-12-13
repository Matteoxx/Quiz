import React, {Component} from 'react';
import {StyleSheet, Text, View, TouchableOpacity, TextInput} from 'react-native';
import _ from 'lodash';
import {Navigation} from 'react-native-navigation';
import LinearGradient from 'react-native-linear-gradient';

export default class Result extends Component {

  constructor(props) {
    super(props);

    currentDate = new Date().toJSON().slice(0,10).replace(/-/g,'/');
    this.state = {
      payload: {
        "nick": "undefined",
        "score": this.props.points,
        "total": this.props.numberOfTasks,
        "type": this.props.testName,
        "date": currentDate
      }
    }

  }

    _sendResult(){
      
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
            <Text style={styles.pointsTxt}>{this.props.points} </Text>
            <TextInput style={styles.textInput} placeholder="Wprowadź swoje imię"
              onChangeText={(text) => this.setState({
                nick: text
              })}
            />
            <TouchableOpacity style={styles.saveBtn} onPress={()=>this._sendResult()}>
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
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  resultText: {
    marginTop: '15%',
    fontSize: 42,
    fontFamily: 'Lato-Regular',
    textAlign: 'center'
  },
  pointsTxt: {
    marginTop: '7%',
    fontSize: 82,
    fontFamily: 'Lato-Bold',
    textAlign: 'center'
  },
  saveBtn: {
    borderWidth: 1,
    width: '40%',
    padding: 5,
    marginTop: '10%',
    borderRadius: 5
  },
  saveBtnTxt: {
    fontSize: 24,
    textAlign: 'center'
  },
  textInput: {
    padding: 10,
    marginTop: '10%',
    width: '75%',
    borderWidth: 1,
    fontSize: 24,
    textAlign: 'center',
    borderRadius: 5
  }
});
