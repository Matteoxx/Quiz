import {Navigation} from "react-native-navigation";
import App from './App';
import Results from './screens/Results';
import Test from './screens/Test';
import Drawer from './screens/Drawer';
import { Dimensions } from 'react-native';


Navigation.registerComponent(`App`, () => App);
Navigation.registerComponent(`Results`, () => Results);
Navigation.registerComponent(`Test`, () => Test);
Navigation.registerComponent(`Drawer`, () => Drawer);

const { width } = Dimensions.get('window');


Navigation.events().registerAppLaunchedListener(() => {

  Navigation.setRoot({
      root: {
        sideMenu: {
          left: {
            component: {
                id: 'drawerId',
                name: 'Drawer',
                fixedWidth: width
            }
          },
          center: {
            stack: {
              id: 'MAIN_STACK',
              children: [
                {
                  component: {
                    name: 'App',
                    options: {
                      topBar: {
                        title: {
                          text: "Home Page"
                        }
                      }
                    }
                  }
                },
              ]
            }
          }
        },
      }
  });

});
