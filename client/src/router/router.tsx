import { createBrowserRouter } from 'react-router-dom';
import App from '../App';

// import AboutPage from '../features/about/AboutPage';
import Catalog from '../features/catalog/Catalog';
import HomePage from '../features/home/Home';
import ProductDetails from '../features/catalog/ProductDetails';
import ContactPage from '../features/contact/ContactPage';
import AboutPage from '../features/about/AboutPage';
import Login from '../features/account/Login';
import BasketPage from '../features/basket/BasketPage';

// import BasketPage from '../features/basket/BasketPage';
// import Login from '../features/account/Login';
// import Register from '../features/account/Register';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { path: '', element: <HomePage /> },
      { path: '/catalog', element: <Catalog /> },
      { path: '/catalog/:id', element: <ProductDetails /> },
      { path: '/about', element: <AboutPage /> },
      { path: '/contact', element: <ContactPage /> },
      { path: '/basket', element: <BasketPage /> },
      { path: '/login', element: <Login /> },
      //   { path: '/register', element: <Register /> },
    ],
  },
]);
