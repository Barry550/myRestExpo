import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import COLORS from '../../consts/colors';
import {PrimaryButton}  from '../components/Button';


const OnBoardScreen = ({navigation}) => {
  return (
    <SafeAreaView 
      style={{
        flex: 1,
        backgroundColor: COLORS.white
      }}>
      <View style={{height: 400}} >
        <Image 
          style={{
            width: "100%",
            resizeMode: 'contain',
            top: -150
          }}
          source={require('../../assets/onboardImage.jpg')}
        />
      </View>
      <View>
        <Text style={{
          fontSize: 32,
          fontweight: "bold",
          textAlign: 'center',
          marginVertical: 10
        }}>Delicious Food</Text>
        <Text
          style={{
            marginTop: 20,
            marginBottom: 50,
            fontSize: 18,
            textAlign: 'center',
            color: COLORS.grey
          }}
        >
          We help you to find best and delicious Food
        </Text>
      </View>
          
      <PrimaryButton     
        onPress={()=> navigation.navigate("login")}
        title="Get Started"
      />
    </SafeAreaView>
  );
}



export default OnBoardScreen;
