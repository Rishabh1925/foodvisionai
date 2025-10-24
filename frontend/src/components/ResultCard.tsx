import { motion } from 'motion/react';
import { Progress } from './ui/progress';
import { CheckCircle2, Utensils } from 'lucide-react';

interface ResultCardProps {
  name: string;
  confidence: number;
  index: number;
  isTopPrediction: boolean;
  isDark: boolean;
}

// Generate random gradient based on index for consistent but varied colors
const getRandomGradient = (index: number) => {
  const gradients = [
    { bg: 'from-emerald-500/20 via-teal-500/20 to-cyan-500/20', icon: 'text-emerald-400' },
    { bg: 'from-blue-500/20 via-indigo-500/20 to-violet-500/20', icon: 'text-blue-400' },
    { bg: 'from-purple-500/20 via-fuchsia-500/20 to-pink-500/20', icon: 'text-purple-400' },
    { bg: 'from-rose-500/20 via-pink-500/20 to-red-500/20', icon: 'text-rose-400' },
    { bg: 'from-orange-500/20 via-amber-500/20 to-yellow-500/20', icon: 'text-orange-400' },
    { bg: 'from-lime-500/20 via-green-500/20 to-emerald-500/20', icon: 'text-lime-400' },
    { bg: 'from-cyan-500/20 via-sky-500/20 to-blue-500/20', icon: 'text-cyan-400' },
    { bg: 'from-violet-500/20 via-purple-500/20 to-indigo-500/20', icon: 'text-violet-400' },
    { bg: 'from-fuchsia-500/20 via-pink-500/20 to-rose-500/20', icon: 'text-fuchsia-400' },
    { bg: 'from-amber-500/20 via-orange-500/20 to-red-500/20', icon: 'text-amber-400' },
  ];
  
  // Use index to pick a gradient, but add some pseudo-randomness
  const seed = (index * 7 + 3) % gradients.length;
  return gradients[seed];
};

export function ResultCard({ name, confidence, index, isTopPrediction, isDark }: ResultCardProps) {
  const gradient = getRandomGradient(index);
  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ 
        duration: 0.4, 
        delay: index * 0.1,
        ease: "easeOut"
      }}
      className="group"
    >
      <div className={`relative backdrop-blur-xl ${
        isDark 
          ? 'bg-white/[0.05] border-white/[0.15]' 
          : 'bg-black/[0.05] border-black/[0.15]'
      } border rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-[1.02]`}>
        {/* Top prediction badge */}
        {isTopPrediction && (
          <div className="absolute top-3 sm:top-4 right-3 sm:right-4 z-10">
            <div className="backdrop-blur-md bg-gradient-to-r from-green-400 to-emerald-500 border-0 text-white shadow-lg px-2.5 py-1 rounded-full flex items-center gap-1 text-xs sm:text-sm">
              <CheckCircle2 className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
              <span>Best Match</span>
            </div>
          </div>
        )}

        {/* Icon header with gradient background */}
        <div className={`relative overflow-hidden bg-gradient-to-br ${gradient.bg} py-6 sm:py-8`}>
          <div className="flex justify-center">
            <motion.div
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ type: "spring", stiffness: 300 }}
              className={`backdrop-blur-sm ${
                isDark 
                  ? 'bg-white/[0.1] border-white/[0.2]' 
                  : 'bg-black/[0.05] border-black/[0.15]'
              } border p-4 rounded-2xl`}
            >
              <Utensils className={`w-8 h-8 sm:w-10 sm:h-10 ${gradient.icon}`} />
            </motion.div>
          </div>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-6 space-y-4 sm:space-y-5">
          {/* Food name and rank */}
          <div className="flex items-start justify-between gap-3">
            <h4 className={`text-base sm:text-lg ${isDark ? 'text-gray-100' : 'text-gray-800'} flex-1`}>
              {name}
            </h4>
            <div className={`backdrop-blur-md ${
              isDark 
                ? 'bg-purple-500/[0.2] border-purple-400/[0.3]' 
                : 'bg-purple-500/[0.15] border-purple-400/[0.25]'
            } border px-2.5 sm:px-3 py-1 rounded-full flex-shrink-0`}>
              <span className={`text-sm sm:text-base ${isDark ? 'text-purple-300' : 'text-purple-700'}`}>#{index + 1}</span>
            </div>
          </div>

          {/* Confidence */}
          <div className="space-y-2 sm:space-y-2.5">
            <div className="flex items-center justify-between">
              <span className={`text-sm sm:text-base ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Confidence</span>
              <span className={`text-base sm:text-lg ${isDark ? 'text-gray-200' : 'text-gray-800'}`}>{confidence}%</span>
            </div>
            
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: '100%' }}
              transition={{ duration: 0.8, delay: index * 0.1 + 0.2 }}
            >
              <Progress 
                value={confidence} 
                className={`h-2.5 sm:h-3 ${isDark ? 'bg-white/[0.1]' : 'bg-black/[0.1]'}`}
                indicatorClassName={`
                  ${confidence >= 80 ? 'bg-gradient-to-r from-green-400 to-emerald-500' : 
                    confidence >= 60 ? 'bg-gradient-to-r from-blue-400 to-cyan-500' : 
                    'bg-gradient-to-r from-orange-400 to-amber-500'}
                `}
              />
            </motion.div>
          </div>
        </div>

        {/* Glassmorphism overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/0 to-pink-500/0 group-hover:from-purple-500/[0.08] group-hover:to-pink-500/[0.08] transition-all duration-300 pointer-events-none rounded-2xl" />
      </div>
    </motion.div>
  );
}
