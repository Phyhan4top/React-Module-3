import React, { Component } from 'react';
import Checkout from './components/Order/CheckOutSummary/Checkout';
import Layout from './hoc/Layout/Layout';

import { Route, Routes } from 'react-router';

import Orders from './components/Order/CheckOutSummary/Orders';
import BurgerBuilderWrapper from './containers/BurgerBuilder/BurgerBuilderWrapper';
import Authentication from './components/Auth/Authentication';
import SignOut from './components/Auth/SignOut';
import { connect } from 'react-redux';
import { onAuthChanged } from './components/Store/Actions/AuthActionCreator';

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
            <Route path='/Checkout/*'   element={<Checkout/>} />
            <Route path='/Auth'   element={<Authentication/>} />
            <Route path='/SignOut'   element={<SignOut/>} />
           
          <Route path='Order' element={<Orders/>}/>
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
export default connect(null,mapDispatchToProps) (App);
