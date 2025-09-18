import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <div className="fixed top-0 left-0 w-full bg-white/90 backdrop-blur-md z-50 shadow-sm">
            <nav className="container mx-auto px-4 py-3 flex justify-between items-center">
                {/* Logo/Nombre */}
                <div className="flex items-center">
                    <Link to="/" className="text-xl font-bold text-gray-800">Federico Zoppi</Link>
                </div>

                {/* Menú para desktop - centrado al 80% */}
                <div className="hidden md:flex w-[80%] justify-end">
                    <div className="flex space-x-8">

                        <Link to="/about" className="text-gray-600 hover:text-blue-500 transition-colors duration-300 font-medium">Quien soy</Link>
                        <Link to="/services" className="text-gray-600 hover:text-blue-500 transition-colors duration-300 font-medium">Que hago</Link>
                        <Link to="/vision" className="text-gray-600 hover:text-blue-500 transition-colors duration-300 font-medium">Mi Vision</Link>
                        <Link to="/contact" className="text-gray-600 hover:text-blue-500 transition-colors duration-300 font-medium">Contacto</Link>
                    </div>
                </div>

                {/* Espacio para balancear el diseño */}
                <div className="hidden md:block w-[10%]"></div>

                {/* Botón menú móvil */}
                <button 
                    className="md:hidden text-gray-600 focus:outline-none"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        {isMenuOpen ? (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        ) : (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                        )}
                    </svg>
                </button>
            </nav>

            {/* Menú móvil */}
            {isMenuOpen && (
                <div className="md:hidden bg-white border-t border-gray-100 py-4 px-4">
                    <div className="flex flex-col space-y-3">
                        <Link to="/home" className="text-gray-600 hover:text-blue-500 transition-colors duration-300 py-2 px-4 rounded-md hover:bg-gray-50" onClick={() => setIsMenuOpen(false)}>Home</Link>
                        <Link to="/about" className="text-gray-600 hover:text-blue-500 transition-colors duration-300 py-2 px-4 rounded-md hover:bg-gray-50" onClick={() => setIsMenuOpen(false)}>Quien soy</Link>
                        <Link to="/services" className="text-gray-600 hover:text-blue-500 transition-colors duration-300 py-2 px-4 rounded-md hover:bg-gray-50" onClick={() => setIsMenuOpen(false)}>Que hago</Link>
                        <Link to="/vision" className="text-gray-600 hover:text-blue-500 transition-colors duration-300 py-2 px-4 rounded-md hover:bg-gray-50" onClick={() => setIsMenuOpen(false)}>Mi Vision</Link>
                        <Link to="/contact" className="text-gray-600 hover:text-blue-500 transition-colors duration-300 py-2 px-4 rounded-md hover:bg-gray-50" onClick={() => setIsMenuOpen(false)}>Contacto</Link>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Navbar;