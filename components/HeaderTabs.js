import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Button } from '@rneui/themed';

const HeaderTabs = () => {
  return (
    <View style={styles.header}>
        <Button title='Buy' type="clear" size="md" color= "wheat" buttonStyle={styles.btnStyle} containerStyle={styles.btnContainer} titleStyle={styles.btnTitleStyle}/>
        <Button title='Rent' type="clear" size="md" color= "wheat" buttonStyle={styles.btnStyle} containerStyle={styles.btnContainer}titleStyle={styles.btnTitleStyle}/>
    </View>
  )
}

export default HeaderTabs

const styles = StyleSheet.create({
    header:{
        // backgroundColor: 'yellow',
        height: 100,
        alignItems: 'center',
        flexDirection: 'row',
        padding: 10,
        justifyContent:'center'
    },
    btnContainer:{
      width: 150,
      margin: 5,
      backgroundColor: "grey",
      borderRadius: 10
    },
    btnStyle:{
      backgroundColor: 'rgba(39, 39, 39, 1)'
    },
    btnTitleStyle:{
      marginHorizontal: 5,
      color: "wheat",
      fontSize: '1.2rem'
    },
})