
import Input from '../UI/Input/Input'
import Button from  '../UI/Button/Button'
import React, { Component } from 'react'
import Spinner from '../UI/Spinner/Spinner'
import { connect } from 'react-redux'
import { SignAuth } from '../Store/Actions/AuthActionCreator'
import instance from '../../Axios/axios-order'
import { getIdToken, getIdTokenResult } from 'firebase/auth'
import { redirect,Navigate } from 'react-router'

export class Authentication extends Component {
  state={Controls:{
    email:{
      elementType:'input',
      elementConfig:{
        type:'email',
       placeholder:'Enter your Email',
    
      },
      value:'',
      label:'email',
      validity:{
        required:true
      },
      valid:false,
      touched:false
    }, 
    password:{
      elementType:'input',
      elementConfig:{
        type:'password',
       placeholder:'Enter your  Password',
    
      },
      value:'',
      label:'Password',
      validity:{
        required:true,
        minLength:7,
        maxLength:12
      },
      valid:false,
      touched:false
    }
  },
  formIsValid:false,
  SignIn:true

  }

componentDidMount(){
 
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

    InputChangeHandler=(event,ControlName)=>{
      const updatedControls={
        ...this.state.Controls,
        [ControlName]:{...this.state.Controls[ControlName],
          value:event.target.value,
          valid:this.CheckValidation(
           event.target.value,this.state.Controls[ControlName].value
          ),
          touched:true
        }

      
      }
      
      // updatedOrder[inputIdent]={...updatedOrderElemet}
      let formValid=true
      for(let inputIdent in this.state.Controls){
        formValid=this.state.Controls[inputIdent].valid && formValid;
       
      }
      
      this.setState({Controls:updatedControls,formIsValid:formValid})
      
      }
     
      HandleClick=(event)=>{
      event.preventDefault()
      
 
  this.props.onSignUp(this.state.Controls.email.value,this.state.Controls.password.value,this.state.SignIn)
  
       }

       SignUpHandler=()=>{
        this.setState({SignIn:!this.state.SignIn})
       } 
      
  render() {
    let displayErr;
    if(this.props.error){
     displayErr=<div>{this.props.error}</div>
      
    }
 setTimeout(()=>displayErr,200)
    const elementOrder=this.state.Controls
    const formElement=[]
      for(let key in elementOrder){
        formElement.push({id:key,config:elementOrder[key]})
      
      }
      let form=(<div>
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
        >Continue</Button>
      </form>
      
      </div>
       )
    
      if(this.props.loading){
        form=<Spinner/>
      }
     let logIn
      if(this.props.token !== null){
logIn=<Navigate to='/' state={{from:'/Auth'}} replace/>
      }
    return (
      <div style={{textAlign:'center'}}>
        {logIn}
        {displayErr}
       {form}
       <Button btnType='Danger' clicked={this.SignUpHandler} >Switch to {!this.state.SignIn?'Sign In':'Sign Up'}</Button>
      </div>
    )
  }
}
const mapStateToProps=(state)=>{
  return{
    ingredients:state.burger.ingredients,
    token:state.auth.token,
    error:state.auth.error,
    loading:state.auth.loading
  }
}
const mapDispatchToProps=(dispatch)=>{
  return{
   onSignUp:(email,password,isSignIn)=>dispatch(SignAuth(email,password,isSignIn))
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(Authentication) 