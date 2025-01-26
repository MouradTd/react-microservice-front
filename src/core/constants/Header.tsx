import React, { useState } from 'react';

const links = [
    {
        href:'/',
        text:'Logout'
    },
    {
        href:'/patient',
        text:'Patient'
    },
    {
        href:'/appointements',
        text:'Rendez-vous'
    }
]
const Header: React.FC = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false); // State to manage menu visibility

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen); // Toggle menu visibility
    };

    return (
        <header className="bg-blue-500 text-white p-4">
            <div className="container mx-auto flex justify-between items-center">
                <img src="../../../src/assets/logo_white.png" alt="LOGO" className="h-12 w-auto" />
                <button onClick={toggleMenu} className="md:hidden focus:outline-none">
                    {/* Hamburger icon */}
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                    </svg>
                </button>
                {/* Popup for mobile menu */}
                {isMenuOpen && (
                    <div className="absolute right-2 mt-2 bg-white rounded-lg shadow-lg z-50 top-14">
                        <ul className="flex flex-col space-y-2 p-4">
                            {links.map((link, index) => (
                                <li key={index}>
                                    <a href={link.href} className="text-blue-500 hover:underline">{link.text}</a>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
                <nav className="hidden md:block">
                    <ul className="flex space-x-4">
                        {links.map((link, index) => (
                            <li key={index}>
                                <a href={link.href} className="hover:underline">{link.text}</a>
                            </li>
                        ))}
                    </ul>
                </nav>
            </div>
        </header>
    );
};

export default Header;