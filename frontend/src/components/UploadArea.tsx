import { useRef, useState } from 'react';
import { Camera, Upload, FileImage, HardDrive } from 'lucide-react';
import { motion } from 'motion/react';

interface UploadAreaProps {
  onImageSelect: (file: File) => void;
  isProcessing: boolean;
  isDark: boolean;
}

export function UploadArea({ onImageSelect, isProcessing, isDark }: UploadAreaProps) {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

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
    if (file && file.type.startsWith('image/')) {
      onImageSelect(file);
      // Clear the file input value to allow selecting the same file again
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onImageSelect(file);
      // Clear the input value to allow selecting the same file again
      e.target.value = '';
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-2xl mx-auto"
    >
      <div
        onClick={handleClick}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`
          relative cursor-pointer
          backdrop-blur-xl ${isDark ? 'bg-white/[0.05]' : 'bg-black/[0.03]'}
          border-2 border-dashed rounded-2xl sm:rounded-3xl
          p-8 sm:p-12 md:p-16
          transition-all duration-300 ease-in-out
          ${isDragging 
            ? 'border-purple-400 bg-purple-500/[0.2] scale-[1.02] shadow-2xl' 
            : `${isDark ? 'border-white/[0.2] hover:bg-white/[0.08]' : 'border-black/[0.2] hover:bg-black/[0.05]'} hover:border-purple-400 hover:scale-[1.01] shadow-xl`
          }
          ${isProcessing ? 'pointer-events-none opacity-60' : ''}
        `}
      >
        {/* Animated border effect */}
        {isDragging && (
          <motion.div
            className="absolute inset-0 rounded-3xl"
            style={{
              background: 'linear-gradient(90deg, rgba(168, 85, 247, 0.4), rgba(236, 72, 153, 0.4))',
              filter: 'blur(20px)',
            }}
            animate={{
              opacity: [0.5, 0.8, 0.5],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
            }}
          />
        )}

        <div className="relative z-10 flex flex-col items-center gap-4 sm:gap-6">
          {/* Icon */}
          <motion.div
            className="relative"
            animate={isDragging ? { scale: [1, 1.1, 1] } : {}}
            transition={{ duration: 0.5, repeat: isDragging ? Infinity : 0 }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full blur-xl opacity-60" />
            <div className={`relative backdrop-blur-sm ${
              isDark 
                ? 'bg-white/[0.1] border-white/[0.2]' 
                : 'bg-black/[0.05] border-black/[0.15]'
            } border p-4 sm:p-6 rounded-full shadow-lg`}>
              {isProcessing ? (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                >
                  <Camera className={`w-10 h-10 sm:w-12 sm:h-12 ${isDark ? 'text-purple-400' : 'text-purple-600'}`} />
                </motion.div>
              ) : (
                <Camera className={`w-10 h-10 sm:w-12 sm:h-12 ${isDark ? 'text-purple-400' : 'text-purple-600'}`} />
              )}
            </div>
          </motion.div>

          {/* Text */}
          <div className="text-center space-y-1 sm:space-y-2 px-4">
            <h3 className={`text-base sm:text-lg md:text-xl ${isDark ? 'text-gray-200' : 'text-gray-800'}`}>
              {isProcessing ? 'Analyzing your food...' : 'Drag & drop your food image here'}
            </h3>
            <p className={`text-sm sm:text-base ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              or click to browse
            </p>
          </div>

          {/* Supported formats */}
          <div className="flex items-stretch gap-2 sm:gap-3 justify-center w-full max-w-[280px] sm:max-w-xs mx-auto">
            <div className={`flex items-center justify-center gap-1 sm:gap-1.5 backdrop-blur-md ${
              isDark 
                ? 'bg-white/[0.1] border-white/[0.2]' 
                : 'bg-black/[0.05] border-black/[0.15]'
            } border px-2 py-1.5 sm:px-3 sm:py-2 md:px-4 md:py-2 rounded-full whitespace-nowrap`}>
              <FileImage className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4 text-purple-400 flex-shrink-0" />
              <span className={`text-[10px] sm:text-xs md:text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>JPG, PNG, WebP</span>
            </div>
            <div className={`flex items-center justify-center gap-1 sm:gap-1.5 backdrop-blur-md ${
              isDark 
                ? 'bg-white/[0.1] border-white/[0.2]' 
                : 'bg-black/[0.05] border-black/[0.15]'
            } border px-2 py-1.5 sm:px-3 sm:py-2 md:px-4 md:py-2 rounded-full whitespace-nowrap`}>
              <HardDrive className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4 text-purple-400 flex-shrink-0 hidden md:inline-block" />
              <span className={`text-[10px] sm:text-xs md:text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Max 10MB</span>
            </div>
          </div>

          {/* Upload icon */}
          {!isProcessing && (
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Upload className={`w-5 h-5 sm:w-6 sm:h-6 ${isDark ? 'text-purple-400' : 'text-purple-600'}`} />
            </motion.div>
          )}
        </div>

        {/* Hidden file input */}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
        />
      </div>
    </motion.div>
  );
}
