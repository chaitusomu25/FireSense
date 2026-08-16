import React from 'react';
import { Shield, Flame } from 'lucide-react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showTagline?: boolean;
  className?: string;
  onClick?: () => void;
}

export const Logo: React.FC<LogoProps> = ({
  size = 'md',
  showTagline = false,
  className = '',
  onClick,
}) => {
  const iconSizes = {
    sm: 'w-7 h-7',
    md: 'w-9 h-9',
    lg: 'w-11 h-11',
    xl: 'w-14 h-14',
  };

  const textSizes = {
    sm: 'text-lg',
    md: 'text-xl',
    lg: 'text-2xl',
    xl: 'text-3xl',
  };

  return (
    <div
      id="firesense-brand-logo"
      onClick={onClick}
      className={`flex items-center gap-3 select-none ${onClick ? 'cursor-pointer group' : ''} ${className}`}
    >
      <div className="relative flex items-center justify-center">
        {/* Glowing background halo */}
        <div className="absolute inset-0 bg-gradient-to-tr from-orange-600 to-amber-400 rounded-xl blur-md opacity-60 group-hover:opacity-85 transition-opacity" />
        
        {/* Shield with metallic/dark backdrop */}
        <div
          className={`${iconSizes[size]} relative z-10 flex items-center justify-center rounded-xl bg-slate-900/90 border border-orange-500/40 shadow-inner overflow-hidden`}
        >
          <Shield className="w-full h-full p-1 text-slate-400/30 absolute" />
          <Flame className="w-3/5 h-3/5 text-orange-500 fill-orange-500 animate-pulse drop-shadow-[0_0_8px_rgba(249,115,22,0.8)] relative z-20" />
        </div>
      </div>

      <div className="flex flex-col">
        <div className="flex items-center gap-1.5 leading-none">
          <span className={`font-extrabold tracking-tight text-white ${textSizes[size]}`}>
            Fire<span className="text-orange-500 bg-gradient-to-r from-orange-400 to-amber-300 bg-clip-text text-transparent">Sense</span>
          </span>
          <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-mono font-semibold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
            AI-DEFENSE
          </span>
        </div>
        {showTagline && (
          <span className="text-[11px] tracking-wider font-semibold uppercase text-orange-400/90 mt-0.5">
            Predict, Prevent, Protect
          </span>
        )}
      </div>
    </div>
  );
};
