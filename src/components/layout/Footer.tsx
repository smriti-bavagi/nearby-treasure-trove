
import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <Link to="/" className="font-bold text-lg text-primary">
              LocalSwap
            </Link>
            <p className="text-sm text-muted-foreground mt-1">
              Buy and sell items locally.
            </p>
          </div>

          <div className="flex flex-col md:flex-row gap-6 md:gap-12 mt-4 md:mt-0">
            <div>
              <h3 className="text-sm font-medium mb-2">Resources</h3>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li><Link to="/how-it-works" className="hover:text-primary transition-colors">How it Works</Link></li>
                <li><Link to="/safety-tips" className="hover:text-primary transition-colors">Safety Tips</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium mb-2">Company</h3>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li><Link to="/about" className="hover:text-primary transition-colors">About Us</Link></li>
                <li><Link to="/contact" className="hover:text-primary transition-colors">Contact</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium mb-2">Legal</h3>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li><Link to="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link></li>
                <li><Link to="/terms" className="hover:text-primary transition-colors">Terms of Use</Link></li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="text-center text-xs text-muted-foreground mt-8 pt-6 border-t">
          <p>&copy; {new Date().getFullYear()} LocalSwap. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
