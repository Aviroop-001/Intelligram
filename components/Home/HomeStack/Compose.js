import { StyleSheet, Text, View, Image, TextInput } from "react-native";
import React, { useState } from "react";
// import * as DocumentPicker from "expo-document-picker";
import * as ImagePicker from "expo-image-picker";
import { Button } from "@rneui/themed";
import { useSelector, useDispatch } from "react-redux";
import { storage, db } from "../../../firbase";
import {
  addDoc,
  collection,
  serverTimestamp,
} from "firebase/firestore";
import {
  ref,
  uploadBytesResumable,
  getDownloadURL,
  uploadBytes,
} from "firebase/storage";

const Compose = ({ navigation }) => {
  //redux
  const currentUser = useSelector((state) => state.user.loggedUser);
  const dispatch = useDispatch();

  //states
  const [caption, setcaption] = useState();
  const [image, setimage] = useState(null);
  const [loading, setloading] = useState(false);

  //functions

  // const pickDoc = async () => {
  //   let result = await DocumentPicker.getDocumentAsync({});
  //   setimage(result);
  //   console.log(result);
  // };

  const pickImageAsync = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
    });
    setimage(result.uri);
    console.log(result);
  };

  const postHandler = async (imageUrl) => {
    const postData = {
      author: currentUser.uid,
      authorName: currentUser.displayName,
      caption: caption,
      image: imageUrl,
      createdAt: serverTimestamp(),
      likes: 0,
    };
    try {
      const dbRef = collection(db, `posts`);
      addDoc(dbRef, postData)
        .then((docRef) => {
          console.log("Document has been added successfully");
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (e) {
      console.error("Error adding document: ", e);
    }
    console.log("Posted Successfully");
    navigation.push("Main");
  };

  //* Uploads the image and then saves the post
  const imgupload = async () => {
    //image to blob
    const blob = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function () {
        resolve(xhr.response);
      };
      xhr.onerror = function () {
        reject(new TypeError("network request failed"));
      };
      xhr.responseType = "blob";
      xhr.open("GET", image, true);
      xhr.send(null);
    });

    //metadata
    const metadata = {
      contentType: "image/jpeg",
    };

    //Blob upload
    const storageRef = ref(storage,`/socialImages/${currentUser.uid}/${Math.random().toString(36)}`);
    const uploadTask = uploadBytesResumable(storageRef, blob, metadata);
    uploadTask.on("state_changed",
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setloading(true);
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
        }
      },
      (error) => {
        switch (error.code) {
          case "storage/unauthorized":
            break;
          case "storage/canceled":
            break;
          case "storage/unknown":
            break;
        }
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setloading(false);
          postHandler(downloadURL);
          console.log(downloadURL);
        });
      }
    );
  };
  // const uploadImage = async () => {
  //   // e.preventDefault();
  //   console.log("clicked!");
  //   const file = image;
  //   if (!file) return;
  //   console.log(file);
  //   const storageRef = ref(
  //     storage,
  //     `/socialImages/${currentUser.uid}/${Math.random().toString(36)}`
  //   );
  //   const uploadTask = uploadBytesResumable(storageRef, file);
  //   uploadTask.on(
  //     "state_changed",
  //     (snapshot) => {
  //       const progress = Math.round(
  //         (snapshot.bytesTransferred / snapshot.totalBytes) * 100
  //       );
  //       setProgresspercent(progress);
  //     },
  //     (error) => {
  //       console.log(error);
  //     },
  //     () => {
  //       getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
  //         postHandler(downloadURL);
  //         console.log(downloadURL);
  //       });
  //     }
  //   );
  // };

  return (
    <View style={styles.container}>
      {image && (
        <Image
          source={{ uri: image }}
          style={{ flex: 1, width: 300, height: 200, margin: 20 }}
        />
      )}
      <Button title="Pick Image" onPress={pickImageAsync} />
      <TextInput
        style={styles.inputContainer}
        placeholder="Caption"
        onChangeText={(val) => setcaption(val)}
      />
      <Button
        title="Post"
        type="clear"
        size="md"
        color="wheat"
        buttonStyle={styles.btnStyle}
        containerStyle={styles.btnContainer}
        titleStyle={styles.btnTitleStyle}
        onPress={imgupload}
        disabled={loading}
      />
    </View>
  );
};

export default Compose;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  inputContainer: {
    width: 300,
    height: 70,
    marginTop: 60,
    padding: 10,
    borderBottomWidth: 1,
  },
  btnContainer: {
    width: 180,
    margin: 30,
    backgroundColor: "rgba(39, 39, 39, 1)",
    borderRadius: 10,
    paddingLeft: 30,
    paddingRight: 30,
    paddingTop: 5,
    paddingBottom: 5,
    marginTop: 40,
  },
  btnStyle: {
    backgroundColor: "rgba(39, 39, 39, 1)",
  },
  btnTitleStyle: {
    marginHorizontal: 5,
    color: "wheat",
    fontSize: 25,
  },
});
