import { motion } from 'framer-motion';
import { Mic, Square, Check, RotateCcw } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { transcribeAudio } from '../api/api';
import toast from 'react-hot-toast';

interface VoiceRecorderProps {
  onTranscription: (text: string) => void;
}

export function VoiceRecorder({ onTranscription }: VoiceRecorderProps) {
  const [isRecording, setIsRecording] = useState(false);
  const [transcription, setTranscription] = useState('');
  const [wordCount, setWordCount] = useState(0);
  const [isTranscribing, setIsTranscribing] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const streamRef = useRef<MediaStream | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, []);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;

      const mediaRecorder = new MediaRecorder(stream, {
        mimeType: 'audio/webm;codecs=opus'
      });
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = async () => {
        if (streamRef.current) {
          streamRef.current.getTracks().forEach(track => track.stop());
        }
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        await transcribeAudioBlob(audioBlob);
      };

      mediaRecorder.start();
      setIsRecording(true);
      setRecordingTime(0);
      setTranscription('');

      timerRef.current = setInterval(() => {
        setRecordingTime(prev => prev + 1);
      }, 1000);

      toast.success('Recording started');
    } catch (error: any) {
      console.error('Error starting recording:', error);
      toast.error('Failed to access microphone. Please check permissions.');
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    }
  };

  const transcribeAudioBlob = async (audioBlob: Blob) => {
    setIsTranscribing(true);
    try {
      const response = await transcribeAudio(audioBlob);
      const transcribedText = response.text;
      setTranscription(transcribedText);
      setWordCount(transcribedText.split(/\s+/).filter(Boolean).length);
      toast.success('Transcription completed!');
    } catch (error: any) {
      console.error('Transcription error:', error);
      const errorMessage = error.response?.data?.detail || 'Failed to transcribe audio';
      toast.error(errorMessage);
      setTranscription('');
    } finally {
      setIsTranscribing(false);
    }
  };

  const toggleRecording = () => {
    if (isRecording) {
      stopRecording();
    } else {
      startRecording();
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
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
            className="flex flex-col items-center gap-4"
          >
            <div className="flex gap-2">
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
            </div>
            <p className="text-violet-300 font-semibold">{formatTime(recordingTime)}</p>
            <p className="text-sm text-slate-400">Click the button again to stop recording</p>
          </motion.div>
        )}

        {isTranscribing && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center gap-3"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
              className="w-12 h-12 border-4 border-violet-500 border-t-transparent rounded-full"
            />
            <p className="text-violet-300 font-semibold">Transcribing audio...</p>
            <p className="text-sm text-slate-400">Please wait</p>
          </motion.div>
        )}

        {transcription && !isTranscribing && (
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
