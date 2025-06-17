import React from 'react';

export const NavItem = ({ icon, text, active, onClick }) => {
    return (
        <a
            href="#"
            onClick={(e) => { e.preventDefault(); onClick(); }}
            className={`flex items-center px-4 py-3 my-1 text-sm font-medium rounded-lg transition-colors ${
                active
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
            }`}
        >
            {React.cloneElement(icon, { className: 'w-5 h-5 mr-3' })}
            {text}
        </a>
    );
};
