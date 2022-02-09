import AUTH from './authAction'

const initState = {
  auth: []
}

export const authReducer = (state = initState, action) =>{
  switch(action.type){
    case AUTH: return action.payload 
  }
}