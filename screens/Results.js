import React, {Component} from 'react';
import {StyleSheet, Text, View, ListView, RefreshControl} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
results = [
  {
    nick: 'Marek',
    score: 18,
    total: 20,
    type: 'historia',
    date: '2018-11-12'
  },
  {
    nick: 'Adam',
    score: 28,
    total: 30,
    type: 'matematyka',
    date: '2018-11-18'
  },
  {
    nick: 'Marcin',
    score: 16,
    total: 25,
    type: 'biologia',
    date: '2018-11-22'
  },
]

const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

export default class Results extends Component {

  constructor() {
    super();
    
    this.state = {
      dataSource: ds.cloneWithRows(results),
      refreshing: false
    };
  }

  _onRefresh = () => {
    this.setState({refreshing: true});
    fetchData().then(() => {
      this.setState({refreshing: false});
    });
  }


  _renderRow(rowData){
    return (
      
      <View style={styles.row}>
        <View style={styles.col}><Text style={styles.text}>{rowData.nick}</Text></View>
        <View style={styles.col}><Text style={styles.text}>{rowData.score}/{rowData.total}</Text></View>
        <View style={styles.col}><Text style={styles.text}>{rowData.type}</Text></View>
        <View style={styles.col}><Text style={styles.text}>{rowData.date}</Text></View>
      </View>   
      
    );
  }

  render() {
    return (
      <LinearGradient colors={['#fbc2eb','#a6c1ee']} style={styles.linearGradient}>
      <View style={styles.container}>
        <ListView 
        style={styles.table} 
        dataSource={this.state.dataSource}
        renderRow={this._renderRow}
        refreshControl={
          <RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={this._onRefresh}
          />
        }
        />
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
  row: {
    flex: 1,
    flexDirection: 'row',
  },
  col: {
    borderWidth: 1,
    borderColor: 'black',
    borderStyle: 'solid',
    width: '25%'
  },
  text: {
    textAlign: 'center',
    paddingTop: 10,
    paddingBottom: 10,
    fontFamily: 'Lato-Regular'
  }

  
});
