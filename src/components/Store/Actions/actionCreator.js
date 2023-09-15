import axios from "axios";
import instance from "../../../Axios/axios-order";
import { addIngredient,removeIngredient,getIngredients, fetchIngredientsError } from "./actionType";

export const Add_Ingredient=(ingredient)=>{
  return{
    type:addIngredient,
    ingredientName:ingredient
  }
}
export const Remove_Ingredient=(ingredient)=>{
  return{
    type:removeIngredient,
    ingredientName:ingredient
  }
}
const Ingredients=(res)=>{
  return {
    type:getIngredients,
   ingredients:res
  }
}
const IngredientsError=()=>{
  return {
    type:fetchIngredientsError
  }
}
export const Get_Ingredient=()=>{
  return dispatch=>{
     instance.get('/ingredients.json')
      .then(res=>{
        dispatch(Ingredients(res.data))
      }
      )
      .catch(err=>{
        dispatch(IngredientsError())
      })
  }
}
