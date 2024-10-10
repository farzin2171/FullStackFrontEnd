import {
  createTheme,
  CssBaseline,
  ThemeProvider,
  Container,
} from '@mui/material';
import './App.css';
import Header from './features/header/Header';
import { useEffect, useState } from 'react';
import { ToastContainer } from 'react-toastify';
import { Outlet } from 'react-router-dom';
import agent from './api/agent';
import LoadingComponent from './features/layout/LoadingComponent';
import { useAppDispatch } from './store/configureStore';
import { setBasket } from './features/basket/basketSlice';
import { fetchCurrentUser } from './features/account/accountSlice';

function App() {
  // const { setBasket } = useStoreContext();
  const dispatch = useAppDispatch();

  const [loading, setLoading] = useState(true);
  const [darkmode, setDarkMode] = useState(false);
  const paletteType = darkmode ? 'dark' : 'light';

  const theme = createTheme({
    palette: {
      mode: paletteType,
    },
  });

  function handleThemeChange() {
    setDarkMode(!darkmode);
  }

  useEffect(() => {
    dispatch(fetchCurrentUser());
    agent.basket
      .get()
      .then((basket) => dispatch(setBasket(basket)))
      .catch((error) => console.log(error))
      .finally(() => setLoading(false));
  }, [dispatch]);

  if (loading) {
    return <LoadingComponent message="initilizing"></LoadingComponent>;
  }
  return (
    <ThemeProvider theme={theme}>
      <ToastContainer
        position="bottom-right"
        hideProgressBar
        theme="colored"
      ></ToastContainer>
      <CssBaseline />
      <Header darkMode={darkmode} handleThemeChange={handleThemeChange} />
      <br />
      <br />
      <br />

      <Container>
        <Outlet></Outlet>
      </Container>
    </ThemeProvider>
  );
}

export default App;
