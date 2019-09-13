import { hot } from 'react-hot-loader';
import React from 'react';
import ReactDOM from 'react-dom';

import '../styles/index.css';

import App from './App';

const render = Component => {
  const root = document.getElementById('root');

  if (root) ReactDOM.render(<Component />, root);
};

export default render(hot(module)(App));
