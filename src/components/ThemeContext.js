// ThemeContext.js
import { useState, createContext } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Main from '../Main';

export const ThemeContext = createContext();

function ThemeContextProvider() {
  const [theme, setTheme] = useState(false);

  const toggleTheme = () => {
    setTheme((prevTheme) => !prevTheme);
  };

  const darkTheme = createTheme({
    palette: {
      mode: theme ? 'dark' : 'light',
    },
  });

  return (
    <div className="App">
      <ThemeContext.Provider value={{ toggleTheme }}>
        <ThemeProvider theme={darkTheme}>
          <CssBaseline />
          <Main />
        </ThemeProvider>
      </ThemeContext.Provider>
    </div>
  );
}

export default ThemeContextProvider;
