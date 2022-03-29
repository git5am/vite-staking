import * as React from 'react';
import ReactDOM from 'react-dom';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import App from './App';
import reportWebVitals from './reportWebVitals';
//import theme from './theme';
import { ThemeCtxProvider, useThemeMode } from "./hooks/themeContext";

const Root = () => {
  const { darkMode } = useThemeMode();
  
  const theme2 = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode: darkMode ? 'dark' : 'light',
        },
      }),
    [darkMode],
  );
  //const [mode, setMode] = React.useState<'light' | 'dark'>('light');
  //https://mui.com/customization/color/#picking-colors
  const theme = React.useMemo(
    () =>
      createTheme({
          palette: {
            ...(darkMode 
              ? {
                  // palette values for light mode
                  primary: {
                    main: '#FF6729',
                  },
                  secondary: {
                    main: '#C8440C',
                  },
                  //divider: '#fff',
                  background: {
                    default: '#FFFBF2',
                    paper: '#fff5de',
                  },
                  //text: {
                  //  primary: '#ebebeb',
                  //  secondary: '#9E9E9E',
                  //},
                }
              : {
                  // palette values for dark mode
                  primary: {
                    main: '#C8440C',
                  },
                  secondary: {
                    main: '#FF6729',
                  },
                  divider: '#515151',
                  background: {
                    default: '#303030',
                    paper: '#424242',
                  },
                  text: {
                    primary: '#cdcdcd',
                    secondary: '#cdcdcd',
                  },                  
              }),
          },
      }),
    [darkMode],
  );
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <ThemeCtxProvider>
      <Root />
    </ThemeCtxProvider>
  </React.StrictMode>,
  document.querySelector("#root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
