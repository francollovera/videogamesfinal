import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { BrowserRouter } from 'react-router-dom'; //permiten a los componentes acceder a la ubicacion actual y permite el enrutado.
import {Provider} from "react-redux";
//conecta la capa de react con redux;
import {store} from "./redux/store";
//carga el estado de la aplicacion.
import App from './App';


ReactDOM.render(
  <Provider store = {store}>
  <BrowserRouter>
    <App />
    </BrowserRouter>
    </Provider>,
  document.getElementById('root')
);


