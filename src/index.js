import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';

import { StoreProvider } from './store';
import reducers from './reducers';
import initialState from './store/initialState';

ReactDOM.render(
  <StoreProvider initialState={initialState} reducer={reducers}>
    <App />
  </StoreProvider>,
  document.getElementById('root')
);
