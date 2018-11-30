import React, {Component} from 'react';
import {StyleSheet, Text, View, ScrollView, TouchableOpacity} from 'react-native';
import _ from 'lodash';

test = [
  {
    id: 1,
    question: 'Który znacznik wstawia odsyłacz do podstrony "galeria.html"?',
    ans1: '<a href="galeria">galeria</a>',
    ans2: '<a href="galeria.html">galeria</a>',
    ans3: '<a href="galeria.php">galeria"</a>',
    ans4: '<a href="http://www.galeria.html">galeria</a>',
    correctAns: '<a href="galeria.html">galeria</a>',
  },
  {
    id: 2,
    question: 'Między którymi znacznikami umieścisz tekst, który ma się pojawić na pasku tytułowym?',
    ans1: '<title> Tekst </title>',
    ans2: '<body> Tekst </body>',
    ans3: '<author> Tekst </author>',
    ans4: '<head> Tekst </head>',
    correctAns: '<title> Tekst </title>',
  },
  {
    id: 3,
    question: 'Jakiego polecenia musimy użyć w dokumencie HTML żeby wstawić jakąś grafikę?',
    ans1: '<img src="pełna nazwa pliku graficznego">',
    ans2: '<img important="pełna nazwa pliku graficznego">',
    ans3: '<import img="pełna nazwa pliku graficznego">',
    ans4: '<insert img="pełna nazwa pliku graficznego">',
    correctAns: '<img src="pełna nazwa pliku graficznego">',
  },
  {
    id: 4,
    question: 'Zaznacz popularną przeglądarkę www.',
    ans1: 'Google',
    ans2: 'Internet Explorer',
    ans3: 'Outlook Express',
    ans4: 'Nasza Klasa',
    correctAns: 'Internet Explorer',
  },
  {
    id: 5,
    question: 'Który znacznik ustala kolor tła dokumentu na czarny i kolor czcionki na żółty',
    ans1: 'WSZYSTKIE ODPOWIEDZI SĄ BŁĘDNE',
    ans2: '<BODY BACKGROUND="black" TEXT="yellow">',
    ans3: '<BODY BGCOLOR="black" TEXT="yellow">',
    ans4: '<BODY BACKGROUND="black" FONTCOLOR="yellow">',
    correctAns: '<BODY BGCOLOR="black" TEXT="yellow">',
  }

]

export default class Tests extends Component {



  constructor() {
    super();

    this.state = {
      questionNum: 1
    };
  }

  _renderQuestion(num){

    return _.map(test, function(x){
      if(x.id == num){
        return (
          <View style={styles.question}>
    
            <Text style={styles.questionText}>{x.question}</Text>
            <TouchableOpacity style={styles.ansButton} >
              <Text>{x.ans1}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.ansButton} >
              <Text>{x.ans2}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.ansButton} >
              <Text>{x.ans3}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.ansButton} >
              <Text>{x.ans4}</Text>
            </TouchableOpacity>
    
          </View>
        );
      }  
    })
    
  }

  // _changeQuestion(question){
  //   if(question === 'previous'){
  //     this.setState({
  //       questionNum: this.state.questionNum - 1
  //     })
  //   }
  // }

  render() {
    return (
  
        <View style={styles.container}>
          <View style={styles.menu}>
            <TouchableOpacity style={styles.menuBtn} onPress={this._renderQuestion(1)}>
              <Text style={styles.prevText}>Previous</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuBtn} onPress={this._renderQuestion(2)}>
              <Text style={styles.nextText}>Next</Text>
            </TouchableOpacity>
          </View>
       
       
          {this._renderQuestion(this.state.questionNum)}

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
  },
  menu: {
    flexDirection: 'row'
  },
  menuBtn: {
    width: '50%',
  },
  prevText: {
    textAlign: 'left',
    paddingTop: 10,
    paddingLeft: 10,
    fontSize: 20
  },
  nextText: {
    textAlign: 'right',
    paddingTop: 10,
    paddingRight: 10,
    fontSize: 20
  }
});
