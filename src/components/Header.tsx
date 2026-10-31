import React from 'react';
import { ShieldCheck, Zap } from 'lucide-react';
import { ZikoLogo } from './ZikoLogo';

interface HeaderProps {
  onlineCount: number;
  latency: string;
}

export const Header: React.FC<HeaderProps> = ({
  onlineCount,
  latency,
}) => {
  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-xl bg-[#06070a]/90 border-b border-white/10 px-3.5 sm:px-6 py-2.5">
      <div className="max-w-4xl mx-auto flex items-center justify-between gap-2">
        {/* Brand: Khloud */}
        <div className="flex items-center gap-2.5">
          <ZikoLogo size="sm" />
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <span className="font-cyber font-black tracking-wider text-base sm:text-lg text-white">
                <span className="text-[#00d2ff] text-glow-blue">Khloud</span>
              </span>
              <span className="text-[9px] font-black tracking-widest px-1.5 py-0.5 rounded bg-blue-500/15 border border-blue-500/40 text-[#00d2ff]">
                VIP
              </span>
            </div>
            <div className="flex items-center gap-1.5 text-[10px] text-zinc-400">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
              <span className="font-mono-cyber font-bold text-cyan-400">{latency}</span>
              <span>•</span>
              <span className="font-mono-cyber text-zinc-300 font-semibold">
                {onlineCount.toLocaleString()} متصل
              </span>
            </div>
          </div>
        </div>

        {/* Live Server Status Badge */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-500/10 border border-blue-500/30 text-xs font-mono font-bold text-[#00d2ff] shadow-[0_0_12px_rgba(0,102,255,0.2)]">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-[11px] font-cyber font-black tracking-wide">سيرفر معتمد مباشر</span>
          </div>
        </div>
      </div>
    </header>
  );
};
