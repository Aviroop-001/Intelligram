import { StyleSheet, Text, View, FlatList } from "react-native";
import { useState, React, useEffect } from "react";
import { doc, getDocs, collection, query, where } from "firebase/firestore";
import { storage, db } from "../../../../firbase";
import { useSelector, useDispatch } from "react-redux";
import { fetchCurrentUserPostsRedux } from "../../../../Redux/userSlice";

const Profile = ({navigation}) => {
  //redux
  const currentUser = useSelector((state) => state.user.loggedUser);
  const currentUserPosts = useSelector((state) => state.user.userPosts);
  const dispatch = useDispatch();

  //states
  const [posts, setposts] = useState([]);

  useEffect(() => {
    fetchUserPosts();
  }, []);

  //functions
  const fetchUserPosts = async () => {
    let postsArray = [];
    console.log("fetching Current user posts");
    try {
      const q = query(collection(db, "posts"), where("author", "==", currentUser.uid));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        console.log(doc.id, " => ", doc.data());
        postsArray.push(doc.data());
      });
      dispatch(fetchCurrentUserPostsRedux(postsArray));
      setposts(postsArray);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <View>
      <Text>Profile</Text>
      {/* <FlatList
        data={posts}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      /> */}
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({});
