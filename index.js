import {Navigation} from "react-native-navigation";
import App from './App';
import Results from './screens/Results';
import Tests from './screens/Tests';

Navigation.registerComponent(`App`, () => App);
Navigation.registerComponent(`Results`, () => Results);
Navigation.registerComponent(`Tests`, () => Tests);



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
