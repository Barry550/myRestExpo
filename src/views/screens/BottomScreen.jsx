import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import Icon from 'react-native-vector-icons/MaterialIcons'
import COLORS from '../../consts/colors';
import CartScreen from '../screens/CartScreen';
import { useSelector } from 'react-redux';
import CreateScreen from '../screens/CreateScreen';

const Tab = createBottomTabNavigator()

const BottomNavigator = () => {

  const {Cards} = useSelector(state => state)
  return (
    <Tab.Navigator screenOptions={{headerShown: false}} tabBarOptions={{
      style:{
        height:55, 
        borderTopWidth: 0,
        elevation: 0
      },
      showLabel: false,
      activeTintColor: COLORS.primary

    }}>
      <Tab.Screen 
        name="HomeScreen" 
        component={HomeScreen}
        options={{
          tabBarIcon: ({color})=> (
           <Icon name="home-filled" color={color} size={28}/>
        )}} 
        />  

     <Tab.Screen 
        name="CreateScreen" 
        component={CreateScreen}
        options={{
          tabBarIcon: ({color})=> (
         <View 
          style={{
            height: 80,
            width: 80,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: COLORS.white,
            borderColor: COLORS.primary,
            borderRadius: 70,
            borderWidth: 2,
            top: -15,
            elevation: 20
         }}>
             <Icon name="add" color={color} size={38}/>
         </View>
        )}} 
        />  
      <Tab.Screen 
        name="Shopping" 
        component={CartScreen}
        options={{
          tabBarIcon: ({color})=> (
          <View 
            style={{
              flex:1,
              top: 10
            }}
          >
             <Icon name="shopping-cart" color={color} size={28}/>
             <View 
              style={{
                height: 20,
                width: 20,
                borderRadius: 130,
                backgroundColor: COLORS.primary,
                justifyContent: 'center',
                alignItems: 'center',
                top: -35,
                right: -20
              }}
             >
               <Text 
                style={{
                  color: COLORS.white,
                  fontSize: 10
                }}
               >{Cards.length}</Text>
             </View>
          </View>
        )}}    
        />  
    </Tab.Navigator>
  );
}

export default BottomNavigator;
