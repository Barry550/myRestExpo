import React, { useEffect, useState } from 'react';
import { 
   View,
   Button,
   Text, 
   SafeAreaView,
   Image, StyleSheet, 
   TextInput, ScrollView, TouchableOpacity, Dimensions, FlatList, TouchableHighlight, Alert } from 'react-native';
import COLORS from '../../consts/colors';
import Icon from 'react-native-vector-icons/MaterialIcons'
import categories from '../../consts/categories';
import foods from '../../consts/foods'
const {width} = Dimensions.get('screen')
const cardWidth = width/2 - 20
import { useDispatch, useSelector } from 'react-redux';
import { supabase } from '../../../supabase-service';
import { async } from '@firebase/util';
import FantAwesome from 'react-native-vector-icons/FontAwesome'
import { addCard } from '../../../redux/product/produitAction';

const HomeScreen = ({navigation}) => {

  const [filter, setFilter] = useState('')
  const [isFilter, setIsFilter] = useState(false)
  const [categoryFilter, setCategoryFilter] = useState(false)

    const {Cards} = useSelector(state => state)


  const filterInput = (text) =>{
 
   const fil = foods.filter(food => {
    const name = food.name.toLowerCase()
    const term = text.toLowerCase()
      return name.indexOf(term) != -1
    })
    setFilter(fil)
    setCategoryFilter(fil)
  }

  const [selectedCategoryIndex, setSelectedCategoryIndex] = useState(0)
  const [selectCat, setSelectCat] = useState("All")

  return (
    <SafeAreaView style={{
      flex: 1,
      backgroundColor: COLORS.white
    }}>
      <View style={styles.header}>
        <View>
          <View style={{flexDirection: "row"}}>
            <Text style={{fontSize: 20 }}>Hello, </Text>
            <Text 
              style={{
                fontSize: 20,
                fontWeight: 'bold',
                marginLeft: 10
                }}>Mamadou </Text>
          </View>
          <Text 
            style={{
              marginTop: 5,
              fontSize: 15,
              color: COLORS.grey  
              }}>today menu</Text>
        </View>
          {/* <Image source={require('../../assets/person.png')}
                  style={{
                    height: 50,
                    width: 50,
                    borderRadius: 25
                  }}/> */}
            <TouchableOpacity 
             onPress={async()=>{
               await supabase.auth.signOut()
               return navigation.navigate('login')
            }}>
            <FantAwesome 
              name="sign-out"
              size={40}
              color="#05375a"
              style={{
            paddingTop: 3
          }}
        />
              </TouchableOpacity>
              
         </View>
                   
          
      <View 
        style={{
          marginTop: 40,
          flexDirection: 'row',
          paddingHorizontal: 20
        }}
      >
      <View style={styles.inputContainer}>
        <Icon name="search" size={28} />
        <TextInput placeholder="search for food"
            onChangeText={(text)=> {
              setIsFilter(text.length != 0)
              filterInput(text)
            }}
          style={{
            fontSize: 18
          }}  
        />
      </View> 
      <View style={styles.sortBtn}>
          <Icon name="tune" size={28} color={COLORS.white} />
      </View>
      </View>
          <ScrollView
          style={{
            height: 123
          }}
          horizontal showsHorizontalScrollIndicator={false}>
            {categories.map((category, index)=>  <ListCategories 
            category={category} 
            index={index} 
            selectedCategoryIndex={selectedCategoryIndex}
            setSelectedCategoryIndex={setSelectedCategoryIndex}
            setSelectCat={setSelectCat}
           
            />)}
          </ScrollView>
        <FlatList 
          showsVerticalScrollIndicator={false}
          numColumns={2}
          data={isFilter ? filter : foods}
          renderItem={({item})=> <Card Cards={Cards} food={item} selectCat={selectCat} navigation={navigation} />}
        />
    </SafeAreaView>
  );
}

const ListCategories = (
  {
    category,
    index,
    selectedCategoryIndex,
    setSelectedCategoryIndex,
    setSelectCat
  }
  ) =>{

  return(
    <View
      style={styles.categoriesListContainer}
    >
        <TouchableOpacity key={index} activeOpacity={0.8}
          onPress={()=> {
            setSelectedCategoryIndex(index)
            setSelectCat(category.name)
          }}
        >
          <View 
            style={{  
              backgroundColor: selectedCategoryIndex == index ? COLORS.primary : COLORS.secondary, 
              ...styles.categoryBtn,
            }}
              >
            <View style={styles.categoryBtnImgCon}>
              <Image source={category.image} 
                style={{
                  height: 35,
                  width: 35, 
                  resizeMode: 'cover'
                }}
              />
            </View>
            <Text 
              style={{
                fontSize: 15,
                fontWeight: 'bold',
                marginLeft: 10,
                color: selectedCategoryIndex == index ? COLORS.white : COLORS.primary
              }}
            >{category.name}</Text>
          </View>
        </TouchableOpacity>
      
    </View>
  )
}

