import React, { useEffect } from 'react'
import { Navigate } from 'react-router'
import { OnSignOut } from '../Store/Actions/AuthActionCreator'
import { connect } from 'react-redux'


function SignOut(props) {

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