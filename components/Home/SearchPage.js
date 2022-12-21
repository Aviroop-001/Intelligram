import { StyleSheet } from "react-native";
import { React } from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Search from './components/Search'
import SearchedUserProfile from './components/SearchedUserProfile'

const Stack = createNativeStackNavigator();

const SearchPage = () => {

  const screenOptions= {headerTintColor: 'red',
  headerStyle: { backgroundColor: 'grey'},
  headerTitleStyle: { fontSize: 25 },
}

  return (
        <Stack.Navigator initialRouteName="Landing">
          <Stack.Screen name="Search" component={Search} options={screenOptions} />
          <Stack.Screen name="SearchedUserProfile" component={SearchedUserProfile} options={{headerShown: false}} />
        </Stack.Navigator>
  );
};

export default SearchPage;
