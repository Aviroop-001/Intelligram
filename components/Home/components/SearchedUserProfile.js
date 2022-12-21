import { StyleSheet, Text, View, Image} from "react-native";
import { Button } from '@rneui/themed';
import { useState, useEffect, React } from "react";
import { doc, getDocs, collection, query, where } from "firebase/firestore";
import { db } from "../../../firbase";
import IonIcon from 'react-native-vector-icons/Ionicons';

const SearchedUserProfile = ({ route }) => {
  //states
  const [posts, setposts] = useState();
  const [likedPost, setlikedPost] = useState(false);

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
      <Text>{route.params.otherUser.username}</Text>
      <View>
        {posts?.map((p) => (
          <View key={Math.random().toString(36)} style={styles.postContainer}>
            <Text>{p.caption}</Text>
            <Image source={{ uri: p.image }} style={styles.postImage} />
            <Button type="clear" onPress={() => setlikedPost(!likedPost)}>
              <IonIcon
                name={likedPost ? "heart" : "heart-outline"}
                size={16}
                color="crimson"
              />
              <Text>{p.likes}</Text>
            </Button>
          </View>
        ))}
      </View>
    </View>
  );
};

export default SearchedUserProfile;

const styles = StyleSheet.create({
  postContainer: {
    flex: 1,
    height: 300,
    flexDirection: "column",
  },
  postImage: {
    height: 250,
    margin: 10,
  },
});
