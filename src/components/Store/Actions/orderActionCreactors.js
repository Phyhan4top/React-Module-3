import { useNavigate } from "react-router";
import instance from "../../../Axios/axios-order";
import { getOrders,errorFetchOrder, deleteOrder, orderSuccess, orderFail, Loading, getOrdersInit, errorFetchOrders } from "./actionType";

const Order_Success=(id,orderData)=>{
  console.log(orderData)
  return{
    type:orderSuccess,
    
  }
}
const Order_Fail=(error)=>{
  return{
    type:orderFail,
    error:error
  }
}
const Load=()=>{
  return{
    type:Loading
  }
}

export const makeOrder=(order)=>{
  
  return dispatch=>{
    dispatch(Load())
    instance.post('/order.json',order)
    .then(res=>{ console.log(res.data)
    dispatch(Order_Success())
    window.location.replace('/')

    })
    .catch(err=>{
      dispatch(Order_Fail(err))
    })

  }
}

const orderDelete =(id)=>{
  return{
    type:deleteOrder,
    orderId:id
  }
}
export const Delete_Order=(id)=>{
  return dispatch=>{
    instance.delete(`/order/${id}.json`)
  .then(res=>{
   dispatch(orderDelete(id))
     console.log('order deleted..')
  })
  .catch(err=>{
    console.log('error..')})
  }
}

const getorder=(res)=>{
  return{
    type:getOrders,
    orders:res
  }
}

const getorderInit=()=>{
  return{
    type:getOrdersInit
  }
}
const getorderError=(error)=>{
  return{
    type:errorFetchOrders,
    error:error
  }
}
export const Get_Orders=()=>{
  return dispatch=>{
    dispatch(getorderInit())
    instance.get(`/order.json`)
    .then(res=>{
      const OrdersForm=[]
      for(let key in res.data){
        OrdersForm.push({id:key,order:res.data[key]})
      }
     dispatch(getorder(OrdersForm))
    
    })
    .catch(err=>{
      dispatch(getorderError(err.message))
     })

  }
}