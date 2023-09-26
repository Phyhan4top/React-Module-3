import React, { useEffect } from 'react'
import Order from './Order'

import { Delete_Order, Get_Orders} from '../../Store/Actions/orderActionCreactors'
import { connect } from 'react-redux'
import Spinner from '../../UI/Spinner/Spinner'


function Orders(props) {
//  const [orders,setOrder]= useState([])
//  const [loading,setLoading]= useState(true)
//  const [error,seterror]= useState(null)

 useEffect(()=>{
  
props.fetchOrders(props.token)


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
    remove={()=>props.deleteOrder(order.id,props.token)}
    />
   })
 }else if(props.orders.length <= 0 && !props.error){
Load=<h2 style={{textAlign:'center'}}>Order is Empty</h2>
   }else if(props.error){
Load=<h2 style={{textAlign:'center'}}>Network Error</h2>
   }
   try {
    if(props.token === null){
      throw new Error('Sign in to Continue')
    }
    
  } catch (error) {
    // Handle the error
   Load=<div style={{textAlign:'center'}}> <h2>   {error.message}</h2> 
   <button onClick={()=>window.location.replace('/Auth')}>Sign in</button>
   </div>
  }

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
    loading:state.orders.loading,
    token:state.auth.token
  }
}
const mapDispatchToProps=(dispatch)=>{
  return{
    deleteOrder:(id,token)=>dispatch(Delete_Order(id,token)),
    fetchOrders:(token)=>dispatch(Get_Orders(token))
  }
}
export default connect(mapStateToProps,mapDispatchToProps) (Orders)