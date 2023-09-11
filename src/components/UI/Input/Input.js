import React from 'react'
import style from './Input.module.css'
function Input(props) {
  let InputElement;
  let inputStyles=[style.inputElement]

  if(props.inValid && props.isValidity && props.touched){
    inputStyles.push(style.inValid)
  }
  
  switch(props.elementType){
case 'input':
 InputElement= <input className={inputStyles.join(' ')} {...props.elementConfig} value={props.value}
 onChange={props.changed} />
  break;
case 'textarea': 
  InputElement=  <textarea className={inputStyles.join(' ')} {...props.elementConfig}  value={props.value} 
  onChange={props.changed}/>
  break;
  case 'select':
    InputElement= <select className={inputStyles.join(' ')} {...props.elementConfig}  value={props.value}
    onChange={props.changed}>
      {props.elementConfig.options.map(option=>{
        return <option key={option.value} value={option.value}
        onChange={props.changed}>{option.displayValue}</option>
      })}
    </select>
    break;
    default:
      InputElement= <input className={inputStyles.join(' ')} {...props.elementConfig}  value={props.value}
      onChange={props.changed}></input>
  }
  return(
    
    <div>
   <label className={style.label}> {props.label}</label>
      {InputElement}
    </div>
  )
 
}

export default Input