import {combineReducers} from 'redux'
import produit from './product/produitReducer'
import auth from './auth/authReducer'

export default combineReducers({
  produit,
  // auth,
})