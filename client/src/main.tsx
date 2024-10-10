import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { RouterProvider } from 'react-router-dom';
import { router } from './router/router.tsx';
import { StoreProvider } from './context/StoreContext.tsx';
import { Provider } from 'react-redux';
import { store } from './store/configureStore.ts';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <StoreProvider>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </StoreProvider>
  </StrictMode>
);
