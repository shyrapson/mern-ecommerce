import { publicRequest } from "../requestMethod"
import { loginFailure, loginStart, loginSuccess } from "./userRedux"

export const login = async (dispatch,user)=>{
  


    dispatch(loginStart())
    try {
        const res = await publicRequest.post('/login',user)
     
        console.log(res.data,'wahala')
        dispatch(loginSuccess(res.data))
    } catch (error) {
        dispatch(loginFailure())
    } 
}