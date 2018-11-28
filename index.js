import {Navigation} from "react-native-navigation";
import App from './App';
import Results from './screens/Results';
import Test from './screens/Test';

Navigation.registerComponent(`App`, () => App);
Navigation.registerComponent(`Results`, () => Results);
Navigation.registerComponent(`Test`, () => Test);



Navigation.events().registerAppLaunchedListener(() => {
  Navigation.setRoot({
    root: {
      stack: {
        id: 'AppStack',
        children: [
          {
            component: {
              name: 'App'
            }
          },
        ]
      }
    }
  })
})
