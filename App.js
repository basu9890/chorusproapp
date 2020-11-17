import { createAppContainer, createSwitchNavigator} from "react-navigation";
import { createStackNavigator} from "react-navigation-stack";
import HomePage from './files/HomePage';
import RegistrationScreen from './files/RegistrationScreen';

const HomeStack = createStackNavigator(
  {
    Home1: { screen: HomePage },
 
  },{
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: '#1E90FF',
      },
      headerTintColor: '#FFFFFF',
      title: 'List',
  }
  }
  
)

const RegisterStack = createStackNavigator(
  {
    
    Navigate:{screen:RegistrationScreen},
  },{
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: '#1E90FF',
      },
      headerTintColor: '#FFFFFF',
      title: 'Registrations List ',
  }
  }
)



  const MainNavigator= createSwitchNavigator(
  
    { 
 
     landingPage:RegisterStack,
      home:HomeStack,
    },
    {
      initialRouteName:'landingPage',
    },
  
  );

  export default createAppContainer(MainNavigator);