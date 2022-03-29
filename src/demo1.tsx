import * as React from 'react';
import ReactDOM from 'react-dom';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import App from './App';
import theme from './theme';

import { amber, deepOrange, grey } from '@mui/material/colors';

import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import { useTheme, createTheme } from '@mui/material/styles';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';

const ColorModeContext = React.createContext({ toggleColorMode: () => {} });

function MyApp() {
  const theme = useTheme();
  const colorMode = React.useContext(ColorModeContext);
  return (
    <Box
      sx={{
        display: 'flex',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: 'background.default',
        color: 'text.primary',
        borderRadius: 1,
        p: 3,
      }}
    >
      {theme.palette.mode} mode
      <IconButton sx={{ ml: 1 }} onClick={colorMode.toggleColorMode} color="inherit">
        {theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
      </IconButton>
    </Box>
  );
}

export default function ToggleColorMode() {
  const [mode, setMode] = React.useState<'light' | 'dark'>('light');
  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
      },
    }),
    [],
  );

  const theme1 = React.useMemo(
    () =>
      createTheme({
          palette: {
            mode,
            ...(mode === 'light'
              ? {
                  // palette values for light mode
                  primary: amber,
                  divider: amber[200],
                  text: {
                    primary: grey[900],
                    secondary: grey[800],
                  },
                }
              : {
                  // palette values for dark mode
                  primary: deepOrange,
                  divider: deepOrange[700],
                  background: {
                    default: deepOrange[900],
                    paper: deepOrange[900],
                  },
                  text: {
                    primary: '#fff',
                    secondary: grey[500],
                  },
                }),
          },
      }),
    [mode],
  );
  
  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode,
        },
      }),
    [mode],
  );

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}
