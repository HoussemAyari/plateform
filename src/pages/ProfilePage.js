import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { updateProfile, updatePassword, reauthenticateWithCredential, EmailAuthProvider } from 'firebase/auth';
import { updateDoc, doc } from 'firebase/firestore';
import { auth, db } from '../firebase/config';

export const ProfilePage = ({ user }) => {
  const { t } = useTranslation();
  const [name, setName] = useState(user.displayName || '');
  const [newPassword, setNewPassword] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (message || error) {
      const timer = setTimeout(() => {
        setMessage('');
        setError('');
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [message, error]);

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    if (name.trim() === '') {
      setError(t('profile.errorNameEmpty'));
      return;
    }
    try {
      if (name !== user.displayName) {
        await updateProfile(auth.currentUser, { displayName: name });
        await updateDoc(doc(db, "users", user.uid), { name: name });
        setMessage(t('profile.successProfileUpdate'));
      }
    } catch (err) {
      setError(t('profile.errorProfileUpdate'));
      console.error(err);
    }
  };

  const handleUpdatePassword = async (e) => {
    e.preventDefault();
    if (!currentPassword || !newPassword) {
      setError(t('profile.errorPasswordFields'));
      return;
    }
    const credential = EmailAuthProvider.credential(user.email, currentPassword);
    try {
      await reauthenticateWithCredential(auth.currentUser, credential);
      await updatePassword(auth.currentUser, newPassword);
      setMessage(t('profile.successPasswordUpdate'));
      setCurrentPassword('');
      setNewPassword('');
    } catch (err) {
      setError(t('profile.errorWrongPassword'));
      console.error(err);
    }
  };

  return (
    <div>
      <h2 className="text-3xl font-bold text-gray-800">{t('profile.title')}</h2>
      <p className="mt-2 text-gray-600">{t('profile.subtitle')}</p>
      
      <div className="h-10 mt-4">
        {message && <div className="p-3 bg-green-100 text-green-800 rounded-md transition-opacity duration-300">{message}</div>}
        {error && <div className="p-3 bg-red-100 text-red-800 rounded-md transition-opacity duration-300">{error}</div>}
      </div>

      <div className="mt-4 max-w-2xl">
        <form onSubmit={handleUpdateProfile} className="p-6 bg-white rounded-lg shadow space-y-4">
            <h3 className="text-xl font-semibold text-gray-800">{t('profile.generalInfoTitle')}</h3>
            <div>
              <label className="text-sm font-bold text-gray-600 block">{t('login.fullNameLabel')}</label>
              <input type="text" value={name} onChange={e => setName(e.target.value)} className="w-full p-2 mt-1 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div>
              <label className="text-sm font-bold text-gray-600 block">{t('login.emailLabel')}</label>
              <input type="email" value={user.email} disabled className="w-full p-2 mt-1 bg-gray-200 border rounded-md cursor-not-allowed" />
            </div>
            <button type="submit" className="px-4 py-2 font-bold text-white bg-blue-600 rounded-md hover:bg-blue-700">{t('profile.updateProfileButton')}</button>
        </form>

        <form onSubmit={handleUpdatePassword} className="mt-8 p-6 bg-white rounded-lg shadow space-y-4">
            <h3 className="text-xl font-semibold text-gray-800">{t('profile.changePasswordTitle')}</h3>
            <div>
                <label className="text-sm font-bold text-gray-600 block">{t('profile.currentPasswordLabel')}</label>
                <input type="password" value={currentPassword} onChange={e => setCurrentPassword(e.target.value)} className="w-full p-2 mt-1 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div>
                <label className="text-sm font-bold text-gray-600 block">{t('profile.newPasswordLabel')}</label>
                <input type="password" value={newPassword} onChange={e => setNewPassword(e.target.value)} className="w-full p-2 mt-1 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
             <button type="submit" className="px-4 py-2 font-bold text-white bg-blue-600 rounded-md hover:bg-blue-700">{t('profile.changePasswordButton')}</button>
        </form>
      </div>
    </div>
  );
};
