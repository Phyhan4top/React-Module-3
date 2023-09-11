import React from 'react'
import { useNavigate } from 'react-router'
import BurgerBuilder from './BurgerBuilder'

function BurgerBuilderWrapper() {
  const navigate=useNavigate();
  return <BurgerBuilder navigate={navigate}/>
    

}

export default BurgerBuilderWrapper