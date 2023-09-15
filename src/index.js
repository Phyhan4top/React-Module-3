import React from 'react';
import { createRoot} from 'react-dom/client';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import {BrowserRouter} from 'react-router-dom'
import { Provider } from 'react-redux';
import { applyMiddleware, combineReducers, createStore } from 'redux';
import BurgerReducer from './components/Store/Reducer/Reducer';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { OrdersReducer } from './components/Store/Reducer/OrdersReducer';
const app= document.getElementById('root');
const RootReducer=combineReducers({
 burger:BurgerReducer,
 orders:OrdersReducer
})
const store=createStore(RootReducer,composeWithDevTools(applyMiddleware(thunk)))

const Root=createRoot(app)

Root.render(
  <Provider store={store}>
<BrowserRouter><App/></BrowserRouter>
</Provider>
)


// ReactDOM.render(<App />,);
// registerServiceWorker();
