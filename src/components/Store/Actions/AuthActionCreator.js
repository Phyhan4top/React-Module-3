import { Auth_Init,Auth_Success,Auth_Fail, Auth_signOut} from "./actionType";
import instance from "../../../Axios/axios-order";

const firebaseConfig = {
  apiKey: "AIzaSyDApWHtmWYbo079mAZJuMgi1JDFpNWiHJI",
  authDomain: "burger-app-d580d.firebaseapp.com",
  databaseURL: "https://burger-app-d580d-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "burger-app-d580d",
  storageBucket: "burger-app-d580d.appspot.com",
  messagingSenderId: "572630176473",
  appId: "1:572630176473:web:51f399eb8ad79e8c35e4c8",
  measurementId: "G-D13M68EXKM"
};



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
 return{
  type:Auth_Fail,
 error:error,
  
 }
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
  password,password,
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
   console.log(res)
  
 

})
.catch((error) => {
  dispatch(authFail(error.response.data.error.message))
 console.log(error.response.data.error.message)
});
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


