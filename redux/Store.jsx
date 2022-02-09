import { applyMiddleware, createStore } from "redux"; 
import rootReducer  from "./product/produitReducer";
import {composeWithDevTools} from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import logger from 'redux-logger'
import {persistReducer, persistStore} from 'redux-persist'
// import storage from 'redux-persist/lib/storage'
// import {AsyncStorage} from "@react-native-async-storage/async-storage";
// import {AsyncStorage} from "react-native"

// const persistConfig = {
//   key: 'root',
//   storage: AsyncStorage,
// }

//   const persistedReducer = persistReducer(persistConfig, RootReducer)



  export const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(logger))
    ) 
  export const persistor = persistStore(store)
 
    