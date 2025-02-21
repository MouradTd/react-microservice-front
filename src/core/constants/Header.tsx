import React, { useState } from 'react';

const links = [
    
    {
        href: '/',
        text: 'Logout',
    },
];

const Header: React.FC = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const handleMouseEnter = (text: string) => {
        setOpenSubmenu(text);
    };

    const handleMouseLeave = () => {
        setOpenSubmenu(null);
    };

    return (
        <header className="bg-blue-600 text-white p-4 shadow-md">
            <div className="container mx-auto flex justify-between items-center">
                <img src="../../../src/assets/logo_white.png" alt="LOGO" className="h-12 w-auto" />
                <button onClick={toggleMenu} className="md:hidden focus:outline-none">
                    {/* Hamburger icon */}
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                    </svg>
                </button>
                <nav className={`md:flex space-x-4 ${isMenuOpen ? 'block' : 'hidden'} md:block`}>
                    {links.map((link) => (
                        <div
                            key={link.text}
                            className="relative group"
                            onMouseEnter={() => handleMouseEnter(link.text)}
                            onMouseLeave={handleMouseLeave}
                        >
                            <a
                                href={link.href}
                                className="text-white hover:underline transition duration-200"
                            >
                                {link.text}
                            </a>
                            {link.submenu && openSubmenu === link.text && (
                                <div
                                    className="absolute left-0 mt-2 w-48 bg-white text-black rounded-md shadow-lg transition-opacity duration-200 opacity-100"
                                    onMouseEnter={() => handleMouseEnter(link.text)} // Keep submenu open when hovering over it
                                    onMouseLeave={handleMouseLeave} // Close submenu when leaving
                                >
                                    {link.submenu.map((sub) => (
                                        <a
                                            key={sub.text}
                                            href={sub.href}
                                            className="block px-4 py-2 text-sm hover:bg-gray-200 transition duration-200"
                                        >
                                            {sub.text}
                                        </a>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}
                </nav>
            </div>
        </header>
    );
};

export default Header;