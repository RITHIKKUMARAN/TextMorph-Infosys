import { motion } from 'framer-motion';
import { Upload, FileText, File, CheckCircle } from 'lucide-react';
import { useState } from 'react';
import { extractPDF, extractDOCX } from '../api/api';
import toast from 'react-hot-toast';

interface FileUploaderProps {
  onTextExtracted: (text: string) => void;
}

export function FileUploader({ onTextExtracted }: FileUploaderProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState('');
  const [isExtracting, setIsExtracting] = useState(false);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    handleFile(file);
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  };

  const handleFile = async (file: File) => {
    setUploadedFile(file);
    setIsExtracting(true);
    
    try {
      let extractedText = '';
      
      if (file.name.endsWith('.pdf')) {
        const response = await extractPDF(file);
        extractedText = response.text;
      } else if (file.name.endsWith('.docx')) {
        const response = await extractDOCX(file);
        extractedText = response.text;
      } else if (file.name.endsWith('.txt')) {
        const text = await file.text();
        extractedText = text;
      } else {
        toast.error('Unsupported file type. Please upload PDF, DOCX, or TXT files.');
        setIsExtracting(false);
        return;
      }
      
      setPreview(extractedText);
      onTextExtracted(extractedText);
      toast.success('Text extracted successfully!');
    } catch (error: any) {
      const errorMessage = error.response?.data?.detail || 'Error extracting text from file';
      toast.error(errorMessage);
      setPreview('');
    } finally {
      setIsExtracting(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-slate-900/60 backdrop-blur-2xl rounded-2xl border border-violet-500/20 p-8"
    >
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`relative border-3 border-dashed rounded-2xl p-12 transition-all ${
          isDragging
            ? 'border-violet-400 bg-violet-500/10 shadow-lg shadow-violet-500/30'
            : 'border-slate-700 hover:border-violet-500/50'
        }`}
      >
        <input
          type="file"
          accept=".pdf,.docx,.txt"
          onChange={handleFileInput}
          className="absolute inset-0 opacity-0 cursor-pointer"
        />

        <div className="flex flex-col items-center gap-4 text-center">
          {isExtracting ? (
            <>
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
              >
                <Upload className="w-16 h-16 text-violet-400" />
              </motion.div>
              <p className="text-lg font-semibold text-violet-200">Extracting text...</p>
            </>
          ) : (
            <>
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ repeat: Infinity, duration: 2 }}
              >
                <Upload className="w-16 h-16 text-violet-400" />
              </motion.div>
              <div>
                <p className="text-lg font-semibold text-violet-200 mb-2">
                  Drop your file here or click to browse
                </p>
                <p className="text-sm text-slate-400">Supports PDF, DOCX, and TXT files</p>
              </div>
            </>
          )}
        </div>
      </div>

      {uploadedFile && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-6 space-y-4"
        >
          <div className="flex items-center gap-3 p-4 bg-emerald-500/10 border border-emerald-400/30 rounded-xl">
            <CheckCircle className="w-6 h-6 text-emerald-400" />
            <div className="flex-1">
              <p className="font-medium text-emerald-200">{uploadedFile.name}</p>
              <p className="text-sm text-emerald-300/70">
                {(uploadedFile.size / 1024).toFixed(2)} KB
              </p>
            </div>
            {uploadedFile.type.includes('pdf') && <FileText className="w-6 h-6 text-emerald-400" />}
            {uploadedFile.type.includes('word') && <File className="w-6 h-6 text-emerald-400" />}
            {uploadedFile.type.includes('text') && <FileText className="w-6 h-6 text-emerald-400" />}
          </div>

          <div className="p-4 bg-slate-800/50 border border-slate-700 rounded-xl">
            <p className="text-sm font-medium text-slate-300 mb-2">Preview:</p>
            <p className="text-slate-400 text-sm line-clamp-4">{preview}</p>
          </div>

          <div className="p-3 bg-blue-500/10 border border-blue-400/30 rounded-lg">
            <p className="text-sm text-blue-300">
              ✓ Content detected: {uploadedFile.type || 'Text file'}
            </p>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}
