import { motion } from 'framer-motion';
import { Mic, Square, Check, RotateCcw } from 'lucide-react';
import { useState } from 'react';

interface VoiceRecorderProps {
  onTranscription: (text: string) => void;
}

export function VoiceRecorder({ onTranscription }: VoiceRecorderProps) {
  const [isRecording, setIsRecording] = useState(false);
  const [transcription, setTranscription] = useState('');
  const [wordCount, setWordCount] = useState(0);

  const toggleRecording = () => {
    if (isRecording) {
      setIsRecording(false);
      const mockTranscription = 'This is a mock transcription. In production, this would use the Web Speech API or a backend service.';
      setTranscription(mockTranscription);
      setWordCount(mockTranscription.split(/\s+/).filter(Boolean).length);
    } else {
      setIsRecording(true);
      setTranscription('');
      setWordCount(0);
    }
  };

  const handleUseText = () => {
    onTranscription(transcription);
  };

  const handleClear = () => {
    setTranscription('');
    setWordCount(0);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-slate-900/60 backdrop-blur-2xl rounded-2xl border border-violet-500/20 p-8"
    >
      <div className="flex flex-col items-center gap-8">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={toggleRecording}
          className={`relative w-32 h-32 rounded-full flex items-center justify-center transition-all ${
            isRecording
              ? 'bg-gradient-to-br from-red-500 to-pink-500 shadow-2xl shadow-red-500/50'
              : 'bg-gradient-to-br from-violet-500 to-purple-500 shadow-2xl shadow-violet-500/50'
          }`}
        >
          {isRecording ? (
            <>
              <Square className="w-12 h-12 text-white" />
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
                className="absolute inset-0 rounded-full border-4 border-red-300/50"
              />
            </>
          ) : (
            <Mic className="w-12 h-12 text-white" />
          )}
        </motion.button>

        {isRecording && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex gap-2"
          >
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                animate={{
                  scaleY: [1, 2, 1],
                }}
                transition={{
                  repeat: Infinity,
                  duration: 0.8,
                  delay: i * 0.1,
                }}
                className="w-2 h-8 bg-gradient-to-t from-violet-500 to-purple-500 rounded-full"
              />
            ))}
          </motion.div>
        )}

        {transcription && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full space-y-4"
          >
            <textarea
              value={transcription}
              onChange={(e) => {
                setTranscription(e.target.value);
                setWordCount(e.target.value.split(/\s+/).filter(Boolean).length);
              }}
              className="w-full h-48 p-4 bg-slate-800/50 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-violet-500/50 resize-none"
            />

            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-400">Words: {wordCount}</span>

              <div className="flex gap-3">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleClear}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-700/50 border border-slate-600 text-slate-300 hover:bg-slate-700 transition-all"
                >
                  <RotateCcw className="w-4 h-4" />
                  Clear & Record Again
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleUseText}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-emerald-500 to-green-500 text-white shadow-lg shadow-emerald-500/30 hover:shadow-emerald-500/50 transition-all"
                >
                  <Check className="w-4 h-4" />
                  Use This Text
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}
