import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import store from './store';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App';
import './styles/index.css';
import { Paths } from './paths';
import Register from './pages/Register';
import User from './pages/User';
import Login from './pages/Login';
import Settings from './pages/Settings';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const router = createBrowserRouter([
  {
    path: Paths.home,
    element: <App/>
  },
  {
    path: Paths.login,
    element: <Login/>
  },
  {
    path: Paths.register,
    element: <Register/>
  },
  {
    path: Paths.user,
    element: <User/>
  },
  {
    path: Paths.settings,
    element: <Settings/>
  },
])

root.render(
  <Provider store={store}>
    <RouterProvider router={router}/>
  </Provider>
);
reportWebVitals();
