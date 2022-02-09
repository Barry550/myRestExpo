import 'react-native-gesture-handler';
import React,{useState, useEffect} from 'react';
import {StatusBar} from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import OnBoardScreen from './src/views/screens/OnBoardScreen';
import ShowNavigation from './src/views/navigation/ShowNavigation';
import AuthNavigation from './src/views/navigation/AuthNavigation';
import DetailScreen from './src/views/screens/DetailScreen';
import COLORS from './src/consts/colors';
import { Provider, useSelector} from 'react-redux';
import  {store, persistor}  from './redux/Store';
import {PersistGate} from 'redux-persist/integration/react'
import { supabase } from './supabase-service'
import 'react-native-url-polyfill/auto'


export default function App() {

  const [auth, setAuth] = useState(false)



  useEffect(()=>{
    setAuth(supabase.auth.session());
      
      supabase.auth.onAuthStateChange((_event, session)=>{
      console.log("session: ", session);
      setAuth(session)  
    })
  })

  const Stack = createNativeStackNavigator()
  return(

        <Provider store={store}>
           {/* <PersistGate loading={null} persistor={persistor}> */}
           <NavigationContainer> 
            <StatusBar backgroundColor={COLORS.white} barStyle="dark-content"/>
             {
               auth ? <ShowNavigation/> : <AuthNavigation/> 
             }
          </NavigationContainer>
           {/* </PersistGate> */}
        </Provider>
  )
}














    {/* <Stack.Navigator screenOptions={{headerShown: false}}>
            <Stack.Screen name="onBoard" component={OnBoardScreen}/>  
           
            <Stack.Screen name="Detail" component={DetailScreen}/>  
         
             <Stack.Screen name="Home" component={BottomNavigator}/>  
             <Stack.Screen name="login" component={LoginScreen}/> 
             <Stack.Screen name="register" component={RegisterScreen}/>  
           
           
          </Stack.Navigator> */}
        