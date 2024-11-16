import React from 'react';
import { FaTwitter, FaDiscord } from 'react-icons/fa';

const SocialLinks = () => {
  return (
    <div className="fixed left-6 bottom-6 z-50">
      <div className="flex flex-col gap-4">
        <a
          href="https://twitter.com/joinvanth"
          target="_blank"
          rel="noopener noreferrer"
          className="w-12 h-12 flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-500 rounded-full hover:opacity-90 transition-all duration-300"
        >
          <FaTwitter size={20} className="text-white" />
        </a>
        <a
          href="https://discord.gg/yourserver"
          target="_blank"
          rel="noopener noreferrer"
          className="w-12 h-12 flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-500 rounded-full hover:opacity-90 transition-all duration-300"
        >
          <FaDiscord size={20} className="text-white" />
        </a>
      </div>
    </div>
  );
};

export default SocialLinks;