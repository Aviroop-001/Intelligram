import { StyleSheet, Text, View, Image } from 'react-native'
import React, { useState } from 'react'
import * as DocumentPicker from "expo-document-picker";
import { Input, Button } from '@rneui/themed';
import { useSelector, useDispatch } from "react-redux";
import { fetchCurrentUserPostsRedux } from "../../Redux/userSlice";
import { storage, db } from "../../firbase";
import { doc, setDoc, addDoc, collection, serverTimestamp } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
// import * as Progress from 'react-native-progress';

const Compose = ({navigation}) => {
  //redux
  const currentUser = useSelector((state) => state.user.loggedUser);
  const dispatch = useDispatch();

  //states
  const [caption, setcaption] = useState();
  const [image, setimage]=useState(null);
  const [uploading, setUploading] = useState(false);
  const [progresspercent, setProgresspercent] = useState(0);

  //functions
  const pickDoc = async () => {
    let result = await DocumentPicker.getDocumentAsync({});
    setimage(result);
  };

  const postHandler = async(imageUrl) =>{
    const postData = {
      author: currentUser.uid,
      authorName: currentUser.displayName,
      caption: caption,
      image: imageUrl,
      createdAt: serverTimestamp(),
      likes: 0
    }
    try {
      const dbRef = collection(db, `posts`);
      addDoc(dbRef, postData)
      .then(docRef => {
        console.log("Document has been added successfully");
      })
      .catch(error => {
        console.log(error);
      })
    } catch (e) {
      console.error("Error adding document: ", e);
    }
    console.log("Posted Successfully");
    navigation.navigate('Feed');
  }

  //* Uploads the image and then saves the post
  const uploadImage = (e) => {
    e.preventDefault();
    console.log(e)
    const file = image.file
    if (!file) return;
    const storageRef = ref(storage, `/socialImages/${currentUser.uid}/${Math.random().toString(36)}`);
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on("state_changed",
      (snapshot) => {
        const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
        setProgresspercent(progress);
      },
      (error) => {
        console.log(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          postHandler(downloadURL);
          console.log(downloadURL);
        });
      }
    );
  }

  return (
    <View style={styles.container}>
      {image && <Image source={{uri:image.uri}} style={{flex:1,width:300, height: 200, margin:20}} />}
      <Button title="Pick Image" onPress={pickDoc}/>
      <Input
        label="Caption"
        onChange={(e) => setcaption(e.target.value)}
        containerStyle={styles.inputContainer}
      />
      <Button title='Post' type="clear" size="md" color= "wheat" buttonStyle={styles.btnStyle} containerStyle={styles.btnContainer} titleStyle={styles.btnTitleStyle}  
      onPress={uploadImage}/>
    </View>
  )
}

export default Compose

const styles = StyleSheet.create({
  container:{
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20
  },
  inputContainer: {
    width: 300,
    height: 30,
    margin: 30,
  },
  btnContainer: {
    width: 100,
    margin: 30,
    backgroundColor: "rgba(39, 39, 39, 1)",
    borderRadius: 10,
    paddingLeft: 30,
    paddingRight: 30,
    paddingTop: 5,
    paddingBottom: 5,
  },
  btnStyle: {
    backgroundColor: "rgba(39, 39, 39, 1)",
  },
  btnTitleStyle: {
    marginHorizontal: 5,
    color: "wheat",
    fontSize: 25,
  },
})