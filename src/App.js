import React from 'react';
import Routes from './routes';
import './global.css'

import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#8A63FF',
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#FBD56F',
      contrastText: '#333',
    }
  },
});

export default function App() {
   
  return (
    <ThemeProvider theme={theme}>
      <Routes/>
    </ThemeProvider>
  );
}