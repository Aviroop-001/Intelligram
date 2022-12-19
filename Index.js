import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import { useSelector, useDispatch } from "react-redux";
import { store } from './Redux/Store'
import { Provider } from 'react-redux'
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Landing from './components/Authentication/Landing';
import Login from './components/Authentication/Login';
import Register from './components/Authentication/Register';
import Home from './components/Home/Home';
import { useState } from 'react';

const Stack = createNativeStackNavigator();

export default function Index() {

  const currentUser = useSelector((state) => state.user.loggedUser);
  const dispatch = useDispatch();
  const [loggedin, setloggedin] = useState(false);

  const screenOptions= {headerTintColor: 'red',
  headerStyle: { backgroundColor: 'grey'},
  headerTitleStyle: { fontSize: 25 }}
  
  if(!currentUser){
    return (
      <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Landing">
          <Stack.Screen name="Insta" component={Landing} options={screenOptions} />
          <Stack.Screen name="Login" component={Login} options={screenOptions} />
          <Stack.Screen name="Register" component={Register} options={screenOptions} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
    )
  }
  return (
      <Home/>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
});
