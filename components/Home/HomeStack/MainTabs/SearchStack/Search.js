import { StyleSheet, Text, View, TouchableOpacity, TextInput, ScrollView } from "react-native";
import { useState, React } from "react";
import { doc, getDocs, collection, query, where } from "firebase/firestore";
import { db } from "../../../../../firbase";

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
    <View style={styles.container}>
      <TextInput
        style={styles.inputContainer}
        placeholder="Search User"
        onChangeText={(val) => searchUser(val)}
      />
      {/* <Input
        style={styles.inputContainer}
        placeholder="search User"
        onChange={(e) => searchUser(e.target.value)}
      /> */}
      {userList.length ? (
        <ScrollView style={styles.itemContainer}>
          {userList.map((l) => (
            <TouchableOpacity style={styles.item}
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
        <Text style={styles.warnText}>No User Found</Text>
      )}
    </View>
  );
};

export default Search;

const styles = StyleSheet.create({
  container:{
    alignItems: 'center'
  },
  inputContainer: {
    width: 300,
    height: 70,
    marginTop: 60,
    padding: 10,
    borderBottomWidth: 1,
    marginHorizontal: 40,
    fontSize: 16,
    marginBottom: 30,
  },
  itemContainer:{
    width: 300,
    marginHorizontal: 'auto'
  },
  item:{
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5,
    margin: 1,
    borderColor: '#d4d4d4',
    borderWidth: 1,
  },
  itemTitle:{
    fontSize: 18,
    textAlign: 'center',
    justifyContent: 'center',
  },
  warnText:{
    marginHorizontal: 40,
    marginTop: 30,
    fontSize: 18
  }
});
