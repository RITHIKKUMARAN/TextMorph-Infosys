import { motion } from 'framer-motion';
import { ChevronDown, Info, Settings, Zap } from 'lucide-react';
import { useState } from 'react';

interface SidebarProps {
  isOpen: boolean;
  settings: {
    operation: string;
    summaryType: string;
    depth: string;
    language: string;
    tone: string;
    style: string;
    readability: string;
  };
  onSettingsChange: (key: string, value: string) => void;
}

export function Sidebar({ isOpen, settings, onSettingsChange }: SidebarProps) {
  const [expandedSection, setExpandedSection] = useState<string | null>('custom');

  const presets = [
    'Quick Summary',
    'Professional Rewrite',
    'Casual Tone',
    'Academic Paper',
    'Social Media Post',
  ];

  const operations = ['Summarize', 'Paraphrase', 'Summarize & Translate'];
  const summaryTypes = ['Brief', 'Detailed', 'Key Points'];
  const depths = ['Shallow', 'Medium', 'Deep'];
  const languages = ['English', 'Spanish', 'French', 'German', 'Chinese', 'Japanese'];
  const tones = ['Professional', 'Casual', 'Friendly', 'Academic', 'Creative'];
  const styles = ['Concise', 'Detailed', 'Balanced', 'Technical', 'Simple'];
  const readabilities = ['Elementary', 'Middle School', 'High School', 'College', 'Professional'];

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ x: -300, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: -300, opacity: 0 }}
      className="w-80 h-full bg-slate-900/60 backdrop-blur-2xl border-r border-violet-500/20 overflow-y-auto"
    >
      <div className="p-6 space-y-6">
        <div>
          <button
            onClick={() => setExpandedSection(expandedSection === 'presets' ? null : 'presets')}
            className="w-full flex items-center justify-between p-4 bg-violet-500/10 border border-violet-400/30 rounded-xl hover:bg-violet-500/20 transition-all"
          >
            <div className="flex items-center gap-2">
              <Zap className="w-5 h-5 text-violet-400" />
              <span className="font-semibold text-violet-200">Quick Presets</span>
            </div>
            <ChevronDown
              className={`w-5 h-5 text-violet-400 transition-transform ${
                expandedSection === 'presets' ? 'rotate-180' : ''
              }`}
            />
          </button>

          {expandedSection === 'presets' && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              className="mt-2 space-y-2"
            >
              {presets.map((preset) => (
                <button
                  key={preset}
                  className="w-full p-3 text-left bg-slate-800/50 hover:bg-slate-800 border border-slate-700 rounded-lg text-slate-300 transition-all"
                >
                  {preset}
                </button>
              ))}
            </motion.div>
          )}
        </div>

        <div>
          <button
            onClick={() => setExpandedSection(expandedSection === 'custom' ? null : 'custom')}
            className="w-full flex items-center justify-between p-4 bg-emerald-500/10 border border-emerald-400/30 rounded-xl hover:bg-emerald-500/20 transition-all"
          >
            <div className="flex items-center gap-2">
              <Settings className="w-5 h-5 text-emerald-400" />
              <span className="font-semibold text-emerald-200">Custom Settings</span>
            </div>
            <ChevronDown
              className={`w-5 h-5 text-emerald-400 transition-transform ${
                expandedSection === 'custom' ? 'rotate-180' : ''
              }`}
            />
          </button>

          {expandedSection === 'custom' && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              className="mt-4 space-y-4"
            >
              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-slate-300 mb-2">
                  Operation
                  <Info className="w-4 h-4 text-slate-500 cursor-help" />
                </label>
                <select
                  value={settings.operation}
                  onChange={(e) => onSettingsChange('operation', e.target.value)}
                  className="w-full p-3 bg-slate-800/50 border border-slate-700 rounded-lg text-white focus:ring-2 focus:ring-emerald-500/50 transition-all"
                >
                  {operations.map((op) => (
                    <option key={op} value={op}>
                      {op}
                    </option>
                  ))}
                </select>
              </div>

              {settings.operation.includes('Summarize') && (
                <>
                  <div>
                    <label className="flex items-center gap-2 text-sm font-medium text-slate-300 mb-2">
                      Summary Type
                      <Info className="w-4 h-4 text-slate-500 cursor-help" />
                    </label>
                    <select
                      value={settings.summaryType}
                      onChange={(e) => onSettingsChange('summaryType', e.target.value)}
                      className="w-full p-3 bg-slate-800/50 border border-slate-700 rounded-lg text-white focus:ring-2 focus:ring-emerald-500/50 transition-all"
                    >
                      {summaryTypes.map((type) => (
                        <option key={type} value={type}>
                          {type}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="flex items-center gap-2 text-sm font-medium text-slate-300 mb-2">
                      Depth
                      <Info className="w-4 h-4 text-slate-500 cursor-help" />
                    </label>
                    <select
                      value={settings.depth}
                      onChange={(e) => onSettingsChange('depth', e.target.value)}
                      className="w-full p-3 bg-slate-800/50 border border-slate-700 rounded-lg text-white focus:ring-2 focus:ring-emerald-500/50 transition-all"
                    >
                      {depths.map((depth) => (
                        <option key={depth} value={depth}>
                          {depth}
                        </option>
                      ))}
                    </select>
                  </div>
                </>
              )}

              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-slate-300 mb-2">
                  Language
                  <Info className="w-4 h-4 text-slate-500 cursor-help" />
                </label>
                <select
                  value={settings.language}
                  onChange={(e) => onSettingsChange('language', e.target.value)}
                  className="w-full p-3 bg-slate-800/50 border border-slate-700 rounded-lg text-white focus:ring-2 focus:ring-emerald-500/50 transition-all"
                >
                  {languages.map((lang) => (
                    <option key={lang} value={lang}>
                      {lang}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-slate-300 mb-2">
                  Tone
                  <Info className="w-4 h-4 text-slate-500 cursor-help" />
                </label>
                <select
                  value={settings.tone}
                  onChange={(e) => onSettingsChange('tone', e.target.value)}
                  className="w-full p-3 bg-slate-800/50 border border-slate-700 rounded-lg text-white focus:ring-2 focus:ring-emerald-500/50 transition-all"
                >
                  {tones.map((tone) => (
                    <option key={tone} value={tone}>
                      {tone}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-slate-300 mb-2">
                  Style
                  <Info className="w-4 h-4 text-slate-500 cursor-help" />
                </label>
                <select
                  value={settings.style}
                  onChange={(e) => onSettingsChange('style', e.target.value)}
                  className="w-full p-3 bg-slate-800/50 border border-slate-700 rounded-lg text-white focus:ring-2 focus:ring-emerald-500/50 transition-all"
                >
                  {styles.map((style) => (
                    <option key={style} value={style}>
                      {style}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-slate-300 mb-2">
                  Readability
                  <Info className="w-4 h-4 text-slate-500 cursor-help" />
                </label>
                <select
                  value={settings.readability}
                  onChange={(e) => onSettingsChange('readability', e.target.value)}
                  className="w-full p-3 bg-slate-800/50 border border-slate-700 rounded-lg text-white focus:ring-2 focus:ring-emerald-500/50 transition-all"
                >
                  {readabilities.map((level) => (
                    <option key={level} value={level}>
                      {level}
                    </option>
                  ))}
                </select>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