const Card = ({Cards, food, selectCat, navigation}) =>{

  const [qty, setQty] = useState(1)

  const [anable, setAnable] = useState(true)

  const dispatch = useDispatch()
  
  const addToCard = (food, qty, id) =>{
    
    if(Cards.length == 0){
      return dispatch(addCard(food, qty, id))
    }else dispatch(addCard(food, qty, id))

    //  if(Cards.length >= 1){
    //   const check =  Cards.some(card => {
    //     return card.card.id === id
    //     })
    //       check ? 
    //       Alert.alert(
    //            "Message",
    //            "This product has been added to cart",
    //            [
    //              {
    //                text: "Cancel",
    //                style: "cancel",
    //              },
    //            ]
    //            )
               
    //            :

    //        dispatch(addCard(food, qty, id))
    // }

  }

  return(
    <>
    {
    selectCat == "All" ? 
    <View>
      <View style={styles.card}>
      <View style={{
        alignItems: 'center',  
        top: -40,
       
      }}>
        <TouchableHighlight
           underlayColor={COLORS.white} 
           activeOpacity={0.8} 
        onPress={()=> navigation.navigate('Detail', food)}
        >
        <Image source={food.image} style={{height:120,width: 120,  elevation: 35}}/>
          </TouchableHighlight>
      </View>
      {/* <View 
        style={{
          flex: 1,
          position: 'absolute',
          top: 80,
          left: 13,
          backgroundColor: COLORS.primary,
          width: 35,
          height: 35, 
          borderRadius: 60
        }}
      >
        <Text
          style={{
            color: 'white',
            left: 13,
            top: 5
          }}
        >{qty}</Text>
      
      </View> */}
      <View
        style={{
          marginHorizontal: 20
        }}
      >
        <Text 
          style={{
            fontSize: 18,
            fontWeight: 'bold'
          }}
        >{food.name}</Text>
        <Text
          style={{
            fontSize: 14,
            color: COLORS.grey
          }}
        >{food.ingredients}</Text>
      </View>
      <View 
        style={{
          marginTop: 10,
          marginHorizontal: 20,
          flexDirection: 'row',
          justifyContent: 'space-between'
        }}
      >
        <Text 
          style={{
            fontSize: 15,
            fontWeight: 'bold'
            }}>${food.price}</Text>
           
           {
            
             <TouchableOpacity onPress={()=> addToCard(food, qty, food.id)}
             style={styles.addToCartBtn}>
              <Icon name="add" size={30} color={COLORS.white}/>
            </TouchableOpacity> 
           }
      </View>
    </View>
   </View> 
    :
    food.cat == selectCat &&
  
    <View>
      <View style={styles.card}>
      <View style={{
        alignItems: 'center',  
        top: -40
      }}>
        <TouchableHighlight 
            underlayColor={COLORS.white} 
            activeOpacity={0.8} 
            onPress={()=> navigation.navigate('Detail', food)}
        >
        <Image source={food.image} style={{height:120,width: 120}}/>
        </TouchableHighlight>
      </View>
      <View
        style={{
          marginHorizontal: 20
        }}
      >
        <Text 
          style={{
            fontSize: 18,
            fontWeight: 'bold'
          }}
        >{food.name}</Text>
        <Text
          style={{
            fontSize: 14,
            color: COLORS.grey
          }}
        >{food.ingredients}</Text>
      </View>
      <View 
        style={{
          marginTop: 10,
          marginHorizontal: 20,
          flexDirection: 'row',
          justifyContent: 'space-between'
        }}
      >
        <Text 
          style={{
            fontSize: 15,
            fontWeight: 'bold'
            }}>${food.price}</Text>
         
              <TouchableOpacity onPress={()=> addToCard(food,qty, food.id)}
              style={styles.addToCartBtn}>
               <Icon name="add" size={30} color={COLORS.white}/>
             </TouchableOpacity> 
      </View>
    </View>
   </View> 

}
    </>
  )
}

const styles = StyleSheet.create({
  header: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: "space-between",
    paddingHorizontal: 20
  },
  inputContainer: {
    flex: 1,
    height: 50,
    backgroundColor: COLORS.light,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    borderRadius: 10
  },
  sortBtn: {
    width: 50,
    height: 50,
    marginLeft: 10,
    backgroundColor: COLORS.primary,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center'
  },
  categoriesListContainer: {
    paddingVertical: 8,
    alignItems: 'center',
    paddingHorizontal: 4
  },
  categoryBtn :{
    height: 45,
    width: 120,
    marginRight: 7,
    borderRadius: 30,
    alignItems: 'center',
    paddingHorizontal: 5,
    flexDirection: 'row'
  },
  categoryBtnImgCon:{
    height: 35,
    width: 35,
    backgroundColor: COLORS.white,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center'
  },
  card: {
    height: 230,
    width: cardWidth,
    marginBottom: 20,
    marginHorizontal: 10,
    marginTop: 50,
    borderRadius: 15,
    elevation: 13,
    backgroundColor: COLORS.white,

  },
  addToCartBtn: {
    height: 60,
    width: 60,
    borderRadius: 230,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
    right: -20,
    elevation: 13 
  },

  addToCartBtnActive: {
    height: 60,
    width: 60,
    borderRadius: 230,
    backgroundColor: COLORS.grey,
    justifyContent: 'center',
    alignItems: 'center',
    right: -20,
    elevation: 13 
  }
})

export default HomeScreen;
