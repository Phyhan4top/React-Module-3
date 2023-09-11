import React, { useEffect, useState } from 'react'
import Order from './Order'
import instance from '../../../Axios/axios-order'

function Orders() {
 const [orders,setOrder]= useState([])
 const [loading,setLoading]= useState(true)
 const [error,seterror]= useState(null)
const deleteOrderHandler=(e,id)=>{
e.preventDefault()
  instance.delete(`/orders/${id}.json`)
  .then(res=>{ 
   window.location.reload()
     console.log('order deleted..')
  })
  .catch(err=>{
    console.log('error..')})
 }
 useEffect(()=>{
instance.get('/orders.json')
.then(res=>{ 
  const FetchData=[]
  for(let key in res.data){
    FetchData.push({...res.data[key],id:key})
  }
   setLoading(false)
 setOrder(FetchData)
  //  console.log(FetchData)
})
.catch(err=>{seterror(err.message)
  setLoading(false)})

  return ()=>{
 
  }
 },[])
 
  return ( <React.Fragment>
   
      {orders.length <= 0?<h3 style={{textAlign:'center'}}>Order is empty</h3>:
      <div>
      {!error?
      <div>
      { orders.map(order=>{
       return <Order key={order.id}
       ingredients={order.ingredients}
       price={order.totalPrice}
       remove={(e)=>deleteOrderHandler(e,order.id)}
       />
      })}
     </div>
     :<h1 style={{textAlign:'center'}}>{error}</h1>}
    </div>
      }
    
     
     </React.Fragment>
  )
}

export default Orders