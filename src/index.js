import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { ThemeProvider } from 'react-jss';
import Theme from './utils/theme';
import App from './App';
import './index.css';
import { AuthProvider } from './context/Auth';

ReactDOM.render(
    <AuthProvider>
        <ThemeProvider theme={Theme}>
            <Router>
                <App />
            </Router>
        </ThemeProvider>
    </AuthProvider>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
