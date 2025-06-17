import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { collection, query, where, onSnapshot, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../firebase/config';
import { Edit, Trash2 } from 'lucide-react';
import { Modal } from '../components/Modal';

export const HistoryPage = ({ navigateTo, user }) => {
  const { t, i18n } = useTranslation();
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [articleToDelete, setArticleToDelete] = useState(null);

  useEffect(() => {
    const q = query(collection(db, 'articles'), where('authorId', '==', user.uid));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const articlesData = [];
      querySnapshot.forEach((doc) => {
        articlesData.push({ id: doc.id, ...doc.data() });
      });
      articlesData.sort((a, b) => (b.updatedAt?.toDate() || 0) - (a.updatedAt?.toDate() || 0));
      setArticles(articlesData);
      setLoading(false);
    });
    return () => unsubscribe();
  }, [user.uid]);

  const openDeleteModal = (id) => {
    setArticleToDelete(id);
    setShowDeleteModal(true);
  };

  const handleDelete = async () => {
    if (!articleToDelete) return;
    try {
        await deleteDoc(doc(db, "articles", articleToDelete));
    } catch (error) {
        console.error("Error deleting article: ", error);
    } finally {
        setShowDeleteModal(false);
        setArticleToDelete(null);
    }
  };

  return (
    <div>
      <h2 className="text-3xl font-bold text-gray-800">{t('history.title')}</h2>
      <p className="mt-2 text-gray-600">{t('history.subtitle')}</p>
      <div className="mt-8 bg-white rounded-lg shadow overflow-hidden">
        {loading ? (
            <p className="p-6 text-gray-500">{t('history.loading')}</p>
        ) : articles.length === 0 ? (
            <p className="p-6 text-gray-500">{t('history.noArticles')}</p>
        ) : (
          <ul className="divide-y divide-gray-200">
            {articles.map((article) => (
              <li key={article.id} className="p-4 sm:p-6 flex items-center justify-between hover:bg-gray-50">
                <div className="flex-1 min-w-0">
                  <p className="text-lg font-semibold text-gray-900 truncate">{article.title || t('history.untitled')}</p>
                  <p className="text-sm text-gray-500 mt-1">
                    {t('history.lastModified')}: {article.updatedAt ? new Date(article.updatedAt.toDate()).toLocaleString(i18n.language) : 'N/A'}
                    <span className={`ml-3 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        article.status === 'published' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                    }`}>
                        {article.status === 'published' ? t('history.published') : t('history.draft')}
                    </span>
                  </p>
                </div>
                <div className="flex items-center ml-4 space-x-2">
                    <button onClick={() => navigateTo('editor', article)} className="p-2 text-gray-500 hover:text-blue-600 rounded-full hover:bg-gray-200 transition-colors">
                        <Edit className="w-5 h-5" />
                    </button>
                    <button onClick={() => openDeleteModal(article.id)} className="p-2 text-gray-500 hover:text-red-600 rounded-full hover:bg-gray-200 transition-colors">
                        <Trash2 className="w-5 h-5" />
                    </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
      {showDeleteModal && (
        <Modal
          title={t('history.confirmDeleteTitle')}
          message={t('history.confirmDeleteMessage')}
          onConfirm={handleDelete}
          onCancel={() => setShowDeleteModal(false)}
          confirmText={t('history.deleteButton')}
        />
      )}
    </div>
  );
};
