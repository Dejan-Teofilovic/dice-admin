import { BrowserRouter } from 'react-router-dom';
import { createTheme, responsiveFontSizes, ThemeProvider } from '@mui/material'
import './App.css'
import Routes from './Routes'
import { AlertMessageProvider } from './contexts/AlertMessageContext'
import Loading from './components/Loading'
import AlertMessage from './components/AlertMessage'
import { LoadingProvider } from './contexts/LoadingContext';
import { UserProvider } from './contexts/UserContext';

let theme = createTheme({})
theme = responsiveFontSizes(theme)

function App() {
  return (
    <ThemeProvider theme={theme}>
      <AlertMessageProvider>
        <LoadingProvider>
          <UserProvider>
            <BrowserRouter>
              <Routes />
              <Loading />
              <AlertMessage />
            </BrowserRouter>
          </UserProvider>
        </LoadingProvider>
      </AlertMessageProvider>
    </ThemeProvider >
  );
}

export default App
