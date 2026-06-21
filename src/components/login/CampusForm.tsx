import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GraduationCap, Lock, Eye, EyeOff, AlertCircle, CheckCircle2 } from 'lucide-react';

interface CampusFormProps {
  onSubmit: (campusId: string, password: string) => void;
  isLoading: boolean;
  error: string | null;
}

const CampusForm = ({ onSubmit, isLoading, error }: CampusFormProps) => {
  const [campusId, setCampusId] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [touched, setTouched] = useState({ campusId: false, password: false });

  const idError = touched.campusId && campusId && !/^(STU|TEA)\w{5,10}$/.test(campusId) ? '校园账号以 STU/TEA 开头，8-13位' : '';
  const passwordError = touched.password && password && password.length < 6 ? '密码至少6位' : '';
  const isValid = /^(STU|TEA)\w{5,10}$/.test(campusId) && password.length >= 6;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTouched({ campusId: true, password: true });
    if (isValid) onSubmit(campusId, password);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label className="block text-sm font-medium text-library-navy/80 mb-2 ml-1">校园账号</label>
        <div className="relative">
          <GraduationCap className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-library-navy/40" />
          <input
            type="text"
            value={campusId}
            onChange={(e) => setCampusId(e.target.value.toUpperCase())}
            onBlur={() => setTouched(t => ({ ...t, campusId: true }))}
            placeholder="学生STU开头 / 教师TEA开头"
            className={`input-base ${idError ? 'border-library-coral focus:border-library-coral' : ''}`}
            maxLength={13}
          />
          {campusId && /^(STU|TEA)\w{5,10}$/.test(campusId) && (
            <CheckCircle2 className="absolute right-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-library-teal" />
          )}
        </div>
        <AnimatePresence>
          {idError && (
            <motion.p
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              className="mt-2 text-sm text-library-coral flex items-center gap-1"
            >
              <AlertCircle className="w-3.5 h-3.5" />
              {idError}
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      <div>
        <label className="block text-sm font-medium text-library-navy/80 mb-2 ml-1">校园密码</label>
        <div className="relative">
          <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-library-navy/40" />
          <input
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onBlur={() => setTouched(t => ({ ...t, password: true }))}
            placeholder="请输入校园系统密码"
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

      <p className="text-xs text-library-navy/40 leading-relaxed">
        * 校园账号对接本校统一身份认证系统，首次登录需完成读者信息绑定
      </p>

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
          校园账号 STU20210001 / 密码 123456
        </p>
      </div>
    </form>
  );
};

export default CampusForm;
