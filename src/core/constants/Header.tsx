import React from 'react';

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
    return (
        <header className="bg-blue-500 text-white p-4">
            <div className="container mx-auto flex justify-between items-center">
                <img src="../../../src/assets/logo_white.png" alt="LOGO" className="h-12 w-auto" />
                <nav>
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