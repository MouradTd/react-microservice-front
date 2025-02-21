import React from 'react';

const links = [
    {
        href: '/ressource',
        text: 'Ressource',
        submenu: [
            // { href: '/machine', text: 'Machine' },
            { href: '/products', text: 'Produit' },
            { href: '/product-consumption', text: 'Consomation des Produits' },
            { href: '/salle', text: 'Salle' },
        ],
    },
    {
        href: '/patient',
        text: 'Patient',
    },
    {
        href: '/appointements',
        text: 'Rendez-vous',
    },
];

const Sidebar: React.FC = () => {
    return (
        <aside className="bg-gray-800 text-white w-64 h-screen p-4 shadow-lg fixed rounded-lg">
            <h2 className="text-lg font-bold mb-4">Menu</h2>
            <nav>
                {links.map((link) => (
                    <div key={link.text} className="mb-2">
                        <a
                            href={link.href}
                            className="block hover:bg-gray-700 rounded-lg p-2 transition duration-200"
                        >
                            {link.text}
                        </a>
                        {link.submenu && (
                            <div className="ml-4">
                                {link.submenu.map((sub) => (
                                    <a
                                        key={sub.text}
                                        href={sub.href}
                                        className="block text-gray-400 hover:bg-gray-600 rounded-lg p-2 transition duration-200"
                                    >
                                        {sub.text}
                                    </a>
                                ))}
                            </div>
                        )}
                    </div>
                ))}
            </nav>
        </aside>
    );
};

export default Sidebar;