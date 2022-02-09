import { postDataAPI } from "../../utils/fetchData"

export const AUTH = "AUTH"

export const login = (data) => async(dispatch)=> {

  console.log("data: ", data)
  const res = await dispatch(postDataAPI("user/login", data))

  console.log("Findata")
  console.log('res: ', res)

  dispatch({
    type: AUTH,
    payload: {
      data: res.data
    }
  })
}

export const register = (data) => async (dispatch)=> {
  
}

export const logout = (data) => async (dispatch)=> {
  
}