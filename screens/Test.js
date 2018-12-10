import React, {Component} from 'react';
import {StyleSheet, Text, View, ScrollView, TouchableOpacity} from 'react-native';
import _ from 'lodash';
import {Navigation} from 'react-native-navigation';
import LinearGradient from 'react-native-linear-gradient';
import SQLite from 'react-native-sqlite-storage'
 
var db = SQLite.openDatabase({name: 'mb.db', createFromLocation: '~www/md.db'});

export default class Test extends Component {

  constructor(props) {
    super(props);

    this.state = {
      questionId: 1,
      question: '',
      ans1: '',
      ans2: '',
      ans3: '',
      ans4: '',
      ans5: '',
      corrAns: '',
      numberOfTasks: this.props.numberOfTasks,
      points: 0,
    };
    
  }

  _selectData(testName,rowId){
    db.transaction((tx) => {
     
      tx.executeSql(`SELECT * FROM ${testName}`,[], (tx, results) => {
          var len = results.rows.length;
          if(len > 0) {
            var row = results.rows.item(rowId - 1);
            console.log(row)
            this.setState({
              question: row.question,
              ans1: row.ans1,
              ans2: row.ans2,
              ans3: row.ans3,
              ans4: row.ans4,
              ans5: row.ans5,
              corrAns: row.corrAns
            });
          }
          console.log("question: ", this.state.question)
          console.log("ans1: ", this.state.ans1)
          console.log("ans2: ", this.state.ans2)
          console.log("ans3: ", this.state.ans3)
          console.log("ans4: ", this.state.ans4)
          console.log("ans5: ", this.state.ans5)
          
      });
    });
  }

  componentDidMount(){
    this._selectData(this.props.testToSolve, this.state.questionId);
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
        },
        passProps: {
          points: this.state.points
        }
      }
    })
  }



  _changeQuestion(){

    if(this.state.questionId < this.state.numberOfTasks){
      this.setState({
        questionId: ++this.state.questionId 
      })
      console.log("questionId: ", this.state.questionId)
      this._selectData(this.props.testToSolve, this.state.questionId);
    } else {
        this.goToScreen('Result')
    }

}

  _countScore(ans){
    
    console.log("answer: " + ans)

    if(ans == this.state.corrAns){
      this.setState({
        points: this.state.points + 1,
      })
    }

    this._changeQuestion()
  }



  render() {

    return (
      <ScrollView>
      <LinearGradient colors={['#fbc2eb','#a6c1ee']} style={styles.linearGradient}>

        <View style={styles.container}>

            <Text style={styles.questionId}>Pytanie nr: {this.state.questionId}</Text>

            <Text style={styles.questionText}>{this.state.question}</Text>

            <TouchableOpacity style={styles.ansButton} onPress={() => {this._countScore(this.state.ans1)}} >
              <Text style={styles.ansText}>{this.state.ans1}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.ansButton} onPress={() => {this._countScore(this.state.ans2)}} >
              <Text style={styles.ansText}>{this.state.ans2}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.ansButton} onPress={() => {this._countScore(this.state.ans3)}} >
              <Text style={styles.ansText}>{this.state.ans3}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.ansButton} onPress={() => {this._countScore(this.state.ans4)}} >
              <Text style={styles.ansText}>{this.state.ans4}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.ansButton} onPress={() => {this._countScore(this.state.ans5)}} >
              <Text style={styles.ansText}>{this.state.ans5}</Text>
            </TouchableOpacity>

            <Text>Punkty: {this.state.points}</Text>
            <Text>Nazwa testu do rozwiazania: {this.props.testToSolve}</Text> 
            {/* dodac czas na rozwiazanie zadania */}

          </View>
      </LinearGradient>
      </ScrollView>
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
