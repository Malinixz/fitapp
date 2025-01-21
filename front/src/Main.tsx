import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import SignIn from './screens/SignIn';
import Welcome from './screens/Welcome';
import SignUp from './screens/SignUp';
import Goals from './screens/Goals';
import ActvLevel from './screens/ActvLevel';
import GeneralInfo from './screens/GeneralInfo';
import Results from './screens/Results';
import Home from './screens/Home';

const Stack = createStackNavigator();

export default function App() {
  return (
      <Stack.Navigator initialRouteName="SignIn" screenOptions={{headerShown:false}}>
        <Stack.Screen name="SignIn" component={SignIn} />
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="Welcome" component={Welcome} />
        <Stack.Screen name="Goals" component={Goals} />
        <Stack.Screen name="ActvLevel" component={ActvLevel} />
        <Stack.Screen name="GeneralInfo" component={GeneralInfo} />
        <Stack.Screen name="Results" component={Results} />
        <Stack.Screen name="Home" component={Home} />
      </Stack.Navigator>
  );
}
