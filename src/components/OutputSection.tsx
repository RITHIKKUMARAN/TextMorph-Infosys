import { motion } from 'framer-motion';
import { Copy, FileText, BookOpen, FileCode, Globe, Braces, Volume2, Download } from 'lucide-react';
import { useState } from 'react';
import { textToSpeech, exportText, downloadBlob, createAudioURL } from '../api/api';
import toast from 'react-hot-toast';

interface OutputSectionProps {
  output: string;
  operation: string;
}

export function OutputSection({ output, operation }: OutputSectionProps) {
  const [copied, setCopied] = useState(false);
  const [audioGenerated, setAudioGenerated] = useState(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [isGeneratingAudio, setIsGeneratingAudio] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(output);
    setCopied(true);
    toast.success('Copied to clipboard!');
    setTimeout(() => setCopied(false), 2000);
  };

  const handleGenerateAudio = async () => {
    setIsGeneratingAudio(true);
    try {
      const audioBlob = await textToSpeech(output, 'English');
      const url = createAudioURL(audioBlob);
      setAudioUrl(url);
      setAudioGenerated(true);
      toast.success('Audio generated successfully!');
    } catch (error: any) {
      const errorMessage = error.response?.data?.detail || 'Error generating audio';
      toast.error(errorMessage);
    } finally {
      setIsGeneratingAudio(false);
    }
  };

  const handleDownloadAudio = () => {
    if (audioUrl) {
      fetch(audioUrl)
        .then(res => res.blob())
        .then(blob => {
          downloadBlob(blob, 'output.mp3');
          toast.success('Audio downloaded!');
        });
    }
  };

  const handleExport = async (format: 'pdf' | 'docx' | 'md' | 'html' | 'json') => {
    try {
      const blob = await exportText({
        text: output,
        title: `${operation}_${new Date().toISOString().split('T')[0]}`,
        format,
      });
      const extension = format === 'docx' ? 'docx' : format;
      downloadBlob(blob, `${operation}_export.${extension}`);
      toast.success(`Exported as ${format.toUpperCase()}!`);
    } catch (error: any) {
      const errorMessage = error.response?.data?.detail || 'Error exporting file';
      toast.error(errorMessage);
    }
  };

  const exportButtons = [
    { icon: FileText, label: 'PDF', color: 'red' },
    { icon: BookOpen, label: 'Word', color: 'blue' },
    { icon: FileCode, label: 'Markdown', color: 'purple' },
    { icon: Globe, label: 'HTML', color: 'orange' },
    { icon: Braces, label: 'JSON', color: 'green' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="bg-slate-900/60 backdrop-blur-2xl rounded-2xl border border-emerald-500/20 p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold bg-gradient-to-r from-emerald-400 to-violet-400 bg-clip-text text-transparent">
            {operation} Output
          </h3>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleCopy}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-violet-500/20 border border-violet-400/30 text-violet-200 hover:bg-violet-500/30 transition-all"
          >
            <Copy className="w-4 h-4" />
            {copied ? 'Copied!' : 'Copy'}
          </motion.button>
        </div>

        <div className="p-6 bg-slate-800/50 border-2 border-emerald-500/30 rounded-xl max-h-96 overflow-y-auto shadow-lg shadow-emerald-500/10">
          <p className="text-slate-200 leading-relaxed">{output}</p>
        </div>

        <div className="mt-6">
          <p className="text-sm font-medium text-slate-300 mb-3">Export as:</p>
          <div className="grid grid-cols-5 gap-3">
            {exportButtons.map((btn) => {
              const formatMap: Record<string, 'pdf' | 'docx' | 'md' | 'html' | 'json'> = {
                'PDF': 'pdf',
                'Word': 'docx',
                'Markdown': 'md',
                'HTML': 'html',
                'JSON': 'json',
              };
              return (
                <motion.button
                  key={btn.label}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleExport(formatMap[btn.label])}
                  className={`group relative flex flex-col items-center gap-2 p-4 rounded-xl bg-slate-800/50 border border-slate-700 hover:border-${btn.color}-500/50 transition-all`}
                >
                  <btn.icon className={`w-6 h-6 text-slate-400 group-hover:text-${btn.color}-400 transition-colors`} />
                  <span className="text-xs font-medium text-slate-300">{btn.label}</span>
                  <div className={`absolute inset-0 rounded-xl bg-${btn.color}-500/0 group-hover:bg-${btn.color}-500/10 transition-all`} />
                </motion.button>
              );
            })}
          </div>
        </div>
      </div>

      <div className="bg-slate-900/60 backdrop-blur-2xl rounded-2xl border border-violet-500/20 p-6">
        <h3 className="text-lg font-semibold text-violet-200 mb-4">Audio Output</h3>

        {!audioGenerated ? (
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleGenerateAudio}
            disabled={isGeneratingAudio}
            className="w-full py-4 rounded-xl font-semibold bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isGeneratingAudio ? (
              <>
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
                  className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                />
                <span>Generating...</span>
              </>
            ) : (
              <>
                <Volume2 className="w-5 h-5" />
                <span>Generate Audio File</span>
              </>
            )}
          </motion.button>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            <div className="p-4 bg-slate-800/50 border border-slate-700 rounded-xl">
              <div className="flex items-center gap-4">
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                  className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center"
                >
                  <Volume2 className="w-6 h-6 text-white" />
                </motion.div>
                <div className="flex-1">
                  <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: '0%' }}
                      animate={{ width: '100%' }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="h-full bg-gradient-to-r from-purple-500 to-pink-500"
                    />
                  </div>
                </div>
              </div>
            </div>

            {audioUrl && (
              <audio controls className="w-full mb-4">
                <source src={audioUrl} type="audio/mpeg" />
                Your browser does not support the audio element.
              </audio>
            )}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleDownloadAudio}
              className="w-full py-3 rounded-xl font-semibold bg-emerald-500/20 border border-emerald-400/30 text-emerald-200 hover:bg-emerald-500/30 transition-all flex items-center justify-center gap-2"
            >
              <Download className="w-5 h-5" />
              Download MP3
            </motion.button>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}
