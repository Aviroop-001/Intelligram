import { StyleSheet, Text, View, Image, FlatList } from "react-native";
import { Button } from '@rneui/themed';
import { useState, React, useEffect } from "react";
import { doc, getDocs, getDoc, collection, query, where } from "firebase/firestore";
import { storage, db } from "../../firbase";
import { useSelector, useDispatch } from "react-redux";
import IonIcon from 'react-native-vector-icons/Ionicons';

const Feed = () => {
  //redux
  const currentUser = useSelector((state) => state.user.loggedUser);
  const currentUserPosts = useSelector((state) => state.user.userPosts);
  const dispatch = useDispatch();

  //states
  const [posts, setposts] = useState([]);
  const [likedPost, setlikedPost] = useState(false);

  useEffect(() => {
    fetchAllPosts();
    getUsername(currentUser.uid)
  }, []);

  //functions
  let postsArray = [];
  const fetchAllPosts = async () => {
    console.log("fetching All posts");
    try {
      const q = query(collection(db, "posts"), where("author", "!=", null));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        console.log(doc.id, " => ", doc.data());
        postsArray.push(doc.data());
      });
      setposts(postsArray);
    } catch (error) {
      console.log(error);
    }
  }

  const getUsername = async (uid) =>{
    const docRef = doc(db, "users", uid);
    const docSnap = await getDoc(docRef);
    console.log( docSnap.data().username);
    return JSON.stringify(docSnap.data().username);
  }
  return (
    <View>
      <Text>Feed</Text>
      {posts?.map((p) => (
        <View key={Math.random().toString(36)} style={styles.postContainer}>
          <Text>{p.author}</Text>
          <Text>{p.caption}</Text>
          <Image source={{uri: p.image}} style={styles.postImage} />
          <Button type="clear" onPress={() => setlikedPost(!likedPost)}>
            <IonIcon name={likedPost ? "heart": "heart-outline"} size={16} color="crimson"/>
            <Text>{p.likes}</Text>
          </Button>
        </View>
      ))}
    </View>
  )
}

export default Feed

const styles = StyleSheet.create({
  postContainer:{
    flex: 1,
    height: 300,
    flexDirection: 'column'
  },
  postImage:{
    height: 250,
    margin: 10,
  }
})