import { motion } from 'framer-motion';
import { GitCompare } from 'lucide-react';
import { useState } from 'react';
import { compareTexts } from '../api/api';
import toast from 'react-hot-toast';

export function CompareTextTab() {
  const [originalText, setOriginalText] = useState('');
  const [comparisonText, setComparisonText] = useState('');
  const [similarity, setSimilarity] = useState<number | null>(null);
  const [analysis, setAnalysis] = useState('');
  const [isComparing, setIsComparing] = useState(false);

  const handleCompare = async () => {
    if (!originalText.trim() || !comparisonText.trim()) return;

    setIsComparing(true);
    try {
      const response = await compareTexts(originalText, comparisonText);
      const similarityPercent = parseFloat(response.basic_similarity.replace('%', ''));
      setSimilarity(similarityPercent);
      setAnalysis(response.ai_analysis);
    } catch (error: any) {
      const errorMessage = error.response?.data?.detail || 'Error comparing texts';
      toast.error(errorMessage);
    } finally {
      setIsComparing(false);
    }
  };

  return (
    <div className="flex-1 overflow-y-auto p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid md:grid-cols-2 gap-6"
        >
          <div className="space-y-3">
            <label className="block text-lg font-semibold text-violet-200">Original Text</label>
            <textarea
              value={originalText}
              onChange={(e) => setOriginalText(e.target.value)}
              placeholder="Enter original text here..."
              className="w-full h-96 p-4 bg-slate-900/60 backdrop-blur-2xl border border-violet-500/20 rounded-2xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-violet-500/50 resize-none"
            />
          </div>

          <div className="space-y-3">
            <label className="block text-lg font-semibold text-emerald-200">Comparison Text</label>
            <textarea
              value={comparisonText}
              onChange={(e) => setComparisonText(e.target.value)}
              placeholder="Enter comparison text here..."
              className="w-full h-96 p-4 bg-slate-900/60 backdrop-blur-2xl border border-emerald-500/20 rounded-2xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 resize-none"
            />
          </div>
        </motion.div>

        <motion.button
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleCompare}
          disabled={isComparing || !originalText.trim() || !comparisonText.trim()}
          className="w-full py-6 rounded-2xl font-bold text-lg bg-gradient-to-r from-purple-500 via-pink-500 to-violet-500 text-white shadow-2xl shadow-purple-500/50 hover:shadow-purple-500/70 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
        >
          {isComparing ? (
            <>
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
                className="w-6 h-6 border-3 border-white border-t-transparent rounded-full"
              />
              <span>Comparing...</span>
            </>
          ) : (
            <>
              <GitCompare className="w-6 h-6" />
              <span>Compare Texts</span>
            </>
          )}
        </motion.button>

        {similarity !== null && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="bg-slate-900/60 backdrop-blur-2xl rounded-2xl border border-purple-500/20 p-8">
              <div className="text-center mb-6">
                <p className="text-lg font-semibold text-purple-200 mb-3">Basic Similarity</p>
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="inline-flex items-center justify-center w-32 h-32 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 shadow-2xl shadow-purple-500/50"
                >
                  <span className="text-4xl font-bold text-white">{similarity}%</span>
                </motion.div>
              </div>

              <div className="p-6 bg-slate-800/50 border border-slate-700 rounded-xl">
                <h4 className="text-lg font-semibold text-violet-200 mb-3">AI Analysis</h4>
                <p className="text-slate-300 leading-relaxed">{analysis}</p>
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="grid md:grid-cols-2 gap-6"
            >
              <div className="bg-slate-900/60 backdrop-blur-2xl rounded-2xl border border-violet-500/20 p-6">
                <h4 className="text-lg font-semibold text-violet-200 mb-4">Original Highlights</h4>
                <div className="p-4 bg-slate-800/50 border border-slate-700 rounded-xl max-h-64 overflow-y-auto">
                  <p className="text-slate-300 leading-relaxed">{originalText}</p>
                </div>
              </div>

              <div className="bg-slate-900/60 backdrop-blur-2xl rounded-2xl border border-emerald-500/20 p-6">
                <h4 className="text-lg font-semibold text-emerald-200 mb-4">Comparison Highlights</h4>
                <div className="p-4 bg-slate-800/50 border border-slate-700 rounded-xl max-h-64 overflow-y-auto">
                  <p className="text-slate-300 leading-relaxed">{comparisonText}</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
