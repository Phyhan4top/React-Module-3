import React, { useEffect, useState } from 'react'
import Burger from '../../Burger/Burger'
import Button from '../../UI/Button/Button'
import { Link, Outlet, Route, Routes, useNavigate,useLocation } from 'react-router-dom'

import FormData from './DataComponet/FormData'
import { connect } from 'react-redux'



function Checkout(props) {

const navigate= useNavigate()

const purchaseCancelHandler=()=>{
  window.history.back()
}
const purchaseContinueHandler=()=>{

navigate('/Checkout/Contact-Data')

}

useEffect(()=>{
// const query=new URLSearchParams(window.location.search)
// let ingredients={};
// for(let Param of query.entries()){
// ingredients [Param[0]]= + Param[1]

// }
// const price=window.history.state.totalPrice


},[])


  return (
    <div style={{margin:'auto'}} >
      <Burger ingredients={props.ingredients}/>
      <div>
        <Button
        clicked ={purchaseCancelHandler}
        btnType='Danger'>Cancel</Button>
   <Button 
   clicked={purchaseContinueHandler}
   btnType='Success'>Continue</Button>
  
    <Routes>
    <Route path={'Contact-Data'} element={<FormData />}/>
   
   </Routes>
   <Outlet/>
   {/* <FormData/> */}
      </div>
    </div>
  )
}

const mapStateToProps=(state)=>{
  return{
      ingredients:state.ingredients,
      totalPrice:state.totalPrice
  }
}
export default connect(mapStateToProps)( React.memo(Checkout))