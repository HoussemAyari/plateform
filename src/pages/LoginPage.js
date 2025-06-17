import React, { useState } from 'react';
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  updateProfile 
} from 'firebase/auth';
import { setDoc, doc } from 'firebase/firestore';
import { auth, db } from '../firebase/config';
import { BookOpen } from 'lucide-react';

export const LoginPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');

  const handleAuthAction = async (e) => {
    e.preventDefault();
    setError('');
    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, email, password);
      } else {
        if(name.trim() === '') {
            setError("Le nom est requis.");
            return;
        }
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        await updateProfile(userCredential.user, { displayName: name });
        await setDoc(doc(db, "users", userCredential.user.uid), {
            name: name,
            email: email,
        });
      }
    } catch (err) {
       switch (err.code) {
        case 'auth/invalid-email':
          setError('Adresse e-mail invalide.');
          break;
        case 'auth/user-not-found':
          setError('Aucun compte trouvé avec cet e-mail.');
          break;
        case 'auth/wrong-password':
          setError('Mot de passe incorrect.');
          break;
        case 'auth/email-already-in-use':
          setError('Cette adresse e-mail est déjà utilisée.');
          break;
        case 'auth/weak-password':
          setError('Le mot de passe doit contenir au moins 6 caractères.');
          break;
        default:
          setError('Une erreur est survenue. Veuillez réessayer.');
      }
    }
  };
  
    return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 font-sans">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-xl shadow-lg">
        <div className="text-center">
            <BookOpen className="w-12 h-12 mx-auto text-blue-600" />
            <h2 className="mt-4 text-3xl font-bold text-gray-900">
                {isLogin ? 'Connexion' : 'Créer un compte'}
            </h2>
            <p className="mt-2 text-sm text-gray-600">
                Plateforme pour journalistes
            </p>
        </div>
        <form className="space-y-6" onSubmit={handleAuthAction}>
            {!isLogin && (
              <div>
                <label className="text-sm font-bold text-gray-600 block">Nom complet</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full p-3 mt-1 text-gray-900 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
            )}
            <div>
              <label className="text-sm font-bold text-gray-600 block">Adresse e-mail</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3 mt-1 text-gray-900 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="text-sm font-bold text-gray-600 block">Mot de passe</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3 mt-1 text-gray-900 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            {error && <p className="text-sm text-red-500 text-center">{error}</p>}
            <div>
              <button
                type="submit"
                className="w-full py-3 font-bold text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
              >
                {isLogin ? 'Se connecter' : "S'inscrire"}
              </button>
            </div>
        </form>
        <p className="text-sm text-center text-gray-600">
          {isLogin ? "Vous n'avez pas de compte ?" : 'Vous avez déjà un compte ?'}
          <button
            onClick={() => { setIsLogin(!isLogin); setError(''); }}
            className="ml-1 font-bold text-blue-600 hover:underline"
          >
            {isLogin ? "S'inscrire" : 'Se connecter'}
          </button>
        </p>
      </div>
    </div>
  );
};
