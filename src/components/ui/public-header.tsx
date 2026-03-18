import { Bot } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

export function PublicHeader({ onLoginClick }: { onLoginClick: () => void }) {
  const { user } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, hash: string) => {
    if (location.pathname === '/') {
      e.preventDefault();
      const element = document.getElementById(hash.replace('#', ''));
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
        window.history.pushState(null, '', hash);
      }
    }
  };

  return (
    <nav className="fixed top-0 w-full z-50 border-b border-zinc-800/50 bg-zinc-950/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <div className="w-8 h-8 rounded-lg bg-zinc-800 flex items-center justify-center">
            <Bot className="w-5 h-5 text-white" />
          </div>
          <span className="font-heading font-bold text-xl tracking-tight text-white">Auspexi</span>
        </Link>
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-zinc-400">
          <Link to="/#features" onClick={(e) => handleNavClick(e, '#features')} className="hover:text-white transition-colors">Features</Link>
          <Link to="/#pricing" onClick={(e) => handleNavClick(e, '#pricing')} className="hover:text-white transition-colors">Pricing</Link>
          <Link to="/blog" className="hover:text-white transition-colors">Blog</Link>
          <Link to="/faq" className="hover:text-white transition-colors">FAQ</Link>
        </div>
        <div className="flex items-center gap-4">
          {user ? (
            <Link to="/dashboard">
              <Button className="bg-indigo-600 hover:bg-indigo-700 text-white border-0">
                Go to Dashboard
              </Button>
            </Link>
          ) : (
            <>
              <button onClick={onLoginClick} className="text-sm font-medium text-zinc-300 hover:text-white transition-colors">
                Sign In
              </button>
              <Button onClick={onLoginClick} className="bg-white hover:bg-zinc-200 text-black border-0">
                Get Started
              </Button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
