import React from 'react';
import { render } from 'react-dom'; //get the method called render in react-dom and assign it to render
import './css/style.css';
import StorePicker from './components/StorePicker';
import App from './components/app'

render(<App/>, document.getElementById('main'));
