import { motion } from 'framer-motion';
import { FileText, Type, Globe, Zap } from 'lucide-react';

interface StatisticsSectionProps {
  words: number;
  characters: number;
  language: string;
  operation: string;
}

export function StatisticsSection({
  words,
  characters,
  language,
  operation,
}: StatisticsSectionProps) {
  const stats = [
    { icon: Type, label: 'Words', value: words, color: 'violet' },
    { icon: FileText, label: 'Characters', value: characters, color: 'emerald' },
    { icon: Globe, label: 'Language', value: language, color: 'blue' },
    { icon: Zap, label: 'Operation', value: operation, color: 'purple' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-slate-900/60 backdrop-blur-2xl rounded-2xl border border-violet-500/20 p-6"
    >
      <h3 className="text-lg font-semibold text-violet-200 mb-6">Statistics</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            className={`relative p-6 rounded-xl bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-${stat.color}-500/30 overflow-hidden group hover:border-${stat.color}-500/50 transition-all`}
          >
            <div className={`absolute inset-0 bg-gradient-to-br from-${stat.color}-500/0 to-${stat.color}-500/10 opacity-0 group-hover:opacity-100 transition-opacity`} />
            <div className="relative">
              <stat.icon className={`w-8 h-8 text-${stat.color}-400 mb-3`} />
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-3xl font-bold text-white mb-1"
              >
                {typeof stat.value === 'number' ? (
                  <motion.span
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    {stat.value}
                  </motion.span>
                ) : (
                  stat.value
                )}
              </motion.p>
              <p className="text-sm text-slate-400">{stat.label}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
