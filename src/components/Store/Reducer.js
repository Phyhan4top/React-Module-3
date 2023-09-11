import * as actionTypes from './Action'

const init={
        ingredients: {
          salad: 0,
          bacon: 0,
          cheese: 0,
          meat: 0
      },   
        totalPrice: 4
}

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7
};
const Reducer = (state=init,action) => {
 switch(action.type){
  case actionTypes.addIngredient:
    return{
      ...state,
      ingredients:{
        ...state.ingredients,
        [action.ingredientName]:state.ingredients[action.ingredientName] + 1
      },
      totalPrice:state.totalPrice + INGREDIENT_PRICES[action.ingredientName]
    }
    case actionTypes.removeIngredient:
      return{
        ...state,
        ingredients:{
          ...state.ingredients,
          [action.ingredientName]:state.ingredients[action.ingredientName] - 1
        },
        totalPrice:state.totalPrice - INGREDIENT_PRICES[action.ingredientName]

      }
      default:
        return state
 }
}

export default Reducer