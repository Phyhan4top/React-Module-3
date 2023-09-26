import React, { Component, useState } from "react";
import classes from "./FormData.module.css";

import Button from "../../../UI/Button/Button";

import Input from "../../../UI/Input/Input";
import { connect } from "react-redux";
import { makeOrder } from "../../../Store/Actions/orderActionCreactors";
import withErrorHandler from "../../../../hoc/withError";
import axios from "axios";
import Spinner from "../../../UI/Spinner/Spinner";
import { Navigate } from "react-router";
import { updatedObj,CheckValidation } from "../../../../Shared/utility/Utility";
class FormData extends Component {
  constructor(props) {
    super(props);

    this.state = {
      OrderElement: {
        name: {
          elementType: "input",
          elementConfig: {
            type: "text",
            placeholder: "Enter your name",
          },
          value: "",
          label: "Name",
          validity: {
            required: true,
          },
          valid: false,
          touched: false,
        },
        address: {
          elementType: "input",
          elementConfig: {
            type: "textarea",
            placeholder: "Enter your Address",
          },
          value: "",
          label: "Address",

          validity: {
            required: true,
          },
          valid: false,
          touched: false,
        },
        state: {
          elementType: "input",
          elementConfig: {
            type: "text",
            placeholder: "State",
          },
          value: "",
          label: "State",

          validity: {
            required: true,
          },
          valid: false,
          touched: false,
        },
        country: {
          elementType: "input",
          elementConfig: {
            type: "text",
            placeholder: "Country",
          },
          value: "",
          label: "Country",

          validity: {
            required: true,
          },
          valid: false,
          touched: false,
        },
        email: {
          elementType: "input",
          elementConfig: {
            type: "email",
            placeholder: "Enter your Address",
          },
          value: "",
          label: "Email",

          validity: {
            required: true,
            isEmail: true,
          },
          valid: false,
          touched: false,
        },
        phone: {
          elementType: "input",
          elementConfig: {
            type: "tel",
            placeholder: "Phone",
          },
          value: "",
          label: "Phone",

          validity: {
            required: true,
            minLength: 10,
            maxLength: 11,
            isNumeric: true,
          },
          valid: false,
          touched: false,
        },
        delivery: {
          elementType: "select",
          elementConfig: {
            options: [
              { value: "fastest", displayValue: "Fastest" },
              { value: "home-delivery", displayValue: "Home-Delivery" },
              { value: "pick up", displayValue: "Pick Up" },
            ],
          },
          value: "Fastest",
          label: "Delivery Method",
          validity: {},
          valid: true,
        },
      },
      formIsValid: false,
      summitted: false,
    };
  }
 
  InputChangeHandler = (event, inputIdent) => {
    const updatedOrder = { ...this.state.OrderElement };
    const updatedOrderElemet = updatedObj(updatedOrder[inputIdent], {
      value: event.target.value,
      touched: true,
      valid:CheckValidation(
        event.target.value,
        this.state.OrderElement[inputIdent].validity
      ),
    });
   
    updatedOrder[inputIdent] = { ...updatedOrderElemet };
    let formValid = true;
    for (let inputIdent in this.state.OrderElement) {
      formValid = this.state.OrderElement[inputIdent].valid && formValid;
    }
    this.setState({ OrderElement: updatedOrder, formIsValid: formValid });
  };
  HandleClick = (event) => {
    event.preventDefault();

    const formData = {};
    for (let inputIdent in this.state.OrderElement) {
      formData[inputIdent] = this.state.OrderElement[inputIdent].value;
    }

    const order = {
      ingredients: this.props.ingredients,
      totalPrice: this.props.totalPrice,
      info: formData,
    };
    // alert('You continue!');
    this.props.Order(this.props.token, order);

    this.setState({ summitted: true });
  };

  render() {
    const elementOrder = this.state.OrderElement;
    const formElement = [];
    for (let key in elementOrder) {
      formElement.push({ id: key, config: elementOrder[key] });
    }
    let form = (
      <div>
        <h2>Fill your contact details</h2>

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
            ORDER
          </Button>
        </form>
      </div>
    );

    if (this.props.loading) {
      form = <Spinner />;
    } else if (this.state.summitted) {
      form = <Navigate to="/" replace />;
    }
    return <div className={classes.Container}>{form}</div>;
  }
}

const mapStateToProps = (state) => {
  return {
    ingredients: state.burger.ingredients,
    totalPrice: state.burger.totalPrice,
    Orders: state.orders.orders,
    loading: state.orders.loading,
    token: state.auth.token,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    Order: (token, order) => dispatch(makeOrder(token, order)),
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(FormData, axios));
