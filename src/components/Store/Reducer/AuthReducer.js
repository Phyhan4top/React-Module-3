import { Auth_Fail, Auth_Init, Auth_Success, Auth_signOut } from "../Actions/actionType"
const init={
  token:null,
  userId:null,
  loading:false
}
export const AuthReducer=(state=init,action)=>{switch(action.type){
 case Auth_Init:
  return{
     ...state,
     loading:true
  }
 case Auth_Success:
  return{
     ...state,
     loading:false,
     token:action.token,
     userId:action.userId,
     error:null
  }
 case Auth_Fail:
  return{
     ...state,
     loading:false,
     error:action.error,
     token:null,
     userId:null
  }
 case Auth_signOut:
  return{
     ...state,
     loading:false,
   token:null,
   userId:null
  }
  default:
  return state
}
 
}