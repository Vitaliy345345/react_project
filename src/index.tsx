import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import store from './store';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App';
import './styles/index.css';
import { Paths } from './paths';

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
    element: <h1>Login</h1>
  },
  {
    path: Paths.register,
    element: <h1>Register</h1>
  },
  {
    path: Paths.user,
    element: <h1>User</h1>
  },
  {
    path: Paths.settings,
    element: <h1>Settings</h1>
  },
])

root.render(
  <Provider store={store}>
    <RouterProvider router={router}/>
  </Provider>
);
reportWebVitals();
