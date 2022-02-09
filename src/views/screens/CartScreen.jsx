import React, { useEffect, useState } from 'react'
import { View, Text, SafeAreaView, StyleSheet, FlatList, Image, Modal, TouchableOpacity } from 'react-native'
import COLORS from '../../consts/colors'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { useDispatch, useSelector } from 'react-redux'
import QRCode from 'react-native-qrcode-svg'
import { Divider } from 'react-native-elements/dist/divider/Divider'
import { RemoveCard, UpdateQty} from '../../../redux/product/produitAction'

export default function CartScreen() {

  const {Cards} = useSelector(state => state)
  const [total, setTotal] = useState(0)
  const [modalVisible, setModalVisible] = useState(false)

  const tab = []

  useEffect(async ()=>{
     await Cards.filter(card => {
      return tab.push(card.card.price * card.quantity)
    })

 await setTotal(tab.reduce((ele, acc)=> ele + acc, 0))

  },[Cards, tab, setTotal, total])

 

  const checkoutModalContent = () =>{
    return(
      <View style={styles.modalContainer}>
        <View style={styles.modalCheckoutContainer}>
        <View style={{
          flex: 1,
          }}>
          <Text style={{
            fontWeight: 'bold',
            fontSize: 20,
            flexDirection: 'row',
            textAlign: 'center',
          }}>Summary</Text>
         
           <View style={styles.operation}>
            <Text style={styles.textOperation}>HT</Text>
            <Text style={styles.textOperation}>${total.toFixed(2)}</Text>
           </View> 
          <Divider width={1}/>
          <View style={styles.operation}>
            <Text style={styles.textOperation}>TVA</Text>
            <Text style={styles.textOperation}>18%</Text>
          </View>
          <Divider width={1}/>
           <View style={styles.operation}>
            <Text style={styles.textOperation}>Timbre</Text>
            <Text style={styles.textOperation}>$5</Text>
           </View>
           <Divider width={1}/>
           <View style={styles.operation}>
            <Text style={styles.textOperation}>TTC</Text>
            <Text style={styles.textOperation}>${(total * 1.18).toFixed(2)}</Text>
           </View>
           <Divider width={1}/>
        </View>
         <View style={{
           flexDirection: 'row',
           justifyContent: 'center',
           marginBottom: 50
         }}>
         <QRCode 
            value="http://awesome.link.qr"
            size={170}
          />
         </View>
         
         
        </View>
      </View>
    )
  }

  return (
   <>
   <Modal
   animationType="slide"
   visible={modalVisible}
   transparent={true}
   onRequestClose={()=> setModalVisible(false)}
   >
     {checkoutModalContent()}
   </Modal>
    <SafeAreaView
      style={{
        backgroundColor: COLORS.white, 
        flex: 1 
      }}
    >
 
      <>
    {
     Cards.length == 0 ? <View style={{
       flex: 1,
       flexDirection: 'row',
       justifyContent: 'center',
       alignItems: 'center',
      
       }}>
        <Image style={{
       width: "100%",
      height: "100%",
      backgroundColor: COLORS.primary,

    
     }} source={require('../../assets/cart-empty.png')} />
     </View> :
      <FlatList 
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{paddingBottom: 80}}
      data={Cards}
      renderItem={({item})=> <CartCard item={item} total={total} setTotal={setTotal}/>}
    />
    }
      </>
    

        <View>
            <View style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginVertical: 15,
            marginHorizontal: 20
          }}>
            <Text style={{
              fontSize: 18,
              fontWeight: 'bold'
            }}>Total Price</Text>

            <Text style={{
              fontSize: 18,
              fontWeight: 'bold'
            }}>${total.toFixed(2)}</Text>
          </View>
         </View>
          <View style={{                
            marginHorizontal:30,      
            marginBottom: 20
            }}>
      {
        Cards.length == 0 ?  
        <TouchableOpacity 
        disabled
        style={{
         marginHorizontal: 50, 
         marginBottom: 10
         }} activeOpacity={0.9}
        onPress={()=> setModalVisible(true)}>
        <View style={styles.btnContainer}>
       <Text style={styles.title}>CHECKOUT</Text>
   </View>
        </TouchableOpacity> 
        :
             <TouchableOpacity 
             style={{
              marginHorizontal: 50, 
              marginBottom: 10
              }} activeOpacity={0.8}
             onPress={()=> setModalVisible(true)}>
             <View style={styles.btnContainerActif}>
            <Text style={styles.title}>CHECKOUT</Text>
        </View>
             </TouchableOpacity>
      }
          </View>
    </SafeAreaView>
   </>
  )
}


