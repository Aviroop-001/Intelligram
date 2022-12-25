import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { Input, Button } from "@rneui/themed";
import { registerUser } from "./functions";

const Register = ({navigation}) => {
  //states
  const [username, setusername] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState();

  return (
    <View style={styles.container}>
      {/* <Text style={styles.headerText}>Register</Text> */}
      <View style={styles.main}>
      <Input
        label="Username"
        placeholder="Eg. John Doe"
        autoFocus={true}
        onChange={(e) => setusername(e.target.value)}
        disabledInputStyle={{ background: "#ddd" }}
        containerStyle={styles.inputContainer}
      />
      <Input
        label="User Email"
        placeholder="Eg. JohnDoe@xyz.com"
        onChange={(e) => setemail(e.target.value)}
        disabledInputStyle={{ background: "#ddd" }}
        containerStyle={styles.inputContainer}
      />
      <Input
        label="Enter Password"
        placeholder="a-z, A-Z, 0-9"
        onChange={(e) => setpassword(e.target.value)}
        secureTextEntry={true}
        containerStyle={styles.inputContainer}
      />
      <Button title='Register' type="clear" size="md" color= "wheat" buttonStyle={styles.btnStyle} containerStyle={styles.btnContainer} titleStyle={styles.btnTitleStyle}
      onPress={() =>{
        registerUser({username, email, password})
        navigation.navigate('Login')}
      }/>
      </View>
    </View>
  );
};

export default Register;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
  },
  main:{
    height: 400,
    marginTop: 60,
    alignItems: "center",
  },
  headerText:{
    fontSize:25,
    letterSpacing: 2,
    fontWeight: 'bold',
  },
  inputContainer:{
    width: 300, height: 40, marginTop: 60,
  },
  btnContainer:{
    width: 200,
    margin: 5,
    backgroundColor: 'rgba(39, 39, 39, 1)',
    borderRadius: 10,
    paddingLeft: 30,
    paddingRight: 30,
    paddingTop: 5,
    paddingBottom: 5,
    marginTop: 100
  },
  btnStyle:{
    backgroundColor: 'rgba(39, 39, 39, 1)'
  },
  btnTitleStyle:{
    marginHorizontal: 5,
    color: "wheat",
    fontSize: 25
  },
});
