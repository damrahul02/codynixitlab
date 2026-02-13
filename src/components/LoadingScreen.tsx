import { useEffect, useState } from 'react';

interface LoadingScreenProps {
  onComplete: () => void;
}

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    const duration = 2500;
    const interval = 30;
    const increment = 100 / (duration / interval);
    
    const timer = setInterval(() => {
      setProgress(prev => {
        const next = prev + increment;
        if (next >= 100) {
          clearInterval(timer);
          setTimeout(() => {
            setIsExiting(true);
            setTimeout(onComplete, 600);
          }, 300);
          return 100;
        }
        return next;
      });
    }, interval);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <div 
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-cody-darker transition-all duration-600 ${
        isExiting ? 'opacity-0 scale-110' : 'opacity-100 scale-100'
      }`}
    >
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px]">
          <div className="absolute inset-0 bg-gradient-radial from-cody-blue/20 via-transparent to-transparent animate-pulse-glow" />
        </div>
        {/* Rotating rings */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px]">
          <div className="absolute inset-0 border border-cody-blue/10 rounded-full animate-spin-slow" />
          <div className="absolute inset-4 border border-cody-blue/20 rounded-full animate-spin-slow" style={{ animationDirection: 'reverse', animationDuration: '25s' }} />
          <div className="absolute inset-8 border border-cody-blue/10 rounded-full animate-spin-slow" style={{ animationDuration: '30s' }} />
        </div>
      </div>

      {/* Logo container */}
      <div className="relative z-10 flex flex-col items-center">
        {/* Logo with glow effect */}
        <div className="relative mb-8">
          <div className="absolute inset-0 bg-cody-blue/30 blur-3xl rounded-full animate-pulse-glow" />
          <img 
            src="/logo.png" 
            alt="codynixitlab"
            className="relative w-32 h-32 object-contain animate-logo-pulse drop-shadow-2xl"
            style={{
              filter: 'drop-shadow(0 0 30px rgba(0, 102, 204, 0.5))'
            }}
          />
        </div>

        {/* Company name */}
        <h1 className="text-2xl font-bold text-white mb-2 tracking-wider">
          <span className="text-cody-blue">cody</span>nixitlab
        </h1>
        <p className="text-white/50 text-sm mb-8 tracking-widest uppercase">
          Building Digital Excellence
        </p>

        {/* Progress bar */}
        <div className="w-64 h-1 bg-white/10 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-cody-blue to-cyan-400 rounded-full transition-all duration-100 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Progress percentage */}
        <p className="mt-4 text-white/40 text-sm font-mono">
          {Math.round(progress)}%
        </p>
      </div>

      {/* Bottom decorative elements */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex items-center gap-2">
        <div className="w-2 h-2 rounded-full bg-cody-blue/50 animate-pulse" />
        <div className="w-2 h-2 rounded-full bg-cody-blue/30 animate-pulse" style={{ animationDelay: '0.2s' }} />
        <div className="w-2 h-2 rounded-full bg-cody-blue/10 animate-pulse" style={{ animationDelay: '0.4s' }} />
      </div>
    </div>
  );
}
