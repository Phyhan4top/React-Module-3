import Input from "../UI/Input/Input";
import Button from "../UI/Button/Button";
import React, { Component } from "react";
import Spinner from "../UI/Spinner/Spinner";
import { connect } from "react-redux";
import { SignAuth } from "../Store/Actions/AuthActionCreator";

import {  Navigate } from "react-router";
import { updatedObj,CheckValidation } from "../../Shared/utility/Utility";

export class Authentication extends Component {
  state = {
    Controls: {
      email: {
        elementType: "input",
        elementConfig: {
          type: "email",
          placeholder: "Enter your Email",
        },
        value: "",
        label: "email",
        validity: {
          required: true,
          isEmail: true,
        },
        valid: false,
        touched: false,
      },
      password: {
        elementType: "input",
        elementConfig: {
          type: "password",
          placeholder: "Enter your  Password",
        },
        value: "",
        label: "Password",
        validity: {
          required: true,
          minLength: 7,
          maxLength: 12,
        },
        valid: false,
        touched: false,
      },
    },
    formIsValid: false,
    SignIn: true,
  };

  InputChangeHandler = (event, ControlName) => {
    const updatedControls = updatedObj(this.state.Controls, {
      [ControlName]: updatedObj(this.state.Controls[ControlName], {
        value: event.target.value,
        valid:CheckValidation(
          event.target.value,
          this.state.Controls[ControlName].validity
        ),
        touched: true,
      }),
    });

    let formValid = true;
    for (let inputIdent in this.state.Controls) {
      formValid = this.state.Controls[inputIdent].valid && formValid;
    }

    this.setState({ Controls: updatedControls, formIsValid: formValid });
  };

  HandleClick = (event) => {
    event.preventDefault();

    this.props.onSignUp(
      this.state.Controls.email.value,
      this.state.Controls.password.value,
      this.state.SignIn
    );


  };

  SignUpHandler = () => {
    this.setState({ SignIn: !this.state.SignIn });
  };

  render() {
    const error=this.props.error
    let displayErr;
    if (error) {
      displayErr =<div>{this.props.error}</div>
    }
    
    const elementOrder = this.state.Controls;
    const formElement = [];
    for (let key in elementOrder) {
      formElement.push({ id: key, config: elementOrder[key] });
    }
   
    
    let form = (
        <div>
          <form onSubmit={this.HandleClick}>
            {formElement.map((element) => {
              return (
                <Input
                  key={element.id}
                  elementType={element.config.elementType}
                  elementConfig={element.config.elementConfig}
                  value={element.config.value}
                  label={element.config.label}
                  inValid={!element.config.valid}
                  isValidity={element.config.validity}
                  touched={element.config.touched}
                  changed={(event) => {
                    this.InputChangeHandler(event, element.id);
                  }}
                ></Input>
              );
            })}
            <Button btnType="Success" disabled={!this.state.formIsValid}>
              {this.state.SignIn ? "SIGN IN" : "SIGN UP"}
            </Button>
          </form>
        </div>
      );
  
      if (this.props.loading) {
        form = <Spinner />;
      }else if(this.props.token){
       form= <Navigate to="/"  replace />;
      }else{
       form=(
          <div style={{ textAlign: "center" }}>
           
            {displayErr}
            {form}
            <Button btnType="Danger" clicked={this.SignUpHandler}>
              SWITCH TO {!this.state.SignIn ? "SIGN IN" : "SIGN UP"}
            </Button>
          </div>
        );
      }
    
     
    
    return form
  }
}
const mapStateToProps =(state)=>{
  return {
    ingredients: state.burger.ingredients,
    token: state.auth.token,
    error: state.auth.error,
    loading: state.auth.loading,
    netErr: state.auth.netErr,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    onSignUp: (email, password, isSignIn) =>
      dispatch(SignAuth(email, password, isSignIn)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Authentication);
