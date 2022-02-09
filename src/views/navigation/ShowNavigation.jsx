import React from 'react'
import { View, Text } from 'react-native'
import LoginScreen from '../screens/LoginScreen'
import BottomScreen from '../screens/BottomScreen'
import DetailScreen from '../screens/DetailScreen'
import RegisterScreen from '../screens/RegisterScreen'
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import OnBoardScreen from '../screens/OnBoardScreen'
import { useSelector} from 'react-redux';

export default function AuthNavigation() {

  const ShowStack = createNativeStackNavigator()

  
const {Cards} = useSelector(state => state)

console.log("Cards: ", Cards);

  
return (
  <ShowStack.Navigator screenOptions={{headerShown: false}}>
    <ShowStack.Screen name="Home" component={BottomScreen}/>   
    <ShowStack.Screen name="Detail" component={DetailScreen}/> 
  </ShowStack.Navigator>
  )
}
