import React from 'react';
import { AlertTriangle } from 'lucide-react';

export const Modal = ({ title, message, onConfirm, onCancel, confirmText = "Confirmer", isErrorModal = false }) => {
  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md mx-auto">
        <div className="p-6">
          <div className="flex items-start">
             <div className={`mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full ${isErrorModal ? 'bg-red-100' : 'bg-blue-100'} sm:mx-0 sm:h-10 sm:w-10`}>
                <AlertTriangle className={`h-6 w-6 ${isErrorModal ? 'text-red-600' : 'text-blue-600'}`} aria-hidden="true" />
            </div>
            <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
              <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                {title}
              </h3>
              <div className="mt-2">
                <p className="text-sm text-gray-500">
                  {message}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
          <button
            type="button"
            className={`w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 text-base font-medium text-white ${isErrorModal ? 'bg-red-600 hover:bg-red-700' : 'bg-blue-600 hover:bg-blue-700'} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm`}
            onClick={onConfirm}
          >
            {confirmText}
          </button>
          {!isErrorModal && (
            <button
              type="button"
              className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:w-auto sm:text-sm"
              onClick={onCancel}
            >
              Annuler
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
