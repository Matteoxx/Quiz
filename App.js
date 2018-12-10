import React, {Component} from 'react';
import {StyleSheet, Text, View, Button, StatusBar, TouchableOpacity, ScrollView} from 'react-native';
import {Navigation} from 'react-native-navigation';
import SplashScreen from 'react-native-splash-screen';
import FirstScreen from './screens/FirstScreen';
import LinearGradient from 'react-native-linear-gradient';
import _ from 'lodash';
import SQLite from 'react-native-sqlite-storage'
 
var db = SQLite.openDatabase({name: 'mb.db', createFromLocation: '~www/md.db'});

export default class App extends Component {

  constructor(props){
    super(props);

    this.state = {
      isLoading: true,
      tests: [],
      testsNames: []
    }


  }

  _deleteData(){
    let query = `DELETE FROM Zagadkimatematyczne`
    db.executeSql(query)
    query = `DELETE FROM WodzowieidowódcystarożytnegoRzymu`
    db.executeSql(query)
    query = `DELETE FROM Modanasukces`
    db.executeSql(query)
    query = `DELETE FROM Tranzystorbipolarnyipolowy`
    db.executeSql(query)
  }
  
  _saveDataFromJson(){
    return _.map(this.state.tests, function(test){
   
        //pobieranie szczegolow testu po id
        fetch("https://pwsz-quiz-api.herokuapp.com/api/test/" + test.id)
          .then((response) => response.json())
            .then((testJson) => {
              
         
              // console.log("wyswietlenie szczegolow danego testu: ", testJson);
              // console.log(testJson.tasks)
              
             
              return _.map(testJson.tasks, function(task){

                //zmiana nazw tabel, aby wprowadzic do nich dane
                let testName = testJson.name;
                let newTestName = testName.replace(/\s/g,'');
                // console.log(newTestName)
                
                task.question = task.question.replace(/\'/g,'"');
                // console.log(task.question)
                // poprawic jeszcze apostrofy i cudzysłowys
                //sprawdzenie poprawnej odpowiedzi i pozbycie sie apostrofa
                let corrAns = '';
                _.filter(task.answers, function(ans){
                  ans.content = ans.content.replace("'","\"")
                  

                  if(ans.isCorrect == true){
                    corrAns = ans.content;
                    corrAns = corrAns.replace("'","")

                  }
                })
                // console.log(corrAns)
                //query do uzupelnienia
                let query = `INSERT INTO '${newTestName}' (question, corrAns, ans1, ans2, ans3, ans4, ans5) VALUES ('${task.question}','${corrAns}'`

                const columnsTotal = 7;
                let columnsAdded = 2;
                _.map(task.answers, function(ans){
                  query = query + ", '" + ans.content + "' "
                  columnsAdded++
                })

                for(let i = 0; i < columnsTotal - columnsAdded; i++ ){
                  query = query + ", 'null'"
                }
                query = query + ")"

                db.executeSql(query);

              
              })

            }
            
        );
        // this.setState({
        //   testsNames: nazwytestow
        // })
        
    })
  }

  _selectDataFromTable(){
    db.transaction((tx) => {
     
      tx.executeSql('SELECT * FROM Zagadkimatematyczne',[], (tx, results) => {
          var len = results.rows.length;
          console.log("dlugosc: ", len)
          console.log(results.rows.item(0))
          console.log(results.rows.item(1))
          console.log(results.rows.item(2))
          console.log(results.rows.item(3))
          console.log(results.rows.item(4))
          console.log(results.rows.item(5))
          console.log(results.rows.item(6))
          console.log(results.rows.item(7))
          console.log(results.rows.item(8))
          console.log(results.rows.item(9))
          console.log(results.rows.item(10))
          console.log(results.rows.item(11))
          console.log(results.rows.item(12))
          console.log(results.rows.item(13))
          console.log(results.rows.item(14))
          console.log(results.rows.item(15))

      });
    });
  }

  componentDidMount() {
    SplashScreen.hide();
    
    // this._deleteData();
 
    fetch("https://pwsz-quiz-api.herokuapp.com/api/tests")
    .then((response) => response.json())
    .then((responseJson) => {
      
        this.setState({
            isLoading: false,
            tests: responseJson
        })
      
        // this._saveDataFromJson();
        // this._selectDataFromTable();
        
    });

    
   
    

  }

  goToTestScreen = (screenName, testName, numberOfTasks) => {
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
          testToSolve: testName,
          numberOfTasks: numberOfTasks 
        }
      }
    })
  }

  _renderTests(){
    return _.map(this.state.tests, test => {
      return (
        <TouchableOpacity style={styles.tile} onPress={()=>this.goToTestScreen('Test', test.name.replace(/\s/g,''), test.numberOfTasks)}>
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
 


          {/* <TouchableOpacity style={styles.tile} onPress={()=> this.goToScreen('Test')}>
            <Text style={styles.title}>Title test #1</Text>
            <Text style={styles.desc}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam congue accumsan ...</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.tile} onPress={()=> this.goToScreen('Test')}>
            <Text style={styles.title}>Title test #2</Text>
            <Text style={styles.desc}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam congue accumsan ...</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.tile} onPress={()=> this.goToScreen('Test')}>
            <Text style={styles.title}>Title test #3</Text>
            <Text style={styles.desc}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam congue accumsan ...</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.tile} onPress={()=> this.goToScreen('Test')}>
            <Text style={styles.title}>Title test #4</Text>
            <Text style={styles.desc}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam congue accumsan ...</Text>
          </TouchableOpacity> */}
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
