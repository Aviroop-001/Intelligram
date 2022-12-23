import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { useState, React } from "react";
import { Input } from "@rneui/themed";
import Ionicons from "react-native-vector-icons/Ionicons";
import { doc, getDocs, collection, query, where } from "firebase/firestore";
import { db } from "../../../firbase";
import { ScrollView } from "react-native-web";

const Search = ({ navigation }) => {
  //states
  const [userList, setuserList] = useState([]);

  //functions
  const searchUser = async (searchedUser) => {
    let usersArray = [];
    try {
      const q = query(
        collection(db, "users"),
        where("username", ">=", searchedUser)
      );
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        usersArray.push(doc.data());
      });
      setuserList(usersArray);
      // console.log(usersArray);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View>
      <Input
        style={styles.inputContainer}
        placeholder="search User"
        onChange={(e) => searchUser(e.target.value)}
      />
      {userList.length ? (
        <ScrollView style={styles.itemContainer}>
          {userList.map((l) => (
            <TouchableOpacity
              style={styles.item}
              key={Math.random().toString(36)}
              onPress={() => navigation.navigate("SearchedUserProfile", {
                  otherUser: l
                })}
              >
              <Text style={styles.itemTitle}>{l.username}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      ) : (
        <Text>No User Found</Text>
      )}
    </View>
  );
};

export default Search;

const styles = StyleSheet.create({
  inputContainer: {
    width: 300,
    padding: 10,
    marginTop: 30,
  },
  itemContainer:{
    width: 300,
    marginHorizontal: 'auto'
  },
  item:{
    height: 40,
    padding: 10,
    margin: 2,
    borderColor: '#d4d4d4',
    borderWidth: 1,
  },
  itemTitle:{
    fontSize: 18,
    textAlign: 'center',
    justifyContent: 'center',
  }
});
