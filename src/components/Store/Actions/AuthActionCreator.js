import { Auth_Init,Auth_Success,Auth_Fail, Auth_signOut} from "./actionType";
import instance from "../../../Axios/axios-order";

const authInit=()=>{
 return{
  type:Auth_Init
 }
}
 const authSuccess=(token,id)=>{
 return{
  type:Auth_Success,
  token:token,
  userId:id
 }
}
const authFail=(error)=>{
  let err;
  if(error.response){
  err={
  type:Auth_Fail,
 error:error.response.data.error.message
 }
  }else{
    err={
      type:Auth_Fail,
     error:error.message
     }
  }
 return err
}
export const OnSignOut=()=>{
  localStorage.removeItem('token')
  localStorage.removeItem('userId')
  localStorage.removeItem('expiresIn')
return{
  type:Auth_signOut
}
}
export const authoSignOut=(time)=>{
return dispatch=>{
  
  setTimeout(()=>{
   dispatch(OnSignOut() ) 
  },time * 1000)
}
}
export const SignAuth=(email,password,isSignIn)=>{
  return dispatch=>{
    dispatch(authInit())
 const authData={
  email:email,
  password:password,
  returnSecureToken:true
 }
 let url=`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDApWHtmWYbo079mAZJuMgi1JDFpNWiHJI`
if(!isSignIn){
url=`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDApWHtmWYbo079mAZJuMgi1JDFpNWiHJI
`
}
instance.post(url,authData)
.then((res) => {
  const expiresIn=new Date(new Date().getTime()+res.data.expiresIn * 1000)
  localStorage.setItem('token',res.data.idToken)
  localStorage.setItem('userId',res.data.localId)
  localStorage.setItem('expiresIn',expiresIn)
  
  dispatch(authSuccess(res.data.idToken,res.data.localId))
   dispatch(authoSignOut(res.data.expiresIn))
})
.catch(error =>{
   dispatch(authFail(error))
}
);
  }
}

export const onAuthChanged=()=>{
  return dispatch=>{
    const token=localStorage.getItem('token')
    const userId=localStorage.getItem('userId')
    const expiresIn=localStorage.getItem('expiresIn')
    

    if(!token ){
     
      dispatch(OnSignOut())
    }

    const expireDate=new Date(expiresIn)
    
    if(expireDate <= new Date()){
      dispatch(OnSignOut())
      
    }
  
if(token){
   dispatch(authSuccess(token,userId))
  dispatch(authoSignOut((expireDate.getTime() - new Date().getTime()) / 1000))
}
 
  }
}


