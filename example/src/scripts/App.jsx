import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import Layout from './Layout';
import MainRouter from './MainRouter';

const App = () => (
  <BrowserRouter>
    <Layout>
      <MainRouter />
    </Layout>
  </BrowserRouter>
);

export default App;
