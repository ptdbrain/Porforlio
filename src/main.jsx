import React from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import App from './App.jsx';
import '../editorial.css';
import '../cinema.css';
import '../work-sections.css';
import '../neural-intro.css';

const root = document.getElementById('root');
const pathname = window.location.pathname.replace(/\/+$/, '') || '/';
const prerendered = root.dataset.renderedPath === pathname;
const app = <React.StrictMode><App {...(prerendered ? {initialPath: pathname, initialLanguage: document.documentElement.lang || 'vi', hydrating: true} : {})} /></React.StrictMode>;
if (prerendered) hydrateRoot(root, app);
else createRoot(root).render(app);
