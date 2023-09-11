import React, { Component } from 'react';
import Checkout from './components/Order/CheckOutSummary/Checkout';
import Layout from './hoc/Layout/Layout';

import { Route, Routes } from 'react-router';

import Orders from './components/Order/CheckOutSummary/Orders';
import BurgerBuilderWrapper from './containers/BurgerBuilder/BurgerBuilderWrapper';

class App extends Component {
 
 
   
  render () {  
    console.log(this.props)
    return (
     
      <div>
        <Layout>
          <Routes>
            <Route path='/'  element={<BurgerBuilderWrapper/>}/>
            <Route path='/Checkout/*'   element={<Checkout/>} />
           
          <Route path='Order' element={<Orders/>}/>
           </Routes>
        </Layout>
      </div>
   
    );
  }
}

export default App;
