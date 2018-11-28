import React, {Component} from 'react';
import {StyleSheet, Text, View, ListView, TouchableOpacity} from 'react-native';


test = [
  {
    question: 'Który znacznik wstawia odsyłacz do podstrony "galeria.html"?',
    ans1: '<a href="galeria">galeria</a>',
    ans2: '<a href="galeria.html">galeria</a>',
    ans3: '<a href="galeria.php">galeria"</a>',
    ans4: '<a href="http://www.galeria.html">galeria</a>',
    correctAns: '<a href="galeria.html">galeria</a>',
  },
  {
    question: 'Między którymi znacznikami umieścisz tekst, który ma się pojawić na pasku tytułowym?',
    ans1: '<title> Tekst </title>',
    ans2: '<body> Tekst </body>',
    ans3: '<author> Tekst </author>',
    ans4: '<head> Tekst </head>',
    correctAns: '<title> Tekst </title>',
  },
  {
    question: 'Jakiego polecenia musimy użyć w dokumencie HTML żeby wstawić jakąś grafikę?',
    ans1: '<img src="pełna nazwa pliku graficznego">',
    ans2: '<img important="pełna nazwa pliku graficznego">',
    ans3: '<import img="pełna nazwa pliku graficznego">',
    ans4: '<insert img="pełna nazwa pliku graficznego">',
    correctAns: '<img src="pełna nazwa pliku graficznego">',
  },
  {
    question: 'Zaznacz popularną przeglądarkę www.',
    ans1: 'Google',
    ans2: 'Internet Explorer',
    ans3: 'Outlook Express',
    ans4: 'Nasza Klasa',
    correctAns: 'Internet Explorer',
  },
  {
    question: 'Który znacznik ustala kolor tła dokumentu na czarny i kolor czcionki na żółty',
    ans1: 'WSZYSTKIE ODPOWIEDZI SĄ BŁĘDNE',
    ans2: '<BODY BACKGROUND="black" TEXT="yellow">',
    ans3: '<BODY BGCOLOR="black" TEXT="yellow">',
    ans4: '<BODY BACKGROUND="black" FONTCOLOR="yellow">',
    correctAns: '<BODY BGCOLOR="black" TEXT="yellow">',
  }

]

const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

export default class Tests extends Component {
  
  

  constructor() {
    super();
    
    this.state = {
      dataSource: ds.cloneWithRows(test)
    };
  }

  _renderRow(rowData){
    return (
      <View style={styles.question}>

        <Text style={styles.questionText}>{rowData.question}</Text>
        <TouchableOpacity style={styles.ansButton} >
          <Text>{rowData.ans1}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.ansButton} >
          <Text>{rowData.ans2}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.ansButton} >
          <Text>{rowData.ans3}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.ansButton} >
          <Text>{rowData.ans4}</Text>
        </TouchableOpacity>

      </View>   
    );
  }

  render() {
    return (
      <View style={styles.container}>

        <ListView 
        dataSource={this.state.dataSource}
        renderRow={this._renderRow}
        />
        
      </View>
    );
  }
}

  

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  question: {
    padding: 10,
    margin: 5,
    alignItems: 'flex-start',
    fontSize: 20
  },
  questionText: {
    fontWeight: '700',
    textAlign: 'center'
  },
  ansButton: {
    padding: 5,
    borderWidth: 1,
    borderColor: 'black',
    borderStyle: 'solid',
    width: '95%',
    margin: 2
  }
});
