import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, TextInput, TouchableOpacity, StatusBar, Alert, SafeAreaView, ScrollView, ActivityIndicator} from 'react-native'
import COLORS from '../../consts/colors'
import FantAwesome from 'react-native-vector-icons/FontAwesome'
import  Feather  from 'react-native-vector-icons/Feather'
import { PrimaryButton } from '../components/Button'
import * as Animatable from 'react-native-animatable'
import { supabase } from '../../../supabase-service'
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { ErrorAlert, ErrorText } from './utils'

  

export default function RegisterScreen({navigation}) { 
  const [loading, setLoading] = useState(false)

  const registerSchema = yup.object().shape({
    email: yup
        .string()
        .email('Invalid Email Format')
        .required("Email Is A Required Field"),
      first: yup.string().required('firstName Is required Field '),

      last: yup.string().required('lastName Is required Field '),

      password: yup.string().required('Password Is required Field '),
      cf_password: yup.string().required('confirm Password Is required Field ')
    })

    
  const {
    register,
    setValue,
    getValues,
    reset,
    handleSubmit,
    // control, 
    // reset,
    formState: {errors}
  } = useForm({
    resolver: yupResolver(registerSchema),
    defaultValues: {
      first: "",
      last: "",
      email: "",
      password: "",
      cf_password: ""
    },
  });

  useEffect(()=>{
    register("first")
    register("last")
    register("email")
    register("password")
    register("cf_password")
  },[])

  /**
   * 
   * @param {*} userData 
   * @returns 
   */

  const [errorMessage, setErrorMessage] = useState(null)

 async function doCreateAccount(userData) {
    console.log("userData: ",userData)
    const {email, password, first, last, cf_password} = userData
    setLoading(true)
    const response = await supabase.auth.signUp({email, password })
    setLoading(false)
    if(response?.error){
      //render error
      console.log(response?.error?.message)
      ErrorAlert({title: "Error Creating In User", 
      message: response?.error?.message,
    })
      return;
    }

    //add user information to supabase profile table
    try {
      password === cf_password ?

      await supabase.from("profiles").insert([
          {
           id: response.user?.id,
           first,
           last,
           updated_at: new Date(),
           username: email
          }
        
         ]) : setErrorMessage("les mots de passe ne coresponde pas")
         
         password === cf_password ?   Alert.alert("Enregister", "acceptez le message de confirmation dans votre mail pour valider votre incription",
         [
           {text: "Ok", onPress: ()=> navigation.navigate("login")}
         ]
         ) : setErrorMessage("les mots de passe ne coresponde pas")
         
         
 } catch (e) {
   console.log(e)
 }

    if(error){
      //render error
      console.log(error.message)
      ErrorAlert({title: "Error Creating In User: writing information", 
      message: error.message,
    })
      return;
    }
  }

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
          <SafeAreaView >
          <ScrollView>
          <Text style={{
          fontSize: 15,
         
        }}>Nom</Text>
          <View style={{
          flexDirection: 'row',
        }}>
    
        <TextInput
          id="first"
          textContentType="first"
          onChangeText={(text)=> setValue('first', text)} 
          placeholder="Votre nom"
          autoCapitalize="none"
          style={{
            flex: 3,
            paddingLeft: 9
          }}
        /> 

        </View>
        <ErrorText name="first" errors={errors}/>
          <Text style={{
          fontSize: 15,
          paddingTop: 20
        }}>Prenom</Text>
   
        <View style={{
          flexDirection: 'row',
        }}>
       
        <TextInput
          id="last"
          textContentType="last"
          onChangeText={(text)=> setValue('last', text)} 
          placeholder="votre prenom"
          autoCapitalize="none"
          style={{
            flex: 3,
            paddingLeft: 9
          }}
        /> 

        </View>
        <ErrorText name="last" errors={errors}/>
          <Text style={{
          fontSize: 15,
          paddingTop: 20
        }}>Email</Text>
       
        <View style={{
          flexDirection: 'row',
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
          onChangeText={(text)=> setValue('email', text)} 
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
          paddingTop: 20
        }}>mots de passe</Text>
        <View style={{
          flexDirection: 'row',
          paddingTop: 0
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
          placeholder="votre mots de passe"
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
        <Text style={{
          fontSize: 15,
          paddingTop: 20
        }}>Confirmation du mots de passe</Text>
        <View style={{
          flexDirection: 'row',
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
          id="cf_password"
          textContentType="cf_password"
          onChangeText={(text)=> setValue('cf_password', text)} 
          secureTextEntry={!input.secureTextEntry ? false : true}
          placeholder="Confirmer votre mots de passe"
          autoCapitalize="none"
          style={{
            flex: 3,
            paddingLeft: 9
          }}
        />

     
        </View>

       <ErrorText name="cf_password" errors={errors}/>
       <Text style={{color: "red"}}>{errorMessage && errorMessage}</Text>

        <View>

        </View>
        <TouchableOpacity 
        
        onPress={handleSubmit(doCreateAccount)}>
          <View style={{
            marginTop: 40,
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
              loading ?  <ActivityIndicator size={28} color="white"/> : <Text>Create Account</Text>
            }
            </Text>
          </View>
            </TouchableOpacity>
            <View style={{
              marginTop: 9,
              flexDirection: 'row'
            }}>
              <Text>if you have an account : </Text>
              <TouchableOpacity onPress={()=> navigation.navigate('login')}>
                 <Text style={{
                color: 'red',
               
              }}>Login</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
          </SafeAreaView>        
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
    paddingBottom: 20
  },

  footer: {
    flex: 4,
    backgroundColor: COLORS.white,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 20

  }
})
























