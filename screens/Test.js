import React, {Component} from 'react';
import {StyleSheet, Text, View, ScrollView, TouchableOpacity} from 'react-native';
import _ from 'lodash';
import {Navigation} from 'react-native-navigation';


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

export default class Test extends Component {

  constructor(props) {
    super(props);

    this.state = {
      questionNum: 1,
      question: test[0].question,
      ans1: test[0].ans1,
      ans2: test[0].ans2,
      ans3: test[0].ans3,
      ans4: test[0].ans4,
      points: 0
    };
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

  _changeQuestion(num){

    if(num < test.length){
      this.setState({
        questionNum: this.state.questionNum + 1,
        question: test[num].question,
        ans1: test[num].ans1,
        ans2: test[num].ans2,
        ans3: test[num].ans3,
        ans4: test[num].ans4,
      })
    } else {
        this.goToScreen('Result')
    }
  
}

  _countScore(ans){
    console.log("answer: " + ans)

    if(ans == test[this.state.questionNum - 1].correctAns){
      this.setState({
        points: this.state.points + 1,
      })
    }

    this._changeQuestion(this.state.questionNum)
  }

  

  render() {
   
    return (
        
        <View style={styles.container}>

            <Text style={styles.questionId}>Pytanie nr: {this.state.questionNum}</Text>

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

            <Text>Punkty: {this.state.points}</Text>

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
    padding: 10
  },
  questionId: {
    fontWeight: '700',
    textAlign: 'center',
    fontSize: 36,
    borderBottomWidth: 1,
    paddingBottom: 5,
    marginBottom: 30
  },
  questionText: {
    fontWeight: '700',
    textAlign: 'center',
    fontSize: 26,
    marginBottom: 20
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

