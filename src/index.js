import React from 'react';
import { createRoot} from 'react-dom/client';


import './index.css';
import App from './App';
import {BrowserRouter} from 'react-router-dom'
import { Provider } from 'react-redux';
import { applyMiddleware, combineReducers, createStore,compose } from 'redux';
import BurgerReducer from './components/Store/Reducer/Reducer';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { OrdersReducer } from './components/Store/Reducer/OrdersReducer';
import { AuthReducer } from './components/Store/Reducer/AuthReducer';
const app= document.getElementById('root');

const RootReducer=combineReducers({
 burger:BurgerReducer,
 orders:OrdersReducer,
 auth:AuthReducer
})
const middleware=[thunk]
let enhancers = applyMiddleware(...middleware);

if (process.env.NODE_ENV === 'development') {
  const composeEnhancers = composeWithDevTools({});
  enhancers = composeEnhancers(enhancers);
}

const store = createStore(RootReducer, enhancers);


const Root=createRoot(app)

Root.render(
  <Provider store={store}>
<BrowserRouter><App/></BrowserRouter>
</Provider>
)


// ReactDOM.render(<App />,);
// registerServiceWorker();
