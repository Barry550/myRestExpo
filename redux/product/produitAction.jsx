export const LOADING = "LOADING";
export const GET_CARD = "GET_CARD";
export const ADD_CARD = "ADD_CARD";
export const RESET_CARD = "RESET_CARD";
export const REMOVE_CARD = "REMOVE_CARD";
export const UPDATE_QTY = "UPDATE_QTY"

const loading = () =>{
  return{
    type: LOADING
  }
}
// const uid = () => Math.random().toString(34).slice(2)
export const addCard = (item, quantity, id) =>{
  return{
    type: ADD_CARD,
    payload: {id, quantity, card: item}
  }
}

export const RemoveCard = (id) =>{
  return{
    type: REMOVE_CARD,
    payload: id
  }
}

export const UpdateQty = (qty, id) =>{
  return{
    type: UPDATE_QTY,
    payload: {qty,id}
  }
}







