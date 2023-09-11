import React, { Fragment } from 'react';

import classes from './NavigationItems.module.css';
import NavigationItem from './NavigationItem/NavigationItem';
import { Route,Routes } from 'react-router';
import Layout from '../../../hoc/Layout/Layout';

const navigationItems = () => (
    <Fragment>
    <ul className={classes.NavigationItems}>
   
        <NavigationItem link="/">Burger Builder</NavigationItem>
        <NavigationItem link="/Order">My Order</NavigationItem>
       
    </ul>
   
    </Fragment>
);

export default navigationItems;