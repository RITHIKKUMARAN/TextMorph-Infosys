import { motion } from 'framer-motion';
import { FileText, Keyboard, Mic, Upload, Rocket, Copy, Download, Volume2 } from 'lucide-react';
import { useState } from 'react';
import { VoiceRecorder } from './VoiceRecorder';
import { FileUploader } from './FileUploader';
import { OutputSection } from './OutputSection';
import { StatisticsSection } from './StatisticsSection';
import { processText, addHistory } from '../api/api';
import toast from 'react-hot-toast';

type InputMethod = 'text' | 'file' | 'voice';

interface ProcessTextTabProps {
  settings: {
    operation: string;
    summaryType: string;
    depth: string;
    language: string;
    tone: string;
    style: string;
    readability: string;
  };
}

export function ProcessTextTab({ settings }: ProcessTextTabProps) {
  const [inputMethod, setInputMethod] = useState<InputMethod>('text');
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [showOutput, setShowOutput] = useState(false);

  const handleProcess = async () => {
    if (!inputText.trim()) return;

    setIsProcessing(true);
    try {
      // Map frontend operation names to backend format
      const operationMap: Record<string, string> = {
        'Summarize': 'summarize',
        'Paraphrase': 'paraphrase',
        'Summarize & Translate': 'translate_summarize',
      };
      
      // Map summary types to backend format
      const summaryTypeMap: Record<string, string> = {
        'Brief': 'Abstractive',
        'Detailed': 'Abstractive',
        'Key Points': 'Extractive',
      };
      
      // Map depth levels to backend format
      const depthMap: Record<string, string> = {
        'Shallow': 'Brief',
        'Medium': 'Detailed',
        'Deep': 'Comprehensive',
      };
      
      const backendOperation = operationMap[settings.operation] || 'summarize';
      const backendSummaryType = summaryTypeMap[settings.summaryType] || 'Abstractive';
      const backendDepth = depthMap[settings.depth] || 'Detailed';
      
      const response = await processText({
        operation: backendOperation,
        text: inputText,
        language: settings.language,
        tone: settings.tone,
        adaptation: settings.style,
        summary_type: backendSummaryType,
        depth_level: backendDepth,
        readability_level: settings.readability,
      });
      
      setOutputText(response.result);
      setShowOutput(true);
      
      // Save to history
      const username = localStorage.getItem('username');
      if (username) {
        await addHistory({
          username,
          operation: settings.operation,
          params: {
            language: settings.language,
            tone: settings.tone,
            style: settings.style,
            summaryType: settings.summaryType,
            depth: settings.depth,
            readability: settings.readability,
          },
          output: response.result,
        });
      }
    } catch (error: any) {
      const errorMessage = error.response?.data?.detail || 'Error processing text';
      toast.error(errorMessage);
    } finally {
      setIsProcessing(false);
    }
  };

  const wordCount = inputText.trim().split(/\s+/).filter(Boolean).length;
  const charCount = inputText.length;

  return (
    <div className="flex-1 overflow-y-auto p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-slate-900/60 backdrop-blur-2xl rounded-2xl border border-violet-500/20 p-6"
        >
          <h3 className="text-lg font-semibold text-violet-200 mb-4">Input Method</h3>
          <div className="grid grid-cols-3 gap-4">
            {[
              { id: 'text' as InputMethod, icon: Keyboard, label: 'Type/Paste Text' },
              { id: 'file' as InputMethod, icon: Upload, label: 'Upload File' },
              { id: 'voice' as InputMethod, icon: Mic, label: 'Voice Input' },
            ].map((method) => (
              <motion.button
                key={method.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setInputMethod(method.id)}
                className={`flex flex-col items-center gap-3 p-6 rounded-xl border-2 transition-all ${
                  inputMethod === method.id
                    ? 'bg-violet-500/20 border-violet-400 shadow-lg shadow-violet-500/30'
                    : 'bg-slate-800/50 border-slate-700 hover:border-violet-500/50'
                }`}
              >
                <method.icon
                  className={`w-8 h-8 ${
                    inputMethod === method.id ? 'text-violet-400' : 'text-slate-400'
                  }`}
                />
                <span
                  className={`font-medium ${
                    inputMethod === method.id ? 'text-violet-200' : 'text-slate-300'
                  }`}
                >
                  {method.label}
                </span>
              </motion.button>
            ))}
          </div>
        </motion.div>

        {inputMethod === 'text' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-slate-900/60 backdrop-blur-2xl rounded-2xl border border-violet-500/20 p-6"
          >
            <textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Type or paste your text here..."
              className="w-full h-64 p-4 bg-slate-800/50 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-violet-500/50 resize-none"
            />
            <div className="mt-4 flex items-center justify-between text-sm text-slate-400">
              <span>Words: {wordCount}</span>
              <span>Characters: {charCount}</span>
            </div>
          </motion.div>
        )}

        {inputMethod === 'file' && (
          <FileUploader onTextExtracted={(text) => setInputText(text)} />
        )}

        {inputMethod === 'voice' && (
          <VoiceRecorder onTranscription={(text) => setInputText(text)} />
        )}

        {inputText && (
          <motion.button
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleProcess}
            disabled={isProcessing}
            className="w-full py-6 rounded-2xl font-bold text-lg bg-gradient-to-r from-emerald-500 via-violet-500 to-purple-500 text-white shadow-2xl shadow-violet-500/50 hover:shadow-violet-500/70 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
          >
            {isProcessing ? (
              <>
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
                  className="w-6 h-6 border-3 border-white border-t-transparent rounded-full"
                />
                <span>Processing...</span>
              </>
            ) : (
              <>
                <Rocket className="w-6 h-6" />
                <span>Process Text</span>
              </>
            )}
          </motion.button>
        )}

        {showOutput && outputText && (
          <>
            <OutputSection output={outputText} operation={settings.operation} />
            <StatisticsSection
              words={wordCount}
              characters={charCount}
              language={settings.language}
              operation={settings.operation}
            />
          </>
        )}
      </div>
    </div>
  );
}
