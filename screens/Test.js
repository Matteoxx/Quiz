import React, {Component} from 'react';
import {StyleSheet, Text, View, ScrollView, TouchableOpacity} from 'react-native';
import _ from 'lodash';
import {Navigation} from 'react-native-navigation';
import LinearGradient from 'react-native-linear-gradient';
import SQLite from 'react-native-sqlite-storage'
 
var db = SQLite.openDatabase({name: 'md.db', createFromLocation: '~www/md.db'});

export default class Test extends Component {
  questionId = 1;
  points = 0;
  constructor(props) {
    super(props);
    
    this.state = {
      test: {}
    };
  
  }

  _selectData(testId,rowId){

    db.transaction((tx) => {
     
      tx.executeSql(`SELECT * FROM tests WHERE id = ?`,[testId], (tx, results) => {
      
        this.setState({
          test: results.rows.item(rowId - 1)
        });

      });
    });
  }

  componentDidMount(){
    this._selectData(this.props.testToSolveId, this.questionId);
  }

  goToScreen = (screenName, testName, points, numberOfTasks) => {
    Navigation.push(this.props.componentId, {
      component: {
        name: screenName,
        options: {
          topBar: {
            title: {
              text: screenName
            }
          }
        },
        passProps: {
          testName: testName,
          points: points,
          numberOfTasks: numberOfTasks
        }
      }
    })
  }



  _changeQuestion(id){

    if(id <= this.state.test.numberOfTasks){
      this._selectData(this.props.testToSolveId, id);
    } else {
        
        this.goToScreen('Result', this.props.testToSolveName, this.points, this.props.numberOfTasks)
    }

}

  _countScore(ans){
    
    if(ans == this.state.test.corrAns){

      this.points++
    }

    this.questionId++
    this._changeQuestion(this.questionId)
  }

  render() {

    return (
      
      <LinearGradient colors={['#fbc2eb','#a6c1ee']} style={styles.linearGradient}>

        <View style={styles.container}>

            <Text style={styles.questionId}>Pytanie nr: {this.questionId}</Text>

            <Text style={styles.questionText}>{this.state.question}</Text>

            <TouchableOpacity style={styles.ansButton} onPress={() => {this._countScore(this.state.test.ans1)}} >
              <Text style={styles.ansText}>{this.state.test.ans1}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.ansButton} onPress={() => {this._countScore(this.state.test.ans2)}} >
              <Text style={styles.ansText}>{this.state.test.ans2}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.ansButton} onPress={() => {this._countScore(this.state.test.ans3)}} >
              <Text style={styles.ansText}>{this.state.test.ans3}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.ansButton} onPress={() => {this._countScore(this.state.test.ans4)}} >
              <Text style={styles.ansText}>{this.state.test.ans4}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.ansButton} onPress={() => {this._countScore(this.state.test.ans5)}} >
              <Text style={styles.ansText}>{this.state.test.ans5}</Text>
            </TouchableOpacity>
         
            {/* dodac czas na rozwiazanie zadania */}

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
    padding: 10
  },
  questionId: {
    fontFamily: 'Lato-Bold',
    textAlign: 'center',
    fontSize: 32,
    borderBottomWidth: 1,
    paddingBottom: 5,
    marginBottom: 30
  },
  questionText: {
    textAlign: 'center',
    fontSize: 22,
    marginBottom: 20,
    fontFamily: 'Lato-Bold'
  },
  ansButton: {
    paddingTop: 15,
    paddingBottom: 15,
    paddingLeft: 5,
    paddingRight: 5,
    borderWidth: 1,
    borderColor: 'black',
    borderStyle: 'solid',
    width: '95%',
    margin: 2,
  },
  ansText: {
    fontSize: 18,
    textAlign: 'center'
  }

});
