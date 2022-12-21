import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from '@expo/vector-icons/Ionicons';
import Feed from './Feed';
import Compose from './Compose';
import Profile from './Profile';
import SearchPage from './SearchPage'

const Home = () => {
  const Tab = createBottomTabNavigator();

  return (
    <View style={styles.container}>
      {/* Bottom Tab Navigator */}
      <NavigationContainer style={styles.bottomTab}>
      <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen name="Feed" component={Feed} options ={{
        tabBarShowLabel: false,
        tabBarActiveTintColor: 'red',
        tabBarIcon:({color, size})=>(  
          <Ionicons name="ios-home" color={color} size={30}/>  )  
      }} />
      <Tab.Screen name="SearchPage" component={SearchPage} options ={{
        tabBarShowLabel: false,
        tabBarActiveTintColor: 'yellow',
        tabBarIcon:({color, size})=>(  
          <Ionicons name="search-outline" color={color} size={35}/>  )  
      }}/>
      <Tab.Screen name="Compose" component={Compose} options ={{
        tabBarShowLabel: false,
        tabBarActiveTintColor: 'blue',
        tabBarIcon:({color, size})=>(  
          <Ionicons name="add-circle-outline" color={color} size={35}/>  )  
      }}/>
      <Tab.Screen name="Profile" component={Profile} options ={{
        tabBarShowLabel: false,
        tabBarActiveTintColor: 'green',
        tabBarIcon:({color, size})=>(  
          <Ionicons name="person-circle-outline" color={color} size={40}/>  )  
      }}/>
    </Tab.Navigator>
    </NavigationContainer>
    </View>
  )
}

export default Home

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  bottomTab: {
    height: 100
  }
})