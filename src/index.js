import React, { Suspense } from 'react'; // Importer Suspense
import ReactDOM from 'react-dom/client';
import { App } from './App';
import './index.css';

// Importer le fichier de configuration i18n
// Cette ligne est cruciale, elle active i18next
import './i18n';

const root = ReactDOM.createRoot(document.getElementById('root'));

// Le composant de chargement qui sera affiché pendant le chargement des traductions
const loadingMarkup = (
  <div className="flex items-center justify-center min-h-screen bg-gray-100">
    <div className="w-16 h-16 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
  </div>
);

root.render(
  <Suspense fallback={loadingMarkup}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Suspense>
);
