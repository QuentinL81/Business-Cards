import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Create from './pages/Create'
import Home from './pages/Home';
import View from './pages/View';
import ViewAll from './pages/ViewAll';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home/>,
  },
  {
    path: "/create",
    element: <Create/>,
  },
  {
    path: "/cards",
    element: <ViewAll/>,
  },
  {
    path: "/cards/:id",
    element: <View/>,
  },
]);


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

