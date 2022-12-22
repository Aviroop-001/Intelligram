import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Button } from '@rneui/themed';

const Landing = ({navigation}) => {
  return (
    <View style={styles.container}>
      <Button title='Login' type="clear" size="md" color= "wheat" buttonStyle={styles.btnStyle} containerStyle={styles.btnContainer} titleStyle={styles.btnTitleStyle}
      onPress={() => navigation.navigate("Login")}/>
      <Button title='Register' type="clear" size="md" color= "wheat" buttonStyle={styles.btnStyle} containerStyle={styles.btnContainer} titleStyle={styles.btnTitleStyle}
      onPress={() => navigation.navigate("Register")}/>
    </View>
  )
}

export default Landing

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
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
      },
      btnStyle:{
        backgroundColor: 'rgba(39, 39, 39, 1)'
      },
      btnTitleStyle:{
        marginHorizontal: 5,
        color: "wheat",
        fontSize: 25
      },
})