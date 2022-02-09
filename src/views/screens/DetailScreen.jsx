import React from 'react';
import { View, Text, SafeAreaView, StyleSheet, Image, ScrollView, Alert} from 'react-native';
import COLORS from '../../consts/colors';
import Icon from 'react-native-vector-icons/MaterialIcons'
import { SecondaryButton } from '../components/Button';
import { useDispatch, useSelector } from 'react-redux';

import * as Animatable from 'react-native-animatable'
import { addCard } from '../../../redux/product/produitAction';

const DetailScreen = ({navigation, route}) => {

  const dispatch = useDispatch()
  const {Cards} = useSelector(state => state)

  console.log(Cards)

  const addToCard = (food, id) =>{

    if(Cards.length == 0){
      return dispatch(addCard(food))
    }
  
      if(Cards.length >= 1){
        const check = Cards.some(card => {
          return card.id === id
        })
          check ?  Alert.alert(
               "Message",
               "This product has been added to cart",
               [
                 {
                   text: "Cancel",
                   style: "cancel",
                 },
               ]
               )
              : dispatch(addCard(food, id))
       } 

  }

  const item = route.params
  return (
    <SafeAreaView style={{
      backgroundColor: COLORS.white
    }}>
      <View style={styles.header}>
        <Icon name="arrow-back-ios" size={28} onPress={navigation.goBack}/>
        <Text style={{fontSize: 20, fontWeight: 'bold'}}>Details</Text>
      </View>
        <ScrollView>
          <View style={{
            justifyContent: 'center',
            alignItems: 'center',
            height: 280
          }}>
            <Image source={item.image} style={{width: 220, height: 220}}/>  
          </View>
          <Animatable.View 
        animation="fadeInUpBig">
          <View  style={styles.details}>
            <View style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <Text style={{
                fontSize: 25,
                fontWeight: 'bold',
                color: COLORS.white
              }}>
                {item.name}
              </Text>
            
            </View>
              <Text style={styles.detailsText}>
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aperiam facilis provident veniam incidunt voluptate nulla adipisci, nostrum quibusdam labore est expedita aliquid! Omnis eligendi eius temporibus at commodi nobis excepturi!
              </Text>
              <View style={{marginTop: 40, marginBottom: 40}}>
                <SecondaryButton onPress={()=> addToCard(item, item.id)} title="Add Cart"/>
              </View>
          </View>
          </Animatable.View>
        </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingVertical: 20,
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 20
  },
  details:{
    paddingHorizontal: 20,
    paddingTop: 40,
    paddingBottom: 60,
    backgroundColor: COLORS.primary,
    borderTopRightRadius: 40,
    borderTopLeftRadius: 40
  },
  // iconContainer: {
  //   backgroundColor: COLORS.white,
  //   height: 50,
  //   width: 50,
  //   justifyContent: 'center',
  //   alignItems: 'center',
  //   borderRadius: 30
  // },
  detailsText: {
    marginTop: 10,
    lineHeight: 22,
    fontSize: 16,
    color: COLORS.white
  }
})

export default DetailScreen;
