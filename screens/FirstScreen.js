import React,{Component}  from 'react';
import {AsyncStorage,Modal,TouchableHighlight,Platform, StyleSheet,Button, Text, View,TouchableOpacity,ScrollView,Image } from 'react-native';
import {Navigation} from 'react-native-navigation'

export default class FirstScreen extends Component {

     constructor(props) {
        super(props);
        this.state = {
          modalVisible: false
        };
      }
     
      componentDidMount = async () => {
        try {
          const value = await AsyncStorage.getItem('termsOfUseAccepted');
          if (value == null) {
            this.setModalVisible(true);
          }
          await AsyncStorage.setItem('termsOfUseAccepted', JSON.stringify({"value":"true"}));
        } catch (error) {}
      }
    
      setModalVisible(visible) {
        this.setState({ modalVisible: visible });
      }
    
      render() {
        return (
          <View>
            <Modal
              animationType={"slide"}
              transparent={true}
              style={styles.container}
              visible={this.state.modalVisible}
              onRequestClose={() => {
                alert("Modal has been closed.");
              }}
            >
              <View style={styles.container}>

                <Text style={styles.title}>Regulamin aplikacji</Text>
                <Text style={styles.description}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. In quis sapien pharetra, porttitor eros ut, pellentesque ex. 
                    Nunc tincidunt tempus ex, non hendrerit justo auctor vitae. Aliquam dignissim, libero eu ullamcorper dictum, nibh risus hendrerit nisl, 
                    et tincidunt odio justo ut dolor. Morbi malesuada cursus dui ut laoreet. Cras laoreet feugiat imperdiet. 
                    Praesent fermentum purus quis metus tincidunt vestibulum. Nullam sit amet facilisis elit. 
                    Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. 
                    Fusce sollicitudin vitae mauris sit amet imperdiet.
                </Text>
             
                  <TouchableHighlight style={styles.accBtn} onPress={() => {this.setModalVisible(false)}}>
                      <Text style={styles.accBtnText}>Akceptuję</Text>     
                  </TouchableHighlight>
                  
              </View>
            </Modal>
          </View>
        );
      }
    }
    
    const styles = StyleSheet.create({
      container:{
        backgroundColor: '#FDC047',
        flex:1,
        marginTop: 50,
        marginBottom: 20,
        marginLeft: 10,
        marginRight: 10,
        borderRadius: 5,
        borderWidth: 2,
        borderColor: 'black',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-around',
        padding: 15
      },
      title:{
        fontSize: 26,
        textAlign:'center',
        borderBottomWidth: 1,
        paddingBottom: 5,
        fontFamily: 'Lato-Bold'
      },
      description:{
        fontSize: 16,
        textAlign: 'justify',
        fontFamily: 'Lato-Regular'
      },

      accBtn:{
        width: '70%',
        padding: '1%',
        backgroundColor: 'white',
        borderRadius: 5,
        justifyContent:'center',
      },
      accBtnText:{
        color:  'black',
        fontSize: 20,
        fontWeight:'bold',
        textAlign:'center'
      }
    });
    