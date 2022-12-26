import { signInWithEmailAndPassword } from "firebase/auth";
// import { doc, setDoc, getDocs, collection } from "firebase/firestore";
import { auth, db } from "../../firbase";
import { userLoginRedux, userLogoutRedux } from "../../Redux/userSlice";
import { useSelector, useDispatch } from "react-redux";
import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Input, Button } from "@rneui/themed";
import { useState } from "react";

const Login = ({ navigation }) => {
  const currentUser = useSelector((state) => state.user.loggedUser);
  const dispatch = useDispatch();

  //states
  const [email, setemail] = useState("");
  const [password, setpassword] = useState();

  //functions
  const userLoginHandler =() =>{
    signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
              const user = userCredential.user;
              console.log("User Logged in");
              dispatch(userLoginRedux(user));
            })
            .catch((error) => {
              const errorMessage = error.message;
              console.log(errorMessage);
            });
  }

  // const emailAuthCredential = credential(email, password);
  // const loginHandler = () =>{
  //   signInWithCredential(emailAuthCredential)
  // .then((userCredential) => {
  //   const user = userCredential.user;
  //   console.log("User Logged in");
  //   dispatch(userLoginRedux(user));
  // })
  // .catch((error) => {
  //   console.log(error.message);
  // });
  // }

  return (
    <View style={styles.container}>
      <View style={styles.main}>
      {/* <Text style={styles.headerText}>Login</Text> */}
      <Input
        label="Email"
        autoFocus={true}
        onChange={(e) => setemail(e.target.value)}
        disabledInputStyle={{ background: "#ddd" }}
        containerStyle={styles.inputContainer}
      />
      <Input
        label="Enter Password"
        onChange={(e) => setpassword(e.target.value)}
        secureTextEntry={true}
        containerStyle={styles.inputContainer}
      />
      <Button
        title="Login"
        type="clear"
        size="md"
        color="wheat"
        buttonStyle={styles.btnStyle}
        containerStyle={styles.btnContainer}
        titleStyle={styles.btnTitleStyle}
        onPress={ () => userLoginHandler() }
      />
      </View>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    // justifyContent: "space-around",
  },
  main:{
    height: 400,
    marginTop: 100,
    alignItems: "center",
  },
  headerText: {
    fontSize: 25,
    letterSpacing: 2,
    fontWeight: "bold",
  },
  inputContainer: {
    width: 300,
    height: 40,
    marginTop: 60,
    padding: 20,
  },
  btnContainer: {
    width: 200,
    margin: 5,
    backgroundColor: "rgba(39, 39, 39, 1)",
    borderRadius: 10,
    paddingLeft: 30,
    paddingRight: 30,
    paddingTop: 5,
    paddingBottom: 5,
    marginTop: 100,
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
