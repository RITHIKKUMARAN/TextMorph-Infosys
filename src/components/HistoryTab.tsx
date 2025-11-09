import { motion } from 'framer-motion';
import { History, Trash2, RotateCcw, ChevronDown, AlertTriangle } from 'lucide-react';
import { useState, useEffect } from 'react';
import { getHistory, clearHistory, type HistoryItem } from '../api/api';
import toast from 'react-hot-toast';

export function HistoryTab() {
  const [expandedItem, setExpandedItem] = useState<string | null>(null);
  const [showConfirmClear, setShowConfirmClear] = useState(false);
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadHistory();
  }, []);

  const loadHistory = async () => {
    const username = localStorage.getItem('username');
    if (!username) {
      setIsLoading(false);
      return;
    }

    try {
      const data = await getHistory(username);
      setHistory(data);
    } catch (error: any) {
      const errorMessage = error.response?.data?.detail || 'Error loading history';
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const formatTimestamp = (timestamp: string) => {
    try {
      const date = new Date(timestamp);
      const now = new Date();
      const diffMs = now.getTime() - date.getTime();
      const diffMins = Math.floor(diffMs / 60000);
      const diffHours = Math.floor(diffMs / 3600000);
      const diffDays = Math.floor(diffMs / 86400000);

      if (diffMins < 1) return 'Just now';
      if (diffMins < 60) return `${diffMins} minute${diffMins > 1 ? 's' : ''} ago`;
      if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
      if (diffDays < 7) return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
      return date.toLocaleDateString();
    } catch {
      return timestamp;
    }
  };

  const totalOps = history.length;
  const summaries = history.filter((h) => h.operation.includes('Summarize')).length;
  const paraphrases = history.filter((h) => h.operation === 'Paraphrase').length;

  const handleRestore = (item: HistoryItem) => {
    // This would restore the item to the processing tab
    // For now, we'll just show a toast
    toast.success('History item restored! (Feature to be implemented)');
  };

  const handleClearHistory = async () => {
    const username = localStorage.getItem('username');
    if (!username) return;

    try {
      await clearHistory(username);
      setHistory([]);
      setShowConfirmClear(false);
      toast.success('History cleared successfully!');
    } catch (error: any) {
      const errorMessage = error.response?.data?.detail || 'Error clearing history';
      toast.error(errorMessage);
    }
  };

  return (
    <div className="flex-1 overflow-y-auto p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-3 gap-6"
        >
          {[
            { label: 'Total Operations', value: totalOps, color: 'violet' },
            { label: 'Summaries', value: summaries, color: 'emerald' },
            { label: 'Paraphrases', value: paraphrases, color: 'purple' },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              className={`p-6 rounded-2xl bg-slate-900/60 backdrop-blur-2xl border border-${stat.color}-500/20`}
            >
              <p className="text-sm font-medium text-slate-400 mb-2">{stat.label}</p>
              <p className={`text-4xl font-bold text-${stat.color}-400`}>{stat.value}</p>
            </motion.div>
          ))}
        </motion.div>

        <div className="space-y-4">
          {isLoading ? (
            <div className="text-center py-12">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
                className="w-12 h-12 border-4 border-violet-500 border-t-transparent rounded-full mx-auto mb-4"
              />
              <p className="text-slate-400">Loading history...</p>
            </div>
          ) : history.length === 0 ? (
            <div className="text-center py-12">
              <History className="w-16 h-16 text-slate-600 mx-auto mb-4" />
              <p className="text-slate-400">No history yet. Start processing some text!</p>
            </div>
          ) : (
            history.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-slate-900/60 backdrop-blur-2xl rounded-2xl border border-violet-500/20 overflow-hidden"
            >
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <History className="w-6 h-6 text-violet-400" />
                    <div>
                      <h3 className="text-lg font-semibold text-violet-200">{item.operation}</h3>
                      <p className="text-sm text-slate-400">{formatTimestamp(item.timestamp)}</p>
                    </div>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleRestore(item)}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald-500/20 border border-emerald-400/30 text-emerald-200 hover:bg-emerald-500/30 transition-all"
                  >
                    <RotateCcw className="w-4 h-4" />
                    Restore
                  </motion.button>
                </div>

                <div className="p-4 bg-slate-800/50 border border-slate-700 rounded-xl mb-4">
                  <p className="text-slate-300 line-clamp-2">{item.preview}</p>
                </div>

                <button
                  onClick={() => setExpandedItem(expandedItem === item.id ? null : item.id)}
                  className="flex items-center gap-2 text-violet-400 hover:text-violet-300 transition-colors"
                >
                  <ChevronDown
                    className={`w-5 h-5 transition-transform ${
                      expandedItem === item.id ? 'rotate-180' : ''
                    }`}
                  />
                  <span className="font-medium">
                    {expandedItem === item.id ? 'Hide' : 'View'} Full Output
                  </span>
                </button>

                {expandedItem === item.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    className="mt-4 space-y-4"
                  >
                    <div className="p-4 bg-slate-800/50 border border-slate-700 rounded-xl max-h-64 overflow-y-auto">
                      <p className="text-slate-300 leading-relaxed">{item.fullOutput}</p>
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                      {Object.entries(item.parameters).map(([key, value]) => (
                        <div key={key} className="p-3 bg-slate-800/50 border border-slate-700 rounded-lg">
                          <p className="text-xs text-slate-500 uppercase mb-1">{key}</p>
                          <p className="text-sm font-medium text-slate-200">{value}</p>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </div>
            </motion.div>
            ))
          )}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-slate-900/60 backdrop-blur-2xl rounded-2xl border border-slate-700 p-6"
        >
          <h3 className="text-lg font-semibold text-slate-300 mb-4">Delete History</h3>

          {!showConfirmClear ? (
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setShowConfirmClear(true)}
              className="flex items-center gap-2 px-6 py-3 rounded-lg bg-slate-700/50 border border-slate-600 text-slate-300 hover:bg-slate-700 transition-all"
            >
              <Trash2 className="w-5 h-5" />
              Clear History
            </motion.button>
          ) : (
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-amber-400">
                <AlertTriangle className="w-5 h-5" />
                <span>Are you sure? This cannot be undone.</span>
              </div>
              <div className="flex gap-3 ml-auto">
                <button
                  onClick={() => setShowConfirmClear(false)}
                  className="px-4 py-2 rounded-lg bg-slate-700/50 text-slate-300 hover:bg-slate-700 transition-all"
                >
                  Cancel
                </button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleClearHistory}
                  className="px-4 py-2 rounded-lg bg-gradient-to-r from-red-500 to-pink-500 text-white shadow-lg shadow-red-500/30 hover:shadow-red-500/50 transition-all"
                >
                  Confirm Clear History
                </motion.button>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
