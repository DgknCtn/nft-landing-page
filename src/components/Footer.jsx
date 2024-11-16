import { FaHeart } from 'react-icons/fa';

function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="py-8 bg-black/50 backdrop-blur-sm">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <h3 className="text-2xl font-bold bg-gradient-to-r from-secondary to-accent bg-clip-text text-transparent">
              VANTH
            </h3>
          </div>
          <div className="flex items-center gap-2 text-gray-400">
            <span>Made with</span>
            <FaHeart className="text-secondary" />
            <span>© {year} VANTH. All rights reserved.</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;