const CartCard = ({item}) =>{ 

  const {quantity, card} = item

  const [qty, setQty] = useState(quantity)
  const dispatch = useDispatch()

  const update = (action) =>{
    if(action === "increment") {setQty(qty + 1)}
    if(action === "decrement") {setQty(qty <= 1 ? 1 : qty - 1)}
  }

  useEffect(()=>{
    dispatch(UpdateQty(qty, card.id))
  }, [dispatch, qty])

//  const add = async(q, id) =>{
//     await  setQty(q + 1)
//    await  dispatch(UpdateQty(q, id))
//   }

//   const remove = async (q, id) =>{                                                              
//     await setQty(q => q === 1 ? 1 : q - 1)
//     await  dispatch(UpdateQty(q, id))
//   }


  return( 
 <>
 
    <View key={card.id} style={styles.cartCard}>
    <Image source={card.image} 
    style={{
      height: 80,
      width: 80,
      marginLeft: 9
      }}/>
    <View style={{
      height: 100,
      marginLeft: 10,
      paddingVertical: 20,
      flex: 1
    }}>
      <Text style={{
        fontWeight: "bold",
        fontSize: 16
      }}>{card.name}</Text>

    <Text style={{
        color: COLORS.grey,
        fontSize: 13
      }}>{card.ingredients}</Text>
      <Text style={{
        fontSize: 15,
        fontWeight: 'bold'
      }}>${(card.price * qty).toFixed(2)}</Text>
    </View>
    <View style={{
      marginRight: 20,
      alignItems: 'center'
    }}>
      <View
        style={{
          top: -2,
          left: 40
        }}
      >
        <TouchableOpacity  onPress={()=> dispatch(RemoveCard(item.id))}>
            <Icon name="delete" size={25}/>
        </TouchableOpacity>
      </View>
      <Text style={{
        fontWeight: 'bold',
        fontSize: 18
      }}>{qty}</Text>
      
      <View style={styles.actionBtn}>
        <TouchableOpacity onPress={()=> update("decrement")}>
          <Icon name="remove" size={25} color={COLORS.white}/>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=> update("increment")}>
          <Icon name="add" size={25} color={COLORS.white}/>
        </TouchableOpacity>  
      </View>     
    </View>
  </View>
  
 </>
  )
}


const styles = StyleSheet.create({
  header: {
    paddingVertical: 20,
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 20
  },
  cartCard: {
    marginTop: 10,
    height: 100,
    elevation: 15,
    borderRadius: 10,
    backgroundColor: COLORS.white,
    marginHorizontal: 20,
    marginVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionBtn:{
    width: 80,
    height: 30,
    backgroundColor: COLORS.primary,
    borderRadius: 30,
    paddingHorizontal: 5,
    flexDirection: 'row',
    justifyContent: 'center',
    alignContent: 'center'
  },
  title:{
    color: COLORS.white,
    fontWeight: 'bold',
    fontSize: 18
  },
  btnContainerActif: {
    backgroundColor: COLORS.primary,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },

  btnContainer: {
    backgroundColor: COLORS.primary,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    opacity: .5
  },
  modalContainer:{
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: "rgba(0,0,0,0.7)",
    
  },
  modalCheckoutContainer:{
    backgroundColor: "white",
    padding: 16,
    height: 500,
    borderWidth: 1,

  },
  modalCheckoutButton:{
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10
  },
  
  subtotalContainer: {
    flexDirection: "row",
    justifyContent: 'space-between',
    marginTop: 15,
  },

  operation:{
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  textOperation:{
    fontSize: 15,
    fontWeight: 'bold'
  }
})
