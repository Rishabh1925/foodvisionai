import { useState, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';
import { UploadArea } from './components/UploadArea';
import { ResultCard } from './components/ResultCard';
import { Button } from './components/ui/button';
import { Share2, RotateCcw, Sparkles, Zap, BarChart3, Scan, Moon, Sun } from 'lucide-react';
import { BullseyeIcon } from './components/BullseyeIcon';
import { Switch } from './components/ui/switch';
import { toast } from 'sonner@2.0.3';
import { Toaster } from './components/ui/sonner';

const mockPredictions = [
  { name: 'Gourmet Steak Plate', confidence: 94 },
  { name: 'Fresh Sushi Platter', confidence: 87 },
  { name: 'Italian Pizza', confidence: 76 },
  { name: 'Healthy Buddha Bowl', confidence: 68 },
  { name: 'Classic Burger & Fries', confidence: 52 },
];

export default function App() {
  const [isProcessing, setIsProcessing] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [isDark, setIsDark] = useState(true);
  const [predictions, setPredictions] = useState(mockPredictions);
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  
  const contentOpacity = useTransform(scrollY, [0, 200], [0, 1]);
  const contentY = useTransform(scrollY, [0, 200], [50, 0]);
  const videoY = useTransform(scrollY, [0, 1000], [0, -300]);

  const handleImageSelect = async (file: File) => {
    const imageUrl = URL.createObjectURL(file);
    setUploadedImage(imageUrl);
    
    setIsProcessing(true);
    setShowResults(false);
    
    toast.loading('Analyzing your food image...', { id: 'processing' });
    
    try {
      const formData = new FormData();
      formData.append('image', file);
      
      const response = await fetch('http://localhost:8000/api/predict', {
        method: 'POST',
        body: formData,
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to analyze image');
      }
      
      const data = await response.json();
      
      if (data.success && data.predictions) {
        const transformedPredictions = data.predictions.map((pred: any) => ({
          name: pred.class.replace(/_/g, ' ').replace(/\b\w/g, (l: string) => l.toUpperCase()),
          confidence: Math.round(pred.confidence * 100) / 100
        }));
        
        setPredictions(transformedPredictions);
        setIsProcessing(false);
        setShowResults(true);
        toast.success('Analysis complete! Check out the results below.', { id: 'processing' });
      } else {
        throw new Error('Invalid response from server');
      }
      
    } catch (error) {
      console.error('API Error:', error);
      setIsProcessing(false);
      setShowResults(false);
      toast.error(`Analysis failed: ${error.message}`, { id: 'processing' });
    }
  };

  const handleReset = () => {
    setShowResults(false);
    setUploadedImage(null);
    setIsProcessing(false);
    setPredictions(mockPredictions);
    
    const fileInputs = document.querySelectorAll('input[type="file"]');
    fileInputs.forEach((input: any) => {
      input.value = '';
    });
  };

  const handleShare = () => {
    toast.success('Results shared successfully!');
  };

  const handleThemeToggle = () => {
    setIsDark(!isDark);
  };

  return (
    <div className={`min-h-screen relative overflow-hidden transition-colors duration-500 ${
      isDark ? 'bg-gray-950' : 'bg-gray-100'
    }`}>
      {isDark && (
        <div className="fixed inset-0 z-0 overflow-hidden">
          <motion.div
            style={{ y: videoY }}
            className="absolute -top-10 left-0 right-0 w-full h-[120vh]"
          >
            <video
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover opacity-40"
              style={{ 
                filter: 'brightness(0.7)',
              }}
            >
              <source src="https://cdn.pixabay.com/video/2020/06/19/42787-433081302_large.mp4" type="video/mp4" />
            </video>
            <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/40 pointer-events-none" />
          </motion.div>
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/60" />
          <div className="absolute inset-0 backdrop-blur-[0.5px]" />
          <motion.div
            className="absolute inset-0 opacity-30"
            animate={{
              background: [
                'radial-gradient(circle at 0% 0%, rgba(168, 85, 247, 0.25) 0%, transparent 50%)',
                'radial-gradient(circle at 100% 100%, rgba(236, 72, 153, 0.25) 0%, transparent 50%)',
                'radial-gradient(circle at 0% 100%, rgba(59, 130, 246, 0.25) 0%, transparent 50%)',
                'radial-gradient(circle at 100% 0%, rgba(168, 85, 247, 0.25) 0%, transparent 50%)',
              ],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: 'linear',
            }}
          />
        </div>
      )}
      
      {!isDark && (
        <div className="fixed inset-0 z-0">
          <motion.div
            className="absolute inset-0 opacity-20"
            animate={{
              background: [
                'radial-gradient(circle at 0% 0%, rgba(168, 85, 247, 0.15) 0%, transparent 50%)',
                'radial-gradient(circle at 100% 100%, rgba(236, 72, 153, 0.15) 0%, transparent 50%)',
                'radial-gradient(circle at 0% 100%, rgba(59, 130, 246, 0.15) 0%, transparent 50%)',
                'radial-gradient(circle at 100% 0%, rgba(168, 85, 247, 0.15) 0%, transparent 50%)',
              ],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: 'linear',
            }}
          />
        </div>
      )}
      
      <div className="h-screen flex items-center justify-center px-4 md:px-8 relative z-10">
        <div className="absolute top-4 sm:top-6 left-1/2 -translate-x-1/2 z-50">
          <div 
            className={`backdrop-blur-md ${
              isDark 
                ? 'bg-white/[0.05] border-white/[0.15]' 
                : 'bg-black/[0.05] border-black/[0.15]'
            } border rounded-xl sm:rounded-2xl px-3 py-2 sm:px-4 sm:py-3 shadow-lg`}
          >
            <div className="flex items-center gap-2 sm:gap-3">
              <Sun className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${isDark ? 'text-gray-400' : 'text-orange-500'}`} />
              <Switch 
                checked={isDark} 
                onCheckedChange={handleThemeToggle}
                className="data-[state=checked]:bg-purple-500 scale-90 sm:scale-100"
              />
              <Moon className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${isDark ? 'text-purple-400' : 'text-gray-400'}`} />
            </div>
          </div>
        </div>
        <div className="text-center space-y-6 sm:space-y-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="flex items-center justify-center gap-3 sm:gap-4 md:gap-6 flex-wrap"
          >
            <motion.div 
              className="relative"
              animate={{ 
                scale: [1, 1.05, 1]
              }}
              transition={{ 
                duration: 3, 
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <motion.div 
                className="absolute inset-0 bg-gradient-to-br from-purple-500 via-pink-500 to-orange-500 rounded-xl sm:rounded-2xl blur-xl opacity-60"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.6, 0.8, 0.6]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              <div className="relative bg-gradient-to-br from-purple-500 via-pink-500 to-orange-500 p-3 sm:p-4 md:p-5 rounded-xl sm:rounded-2xl shadow-2xl">
                <Sparkles className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 text-white" />
              </div>
            </motion.div>
            <h1 className={`bg-gradient-to-r ${
              isDark 
                ? 'from-purple-300 via-pink-300 to-orange-300' 
                : 'from-purple-600 via-pink-600 to-orange-600'
            } bg-clip-text text-transparent text-4xl sm:text-6xl md:text-7xl lg:text-9xl drop-shadow-2xl px-4`}>
              FoodVisionAI
            </h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="pt-8 sm:pt-12"
            >
              <div className={`w-5 h-8 sm:w-6 sm:h-10 border-2 ${
                isDark ? 'border-white/[0.3]' : 'border-gray-800/[0.3]'
              } rounded-full mx-auto relative`}>
                <motion.div
                  animate={{ y: [0, 12, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="w-1.5 h-1.5 bg-purple-400 rounded-full absolute left-1/2 top-2 -translate-x-1/2"
                />
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
      
      <main ref={containerRef} className="pb-12 px-4 md:px-8 relative z-10">
        <div className="max-w-7xl mx-auto">
          <motion.div
            style={{ opacity: contentOpacity, y: contentY }}
            className="text-center mb-8 sm:mb-12 space-y-4 sm:space-y-6"
          >
            <div className="flex items-center justify-center gap-2 mb-3 sm:mb-4 flex-wrap">
              <Sparkles className={`w-6 h-6 sm:w-8 sm:h-8 ${isDark ? 'text-purple-400' : 'text-purple-600'}`} />
              <span className={`backdrop-blur-md ${
                isDark 
                  ? 'bg-white/[0.1] border-white/[0.2] text-purple-300' 
                  : 'bg-black/[0.05] border-black/[0.1] text-purple-700'
              } border px-4 py-1.5 sm:px-6 sm:py-2 rounded-full text-sm sm:text-base md:text-lg`}>
                Powered by Advanced AI
              </span>
            </div>
            
            <h2 className={`bg-gradient-to-r ${
              isDark
                ? 'from-purple-400 via-pink-400 to-blue-400'
                : 'from-purple-600 via-pink-600 to-blue-600'
            } bg-clip-text text-transparent max-w-4xl mx-auto text-2xl sm:text-3xl md:text-4xl lg:text-5xl px-4`}>
              Discover What's on Your Plate
            </h2>
            
            <p className={`${isDark ? 'text-gray-300' : 'text-gray-700'} max-w-2xl mx-auto text-base sm:text-lg md:text-xl px-4`}>
              Upload any food image and let AI identify it instantly with incredible accuracy. 
              Get detailed predictions and confidence scores in seconds.
            </p>
          </motion.div>

          <div className="mb-16">
            <UploadArea 
              onImageSelect={handleImageSelect} 
              isProcessing={isProcessing}
              isDark={isDark}
            />
          </div>

          <AnimatePresence>
            {uploadedImage && showResults && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="mb-12 max-w-2xl mx-auto"
              >
                <div className={`backdrop-blur-xl ${
                  isDark 
                    ? 'bg-white/[0.05] border-white/[0.15]' 
                    : 'bg-black/[0.05] border-black/[0.15]'
                } border rounded-3xl overflow-hidden shadow-2xl`}>
                  <div className="p-6 space-y-4">
                    <div className="flex items-center justify-center gap-2">
                      <Scan className={`w-5 h-5 ${isDark ? 'text-purple-400' : 'text-purple-600'}`} />
                      <h3 className={`text-lg sm:text-xl ${isDark ? 'text-gray-200' : 'text-gray-800'} text-center`}>
                        Analyzed Image
                      </h3>
                    </div>
                    <div className="relative group">
                      <img 
                        src={uploadedImage} 
                        alt="Uploaded food" 
                        className="w-full h-80 sm:h-96 object-cover rounded-2xl"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-purple-500/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" />
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {showResults && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-8"
              >
                <div className="text-center space-y-4">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                    className="inline-block"
                  >
                    <div className={`backdrop-blur-md bg-gradient-to-r from-green-400 to-emerald-500 ${
                      isDark ? 'border-white/[0.3]' : 'border-black/[0.2]'
                    } border px-6 py-3 rounded-2xl shadow-lg`}>
                      <h3 className="text-white">
                        AI Predictions
                      </h3>
                    </div>
                  </motion.div>
                  
                  <p className={isDark ? 'text-gray-400' : 'text-gray-600'}>
                    Here are the top 5 matches based on visual analysis
                  </p>

                  <div className="flex items-center justify-center gap-3 pt-4">
                    <Button
                      onClick={handleShare}
                      className={`backdrop-blur-md ${
                        isDark 
                          ? 'bg-white/[0.1] border-white/[0.2] text-gray-200 hover:bg-white/[0.15]'
                          : 'bg-black/[0.05] border-black/[0.15] text-gray-800 hover:bg-black/[0.1]'
                      } border rounded-xl shadow-md`}
                    >
                      <Share2 className="w-4 h-4 mr-2" />
                      Share Results
                    </Button>
                    <Button
                      onClick={handleReset}
                      className={`backdrop-blur-md ${
                        isDark 
                          ? 'bg-white/[0.1] border-white/[0.2] text-gray-200 hover:bg-white/[0.15]'
                          : 'bg-black/[0.05] border-black/[0.15] text-gray-800 hover:bg-black/[0.1]'
                      } border rounded-xl shadow-md`}
                    >
                      <RotateCcw className="w-4 h-4 mr-2" />
                      Try Another Image
                    </Button>
                  </div>
                </div>

                <div className="flex flex-wrap justify-center gap-6 max-w-7xl mx-auto">
                  {predictions.map((prediction, index) => (
                    <div key={index} className="w-full md:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)]">
                      <ResultCard
                        name={prediction.name}
                        confidence={prediction.confidence}
                        index={index}
                        isTopPrediction={index === 0}
                        isDark={isDark}
                      />
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {!showResults && !isProcessing && (
            <motion.div 
              style={{ opacity: contentOpacity }}
              className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16"
            >
              {[
                { title: 'Instant Recognition', description: 'Get results in seconds with our advanced AI model', icon: Zap },
                { title: 'High Accuracy', description: 'Industry-leading 94% accuracy on food identification', icon: BullseyeIcon },
                { title: 'Detailed Analysis', description: 'Confidence scores and multiple predictions for better insights', icon: BarChart3 },
              ].map((feature, index) => {
                const IconComponent = feature.icon;
                return (
                  <motion.div
                    key={index}
                    whileHover={{ scale: 1.05 }}
                    className={`backdrop-blur-xl ${
                      isDark 
                        ? 'bg-white/[0.05] border-white/[0.15]' 
                        : 'bg-black/[0.05] border-black/[0.15]'
                    } border rounded-2xl p-6 shadow-lg text-center space-y-3`}
                  >
                    <div className="flex justify-center">
                      <IconComponent className={`w-10 h-10 ${
                        isDark ? 'text-purple-300/70' : 'text-purple-600/70'
                      }`} />
                    </div>
                    <h4 className={isDark ? 'text-gray-200' : 'text-gray-800'}>{feature.title}</h4>
                    <p className={isDark ? 'text-gray-400' : 'text-gray-600'}>{feature.description}</p>
                  </motion.div>
                );
              })}
            </motion.div>
          )}
        </div>
      </main>

      <Toaster />
    </div>
  );
}
