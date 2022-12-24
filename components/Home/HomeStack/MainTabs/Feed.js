import { StyleSheet, Text, View, Image, FlatList, ScrollView } from "react-native";
import { Button } from '@rneui/themed';
import { useState, React, useEffect } from "react";
import { doc, getDocs, getDoc, collection, query, where, onSnapshot } from "firebase/firestore";
import { storage, db } from "../../../../firbase";
import { useSelector, useDispatch } from "react-redux";
import IonIcon from 'react-native-vector-icons/Ionicons';
import { addLikes, removeLikes } from "../../functions";

const Feed = ({navigation}) => {
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
    <>
    <View style={styles.header}>
      <Text style={styles.headerText}>Intelligram</Text>
    </View>
    <ScrollView showsVerticalScrollIndicator={false}>
    <View>
      {posts?.map((p) => (
        <View key={(Math.random() + 1).toString(36)} style={styles.postContainer}>
          <Text style={styles.postAuthor}>{p[1].authorName}</Text>
          <Image source={{uri: p[1].image}} style={styles.postImage} />
          <Text style={styles.postCaption}>{p[1].caption}</Text>
          {likedPosts.includes(p[0]) ? 
            <Button style={styles.btn} type="clear" onPress={() => removeLikes(currentUser.uid,p[0])}>
              <IonIcon name={"heart"} size={20} color="crimson"/>
              <Text style={styles.likes}>{p[1].likes}</Text>
            </Button>
              : 
            <Button style={styles.btn} type="clear" onPress={() => addLikes(currentUser.uid,p[0])}>
              <IonIcon name={"heart-outline"} size={20} color="crimson"/>
              <Text style={styles.likes}>{p[1].likes}</Text>
            </Button>
            }
        </View>
      ))}
    </View>
    </ScrollView>
    </>
  )
}

export default Feed

const styles = StyleSheet.create({
  container:{
    // backgroundColor: 'rgba(50, 50, 50, 1)',
  },
  header:{
    width: '100%',
    height: 65,
    backgroundColor: 'rgba(39, 39, 39, 1)',
    justifyContent: 'center'
  },
  headerText:{
    fontSize: 25,
    color: 'wheat',
    marginLeft: 8,
    letterSpacing: 2,
    fontStyle: 'italic'
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
  },
  postImage:{
    height: 250,
  },
  postAuthor:{
    fontSize: 20,
    fontWeight: "400",
    // fontStyle: 'italic',
    paddingHorizontal: 5,
    paddingVertical: 8
  },
  postCaption:{
    fontSize: 17,
    paddingHorizontal: 5,
    paddingVertical: 3
  },
  btn:{
    width: 80,
    height: 40,
    borderRadius: 5,
    backgroundColor: '#bababa',
    alignItems: "center",
    marginHorizontal: 'auto',
    marginBottom: 5
  },
  likes:{
    fontSize: 17
  }

})