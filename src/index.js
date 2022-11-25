import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { UserProvider } from './context/UserContext';
import LanguageDetector from 'i18next-browser-languagedetector';
import HttpApi from 'i18next-http-backend';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const root = ReactDOM.createRoot(document.getElementById('root'));

//translation setup
i18n.use(initReactI18next)
    .use(LanguageDetector)
    .use(HttpApi)
    .init({
        backend: {
            loadPath: '/assets/translation/{{lng}}.json',
        },
        fallbackLng: 'en',
        datection: {
            order: ['cookie', 'htmlTag', 'localStorage', 'path', 'subdomain'],
            caches: ['cookie'],
        },
    });

root.render(
    <Suspense fallback={<div></div>}>
        <BrowserRouter>
            <UserProvider>
                <App />
            </UserProvider>
        </BrowserRouter>
    </Suspense>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
