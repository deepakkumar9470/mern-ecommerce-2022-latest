import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import "react-bootstrap/dist/react-bootstrap.min.js";
import 'react-alice-carousel/lib/alice-carousel.css';

import store from "./redux/store";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import persistStore from "redux-persist/es/persistStore";

// store to persit
const persistedStore = persistStore(store);

ReactDOM.render(
  <Provider store={store}>
  <PersistGate loading={<div>Loading..</div>} persistor={persistedStore}>
    <App />
  </PersistGate>
</Provider>
   
    ,
document.getElementById('root'));


