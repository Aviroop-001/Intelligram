import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const SearchedUserProfile = ({route}) => {
  // console.log(route.params.otherUser);
  return (
    <View>
      <Text>{route.params.otherUser.username}</Text>
    </View>
  )
}

export default SearchedUserProfile

const styles = StyleSheet.create({})