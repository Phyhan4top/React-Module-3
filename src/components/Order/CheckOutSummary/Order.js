import React from 'react'
import style from './Order.module.css'
function Order({price,ingredients,remove}) {
const ingredient=[]
for(let ingredientName in ingredients){
  ingredient.push({name:ingredientName,amount:ingredients[ingredientName]})
  
}
const ingredientOutput=ingredient.map(ig=>{
  return <span className={style.Span} key ={ig.name}>{ig.name} ({ig.amount})</span>
})

  return (
    <div className={style.Box}>
     
      <p>ingredient: {ingredientOutput}</p>
      <p>Price: <strong> USD {Number.parseFloat(price).toFixed(2)}</strong></p>
      <button onClick={remove}>Delete Order</button>
    </div>
  )
}

export default Order