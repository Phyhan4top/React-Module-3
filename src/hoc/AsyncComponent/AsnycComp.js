import React, { Component } from 'react'

const AsyncComp = (importComponent) => {
  return class  extends Component {
    state={
      component:null
    }

    componentDidMount(){
importComponent()
.then(cmp=>{
  this.setState({component:cmp.default})
  

})
.catch(err=>err)
    }
    render() {
      const C =this.state.component;
      return C?<C {...this.props} /> : null;
    }
  }
   
  
};

export default AsyncComp;
