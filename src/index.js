import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './app/App';
import { store } from './store';
import { Provider } from 'react-redux';

import AuthContextProvider from './contexts/AuthContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store={store}>
        <AuthContextProvider>
            <App />
        </AuthContextProvider>
    </Provider>
);
// root.render(
//     <React.StrictMode>
//         <App />
//     </React.StrictMode>
// );
