import { motion } from 'framer-motion';
import { FileText, GitCompare, History } from 'lucide-react';
import { useState } from 'react';
import { Sidebar } from './Sidebar';
import { ProcessTextTab } from './ProcessTextTab';
import { CompareTextTab } from './CompareTextTab';
import { HistoryTab } from './HistoryTab';

type Tab = 'process' | 'compare' | 'history';

interface DashboardProps {
  username: string;
}

export function Dashboard({ username }: DashboardProps) {
  const [activeTab, setActiveTab] = useState<Tab>('process');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [settings, setSettings] = useState({
    operation: 'Summarize',
    summaryType: 'Brief',
    depth: 'Medium',
    language: 'English',
    tone: 'Professional',
    style: 'Concise',
    readability: 'High School',
  });

  const tabs = [
    { id: 'process' as Tab, icon: FileText, label: 'Process Text' },
    { id: 'compare' as Tab, icon: GitCompare, label: 'Compare Texts' },
    { id: 'history' as Tab, icon: History, label: 'History' },
  ];

  const handleSettingsChange = (key: string, value: string) => {
    setSettings({ ...settings, [key]: value });
  };

  return (
    <div className="min-h-screen pt-20">
      <div className="container mx-auto px-6 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-5xl font-bold mb-3">
            <span className="bg-gradient-to-r from-violet-400 via-purple-400 to-emerald-400 bg-clip-text text-transparent">
              AI Text Processor
            </span>
          </h1>
          <p className="text-xl text-slate-400">Welcome, {username}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex justify-center mb-8"
        >
          <div className="inline-flex p-2 bg-slate-900/60 backdrop-blur-2xl rounded-2xl border border-violet-500/20 gap-2">
            {tabs.map((tab) => (
              <motion.button
                key={tab.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setActiveTab(tab.id)}
                className={`relative flex items-center gap-3 px-8 py-4 rounded-xl font-semibold transition-all ${
                  activeTab === tab.id
                    ? 'text-white'
                    : 'text-slate-400 hover:text-slate-300'
                }`}
              >
                {activeTab === tab.id && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 bg-gradient-to-r from-violet-500 to-purple-500 rounded-xl shadow-lg shadow-violet-500/50"
                  />
                )}
                <tab.icon className="w-5 h-5 relative z-10" />
                <span className="relative z-10">{tab.label}</span>
              </motion.button>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-slate-900/40 backdrop-blur-xl rounded-3xl border border-violet-500/20 shadow-2xl shadow-violet-500/10 overflow-hidden"
          style={{ minHeight: '600px' }}
        >
          <div className="flex h-full">
            {activeTab === 'process' && (
              <Sidebar
                isOpen={sidebarOpen}
                settings={settings}
                onSettingsChange={handleSettingsChange}
              />
            )}

            {activeTab === 'process' && <ProcessTextTab settings={settings} />}
            {activeTab === 'compare' && <CompareTextTab />}
            {activeTab === 'history' && <HistoryTab />}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
