import { addIngredient,getIngredients,removeIngredient,fetchIngredientsError} from "../Actions/actionType";
import {updatedObj} from '../../../Shared/utility/Utility'
const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7,
};
let price=[]
for(let key in INGREDIENT_PRICES){
  price.push(INGREDIENT_PRICES[key])
  
}
let sum=4;
for (let p in price){
  sum +=price[p]

}
const init = {
  ingredients: null,
  totalPrice: sum,
  error:false,
  
};

const AddIng=(state,action)=>{
return  updatedObj(state,{
        ingredients: {
          ...state.ingredients,
          [action.ingredientName]: state.ingredients[action.ingredientName] + 1,
        },
        totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName],})
}

const RemoveIng=(state,action)=>{
 return updatedObj(state,{ ingredients: {
    ...state.ingredients,
    [action.ingredientName]: state.ingredients[action.ingredientName] - 1,
  },
  totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName]})
}

const GetIng=(state,action)=>{
return  updatedObj(state,  {
    ingredients:{
      salad:action.ingredients.salad,
      bacon:action.ingredients.bacon,
      cheese:action.ingredients.cheese,
      meat:action.ingredients.meat
    },
   error:false
  })

}

const GetIngErr=(state,action)=>{
 return updatedObj(state,{
    error:action.error
  })
}
const BurgerReducer = (state = init, action) => {
  switch (action.type) {
    case addIngredient:
      return AddIng(state,action)
     
    case removeIngredient:
      return RemoveIng(state,action)
     case getIngredients:
      return GetIng(state,action)
     case fetchIngredientsError:
      return GetIngErr(state,action)
    default:
      return state;
  }
};

export default BurgerReducer;
