import React, {Component} from 'react';
import {AsyncStorage, StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import { Navigation} from 'react-native-navigation';
import LinearGradient from 'react-native-linear-gradient';
import _ from 'lodash';
import SQLite from 'react-native-sqlite-storage'
 
var db = SQLite.openDatabase({name: 'md.db', createFromLocation: '~www/md.db'});

export default class Drawer extends Component {
  
  constructor() {
    super();

    this.state = {
      dane: []
    }

  }

  downloadDataFromDatabase = (db) => {
    db.transaction((tx) => {
     
      tx.executeSql('SELECT DISTINCT id, name, numberOfTasks FROM tests',[], (tx, results) => {
        var daneDoTestow = [];
        for(let i = 0; i < results.rows.length; i++){
            daneDoTestow[i] = results.rows.item(i)
        }  
        this.setState({dane: daneDoTestow});
      })

    })
  }

  componentDidMount() {
    this.downloadDataFromDatabase(db);
  }  

  goToScreen = (screenName, testName, testId, numberOfTasks) => {
    Navigation.mergeOptions('drawerId', {
      sideMenu: {
        left: {
          visible: false
        }
      }
    })
    Navigation.push('MAIN_STACK',{
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



  render() {

        let rows = [];
        for (let i = 0; i < this.state.dane.length; i++) {
            rows.push(
              <TouchableOpacity style={styles.tile} onPress={()=> this.goToScreen('Test', this.state.dane[i].name, this.state.dane[i].id, this.state.dane[i].numberOfTasks)}>
                <Text style={styles.tileText}>{this.state.dane[i].name}</Text>
              </TouchableOpacity>    
  
            )
        }
    return (
      <LinearGradient colors={['#4c8ce6','#4B7284']} style={styles.linearGradient}>

        <View style={styles.container}>
          <Text style={styles.title}>Quiz </Text>

          <TouchableOpacity style={styles.tile} onPress={()=> this.goToScreen('App')}>
            <Text style={styles.tileText}>Home Page</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.tile} onPress={()=> this.goToScreen('Results')}>
            <Text style={styles.tileText}>Results</Text>
          </TouchableOpacity>
          
          {rows}

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
  },
  tile: {
    borderWidth: 1,
    padding: 10,
    marginTop: 10,
    width: '90%',
    borderRadius: 5
  },
  tileText: {
    textAlign: 'center',
    fontSize: 22,
    fontFamily: 'Lato-Bold'
  },
  title: {
    textAlign: 'center',
    fontSize: 48,
    marginBottom: 20,
    fontFamily: 'BreeSerif-Regular'
  }



});
