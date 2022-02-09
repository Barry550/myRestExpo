import React,{useEffect, useState, useRef} from 'react';
import { View, Text, TextInput,  Button, StyleSheet,Image, ActivityIndicator, SafeAreaView, ScrollView, TouchableOpacity, Alert } from 'react-native';
import ImagePicker from 'react-native-image-picker'
import COLORS from '../../consts/colors';
import { collection, addDoc } from "firebase/firestore";  
import { db } from '../../../firebase/FirebaseConf';
import {supabase} from '../../../supabase-service';
import * as Animatable from 'react-native-animatable';
import FantAwesome from 'react-native-vector-icons/FontAwesome'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { Camera } from 'expo-camera';
import { ErrorAlert } from './utils';

const CreateScreen = () => {

  const [selectedImage, setSelectedImage] = useState()
  const [loading, setLoading] = useState(false)
  const [showCamera, setShowCamera] = useState(false)
  const [image, setImage] = useState(null)

  const cameraRef = useRef(null)

  const takePhoto = async () =>{
    if(cameraRef){
      console.log("in take picture")
    }
    try {
      let photo = await cameraRef.current.takePictureAsync({
        allowsEditing: true,
        aspect: [4,3],
        quality: 1
      }) 

      return photo 

      // if(!photo.cancelled){
      //   // get the extention
      //   const ext = photo.uri.substring(photo.uri.lastIndexOf(".") + 1)

      //   // get the file name
      //   const fileName = photo.uri.replace(/^.*[\\\/]/, "")
      //   var formData = new FormData();
      //   formData.append('files', {
      //     uri: photo.uri,
      //     name: fileName,
      //     type: photo.type ? `image/${ext}` : `video/${ext}`
      //   })
      //      //upload to default image bucket
      // const { data, error } = await supabase.storage
      // .from('image-bucket')
      // .upload(fileName, formData)

      // // throw error if necessary
      // if(error) throw new Error(error.message)

      // //return photo and supabase image data
      // return { ...photo, imageData: data}
      // }else{
      //   return photo 
      // }
    } catch (e) {
      ErrorAlert({title: "Image Upload", message: e.message})
    }
  }

  console.log(image);
  return(      
    <View style={styles.container}>
            <View style={styles.header}>
            <View style={styles.imageContainer}>
                {image &&  <Image source={{uri: image}} style={{width: 313, height: 365, backgroundColor: "blue"}}/>}
                {showCamera && <PhotoScreen cameraRef={cameraRef} takePhoto={takePhoto} setShowCamera={setShowCamera} setImage={setImage}/> }

               </View>
         
               <View style={{
               position: 'absolute',
               bottom: 10,
               right: 160,
               flexDirection: "row"
         
             }}>
         
          <TouchableOpacity>
          <FantAwesome 
               name="camera"
               size={30}
               style={{
                 marginRight: 7
               }}
               onPress={()=> {
                setShowCamera(true)
                setImage(null)
               }}
             />
         
            </TouchableOpacity>
         
           <Icon 
               name="file-import"
               size={30}
             />
         
             </View>
         
            </View>
               <Animatable.View 
                 animation="fadeInUpBig"
                 style={styles.footer}
             >
                   <SafeAreaView >
                   <ScrollView>
                   <Text style={{
                   fontSize: 15,
                  
                 }}>Nom</Text>
                   <View style={{
                   flexDirection: 'row',
                 }}>
             
                 <TextInput
                   id="nom"
                   textContentType="nom"
                   onChangeText={(text)=> setValue('nom', text)} 
                   placeholder="nom du produit"
                   autoCapitalize="none"
                   style={{
                     flex: 3,
                     paddingLeft: 9
                   }}
                 /> 
         
                 </View>
                
                   <Text style={{
                   fontSize: 15,
                   paddingTop: 20
                 }}>Prix</Text>
            
                 <View style={{
                   flexDirection: 'row',
                 }}>
                
                 <TextInput
                   id="prix"
                   textContentType="prix"
                   onChangeText={(text)=> setValue('prix', text)} 
                   placeholder="prix du produit"
                   autoCapitalize="none"
                   style={{
                     flex: 3,
                     paddingLeft: 9
                   }}
                 /> 
         
                 </View>
         
                   <Text style={{
                   fontSize: 15,
                   paddingTop: 20
                 }}>Incredients</Text>
                
                 <View style={{
                   flexDirection: 'row',
                 }}>
            
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
         
            
                 </View>
         
              
                 <TouchableOpacity>
                   <View style={{
                     marginTop: 10,
                     flexDirection: 'row',
                     justifyContent: 'center',
                     backgroundColor: COLORS.primary,
                     borderRadius: 20,
                    
                   }}>
                     <Text style={{
                      paddingVertical: 8,
                      color: 'white',
                      fontWeight: 'bold',
                      fontSize: 18
                     }}>
                         {
                       loading ?  <ActivityIndicator size={28} color="white"/> : <Text>Create product</Text>
                     }
                     </Text>
                   </View>
                     </TouchableOpacity>
                     <View style={{
                       marginTop: 9,
                       flexDirection: 'row'
                     }}>
                     </View>
                   </ScrollView>
                   </SafeAreaView>        
               </Animatable.View>
             <View>
         
             </View>
             </View>
  
  )
}

