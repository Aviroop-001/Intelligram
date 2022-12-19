import { StyleSheet, Text, View } from "react-native";
import { useState, React } from "react";
import { Input } from "@rneui/themed";
import Ionicons from 'react-native-vector-icons/Ionicons';
import { doc, getDocs, collection, query, where } from "firebase/firestore";
import { db } from "../../firbase";
import UsersListDisplay from "./components/UsersListDisplay";

const Search = () => {
  //states
  const [userList, setuserList] = useState([])

  //functions
  const searchUser = async(searchedUser) => {
    let usersArray = [];
    try {
      const q = query(collection(db, "users"), where("username", ">=", searchedUser));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        usersArray.push(doc.data());
      });
      setuserList(usersArray);
      console.log(usersArray);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View>
      <Text>Search</Text>
      <Input
        style={styles.inputContainer}
        placeholder="search User"
        onChange={(e) => searchUser(e.target.value)}
      />
      { userList.length ? <UsersListDisplay list={userList}/> : <Text>No User Found</Text>}
    </View>
  );
};

export default Search;

const styles = StyleSheet.create({
    inputContainer: {
        padding: 20,
        marginTop: 30,
      },
});
