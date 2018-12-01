import React, {Component} from 'react';
import {StyleSheet, Text, View, Button, StatusBar, TouchableOpacity, ScrollView} from 'react-native';
import {Navigation} from 'react-native-navigation';
import SplashScreen from 'react-native-splash-screen';
import FirstScreen from './screens/FirstScreen';

export default class App extends Component {

  componentDidMount() {
    SplashScreen.hide()
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

  render() {
    return (
      <View style={styles.container}>
        {/* <StatusBar
          barStyle="light-content"
          backgroundColor="#4F6D7A"
        /> */}
         <View>
          <FirstScreen pagekey={"uniquekey"} title={"categort title"} description={"topic description"}/>
         </View>
        <ScrollView>
          <TouchableOpacity style={styles.tile} onPress={()=> this.goToScreen('Test')}>
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
          </TouchableOpacity>
          <View style={styles.results}>
            <Text style={styles.resultsText}>Get to know your ranking results</Text>
            <TouchableOpacity style={styles.btn} onPress={()=> this.goToScreen('Results')}>
              <Text style={styles.resultsText}>Check</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: '#4F6D7A'
    backgroundColor: 'white'

  },
  tile: {
    flex: 1,
    margin: 15,
    padding: 10,
    borderWidth: 1,
    borderColor: 'black',
    borderStyle: 'solid'
  },
  title: {
    fontSize: 24
  },
  desc: {
    fontSize: 16
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
