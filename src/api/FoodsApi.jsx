import firebase from 'react-native-firebase'

export function addFood(food, addComplete){
  firebase.firestore()
    .collection('Foods')
    .add({
      cat: food.cat,
      ingredients: food.ingredients,
      name: food.name,
      price: food.price,
      quantity: 1,
      createAt: firebase.firestore.FieldValue.serverTimestamp()
    }).then(data => addComplete(data))
      .catch(err => console.log(err))
}

export async function getFoods(foodsRetrieved){

  var foodList = []
  
  var snapshot = await firebase.firestore()
    .collection('Foods')
    .orderBy('createAt')
    .get()

    snapshot.forEach((doc)=> {
      foodList.push(doc.data())
    })

    foodsRetrieved(foodList)
}