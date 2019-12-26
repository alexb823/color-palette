import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/core/styles';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <BrowserRouter>
    {/* <ThemeProvider>
      <CssBaseline /> */}
      {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
      <App />
    {/* </ThemeProvider> */}
  </BrowserRouter>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
