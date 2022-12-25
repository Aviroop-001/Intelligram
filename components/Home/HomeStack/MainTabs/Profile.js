import { StyleSheet, Text, View, ScrollView, Image } from "react-native";
import { Button } from '@rneui/themed';
import IonIcon from 'react-native-vector-icons/Ionicons';
import { useState, React, useEffect } from "react";
import { doc, getDocs, collection, query, where } from "firebase/firestore";
import { storage, db } from "../../../../firbase";
import { useSelector, useDispatch } from "react-redux";
import { fetchCurrentUserPostsRedux, userLogoutRedux } from "../../../../Redux/userSlice";
import { logoutUser } from "../../../Authentication/functions";

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
        // console.log(doc.id, " => ", doc.data());
        postsArray.push(doc.data());
      });
      dispatch(fetchCurrentUserPostsRedux(postsArray));
      setposts(postsArray);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.header}>{currentUser.displayName + "'s Profile"}</Text>
        <Button title="Outline" type="outline" buttonStyle={{borderWidth: 0}}
              containerStyle={{
                width: 200,
                marginLeft: 180,
                marginBottom: 15,
                borderWidth: 0}} 
                onPress= {() => {
                  logoutUser();
                  dispatch(userLogoutRedux());
                  navigation.navigate("Main");
                }}>
          <IonIcon name="log-out-outline" size={26} color="crimson" >
            Logout
          </IonIcon>
        </Button>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        {posts?.map((p) => (
          <View key={Math.random().toString(36)} style={styles.postContainer}>
            <Image source={{ uri: p.image }} style={styles.postImage} />
            <Text style={styles.postCaption}>{p.caption}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container:{
    flex:1
  },
  header:{
    fontSize: 28,
    color: 'rgba(39, 39, 39, 1)',
    fontStyle: 'italic',
    fontWeight: '500',
    textAlign: 'center',
    marginBottom: 15,
    marginTop: 30,
  },
  postImage:{
    height: 250,
  },
  postContainer:{
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
