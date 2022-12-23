import { StyleSheet, Text, View, Image, ScrollView} from "react-native";
import { Button } from '@rneui/themed';
import { useState, useEffect, React } from "react";
import { doc, getDocs, collection, query, where } from "firebase/firestore";
import { db } from "../../../firbase";
import IonIcon from 'react-native-vector-icons/Ionicons';

const SearchedUserProfile = ({ route }) => {
  //states
  const [posts, setposts] = useState();

  //functions
  const fetchPosts = async () => {
    let postsArray = [];
    let selectedUser;
    console.log("fetching selected user's posts");
    try {
      const q = query(
        collection(db, "users"),
        where("username", "==", route.params.otherUser.username)
      );
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        selectedUser = doc.id;
      });
      try {
        const q = query(
          collection(db, "posts"),
          where("author", "==", selectedUser)
        );
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          postsArray.push(doc.data());
        });
        setposts(postsArray);
      } catch (error) {
        console.log(error);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <View>
      <Text style={styles.header}>{route.params.otherUser.username}</Text>
      <ScrollView>
        {posts?.map((p) => (
          <View key={Math.random().toString(36)} style={styles.postContainer}>
            <Text style={styles.postCaption}>{p.caption}</Text>
            <Image source={{ uri: p.image }} style={styles.postImage} />
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default SearchedUserProfile;

const styles = StyleSheet.create({
  header:{
    fontSize: 23,
    color: 'rgba(39, 39, 39, 1)',
    fontStyle: 'italic',
    fontWeight: '400',
    textAlign: 'center'
  },
  postImage:{
    height: 250,
  },
  postContainer:{
    // flex: 1,
    // height: 300,
    backgroundColor: '#dedede',
    flexDirection: 'column',
    borderColor: '#d4d4d4',
    borderWidth: 1,
    borderRadius: 5,
    marginHorizontal: 5,
    marginVertical: 8,
    paddingHorizontal: 3,
    paddingVertical: 1,
    paddingBottom: 5
  },
  postCaption:{
    fontSize: 17,
    paddingHorizontal: 5,
    paddingVertical: 3
  },
});
