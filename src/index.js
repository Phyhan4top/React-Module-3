import React from 'react';
import { createRoot} from 'react-dom/client';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import {BrowserRouter} from 'react-router-dom'
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import Reducer from './components/Store/Reducer';
const app= document.getElementById('root');

const store=createStore(Reducer)

const Root=createRoot(app)

Root.render(
  <Provider store={store}>
<BrowserRouter><App/></BrowserRouter>
</Provider>
)


// ReactDOM.render(<App />,);
// registerServiceWorker();
