import React, { Fragment } from 'react';
import classes from './NavigationItems.module.css';
import NavigationItem from './NavigationItem/NavigationItem';
import { connect } from 'react-redux';

const navigationItems = (props)=>{
  let OrderNav
  if(!props.token){
    
  }
   return (
    <Fragment>
    <ul className={classes.NavigationItems} data-testId='ul'>
   
        <NavigationItem link="/" >Burger Builder</NavigationItem>
        
      { props.token ===null ?
        <NavigationItem link="/Auth">Sign in</NavigationItem>:
        <> <NavigationItem link="/Order">My Order</NavigationItem>
        <NavigationItem link="/SignOut">Sign Out</NavigationItem></>
        }
       
    </ul>
   
    </Fragment>);
}

const mapStateToProps=(state)=>{
    return{
      token:state.auth.token,
     
    }
  }
  
export default connect(mapStateToProps) (navigationItems);