import React from 'react';
import { useTranslation } from 'react-i18next';

export const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  const activeLangStyle = 'font-bold text-blue-600 cursor-default';
  const inactiveLangStyle = 'hover:text-blue-600';

  return (
    <div className="flex items-center space-x-2 text-sm font-medium text-gray-500">
      <button
        onClick={() => changeLanguage('en')}
        className={i18n.resolvedLanguage === 'en' ? activeLangStyle : inactiveLangStyle}
        disabled={i18n.resolvedLanguage === 'en'}
      >
        EN
      </button>
      <span className="text-gray-300">|</span>
      <button
        onClick={() => changeLanguage('fr')}
        className={i18n.resolvedLanguage === 'fr' ? activeLangStyle : inactiveLangStyle}
        disabled={i18n.resolvedLanguage === 'fr'}
      >
        FR
      </button>
    </div>
  );
};
