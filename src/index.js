import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { AuthContextProvider } from './context/AuthContext';
import { NoteContext, NoteContextProvider } from './context/NoteContext';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <AuthContextProvider>
    <NoteContextProvider>
  <React.StrictMode>
    <App />
  </React.StrictMode>
    </NoteContextProvider>
  </AuthContextProvider>
);


