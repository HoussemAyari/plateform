import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { collection, addDoc, doc, updateDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase/config';
import { Save, Send } from 'lucide-react';
import { Modal } from '../components/Modal';

export const EditorPage = ({ navigateTo, user, article }) => {
  const { t } = useTranslation();
  const [title, setTitle] = useState(article ? article.title : '');
  const [content, setContent] = useState(article ? article.content : '');
  const [isSaving, setIsSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState(null);
  const [error, setError] = useState('');

  const quillModules = {
    toolbar: [
      [{ 'header': [1, 2, 3, false] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{'list': 'ordered'}, {'list': 'bullet'}],
      ['link', 'image', 'video'],
      ['clean']
    ],
  };

  const handleSave = async (status) => {
    if (!title.trim()) {
        setError(t('editor.errorTitleEmpty'));
        return;
    }
    setIsSaving(true);
    setError('');
    const articleData = {
        title,
        content,
        authorId: user.uid,
        status,
        updatedAt: serverTimestamp(),
    };

    try {
        if (article && article.id) {
            const articleRef = doc(db, 'articles', article.id);
            await updateDoc(articleRef, articleData);
        } else {
            const docRef = await addDoc(collection(db, 'articles'), {
                ...articleData,
                createdAt: serverTimestamp(),
            });
            navigateTo('editor', { id: docRef.id, ...articleData });
        }
        setLastSaved(new Date());
        if (status === 'published') {
            navigateTo('history');
        }
    } catch (err) {
        console.error("Error saving article: ", err);
        setError(t('editor.errorSaving'));
    } finally {
        setIsSaving(false);
    }
  };
  
  return (
    <div className="max-w-4xl mx-auto">
        <button onClick={() => navigateTo('history')} className="text-blue-600 hover:underline mb-4">{t('editor.backToHistory')}</button>
        <h2 className="text-3xl font-bold text-gray-800 mb-6">{article ? t('editor.editTitle') : t('editor.newTitle')}</h2>
        
        <div className="space-y-6">
            <input 
                type="text"
                placeholder={t('editor.titlePlaceholder')}
                value={title}
                onChange={e => setTitle(e.target.value)}
                className="w-full text-4xl font-bold p-2 border-b-2 border-gray-300 focus:border-blue-500 focus:outline-none bg-transparent"
            />
            <div className="bg-white rounded-lg shadow-sm editor-container">
                <ReactQuill
                    theme="snow"
                    value={content}
                    onChange={setContent}
                    modules={quillModules}
                    placeholder={t('editor.contentPlaceholder')}
                />
            </div>
        </div>

        <div className="mt-8 flex items-center justify-between">
            <div>
                {isSaving ? (
                    <span className="text-sm text-gray-500 animate-pulse">{t('editor.saving')}</span>
                ) : lastSaved && (
                     <span className="text-sm text-gray-500">{t('editor.lastSaved')} {lastSaved.toLocaleTimeString(undefined)}</span>
                )}
            </div>
            <div className="flex items-center space-x-4">
                <button 
                    onClick={() => handleSave('draft')}
                    disabled={isSaving}
                    className="flex items-center px-4 py-2 font-semibold text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 disabled:opacity-50 transition-colors"
                >
                    <Save className="w-5 h-5 mr-2" />
                    {t('editor.saveDraftButton')}
                </button>
                <button 
                    onClick={() => handleSave('published')}
                    disabled={isSaving}
                    className="flex items-center px-4 py-2 font-semibold text-white bg-blue-600 rounded-md hover:bg-blue-700 disabled:opacity-50 transition-colors"
                >
                    <Send className="w-5 h-5 mr-2" />
                    {t('editor.publishButton')}
                </button>
            </div>
        </div>
        {error && (
            <Modal
                title={t('editor.errorModalTitle')}
                message={error}
                onConfirm={() => setError('')}
                confirmText={t('editor.errorModalConfirm')}
                isErrorModal={true}
            />
        )}
    </div>
  );
};
