import React, { useEffect, useState } from 'react'
import Order from './Order'
import instance from '../../../Axios/axios-order'
import { Delete_Order, Get_Orders, OrdersFetch } from '../../Store/Actions/orderActionCreactors'
import { connect } from 'react-redux'
import Spinner from '../../UI/Spinner/Spinner'

function Orders(props) {
//  const [orders,setOrder]= useState([])
//  const [loading,setLoading]= useState(true)
//  const [error,seterror]= useState(null)

 useEffect(()=>{
props.fetchOrders()


 },[])

 let Load;
 if(props.loading){
Load=<Spinner/>
 }
else if(props.orders.length){
  Load=props.orders.map(order=>{
   
    return <Order key={order.id}
    ingredients={order.order.ingredients}
    price={order.order.totalPrice}
    remove={()=>props.deleteOrder(order.id)}
    />
   })
 }else if(props.orders.length <= 0 ){
Load=<h2 style={{textAlign:'center'}}>Order is Empty</h2>
   }

 
//  let ORDER;
//  if(props.orders || props.orders.length <=0){
//  ORDER=<h2 style={{textAlign:'center'}}>Order is Empty</h2>
//    }else{
//     ORDER=Load
//    }
  return (
     <React.Fragment>
      {Load}
     </React.Fragment>
  )
}
const mapStateToProps=(state)=>{
  return{
    orders:state.orders.orders,
    error:state.orders.error,
    loading:state.orders.loading
  }
}
const mapDispatchToProps=(dispatch)=>{
  return{
    deleteOrder:(id)=>dispatch(Delete_Order(id)),
    fetchOrders:()=>dispatch(Get_Orders())
  }
}
export default connect(mapStateToProps,mapDispatchToProps) (Orders)