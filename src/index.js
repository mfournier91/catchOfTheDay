import React from 'react';
import { render } from 'react-dom'; //get the method called render in react-dom and assign it to render
import './css/style.css';
import { BrowserRouter, Match, Miss } from 'react-router';

import StorePicker from './components/StorePicker';
import App from './components/app';
import NotFound from './components/NotFound';

const Root = () => {
  return (
    <BrowserRouter basename="/catchOfTheDay/">
      <div>
        <Match exactly pattern="/" component={StorePicker} />
        <Match pattern="/store/:storeId" component={App} />
        <Miss component={NotFound} />
      </div>
    </BrowserRouter>
  )
}

render(<Root/>, document.getElementById('main'));
