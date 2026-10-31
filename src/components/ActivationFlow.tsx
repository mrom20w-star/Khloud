import React, { useState } from 'react';
import {
  Download,
  Copy,
  Check,
  ExternalLink,
  DollarSign,
  Coins,
  ShieldCheck,
  ChevronLeft,
  ArrowRight,
  Fingerprint,
  Loader2,
  UserPlus,
  AlertCircle,
  Smartphone,
} from 'lucide-react';
import { PlatformConfig, Language } from '../types';
import { sound } from '../utils/sound';
import { ZikoLogo } from './ZikoLogo';

interface ActivationFlowProps {
  platform: PlatformConfig;
  onBack: () => void;
  onComplete: (userId: string) => void;
  lang: Language;
}

export const ActivationFlow: React.FC<ActivationFlowProps> = ({
  platform,
  onBack,
  onComplete,
  lang,
}) => {
  const [copied, setCopied] = useState(false);
  const [userId, setUserId] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [verifyStep, setVerifyStep] = useState<number>(0);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const registerUrl = platform.registerUrl || 'https://refpa83754.com/L?tag=d_6238052m_88828c_&site=6238052&ad=88828';
  const promoCode = platform.promoCode || 'TYU23';

  const handleCopyCode = () => {
    sound.playClick();
    navigator.clipboard.writeText(promoCode).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userId.trim()) {
      setErrorMsg('يرجى إدخال معرف الحساب أولاً');
      return;
    }
    if (userId.trim().length < 5) {
      setErrorMsg('معرف الحساب يجب أن يتكون من 5 أرقام على الأقل');
      return;
    }

    setErrorMsg(null);
    setIsVerifying(true);
    setVerifyStep(1);
    sound.playScan();

    setTimeout(() => {
      setVerifyStep(2);
      sound.playRadarTick();
    }, 400);

    setTimeout(() => {
      setVerifyStep(3);
      sound.playRadarTick();
    }, 750);

    setTimeout(() => {
      setIsVerifying(false);
      sound.playSuccess();
      onComplete(userId.trim());
    }, 1100);
  };

  return (
    <div className="flex flex-col min-h-full py-6 px-4 sm:px-6 max-w-md mx-auto w-full gap-5">
      {/* Header with back button */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => {
            sound.playClick();
            onBack();
          }}
          className="w-10 h-10 rounded-2xl bg-zinc-900 border border-white/10 flex items-center justify-center text-zinc-300 hover:text-white hover:border-blue-500/50 transition-all active:scale-95 cursor-pointer"
          title="رجوع"
        >
          <ChevronLeft className="w-5 h-5 rtl:rotate-180" />
        </button>

        <div className="flex items-center gap-2">
          <ZikoLogo size="sm" />
          <div className="flex items-center gap-1.5 px-3 py-1 bg-blue-500/10 border border-blue-500/30 rounded-full shadow-[0_0_12px_rgba(0,102,255,0.25)]">
            <span className="w-2 h-2 rounded-full bg-[#00d2ff] animate-pulse" />
            <span className="text-xs font-black font-cyber text-[#00d2ff] uppercase tracking-wider">
              Khloud VIP
            </span>
          </div>
        </div>
      </div>

      {/* Title */}
      <div className="text-center space-y-1.5">
        <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">
          شروط التفعيل والربط المباشر
        </h1>
        <p className="text-xs text-zinc-400 leading-relaxed">
          أكمل الخطوات التالية لتفعيل المزامنة المباشرة مع سيرفر {platform.name}
        </p>
      </div>

      {/* STEPS CONTAINER */}
      <div className="space-y-4">
        {/* Step 1: Download App & Create Account */}
        <div className="rounded-2xl border border-white/10 bg-zinc-950/70 p-4.5 backdrop-blur-md shadow-lg space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-xl bg-blue-600 text-white flex items-center justify-center font-black text-xs shadow-neon-blue">
                1
              </div>
              <h2 className="text-sm font-black text-white">
                تحميل منصة {platform.name} والتسجيل
              </h2>
            </div>
            <span className="text-[10px] font-bold text-[#00d2ff] bg-blue-500/10 px-2 py-0.5 rounded-full border border-blue-500/30">
              إلزامي
            </span>
          </div>

          <a
            href={platform.appDownloadUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => sound.playClick()}
            className="flex items-center gap-3 bg-zinc-900/80 hover:bg-zinc-900 border border-white/5 hover:border-blue-500/40 p-3 rounded-xl transition-all cursor-pointer group"
          >
            <div className="w-11 h-11 rounded-xl bg-black border border-white/10 group-hover:border-blue-500/50 p-1 flex items-center justify-center shrink-0 overflow-hidden transition-colors">
              <img src={platform.img} alt={platform.name} className="w-full h-full object-contain" />
            </div>
            <p className="text-[11px] text-zinc-400 group-hover:text-zinc-200 leading-relaxed transition-colors">
              قم بالدخول وتحميل منصة {platform.name} الرسمية عبر الرابط المعتمد مباشرة، أو أنشئ حسابك الجديد.
            </p>
          </a>

          {/* Button 1: Download App (Directly opens https://spinbetter.games/2ar/login/) */}
          <a
            href={platform.appDownloadUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => sound.playClick()}
            className="w-full h-11 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-600 text-white font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(0,102,255,0.4)] active:scale-[0.98] transition-all cursor-pointer"
          >
            <Download className="w-4 h-4" />
            <span>تحميل منصة {platform.name}</span>
          </a>

          {/* Button 2: Create Account */}
          <a
            href={registerUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => sound.playClick()}
            className="w-full h-11 rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-600 text-white font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(16,185,129,0.3)] active:scale-[0.98] transition-all cursor-pointer"
          >
            <UserPlus className="w-4 h-4" />
            <span>إنشاء حساب</span>
            <ExternalLink className="w-3.5 h-3.5 rtl:mr-1" />
          </a>
        </div>

        {/* Step 2: Promo Code TYU23 */}
        <div className="rounded-2xl border border-white/10 bg-zinc-950/70 p-4.5 backdrop-blur-md shadow-lg space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-xl bg-blue-600 text-white flex items-center justify-center font-black text-xs shadow-neon-blue">
                2
              </div>
              <h2 className="text-sm font-black text-white">
                إدخال كود البروموكود ({promoCode})
              </h2>
            </div>
            <span className="text-[10px] font-bold text-[#00d2ff] bg-blue-500/10 px-2 py-0.5 rounded-full border border-blue-500/30">
              مطلوب للتسجيل
            </span>
          </div>

          <p className="text-[11px] text-zinc-400 leading-relaxed">
            استخدم البروموكود المعتمد أثناء التسجيل لضمان ربط حسابك في {platform.name} بسيرفر Khloud وتفعيل دقة 99%:
          </p>

          <div
            onClick={handleCopyCode}
            className="relative bg-zinc-900/90 rounded-xl border-2 border-dashed border-blue-500/50 hover:border-blue-400 p-3.5 transition-all cursor-pointer group shadow-neon-blue flex items-center justify-between"
          >
            <div>
              <span className="block text-[9px] text-zinc-400 font-bold uppercase tracking-wider mb-0.5">
                الكود المعتمد
              </span>
              <span className="text-3xl font-black font-mono-cyber tracking-widest text-[#00d2ff] text-glow-blue">
                {promoCode}
              </span>
            </div>

            <button
              type="button"
              className={`px-3.5 py-2 rounded-xl font-bold text-xs flex items-center gap-1.5 transition-all ${
                copied
                  ? 'bg-blue-600 text-white shadow-neon-blue'
                  : 'bg-white/10 text-white hover:bg-white/20'
              }`}
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 stroke-[3]" />
                  <span>تم النسخ!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  <span>نسخ الكود</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Step 3: Minimum Deposit (180 L.E or 4 USD) */}
        <div className="rounded-2xl border border-white/10 bg-zinc-950/70 p-4.5 backdrop-blur-md shadow-lg space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-xl bg-blue-600 text-white flex items-center justify-center font-black text-xs shadow-neon-blue">
                3
              </div>
              <h2 className="text-sm font-black text-white">
                الحد الأدنى للإيداع
              </h2>
            </div>
            <span className="text-[10px] font-bold text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded-full border border-cyan-500/30">
              تفعيل الخوارزمية
            </span>
          </div>

          <p className="text-[11px] text-zinc-400 leading-relaxed">
            قم بإجراء أول إيداع بالحد الأدنى المطلوب لتفعيل المزامنة مع سيرفر التوقعات:
          </p>

          <div className="grid grid-cols-2 gap-2.5" dir="ltr">
            <div className="bg-zinc-900/90 border border-white/10 p-3 rounded-xl flex flex-col items-center justify-center text-center shadow-inner">
              <span className="text-[9px] text-zinc-400 font-bold uppercase tracking-wider mb-1 flex items-center gap-1">
                <DollarSign className="w-3 h-3 text-[#00d2ff]" /> USD ($)
              </span>
              <span className="text-xl font-black text-white font-mono-cyber">$4.00</span>
            </div>

            <div className="bg-zinc-900/90 border border-white/10 p-3 rounded-xl flex flex-col items-center justify-center text-center shadow-inner">
              <span className="text-[9px] text-zinc-400 font-bold uppercase tracking-wider mb-1 flex items-center gap-1">
                <Coins className="w-3 h-3 text-[#00d2ff]" /> EGP (جنيه)
              </span>
              <span className="text-xl font-black text-[#00d2ff] font-mono-cyber">180 L.E</span>
            </div>
          </div>
        </div>

        {/* Step 4: ID Verification ONLY */}
        <div className="rounded-2xl border-2 border-blue-500/50 bg-zinc-950/85 p-4.5 backdrop-blur-md shadow-[0_0_25px_rgba(0,102,255,0.2)] space-y-3.5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-xl bg-blue-600 text-white flex items-center justify-center font-black text-xs shadow-neon-blue">
                4
              </div>
              <h2 className="text-sm font-black text-white">
                تأكيد معرف الحساب (Account ID)
              </h2>
            </div>
            <span className="text-[10px] font-bold text-[#00d2ff] bg-blue-500/10 px-2 py-0.5 rounded-full border border-blue-500/30">
              الدخول المباشر
            </span>
          </div>

          <p className="text-[11px] text-zinc-400 leading-relaxed">
            اكتب معرف حسابك في منصة {platform.name} للدخول المباشر إلى السكريبت:
          </p>

          <form onSubmit={handleVerify} className="space-y-3">
            {/* Account ID Input */}
            <div>
              <label className="block text-[11px] font-bold text-zinc-300 mb-1">
                معرف الحساب (Account ID)
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none text-zinc-500">
                  <Fingerprint className="w-4 h-4 text-cyan-400" />
                </div>
                <input
                  type="text"
                  value={userId}
                  onChange={(e) => setUserId(e.target.value.replace(/[^0-9]/g, ''))}
                  disabled={isVerifying}
                  placeholder="مثال: 74829105"
                  className="w-full h-12 bg-zinc-900 border border-white/15 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 rounded-xl ps-10 pe-4 text-white font-mono-cyber tracking-wider text-sm transition-all outline-none"
                />
              </div>
            </div>

            {/* Error Message */}
            {errorMsg && (
              <div className="p-3 rounded-xl bg-red-950/60 border border-red-500/40 flex items-start gap-2 text-xs text-red-300">
                <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                <span>{errorMsg}</span>
              </div>
            )}

            {/* Server Status Indicator */}
            <div className="p-2.5 rounded-xl bg-zinc-900/60 border border-white/5 flex items-center justify-between text-[10px] text-zinc-400">
              <span className="flex items-center gap-1 font-bold">
                <Smartphone className="w-3 h-3 text-cyan-400" />
                <span>اتصال سيرفر {platform.name}:</span>
              </span>
              <span className="text-[#00d2ff] font-mono font-bold">
                ONLINE (جاهز للاستخدام)
              </span>
            </div>

            {/* Submit Button */}
            {isVerifying ? (
              <div className="p-3.5 rounded-xl bg-zinc-900/90 border border-white/10 space-y-2 text-xs">
                <div className="flex items-center gap-2 text-zinc-300">
                  <Loader2 className="w-4 h-4 animate-spin text-[#00d2ff]" />
                  <span className="font-bold">
                    {verifyStep === 1 && `التحقق من معرف حساب ${platform.name}...`}
                    {verifyStep === 2 && 'المزامنة مع سيرفر Khloud...'}
                    {verifyStep === 3 && 'فتح شاشة التوقعات بنجاح...'}
                  </span>
                </div>
                <div className="w-full bg-zinc-800 h-1.5 rounded-full overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-blue-600 to-cyan-400 h-full transition-all duration-500 shadow-neon-blue"
                    style={{ width: `${(verifyStep / 3) * 100}%` }}
                  />
                </div>
              </div>
            ) : (
              <button
                type="submit"
                className="w-full h-12 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-600 text-white font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(0,102,255,0.4)] active:scale-[0.98] transition-all cursor-pointer"
              >
                <ShieldCheck className="w-4 h-4" />
                <span>ربط معرف الحساب والدخول للسكريبت</span>
                <ArrowRight className="w-4 h-4 rtl:rotate-180" />
              </button>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};
