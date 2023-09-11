import React, { Component, useState } from 'react'
import classes from './FormData.module.css'
import style from '../../../UI/Input/Input.module.css'
import Button from '../../../UI/Button/Button'
import instance from '../../../../Axios/axios-order'
import Input from '../../../UI/Input/Input'
import { connect } from 'react-redux'
class  FormData extends Component {
  constructor(props) {
    super(props)
  
    this.state = {OrderElement:{
       name:{
        elementType:'input',
        elementConfig:{
          type:'text',
         placeholder:'Enter your name',
      
        },
        value:'',
        label:'Name',
        validity:{
          required:true
        },
        valid:false,
        touched:false
      },
       address:{
        elementType:'input',
        elementConfig:{
          type:'textarea',
         placeholder:'Enter your Address',
      
        },
        value:'',
        label:'Address',
        
        validity:{
          required:true
        },
        valid:false,
        touched:false
      },
       state:{
        elementType:'input',
        elementConfig:{
          type:'text',
         placeholder:'State',
      
        },
        value:'',
        label:'State',
        
        validity:{
          required:true
        },
        valid:false,
        touched:false
      },
       country:{
        elementType:'input',
        elementConfig:{
          type:'text',
         placeholder:'Country',
       
      
        },
        value:'',
          label:'Country',
        
          validity:{
            required:true
          },
          valid:false,
        touched:false
      },
       email:{
        elementType:'input',
        elementConfig:{
          type:'email',
         placeholder:'Enter your Address',
      
        },
        value:'',
        label:'Email',
        
        validity:{
          required:true
        },
        valid:false,
        touched:false
      },
       phone:{
        elementType:'input',
        elementConfig:{
          type:'tel',
         placeholder:'Phone',
      
        },
        value:'',
        label:'Phone',
        
        validity:{
          required:true,
          minLength:10,
          maxLength:11
        },
        valid:false,
        touched:false
      },
       delivery:{
        elementType:'select',
        elementConfig:{
      options:[
        {value:'fastest', displayValue:'Fastest'},
        {value:'home-delivery', displayValue:'Home-Delivery'},
        {value:'pick up', displayValue:'Pick Up'}
        
      ]
        },
        value:'',
        label:'Delivery Method',
        valid:true,
        validity:{}
      }
    },
  formIsValid:false
  }
  
}
CheckValidation=(value,rule)=>{
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
return isValid
}
InputChangeHandler=(event,inputIdent)=>{
const updatedOrder={...this.state.OrderElement}
const updatedOrderElemet={...updatedOrder[inputIdent]}
updatedOrderElemet.value=event.target.value;
updatedOrderElemet.touched=true;
updatedOrderElemet.valid=this.CheckValidation(updatedOrderElemet.value,updatedOrderElemet.validity)
updatedOrder[inputIdent]={...updatedOrderElemet}
let formIsValid=true
for(let inputIdent in this.state.OrderElement){
  formIsValid=this.state.OrderElement[inputIdent].valid && formIsValid
}
this.setState({OrderElement:{...updatedOrder},formIsValid:formIsValid})
console.log(updatedOrderElemet)
}
 HandleClick=(event)=>{
  const formData={}
  for(let inputIdent in this.state.OrderElement){
    formData[inputIdent]=this.state.OrderElement[inputIdent].value
   
  }
   console.log(formData)
event.preventDefault()
  const order={
               ingredients:this.props.ingredients ,
               totalPrice:this.props.totalPrice,
               info:formData
            }
            // alert('You continue!');
    instance.post('/orders.json',order)
    .then(res=>{
     
    console.log(res)})
    .catch(err=>{
 
    })
        
 }
 render(){
  const elementOrder=this.state.OrderElement
const formElement=[]
  for(let key in elementOrder){
    formElement.push({id:key,config:elementOrder[key]})
  
  }
  return (
    <div className={classes.Container}>
         <h2>Fill your contact details</h2>
      <form onSubmit={this.HandleClick}>
        {formElement.map(element=>{
          return <Input key={element.id}
           elementType={element.config.elementType} 
           elementConfig={element.config.elementConfig}
          value={element.config.value}
         label={element.config.label}
         inValid={!element.config.valid}
         isValidity={element.config.validity}
         touched={element.config.touched}
         changed={(event)=>{
          this.InputChangeHandler(event,element.id)
        }
      }
           ></Input>
        })}
        <Button btnType='Success'
       disabled ={!this.state.formIsValid}
        >ORDER</Button>
      </form>
    </div>
  ) 
 }
}
const mapStateToProps=(state)=>{
  return{
      ingredients:state.ingredients,
      totalPrice:state.totalPrice
  }
}
export default connect(mapStateToProps)(FormData) 