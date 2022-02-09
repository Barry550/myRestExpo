import React from 'react'
import { View, Text } from 'react-native'
import LoginScreen from '../screens/LoginScreen'
import RegisterScreen from '../screens/RegisterScreen'
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import OnBoardScreen from '../screens/OnBoardScreen'

export default function AuthNavigation() {

  const AuthStack = createNativeStackNavigator()
  
  return (
    <AuthStack.Navigator screenOptions={{headerShown: false}}>
      <AuthStack.Screen name="onBoard" component={OnBoardScreen}/>  
      <AuthStack.Screen name="login" component={LoginScreen}/> 
      <AuthStack.Screen name="register" component={RegisterScreen}/>  
    </AuthStack.Navigator>
  )
}
