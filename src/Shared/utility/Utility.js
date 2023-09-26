
export const updatedObj=(oldState,newState)=>{
  return{
    ...oldState,
    ...newState

  }
}

export const CheckValidation =(value,rule)=>{
  let isValid=true;
  if(!rule){
    return true
  }
  if(rule.required){
    isValid=value.trim() !== '' && isValid
  }
  if(rule.minLength){
    isValid=value.length >= rule.minLength && isValid
  }
  if(rule.maxLength){
    isValid=value.length <= rule.maxLength && isValid
  }
  if(rule.isNumeric ===true){
    const pattern=/^\d+$/
    isValid=pattern.test(value) && isValid
  }
  if(rule.isEmail ===true ){
    const pattern=/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    isValid=pattern.test(value) && isValid
  }
  return isValid
  }