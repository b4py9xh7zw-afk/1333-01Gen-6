import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Smartphone, Shield, AlertCircle, CheckCircle2 } from 'lucide-react';

interface PhoneFormProps {
  onSubmit: (phone: string, code: string) => void;
  isLoading: boolean;
  error: string | null;
}

const PhoneForm = ({ onSubmit, isLoading, error }: PhoneFormProps) => {
  const [phone, setPhone] = useState('');
  const [code, setCode] = useState('');
  const [countdown, setCountdown] = useState(0);
  const [touched, setTouched] = useState({ phone: false, code: false });

  const phoneError = touched.phone && phone && !/^1[3-9]\d{9}$/.test(phone) ? '请输入正确的11位手机号' : '';
  const codeError = touched.code && code && !/^\d{6}$/.test(code) ? '验证码为6位数字' : '';
  const isValid = /^1[3-9]\d{9}$/.test(phone) && /^\d{6}$/.test(code);

  useEffect(() => {
    if (countdown <= 0) return;
    const timer = setTimeout(() => setCountdown(c => c - 1), 1000);
    return () => clearTimeout(timer);
  }, [countdown]);

  const sendCode = () => {
    if (!/^1[3-9]\d{9}$/.test(phone)) {
      setTouched(t => ({ ...t, phone: true }));
      return;
    }
    setCountdown(60);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTouched({ phone: true, code: true });
    if (isValid) onSubmit(phone, code);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label className="block text-sm font-medium text-library-navy/80 mb-2 ml-1">手机号</label>
        <div className="relative">
          <Smartphone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-library-navy/40" />
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 11))}
            onBlur={() => setTouched(t => ({ ...t, phone: true }))}
            placeholder="请输入手机号"
            className={`input-base ${phoneError ? 'border-library-coral focus:border-library-coral' : ''}`}
          />
          {phone && /^1[3-9]\d{9}$/.test(phone) && (
            <CheckCircle2 className="absolute right-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-library-teal" />
          )}
        </div>
        <AnimatePresence>
          {phoneError && (
            <motion.p
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              className="mt-2 text-sm text-library-coral flex items-center gap-1"
            >
              <AlertCircle className="w-3.5 h-3.5" />
              {phoneError}
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      <div>
        <label className="block text-sm font-medium text-library-navy/80 mb-2 ml-1">验证码</label>
        <div className="flex gap-3">
          <div className="relative flex-1">
            <Shield className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-library-navy/40" />
            <input
              type="text"
              value={code}
              onChange={(e) => setCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
              onBlur={() => setTouched(t => ({ ...t, code: true }))}
              placeholder="6位数字验证码"
              className={`input-base ${codeError ? 'border-library-coral focus:border-library-coral' : ''}`}
            />
          </div>
          <button
            type="button"
            onClick={sendCode}
            disabled={countdown > 0}
            className={`shrink-0 px-5 rounded-xl font-medium text-sm transition-all duration-300 ${
              countdown > 0
                ? 'bg-library-navy/10 text-library-navy/40 cursor-not-allowed'
                : 'bg-library-gold/15 text-library-gold hover:bg-library-gold/25 border border-library-gold/30'
            }`}
          >
            {countdown > 0 ? `${countdown}s 后重发` : '获取验证码'}
          </button>
        </div>
        <AnimatePresence>
          {codeError && (
            <motion.p
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              className="mt-2 text-sm text-library-coral flex items-center gap-1"
            >
              <AlertCircle className="w-3.5 h-3.5" />
              {codeError}
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            className="p-3 rounded-xl bg-library-coral/10 border border-library-coral/20 text-library-coral text-sm flex items-center gap-2"
          >
            <AlertCircle className="w-4 h-4 shrink-0" />
            {error}
          </motion.div>
        )}
      </AnimatePresence>

      <button
        type="submit"
        disabled={!isValid || isLoading}
        className="btn-primary"
      >
        {isLoading ? (
          <span className="flex items-center justify-center gap-2">
            <motion.span
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
              className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
            />
            登录中...
          </span>
        ) : '登 录'}
      </button>

      <div className="p-4 rounded-xl bg-library-creamDark/50 border border-library-gold/10">
        <p className="text-xs text-library-navy/50 mb-2">💡 演示账号</p>
        <p className="text-xs text-library-navy/70">
          手机号 13812345678 / 验证码 123456
        </p>
      </div>
    </form>
  );
};

export default PhoneForm;
