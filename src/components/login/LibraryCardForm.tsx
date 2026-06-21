import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CreditCard, Lock, Eye, EyeOff, AlertCircle, CheckCircle2 } from 'lucide-react';

interface LibraryCardFormProps {
  onSubmit: (cardNo: string, password: string) => void;
  isLoading: boolean;
  error: string | null;
}

const LibraryCardForm = ({ onSubmit, isLoading, error }: LibraryCardFormProps) => {
  const [cardNo, setCardNo] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [touched, setTouched] = useState({ cardNo: false, password: false });

  const cardError = touched.cardNo && cardNo && !/^LIB\d{8}$/.test(cardNo) ? '借阅证号格式为 LIB + 8位数字' : '';
  const passwordError = touched.password && password && password.length < 6 ? '密码至少6位' : '';
  const isValid = /^LIB\d{8}$/.test(cardNo) && password.length >= 6;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTouched({ cardNo: true, password: true });
    if (isValid) onSubmit(cardNo, password);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label className="block text-sm font-medium text-library-navy/80 mb-2 ml-1">借阅证号</label>
        <div className="relative">
          <CreditCard className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-library-navy/40" />
          <input
            type="text"
            value={cardNo}
            onChange={(e) => setCardNo(e.target.value.toUpperCase())}
            onBlur={() => setTouched(t => ({ ...t, cardNo: true }))}
            placeholder="请输入借阅证号，如 LIB2024001"
            className={`input-base ${cardError ? 'border-library-coral focus:border-library-coral' : ''}`}
            maxLength={11}
          />
          {cardNo && /^LIB\d{8}$/.test(cardNo) && (
            <CheckCircle2 className="absolute right-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-library-teal" />
          )}
        </div>
        <AnimatePresence>
          {cardError && (
            <motion.p
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              className="mt-2 text-sm text-library-coral flex items-center gap-1"
            >
              <AlertCircle className="w-3.5 h-3.5" />
              {cardError}
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      <div>
        <label className="block text-sm font-medium text-library-navy/80 mb-2 ml-1">密码</label>
        <div className="relative">
          <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-library-navy/40" />
          <input
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onBlur={() => setTouched(t => ({ ...t, password: true }))}
            placeholder="请输入密码"
            className={`input-base pr-11 ${passwordError ? 'border-library-coral focus:border-library-coral' : ''}`}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-library-navy/40 hover:text-library-navy/70 transition-colors"
            tabIndex={-1}
          >
            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
          </button>
        </div>
        <AnimatePresence>
          {passwordError && (
            <motion.p
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              className="mt-2 text-sm text-library-coral flex items-center gap-1"
            >
              <AlertCircle className="w-3.5 h-3.5" />
              {passwordError}
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

      <div className="flex items-center justify-between text-sm">
        <label className="flex items-center gap-2 cursor-pointer group">
          <input type="checkbox" className="w-4 h-4 rounded border-library-navy/20 text-library-navy focus:ring-library-gold/30" />
          <span className="text-library-navy/60 group-hover:text-library-navy transition-colors">记住我</span>
        </label>
        <a href="#" className="text-library-gold hover:text-library-goldLight font-medium transition-colors">
          忘记密码？
        </a>
      </div>

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
        <p className="text-xs text-library-navy/70 space-y-1">
          <span className="block">成人读者：证号 LIB2024001 / 密码 123456</span>
          <span className="block">儿童读者：证号 LIB2024002 / 密码 123456</span>
        </p>
      </div>
    </form>
  );
};

export default LibraryCardForm;
