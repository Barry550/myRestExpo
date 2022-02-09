import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import COLORS from '../../consts/colors';


export const PrimaryButton = ({title, onPress = () => {}}) => {
  return (
    <TouchableOpacity style={{
      marginHorizontal: 50, 
      marginBottom: 10
      }} activeOpacity={0.8} onPress={onPress}>
      <View style={styles.btnContainer}>
          <Text style={styles.title}>{title}</Text>
      </View>
    </TouchableOpacity> 
  );
}

export const SecondaryButton = ({title, onPress = () => {}}) => {
  return (
    <TouchableOpacity style={{
      marginHorizontal: 50, 
      marginBottom: 10
      }} activeOpacity={0.8} onPress={onPress}>
      <View style={{...styles.btnContainer, backgroundColor: COLORS.white}}>
          <Text style={{...styles.title, color: COLORS.primary}}>{title}</Text>
      </View>
    </TouchableOpacity> 
  );
}

const styles = StyleSheet.create({
  title:{
    color: COLORS.white,
    fontWeight: 'bold',
    fontSize: 18
  },
  btnContainer: {
    backgroundColor: COLORS.primary,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    
  }
})


