import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import SearchedUserProfile from './SearchedUserProfile'

const UsersListDisplay = ({list}) => {
  return (
    <View style={styles.itemContainer}>
        {list.map((l) => (
            <TouchableOpacity style={styles.item} key={Math.random().toString(36)} onPress={<SearchedUserProfile otherUser={l} />}>
                <Text style={styles.itemTitle}>{l.username}</Text>
            </TouchableOpacity>
        ))}
    </View>
  )
}

export default UsersListDisplay

const styles = StyleSheet.create({
    itemContainer:{

    },
    item:{

    },
    itemTitle:{

    }
})