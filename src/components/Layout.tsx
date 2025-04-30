
import React from "react";
import { Link } from "react-router-dom";
import { Newspaper, MessageCircleQuestion, Upload } from "lucide-react";

type LayoutProps = {
  children: React.ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen bg-newsprint-light">
      <header className="bg-newsprint-dark text-white py-6">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center px-4">
          <Link to="/" className="flex items-center space-x-3 mb-4 md:mb-0">
            <Newspaper size={28} className="text-chaos-orange" />
            <h1 className="text-2xl font-bold">
              <span className="truth transform rotate-1 inline-block">TRUTH</span>
              <span className="mx-1">/</span>
              <span className="chaos transform -rotate-1 inline-block">CHAOS</span>
            </h1>
          </Link>
          
          <nav>
            <ul className="flex space-x-6">
              <li>
                <Link to="/" className="hover:text-chaos-orange transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/chat" className="hover:text-chaos-orange transition-colors flex items-center">
                  <MessageCircleQuestion size={18} className="mr-1" />
                  AI Chat
                </Link>
              </li>
              <li>
                <Link to="/upload" className="hover:text-chaos-orange transition-colors flex items-center">
                  <Upload size={18} className="mr-1" />
                  Upload News
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </header>
      
      <main>
        {children}
      </main>
      
      <footer className="bg-newsprint-dark text-white py-6 mt-12">
        <div className="container mx-auto text-center">
          <p>© {new Date().getFullYear()} Truth/Chaos - Fake News Detection</p>
          <p className="text-sm mt-2 text-gray-400">
            Powered by Google Gemini AI
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
