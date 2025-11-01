import React from 'react';
import { TwitterIcon } from './icons/TwitterIcon';
import { FacebookIcon } from './icons/FacebookIcon';
import { LinkedInIcon } from './icons/LinkedInIcon';

export const Footer: React.FC = () => {
    const footerLinks = [
        { name: 'About', href: '/about' },
        { name: 'Contact', href: '/contact' },
        { name: 'Privacy Policy', href: '/privacy-policy' },
        { name: 'Terms of Service', href: '/terms-of-service' },
        { name: 'FAQ', href: '/faq' },
    ];

    const socialLinks = [
        { name: 'Twitter', href: 'https://twitter.com/mosagraphic', icon: <TwitterIcon /> },
        { name: 'Facebook', href: 'https://facebook.com/mosagraphic', icon: <FacebookIcon /> },
        { name: 'LinkedIn', href: 'https://linkedin.com/company/mosagraphic', icon: <LinkedInIcon /> },
    ];

    return (
        <footer className="bg-gray-900 border-t border-gray-800">
            <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
                <nav className="flex flex-wrap justify-center -mx-5 -my-2" aria-label="Footer">
                    {footerLinks.map((link) => (
                        <div key={link.name} className="px-5 py-2">
                            <a
                                href={link.href}
                                className="text-base text-gray-400 hover:text-gray-300 transition-colors"
                            >
                                {link.name}
                            </a>
                        </div>
                    ))}
                </nav>
                <div className="mt-8 flex justify-center space-x-6">
                    {socialLinks.map((item) => (
                        <a key={item.name} href={item.href} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-gray-300 transition-colors">
                            <span className="sr-only">{item.name}</span>
                            {item.icon}
                        </a>
                    ))}
                </div>
                <div className="mt-8">
                    <p className="text-center text-base text-gray-400">
                        &copy; {new Date().getFullYear()} mosagraphic. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
};
