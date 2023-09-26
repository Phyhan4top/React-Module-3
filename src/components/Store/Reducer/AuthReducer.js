import { Auth_Fail, Auth_Init, Auth_Success, Auth_signOut } from "../Actions/actionType"
import {updatedObj} from '../../../Shared/utility/Utility'
const init={
  token:null,
  userId:null,
  loading:false,
  isAuth:false,
  error:null

}


export const AuthReducer=(state=init,action)=>{switch(action.type){
 case Auth_Init:
  return updatedObj(state,{ loading:true
  })
  
 case Auth_Success:
  return{
     ...state,
     loading:false,
     token:action.token,
     userId:action.userId,
     error:null,
     isAuth:true
  }
 case Auth_Fail:
  return{
     ...state,
     loading:false,
     error:action.error,
     token:null,
     userId:null,
     isAuth:false
  }
 case Auth_signOut:
  return{
     ...state,
     loading:false,
   token:null,
   userId:null,
   isAuth:false
  }
  default:
  return state
}
 
}