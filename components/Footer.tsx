
import React from 'react';

interface FooterProps {
    navigate: (page: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ navigate }) => {
    const footerLinks = [
        { name: 'About', path: 'about' },
        { name: 'Contact', path: 'contact' },
        { name: 'Privacy Policy', path: 'privacy' },
        { name: 'Terms of Service', path: 'tos' },
        { name: 'FAQ', path: 'faq' },
    ];

    return (
        <footer className="bg-gray-900 border-t border-gray-800">
            <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
                <nav className="flex flex-wrap justify-center -mx-5 -my-2" aria-label="Footer">
                    {footerLinks.map((link) => (
                        <div key={link.name} className="px-5 py-2">
                            <button
                                onClick={() => navigate(link.path)}
                                className="text-base text-gray-400 hover:text-gray-300 transition-colors"
                            >
                                {link.name}
                            </button>
                        </div>
                    ))}
                </nav>
                <div className="mt-8">
                    <p className="text-center text-base text-gray-400">
                        &copy; {new Date().getFullYear()} Screen 2 Text. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
};
