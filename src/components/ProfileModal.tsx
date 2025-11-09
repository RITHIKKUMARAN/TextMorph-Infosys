import { motion, AnimatePresence } from 'framer-motion';
import { X, Save, CheckCircle } from 'lucide-react';
import { useState } from 'react';
import { updateProfile } from '../api/api';
import toast from 'react-hot-toast';

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentSettings: {
    tone: string;
    language: string;
    style: string;
    depth: string;
  };
  onSave: (settings: { tone: string; language: string; style: string; depth: string }) => void;
}

export function ProfileModal({ isOpen, onClose, currentSettings, onSave }: ProfileModalProps) {
  const [settings, setSettings] = useState(currentSettings);
  const [saved, setSaved] = useState(false);

  const tones = ['Professional', 'Casual', 'Friendly', 'Academic', 'Creative'];
  const languages = ['English', 'Spanish', 'French', 'German', 'Chinese', 'Japanese'];
  const styles = ['Concise', 'Detailed', 'Balanced', 'Technical', 'Simple'];
  const depths = ['Shallow', 'Medium', 'Deep'];

  const handleSave = async () => {
    const username = localStorage.getItem('username');
    if (!username) {
      toast.error('Please login first');
      return;
    }

    try {
      await updateProfile({
        username,
        tone: settings.tone,
        style: settings.style,
        language: settings.language,
        depth: settings.depth,
      });
      onSave(settings);
      setSaved(true);
      toast.success('Profile updated successfully!');
      setTimeout(() => {
        setSaved(false);
        onClose();
      }, 1500);
    } catch (error: any) {
      const errorMessage = error.response?.data?.detail || 'Error updating profile';
      toast.error(errorMessage);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <div className="w-full max-w-2xl bg-slate-900/95 backdrop-blur-2xl rounded-3xl border border-violet-500/30 shadow-2xl shadow-violet-500/20 p-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold bg-gradient-to-r from-violet-400 to-emerald-400 bg-clip-text text-transparent">
                  Profile Settings
                </h2>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={onClose}
                  className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 transition-colors"
                >
                  <X className="w-6 h-6 text-slate-400" />
                </motion.button>
              </div>

              <div className="space-y-6 mb-8">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Default Tone
                  </label>
                  <select
                    value={settings.tone}
                    onChange={(e) => setSettings({ ...settings, tone: e.target.value })}
                    className="w-full p-3 bg-slate-800/50 border border-slate-700 rounded-xl text-white focus:ring-2 focus:ring-violet-500/50 transition-all"
                  >
                    {tones.map((tone) => (
                      <option key={tone} value={tone}>
                        {tone}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Default Language
                  </label>
                  <select
                    value={settings.language}
                    onChange={(e) => setSettings({ ...settings, language: e.target.value })}
                    className="w-full p-3 bg-slate-800/50 border border-slate-700 rounded-xl text-white focus:ring-2 focus:ring-violet-500/50 transition-all"
                  >
                    {languages.map((lang) => (
                      <option key={lang} value={lang}>
                        {lang}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Default Style
                  </label>
                  <select
                    value={settings.style}
                    onChange={(e) => setSettings({ ...settings, style: e.target.value })}
                    className="w-full p-3 bg-slate-800/50 border border-slate-700 rounded-xl text-white focus:ring-2 focus:ring-violet-500/50 transition-all"
                  >
                    {styles.map((style) => (
                      <option key={style} value={style}>
                        {style}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Default Depth
                  </label>
                  <select
                    value={settings.depth}
                    onChange={(e) => setSettings({ ...settings, depth: e.target.value })}
                    className="w-full p-3 bg-slate-800/50 border border-slate-700 rounded-xl text-white focus:ring-2 focus:ring-violet-500/50 transition-all"
                  >
                    {depths.map((depth) => (
                      <option key={depth} value={depth}>
                        {depth}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleSave}
                disabled={saved}
                className="w-full py-4 rounded-xl font-semibold bg-gradient-to-r from-violet-500 via-purple-500 to-emerald-500 text-white shadow-lg shadow-violet-500/50 hover:shadow-violet-500/70 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {saved ? (
                  <>
                    <CheckCircle className="w-5 h-5" />
                    <span>Profile Saved!</span>
                  </>
                ) : (
                  <>
                    <Save className="w-5 h-5" />
                    <span>Save Profile</span>
                  </>
                )}
              </motion.button>

              {saved && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-4 p-4 bg-emerald-500/20 border border-emerald-400/30 rounded-xl flex items-center gap-2 text-emerald-200"
                >
                  <CheckCircle className="w-5 h-5" />
                  <span>Your profile settings have been saved successfully!</span>
                </motion.div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
