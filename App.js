import React from 'react';
import { createStackNavigator, createBottomTabNavigator, createAppContainer } from 'react-navigation';
import { scale, verticalScale } from 'react-native-size-matters';
import * as firebase from 'firebase';
import DataStorage from './src/utility/DataStorage';
import NavigationService from './src/utility/NavigationService';
import { MapHeader } from './src/components/Frontend/Header';
import Login from './src/components/Backend/Login';
import SignUp from './src/components/Backend/SignUp';
import LangSelect from './src/components/Menu/LangSelect';
import Map from "./src/components/Menu/Map";
import ProblemOne from './src/components/Lessons/Problems/Problem1';
import ProblemTwo from './src/components/Lessons/Problems/Problem2';
import ProblemThree from './src/components/Lessons/Problems/Problem3';
import ProblemFour from './src/components/Lessons/Problems/Problem4';
import ProblemFive from './src/components/Lessons/Problems/Problem5';
import ProblemSix from './src/components/Lessons/Problems/Problem6';
import CodeOutput from './src/components/Output/CodeOutput';
import InterestSelect from "./src/components/Menu/InterestSelect";
import Profile from "./src/components/Menu/Drawer/Profile";
import Settings from "./src/components/Menu/Drawer/Settings";
import UserCode from './src/components/Output/UserCode';
import GetStarted from "./src/components/Menu/GetStarted";
import UserlessOutput from './src/components/Output/UserlessOutput';
import GoalSelect from "./src/components/Menu/GoalSelect";
import ProblemSeven from "./src/components/Lessons/Problems/Problem7";
import ProblemEight from "./src/components/Lessons/Problems/Problem8";
import ProblemNine from "./src/components/Lessons/Problems/Problem9";
import ProblemTen from "./src/components/Lessons/Problems/Problem10";
import ProblemEleven from "./src/components/Lessons/Problems/Problem11";
import ProblemTwelve from "./src/components/Lessons/Problems/Problem12";
import ProblemThirteen from "./src/components/Lessons/Problems/Problem13";
import ProblemFourteen from "./src/components/Lessons/Problems/Problem14";
import ProblemFifteen from "./src/components/Lessons/Problems/Problem15";
import MultipleChoiceScreen from "./src/components/Lessons/MultipleChoiceScreen";
import firebaseConfig from './apis/firebase';

console.disableYellowBox = true;

firebase.initializeApp(firebaseConfig);

const MainMenu = createStackNavigator({
  Main: {
    screen: createBottomTabNavigator({
      Map: {
        screen: Map
      },
      Website: {
        screen: CodeOutput
      },
      Code: {
        screen: UserCode
      }
    }, {
      tabBarPosition: 'bottom',
      tabsStyle: {
        tabBarTextFontSize: 18,
      },
      tabBarOptions: {
        activeTintColor: '#FFFFFF',
        inactiveTintColor: '#5472D3',
        tabBarIcon: null,
        labelStyle: {
          fontFamily: 'quicksand',
          fontSize: scale(19),
          justifyContent: 'center',
          alignItems: 'center'
        },
        tabStyle: {
          justifyContent: 'center',
          alignItems: 'center'
        },
        indicatorStyle: {
          backgroundColor: '#FFB020',
          height: verticalScale(1.5)
        },
        style: {
          backgroundColor: '#0D47A1',
        }
      }
    })
  }
}, {
  navigationOptions: {
    header: (
      <MapHeader title={DataStorage.theme === 'sports' ? 'SPORTS BLOG' : 'MUSIC BLOG'}
                 onPressProfile={() => NavigationService.navigate('Profile')}
                 onPressCoin={() => NavigationService.navigate('Profile')}/>
    )
  }
});

const RootNavigator = createStackNavigator({
  Main: {
    screen: MainMenu
  },
  Profile: {
    screen: Profile
  },
  Settings: {
    screen: Settings
  },
  MultipleChoiceScreen: {
    screen: MultipleChoiceScreen
  },
  Problem1Screen: {
    screen: ProblemOne
  },
  Problem1Output: {
    screen: UserlessOutput
  },
  Problem2Screen: {
    screen: ProblemTwo
  },
  Problem3Screen: {
    screen: ProblemThree
  },
  Problem4Screen: {
    screen: ProblemFour
  },
  Problem5Screen: {
    screen: ProblemFive
  },
  Problem6Screen: {
    screen: ProblemSix
  },
  Problem7Screen: {
    screen: ProblemSeven
  },
  Problem8Screen: {
    screen: ProblemEight
  },
  Problem9Screen: {
    screen: ProblemNine
  },
  Problem10Screen: {
    screen: ProblemTen
  },
  Problem11Screen: {
    screen: ProblemEleven
  },
  Problem12Screen: {
    screen: ProblemTwelve
  },
  Problem13Screen: {
    screen: ProblemThirteen
  },
  Problem14Screen: {
    screen: ProblemFourteen
  },
  Problem15Screen: {
    screen: ProblemFifteen
  }
}, {
  navigationOptions: { header: null }
});

const AuthNavigator = createStackNavigator({
  Start: {
    screen: GetStarted
  },
  SignUpScreen: {
    screen: SignUp
  },
  LoginScreen: {
    screen: Login
  },
  InterestSelectScreen: {
    screen: InterestSelect
  },
  LangSelectScreen: {
    screen: LangSelect
  },
  GoalSelect: {
    screen: GoalSelect
  },
  Root: {
    screen: RootNavigator
  }
}, {
  headerMode: 'screen',
  navigationOptions: { header: null }
});

class App extends React.Component {
  render() {
    return (
      <AuthNavigator
        ref={navRef => {
          NavigationService.setTopLevelNavigator(navRef);
        }}
      />
    )
  }
}

export default createAppContainer(AuthNavigator);