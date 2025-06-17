import React from 'react';
import { useTranslation } from 'react-i18next';
import { PlusCircle } from 'lucide-react';

export const HomePage = ({ navigateTo, user }) => {
  const { t } = useTranslation();

  return (
    <div>
        <h2 className="text-3xl font-bold text-gray-800">{t('home.greeting', { name: user.displayName || 'Journalist' })}</h2>
        <p className="mt-2 text-gray-600">{t('home.welcome')}</p>
        <div className="mt-8">
            <button
                onClick={() => navigateTo('editor')}
                className="inline-flex items-center px-6 py-3 font-bold text-white bg-blue-600 rounded-lg shadow-md hover:bg-blue-700 transition-transform transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
                <PlusCircle className="w-6 h-6 mr-3" />
                {t('home.writeArticleButton')}
            </button>
        </div>
        <div className="mt-12 p-6 bg-white rounded-lg shadow">
            <h3 className="text-xl font-semibold text-gray-800">{t('home.readyTitle')}</h3>
            <p className="mt-2 text-gray-600">{t('home.readyText')}</p>
        </div>
    </div>
  );
};
