import React, { useState, useEffect } from 'react';
import { TwitterIcon } from './icons/TwitterIcon';
import { FacebookIcon } from './icons/FacebookIcon';
import { LinkedInIcon } from './icons/LinkedInIcon';
import { ClipboardIcon } from './icons/ClipboardIcon';

interface ShareComponentProps {
  shareUrl: string;
  shareText: string;
}

const SocialButton: React.FC<{ href: string; children: React.ReactNode; label: string }> = ({ href, children, label }) => (
    <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Share on ${label}`}
        className="p-2 rounded-full bg-gray-700 hover:bg-indigo-600 text-gray-300 hover:text-white transition-colors"
    >
        {children}
    </a>
);

export const ShareComponent: React.FC<ShareComponentProps> = ({ shareUrl, shareText }) => {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (copied) {
      const timer = setTimeout(() => setCopied(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [copied]);

  const handleCopy = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
  };

  const encodedUrl = encodeURIComponent(shareUrl);
  const encodedText = encodeURIComponent(shareText);

  const shareLinks = {
    twitter: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedText}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    linkedin: `https://www.linkedin.com/shareArticle?mini=true&url=${encodedUrl}&title=${encodedText}`,
  };

  return (
    <div className="w-full p-4 bg-gray-800 rounded-xl shadow-lg border border-gray-700 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-sm font-medium text-gray-300">
            Enjoying this tool? Share it with your friends!
        </p>
        <div className="flex items-center gap-3">
            <SocialButton href={shareLinks.twitter} label="Twitter"><TwitterIcon /></SocialButton>
            <SocialButton href={shareLinks.facebook} label="Facebook"><FacebookIcon /></SocialButton>
            <SocialButton href={shareLinks.linkedin} label="LinkedIn"><LinkedInIcon /></SocialButton>
            <button
                onClick={handleCopy}
                className="flex items-center gap-2 pl-3 pr-4 py-2 rounded-full bg-gray-700 hover:bg-indigo-600 text-gray-300 hover:text-white transition-colors text-sm"
            >
                <ClipboardIcon copied={copied} />
                {copied ? 'Copied!' : 'Copy Link'}
            </button>
        </div>
    </div>
  );
};