const PhotoScreen = ({cameraRef, takePhoto, setShowCamera, setImage}) =>{
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }
  return (
    <View style={styles.containe}>
      <Camera style={styles.camera} type={type} ref={cameraRef}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button}
          onPress={() => {
              setType(
                type === Camera.Constants.Type.back
                  ? Camera.Constants.Type.front
                  : Camera.Constants.Type.back
              );
            }}>
            <Text style={styles.text}> Flip </Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button}
            onPress={async()=>{
              const r = await takePhoto();
              if(!r.cancelled){
                setImage(r.uri)
              }
        //  Alert.alert("debug", JSON.stringify(r))
        setShowCamera(false)
            }}
          >
            <Text style={styles.text}>Photo</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button}
            onPress={()=>setShowCamera(false)}
          >
            <Text style={styles.text}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </Camera>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.secondary
  },

  header:{
    flex: 3,
    marginTop: 7,
    flexDirection: 'row',
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingBottom: 20
  },

  imageContainer: {
    marginTop: 2,
    borderWidth: 1,
    borderColor: 'black',
    width: '85%',
    height: 365,
    flexDirection: 'row',

  },
  button:{
    margin: 8
  },
  inputContainer:{
    padding: 10,
    backgroundColor: COLORS.light,
    borderRadius: 5,
    marginVertical: 5,
    
  },
  
  footer: {
    flex: 2,
    backgroundColor: COLORS.white,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 20

  },

  containe: {
    flex: 10,
  },
  camera: {
    flex: 10,
  },
  buttonContainer: {
    flex: 10,
    backgroundColor: 'transparent',
    flexDirection: 'row',
    margin: 20,
    paddingBottom: 20
  },
  button: {
    flex: 10,
    alignSelf: 'flex-end',
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
    color: 'white',
  },
})

export default CreateScreen;

















// const FoodForm = ({setInput, input, createProduct}) =>{
//   return(
//     <View>
//     <View style={{ flexDirection: 'row'}}>
//       <View>
//       <TextInput style={styles.inputContainer} placeholder="name" width={150}
//         onChangeText={(text)=> setInput({...input, name: text})}
//       />
//       </View>
//        <View >
//        <TextInput style={{...styles.inputContainer, marginLeft: 10}} placeholder="price" width={150}
//        onChangeText={(number)=> setInput({...input, price: number})}
//       />
//        </View>
//     </View>

//     <View style={styles.inputContainer}>
//       <TextInput placeholder="ingredients" width={300}
//        onChangeText={(text)=> setInput({...input, ingredients: text})}
//       />
//     </View>
//     <Button title="valider" onPress={()=> createProduct()}/>

//   </View>
//   )
// }







  // pickImageHandler = () =>{
  //   ImagePicker.showImagePicker({title: "Pick an Image", maxWidth: 800, maxHeight: 600},
  //   response =>{
  //     if(response.error){
  //       console.log("image error")
  //     }else{
  //       console.log("Image: "+ response.uri)
  //       selectedImage({uri: response.uri})
  //       onImagePicked({uri: response.uri})
  //     }
  //   })
  // }