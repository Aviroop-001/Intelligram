import { StyleSheet, Text, View, Image, FlatList, ScrollView } from "react-native";
import { Button } from '@rneui/themed';
import { useState, React, useEffect } from "react";
import { doc, getDocs, getDoc, collection, query, where, onSnapshot } from "firebase/firestore";
import { storage, db } from "../../firbase";
import { useSelector, useDispatch } from "react-redux";
import IonIcon from 'react-native-vector-icons/Ionicons';
import { addLikes, removeLikes } from "./functions";

const Feed = () => {
  //redux
  const currentUser = useSelector((state) => state.user.loggedUser);
  // const currentUserPosts = useSelector((state) => state.user.userPosts);
  const dispatch = useDispatch();

  //states
  const [posts, setposts] = useState([]);
  const [likedPosts, setlikedPosts] = useState([]);

  //functions

  // let postsArray = [];
  // const fetchAllPosts = async () => {
  //   console.log("fetching All posts");
  //   try {
  //     const allDocs = await getDocs(collection(db, "posts"));
  //     allDocs.forEach((doc) => {
  //       // console.log(doc.id, " => ", doc.data());
  //       postsArray.push([doc.id, doc.data()]);
  //     });
  //     setposts(postsArray);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  const fetchAllPostsRealTime = async() =>{
    let postsArray = [];
    console.log("fetching All posts in real-time");
    const sub = onSnapshot(collection(db, "posts"), (docs) => {
      docs.forEach(doc => {
        // console.log(doc.id, " => ", doc.data());
        postsArray.push([doc.id, doc.data()]);
      });
      setposts(postsArray);
    });
  }

  const fetchLikedPosts = async (userID) => {
    console.log("fetching Current user liked Posts");
    try {
      const docRef = doc(db, "users", userID);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setlikedPosts(docSnap.data().likes);
        console.log("liked Posts fetched");
      }
      else {
        console.log("No such document!");
      }
    }
    catch (error) {
      console.log(error);
    }
  };

  const getUsername = async (uid) =>{
    try {
      let name
      const docRef = doc(db, "users", uid);
      const docSnap = await getDoc(docRef);
      name = docSnap.data().username
      return name;
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    // fetchAllPosts();
    fetchAllPostsRealTime();
    fetchLikedPosts(currentUser.uid);
    //updates the array of liked posts by current user as soon as user likes/dislikes a new post
    const likedPostSub = onSnapshot(doc(db,"users",currentUser.uid), (doc) => {
      fetchLikedPosts(currentUser.uid);
    });
    //updates the number of likes of a post as soon as user likes/dislikes a new post
    const likeCountSub = onSnapshot(collection(db,"posts"), (docs) => {
      fetchAllPostsRealTime();
    });
  }, []);

  return (
    <ScrollView>
    <View>
      {posts?.map((p) => (
        <View key={p[0]} style={styles.postContainer}>
          <Text>{p[1].author}</Text>
          <Text>{p[1].caption}</Text>
          <Image source={{uri: p[1].image}} style={styles.postImage} />
          {likedPosts.includes(p[0]) ? 
            <Button type="clear" onPress={() => removeLikes(currentUser.uid,p[0])}>
              <IonIcon name={"heart"} size={16} color="crimson"/>
              <Text>{p[1].likes}</Text>
            </Button>
              : 
            <Button type="clear" onPress={() => addLikes(currentUser.uid,p[0])}>
              <IonIcon name={"heart-outline"} size={16} color="crimson"/>
              <Text>{p[1].likes}</Text>
            </Button>
            }
        </View>
      ))}
    </View>
    </ScrollView>
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