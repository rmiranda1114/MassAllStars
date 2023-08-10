import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { UserProvider } from './context/UserProvider.js';
import { FormProvider } from './context/FormProvider.js'
import './index.css';
import App from './App';



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <UserProvider>
        <FormProvider>
          <App />
        </FormProvider>
      </UserProvider>
    </BrowserRouter>
  </React.StrictMode>
);



