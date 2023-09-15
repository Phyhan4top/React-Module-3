import { getOrders,errorFetchOrder, deleteOrder, orderSuccess, orderFail, Loading, getOrdersInit, errorFetchOrders} from "../Actions/actionType";
const init={
  orders:[],
  error:false,
  loading:false
}

export const OrdersReducer=(state=init,action)=>{
switch(action.type){
  case getOrders:
    return{
      ...state,
     error:false,
     loading:false,
     orders:action.orders
    }
  case getOrdersInit:
    return{
      ...state,
     error:false,
     loading:true
    }
  case errorFetchOrders:
    return{
      ...state,
     error:action.error,
     loading:false
    }
  case deleteOrder:
    return{
      ...state,
     error:false,
     loading:false,
     orders:state.orders.filter(order=> order.id !== action.orderId
     )
    }
  case orderSuccess:
    return{
      ...state,
      loading:false,
      error:false
    }
  case orderFail:
    return{
      ...state,
      loading:false,
      error:action.error
    }
  case Loading:
    return{
      ...state,
      loading:true
    }
    default:
      return state
}
}