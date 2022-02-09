import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, TextInput, TouchableOpacity, StatusBar, Alert, ActivityIndicator } from 'react-native'
import COLORS from '../../consts/colors'
import {useDispatch} from 'react-redux'
import FantAwesome from 'react-native-vector-icons/FontAwesome'
import  Feather  from 'react-native-vector-icons/Feather'
import { PrimaryButton } from '../components/Button'
import * as Animatable from 'react-native-animatable'
import { supabase } from '../../../supabase-service'
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { ErrorAlert, ErrorText } from './utils'
import { login } from '../../../redux/auth/authAction'


const loginSchema = yup.object().shape({
    email: yup
        .string()
        .email('Invalid Email Format')
        .required("Email Is A Required Field"),
      password: yup.string().required('Password Is required Field ')
    })
export default function LoginScreen({navigation}) { 
  const [loading, setLoading] = useState(false)
  const {
    register,
    setValue,
    getValues,
    handleSubmit,
    formState: {errors}
  } = useForm({
    resolver: yupResolver(loginSchema),
    defaultValues: {
      email: "",
      password: ""
    },
  });

  useEffect(()=>{
    register("email")
    register("password")
  },[])

     /**
   * 
   * @param {*} param0 
   */
  
 async function doLogin (data) {
    console.log(data)
    setLoading(true)
    const response = await supabase.auth.signIn(data)
    setLoading(false)
    if(response?.error){
      console.log(response?.error?.message)
      ErrorAlert({
      title: "Error Loggin In User", 
      message: response?.error?.message,
    })
      return;
    }
  }

const dispacth = useDispatch() 
// const doLogin = async(data) =>{
//  await dispacth(login(data))
// }

  // console.log("erors: ",errors.name)

  const [input, setInput] = useState({
    email: '',
    password: '',
    check_textInput: false,
    secureTextEntry: true
  })


  const emailInputChange = (text) =>{
    if(text.length !== 0){
      setInput({
        ...input,
        email: text,
        check_textInput: true,
        secureTextEntry: false
      })
    }else{
      setInput({
        ...input,
        check_textInput: false
    })
  }
  }

  const visibility = () =>{
    setInput({
      ...input,
      secureTextEntry: !input.secureTextEntry
    })
  }



  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={COLORS.white} barStyle="dark-content" />
      <View style={styles.header}>
        <Text style={{
          color: 'white',
          fontWeight: 'bold',
          fontSize: 30
        }}>Welcome !</Text>
      </View>
      <Animatable.View 
        animation="fadeInUpBig"
      style={styles.footer}>
        <Text style={{
          fontSize: 15
        }}>Email</Text>
        <View style={{
          flexDirection: 'row',
          paddingTop: 10
        }}>
        <FantAwesome 
          name="user-o"
          size={20}
          color="#05375a"
          style={{
            paddingTop: 3
          }}
        />
        <TextInput
          id="email"
          textContentType="emailAddress"
          onChangeText={(text)=> {
            emailInputChange(text)
            setValue('email', text)
          }} 
          placeholder="Your Email"
          autoCapitalize="none"
          style={{
            flex: 3,
            paddingLeft: 9
          }}
        />

     {
       input.check_textInput  &&
      <Animatable.View
        animation="bounceIn"
      >
            <Feather 
       name="check-circle"
       color="green"
       size={20}
     />
      </Animatable.View>  
     }
        </View>
        <ErrorText name="email" errors={errors}/>

        <Text style={{
          fontSize: 15,
          marginTop: 20
        }}>Password</Text>
        <View style={{
          flexDirection: 'row',
          paddingTop: 10
        }}>
        <FantAwesome 
          name="lock"
          size={20}
          color="#05375a"
          style={{
            paddingTop: 5
          }}
        />
        <TextInput
          id="password"
          textContentType="password"
          onChangeText={(text)=> setValue('password', text)} 
          secureTextEntry={!input.secureTextEntry ? false : true}
          placeholder="Your Password"
          autoCapitalize="none"
          style={{
            flex: 3,
            paddingLeft: 9
          }}
        />

        <TouchableOpacity onPress={()=> visibility()}> 
          <Feather 
          name={input.secureTextEntry ? `eye-off` : `eye`}
          color="grey"
          size={20}
        />
        </TouchableOpacity>

        </View>
        <ErrorText name="password" errors={errors}/>
        <View>

        </View>
        <TouchableOpacity 
        onPress={handleSubmit(doLogin)}
        >
        <View style={{
          marginTop: 30,
          flexDirection: 'row',
          justifyContent: 'center',
          backgroundColor: COLORS.primary,
          borderRadius: 20,
        }}>
            <Text style={{
           paddingVertical: 13,
           color: 'white',
           fontWeight: 'bold',
           fontSize: 18
          }}>
            {
              loading ?  <ActivityIndicator size={28} color="white"/> : <Text>Login</Text>
            }
          </Text>
          
        </View> 
            </TouchableOpacity>
            <View style={{
              marginTop: 9,
              flexDirection: 'row'
            }}>
              <Text>if you does not account : </Text>
              <TouchableOpacity onPress={()=> navigation.navigate('register')}>
                 <Text style={{
                color: 'red',
               
              }}>Register</Text>
              </TouchableOpacity>
            </View>
      </Animatable.View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.primary
  },

  header:{
    flex: 1,
    justifyContent: 'flex-end',
    paddingHorizontal: 20,
    paddingBottom: 50
  },

  footer: {
    flex: 3,
    backgroundColor: COLORS.white,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 30

  }
})


















