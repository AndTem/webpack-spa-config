import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import cameraSrc from 'images/camera.svg';

import Layout from './Layout';
import MainRouter from './MainRouter';

const App = () => (
  <BrowserRouter>
    <Layout>
      <MainRouter />
      s
    </Layout>
  </BrowserRouter>
);

export default App;
