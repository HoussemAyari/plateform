import React, { useState } from 'react';
import { useTranslation } from 'react-i18next'; // Importer le hook de traduction
import { signOut } from 'firebase/auth';
import { auth } from '../firebase/config';
import { Home, History, User, LogOut, BookOpen } from 'lucide-react';

import { NavItem } from '../components/NavItem';
import { HomePage } from './HomePage';
import { HistoryPage } from './HistoryPage';
import { ProfilePage } from './ProfilePage';
import { EditorPage } from './EditorPage';
import { LanguageSwitcher } from '../components/LanguageSwitcher'; // Importer le nouveau composant

export const Dashboard = ({ user }) => {
  const { t } = useTranslation(); // Initialiser la fonction de traduction
  const [activeView, setActiveView] = useState('home');
  const [editingArticle, setEditingArticle] = useState(null);

  const navigateTo = (view, article = null) => {
    setActiveView(view);
    setEditingArticle(article);
  };

  const handleSignOut = () => {
    signOut(auth);
  };

  const renderView = () => {
    switch (activeView) {
      case 'home':
        return <HomePage navigateTo={navigateTo} user={user} />;
      case 'history':
        return <HistoryPage navigateTo={navigateTo} user={user} />;
      case 'profile':
        return <ProfilePage user={user} />;
      case 'editor':
        return <EditorPage navigateTo={navigateTo} user={user} article={editingArticle} />;
      default:
        return <HomePage navigateTo={navigateTo} user={user} />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-100 font-sans">
      <aside className="w-64 bg-white shadow-md flex flex-col">
        <div className="p-6 text-center border-b">
           <BookOpen className="w-10 h-10 mx-auto text-blue-600" />
           <h1 className="mt-2 text-xl font-bold text-gray-800">Journalist</h1>
        </div>
        <nav className="flex-1 px-4 py-4">
          {/* Traduire les textes de navigation */}
          <NavItem icon={<Home />} text={t('dashboard.navHome')} active={activeView === 'home'} onClick={() => navigateTo('home')} />
          <NavItem icon={<History />} text={t('dashboard.navHistory')} active={activeView === 'history'} onClick={() => navigateTo('history')} />
          <NavItem icon={<User />} text={t('dashboard.navProfile')} active={activeView === 'profile'} onClick={() => navigateTo('profile')} />
        </nav>
        {/* mt-auto pousse ce bloc en bas de la sidebar */}
        <div className="p-4 border-t mt-auto">
          <div className="flex justify-center mb-4">
            <LanguageSwitcher />
          </div>
          <button onClick={handleSignOut} className="w-full flex items-center justify-center py-2 px-4 text-sm font-medium text-gray-600 rounded-md hover:bg-gray-200 hover:text-gray-800 transition-colors">
            <LogOut className="w-5 h-5 mr-3" />
            {t('dashboard.logoutButton')}
          </button>
        </div>
      </aside>
      <main className="flex-1 p-6 md:p-10 overflow-y-auto">
        {renderView()}
      </main>
    </div>
  );
};
