import {LOADING, REMOVE_CARD, ADD_CARD, UPDATE_QTY} from './produitAction'
import Foods from '../../src/consts/foods'

 
const initState = {
  Cards: [],
}

const produitReducer = (state = initState, action) =>{
  switch (action.type) {

    case LOADING: return{...state, isLoading: true}

    case REMOVE_CARD: 
      return{
        ...state,
        Cards: state.Cards.filter(card => card.id != action.payload)
      }

    case ADD_CARD :   
    const {id} = action.payload

    const inCart = state.Cards.some(card => card.card.id === id)

    if(inCart){
      return{
        ...state.Cards,
      Cards: state.Cards.map(card => card.card.id === id ? {
        ...card,
        quantity: card.quantity + 1
      } : card)
      }
    }else{
      return{
        ...state,
        Cards: [
          ...state.Cards,
          action.payload, 
          ]     
      }
    }

    case UPDATE_QTY: 
      return{
        ...state, 
        Cards: state.Cards.map(card => {
          if(card.id === action.payload.id){
            return{
              ...card,
              quantity: action.payload.qty 
            }
          }
         return card
        })
      }
     
   default: return state
  }
}

export default produitReducer