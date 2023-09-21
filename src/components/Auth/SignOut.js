import React, { useEffect } from 'react'
import { Navigate, useNavigate } from 'react-router'
import { OnSignOut } from '../Store/Actions/AuthActionCreator'
import { connect } from 'react-redux'
import Spinner from '../UI/Spinner/Spinner'

function SignOut(props) {
  const navigate=useNavigate()
  useEffect(()=>{
    
  props.onSignOut()
 
    
  })
  return <Navigate to={'/'} state={{from:'/SignOut'}} replace/>
}
const mapDispatchToProps=(dispatch)=>{
  return{
    onSignOut:()=>dispatch(OnSignOut())
  }
}
export default connect(null,mapDispatchToProps) (SignOut)