import React, { Component } from 'react';

import Layout from './hoc/Layout/Layout';

import { Route, Routes } from 'react-router';

import BurgerBuilderWrapper from './containers/BurgerBuilder/BurgerBuilderWrapper';

import { connect } from 'react-redux';
import { onAuthChanged } from './components/Store/Actions/AuthActionCreator';
import AsnycComp from './hoc/AsyncComponent/AsnycComp';
const AsyncAuth=AsnycComp(()=>{
  return import('./components/Auth/Authentication')
})
const AsyncCheckOut=AsnycComp(()=>{
  return import('./components/Order/CheckOutSummary/Checkout')
})
const AsyncOrders=AsnycComp(()=>{
  return import('./components/Order/CheckOutSummary/Orders')
})
const AsyncSignOut=AsnycComp(()=>{
  return import('./components/Auth/SignOut')
})
class App extends Component {
 componentDidMount(){
  this.props.onTryChange()
 }

  render () { 
    return (
     
      <div>
        <Layout>
        <Routes>
      <Route path='/'  element={<BurgerBuilderWrapper/>}/>
      <Route path='/Checkout/*'   element={<AsyncCheckOut/>} />
     
       <Route path='/SignOut'   element={<AsyncSignOut/>} />
        <Route path='/Auth'   element={<AsyncAuth/>} />
     
    <Route path='Order' element={<AsyncOrders/>}/>
     </Routes>
       
         
        </Layout>
      </div>
   
    );
  }
}
const mapDispatchToProps=dispatch=>{
  return{
    onTryChange:()=>dispatch(onAuthChanged())
  }
}
const mapStateToProps=state=>{
  return{
    isAuthenticated:state.auth.isAuth
  }
}
export default connect(mapStateToProps,mapDispatchToProps) (App);
