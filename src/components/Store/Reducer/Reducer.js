import { addIngredient,getIngredients,removeIngredient,fetchIngredientsError} from "../Actions/actionType";
import { updatedObj } from "./updatedObj";
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
  error:false
};


const BurgerReducer = (state = init, action) => {
  switch (action.type) {
    case addIngredient:
      return updatedObj(state,{
        ingredients: {
          ...state.ingredients,
          [action.ingredientName]: state.ingredients[action.ingredientName] + 1,
        },
        totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName],})
     
    case removeIngredient:
      return updatedObj(state,{ ingredients: {
          ...state.ingredients,
          [action.ingredientName]: state.ingredients[action.ingredientName] - 1,
        },
        totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName]})
     case getIngredients:
      return updatedObj(state,  {
        ingredients:{
          salad:action.ingredients.salad,
          bacon:action.ingredients.bacon,
          cheese:action.ingredients.cheese,
          meat:action.ingredients.meat
        },
       error:false
      })
    
     case fetchIngredientsError:
      return updatedObj(state,{
        error:true
      })
    default:
      return state;
  }
};

export default BurgerReducer;
