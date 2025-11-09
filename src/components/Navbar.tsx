import { motion } from 'framer-motion';
import { User, LogOut, Sparkles } from 'lucide-react';

interface NavbarProps {
  isLoggedIn: boolean;
  username?: string;
  onProfileClick: () => void;
  onLogout: () => void;
}

export function Navbar({ isLoggedIn, username, onProfileClick, onLogout }: NavbarProps) {
  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 z-50 bg-slate-900/80 backdrop-blur-xl border-b border-violet-500/20"
    >
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        <motion.div
          className="flex items-center gap-3"
          whileHover={{ scale: 1.05 }}
        >
          <Sparkles className="w-8 h-8 text-violet-400" />
          <span className="text-2xl font-bold bg-gradient-to-r from-violet-400 to-emerald-400 bg-clip-text text-transparent">
            TextMorph
          </span>
        </motion.div>

        {isLoggedIn && (
          <div className="flex items-center gap-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onProfileClick}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-violet-500/20 border border-violet-400/30 text-violet-200 hover:bg-violet-500/30 transition-all"
            >
              <User className="w-4 h-4" />
              <span>{username || 'My Profile'}</span>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onLogout}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-red-500/20 border border-red-400/30 text-red-200 hover:bg-red-500/30 transition-all"
            >
              <LogOut className="w-4 h-4" />
              <span>Logout</span>
            </motion.button>
          </div>
        )}
      </div>
    </motion.nav>
  );
}
