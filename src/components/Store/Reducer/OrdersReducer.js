import { getOrders, deleteOrder, orderSuccess, orderFail, Loading, getOrdersInit, errorFetchOrders} from "../Actions/actionType";
import {updatedObj} from '../../../Shared/utility/Utility'
const init={
  orders:[],
  error:false,
  loading:false
}

export const OrdersReducer=(state=init,action)=>{
switch(action.type){
  case getOrders:
    return updatedObj(state,{ error:false,
     loading:false,
     orders:action.orders})
   
  case getOrdersInit:
    return updatedObj(state,{
     error:false,
     loading:true
    })
    
  case errorFetchOrders:
    return updatedObj(state,{
     error:action.error,
     loading:false
    })
  case deleteOrder:
    return updatedObj(state,{
     error:false,
     loading:false,
     orders:state.orders.filter(order=> order.id !== action.orderId
     )
    })
    
  case orderSuccess:
    return updatedObj(state,{
      loading:false,
      error:false
    })
  case orderFail:
    return updatedObj(state,{
      loading:false,
      error:action.error
    })
    
  case Loading:
    return updatedObj(state,{
      loading:true
    })
    default:
      return state
}
}