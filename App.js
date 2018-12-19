import React, {Component} from 'react';
import {AsyncStorage, StyleSheet, Text, View, Button, StatusBar, TouchableOpacity, ScrollView} from 'react-native';
import {Navigation} from 'react-native-navigation';
import SplashScreen from 'react-native-splash-screen';
import FirstScreen from './screens/FirstScreen';
import LinearGradient from 'react-native-linear-gradient';
import _ from 'lodash';
import SQLite from 'react-native-sqlite-storage';
 
var db = SQLite.openDatabase({name: 'md.db', createFromLocation: '~www/md.db'});

export default class App extends Component {

  constructor(props){
    super(props);

    this.state = {
      isLoading: true
    }


  }

  _downloadData(){
    fetch("https://pwsz-quiz-api.herokuapp.com/api/tests")
    .then((response) => response.json())
    .then((responseJson) => {
      
        this.setState({
            isLoading: false,
            tests: responseJson
        })    
        
        this._insertDataToDatabase();
    });
  }

  _insertDataToDatabase(){

    db.transaction((tx) => {
      tx.executeSql('DROP table tests');
    });
    db.transaction((tx) => {
      tx.executeSql(`CREATE TABLE 'tests' ( 'id' TEXT, 'name' TEXT, 'numberOfTasks' TEXT, 'question' TEXT, 'corrAns' TEXT, 'ans1' TEXT, 'ans2' TEXT, 'ans3' TEXT, 'ans4' TEXT, 'ans5' TEXT )`);
    });
    
    _.map(this.state.tests, function(test){

        fetch("https://pwsz-quiz-api.herokuapp.com/api/test/" + test.id)
          .then((response) => response.json())
            .then((testJson) => {

              _.map(testJson.tasks, function(task){

                task.question = task.question.replace(/\'/g,'"');
       
                let corrAns = '';
                _.filter(task.answers, function(ans){
                  ans.content = ans.content.replace("'","\"")
                  

                  if(ans.isCorrect == true){
                    corrAns = ans.content;
                    corrAns = corrAns.replace("'","")

                  }
                })

                let query = `INSERT INTO tests (id, name, numberOfTasks, question, corrAns, ans1, ans2, ans3, ans4, ans5) VALUES ('${testJson.id}','${testJson.name}','${test.numberOfTasks}','${task.question}','${corrAns}'`
                const columnsTotal = 10;
                let columnsAdded = 5;
                _.map(task.answers, function(ans){
                  query = query + ", '" + ans.content + "' "
                  columnsAdded++
                })

                for(let i = 0; i < columnsTotal - columnsAdded; i++ ){
                  query = query + ", ''"
                }
                query = query + ")"

                db.executeSql(query);
              
              })

            }
            
        );
    })

  }

  async componentDidMount() {

    SplashScreen.hide();
    
    this._downloadData();

  }

  goToTestScreen = (screenName, testName, testId, numberOfTasks) => {
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
          testToSolveName: testName,
          testToSolveId: testId,
          numberOfTasks: numberOfTasks 
        }
      }
    })
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

  _renderTests(){
    return _.map(this.state.tests, test => {
      return (
        <TouchableOpacity style={styles.tile} onPress={()=>this.goToTestScreen('Test', test.name, test.id, test.numberOfTasks)}>
          <Text style={styles.title}>{test.name}</Text>
          <Text style={{color: 'blue'}}>
            {_.map(test.tags, y => {
              return '#' + y + ' ' 
            })}
          </Text>
          <Text style={styles.desc}>Poziom trudności: {test.level}</Text>
          <Text style={styles.desc}>Liczba zadań: {test.numberOfTasks}</Text>
          <Text style={styles.desc}>Opis: {test.description}</Text>
        </TouchableOpacity>
      )
    })
  }

  
  render() {

    return (

      <LinearGradient colors={['#A6fcd2','#Afd5f6']} style={styles.linearGradient}>

        <View style={styles.container}>
    
          <View>
            <FirstScreen pagekey={"uniquekey"} title={"categort title"} description={"topic description"}/>
          </View>
          <ScrollView>

            {this._renderTests()}
  
            <View style={styles.results}>
              <Text style={styles.resultsText}>Get to know your ranking results</Text>
              <TouchableOpacity style={styles.btn} onPress={()=> this.goToScreen('Results')}>
                <Text style={styles.resultsText}>Check</Text>
              </TouchableOpacity>
            </View>

            
          </ScrollView>
          
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
  tile: {
    flex: 1,
    margin: 15,
    padding: 15,
    borderWidth: 1,
    borderColor: 'black',
    borderStyle: 'solid'
  },
  title: {
    fontSize: 24,
    fontFamily: 'Lato-Bold',
    marginBottom: 10
  },
  desc: {
    fontSize: 16,
    fontFamily: 'Lato-Regular',
    marginTop: 5
  },
  results: {
    padding: 10,
    borderWidth: 1,
    borderColor: 'black',
    borderStyle: 'solid',
    alignItems: 'center'
  },
  btn: {
    width: '50%',
    padding: 5,
    borderWidth: 1,
    borderColor: 'black',
    borderStyle: 'solid',
    marginTop: 7
  },
  resultsText: {
    textAlign: 'center',
    fontSize: 20
  },
});
