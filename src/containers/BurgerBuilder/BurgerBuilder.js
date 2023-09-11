import React, { Component,Fragment } from 'react';
import * as actionTypes from '../../components/Store/Action'
import instance from '../../Axios/axios-order';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import withError from '../../hoc/withError';
import { connect } from 'react-redux';



const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
};

class BurgerBuilder extends Component {
    // constructor(props) {
    //     super(props);
    //     this.state = {...}
    // }
    state = {
        
        purchasable: false,
        purchasing: false,
        Pass:[],
        error:false
    }
   
componentDidMount(){
// instance.get('/ingredients.json')
//   .then(res=>
//     {this.setState({ingredients:res.data}) 
//     console.log(res.data)
// }
//   )
   
}
    updatePurchaseState (ingredients) {
        const sum = Object.keys( ingredients )
            .map( igKey => {
                return ingredients[igKey];
            } )
            .reduce( ( sum, el ) => {
                return sum + el;
            }, 0 );
        return sum > 0
    }

   
   

    purchaseHandler = () => {
        this.setState({purchasing: true});
        // this.directUrl();
       
        // window.location.search='?'+ ParamsString;
    
    }

    purchaseCancelHandler = () => {
       
        this.setState({purchasing: false});

    }

    purchaseContinueHandler = () => { 


// const Params=[]
// for(let i in this.state.ingredients){
//  Params.push(encodeURIComponent(i) + '='+ encodeURIComponent(this.state.ingredients[i]))
// //  console.log(this.state.ingredients[i])
// }


// const ParamsString=Params.join('&');
this.props.navigate('/Checkout' );
// window.history.pushState({totalPrice:this.state.totalPrice},'',)


}  

    render () {
        
        const disabledInfo = {
            ...this.props.ingredients
        };
        for ( let key in disabledInfo ) {
            disabledInfo[key] = disabledInfo[key] <= 0
        }
        // {salad: true, meat: false, ...}
let orderSummary=null
let burger=this.state.error?<p>Ingredients can't be loaded!</p> : null;
        if(this.props.ingredients){
          burger=(<Fragment>
                 <Burger ingredients={this.props.ingredients} />
                <BuildControls
                    ingredientAdded={this.props.addIngredient}
                    ingredientRemoved={this.props.removeIngredient}
                    disabled={disabledInfo}
                    purchasable={this.updatePurchaseState(this.props.ingredients)}
                    ordered={this.purchaseHandler}
                    price={this.props.totalPrice} 
                    ingredients={this.state.Pass}
                    />

            </Fragment>); 
            orderSummary=<OrderSummary 
            ingredients={this.props.ingredients}
            price={this.props.totalPrice}
            purchaseCancelled={this.purchaseCancelHandler}
            purchaseContinued={this.purchaseContinueHandler} />
        }
       
        return (
            <Fragment>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal> 
               {burger}
                  
            </Fragment>
        );
    }
}
const mapStateToProps=(state)=>{
    return{
        ingredients:state.ingredients,
        totalPrice:state.totalPrice
    }
}
const mapDispatchToProps=(dispatch)=>{
    return{
      addIngredient:(ingredient)=>dispatch({type:actionTypes.addIngredient,ingredientName:ingredient}) , 
     removeIngredient:(ingredient)=>dispatch({type:actionTypes.removeIngredient,ingredientName:ingredient})  
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(withError((BurgerBuilder), instance))