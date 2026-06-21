import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Heart, BookOpen, Phone, Check, ChevronRight, Baby } from 'lucide-react';
import type { UserInfo } from '../../types';

interface ParentConsentModalProps {
  isOpen: boolean;
  userInfo: UserInfo | null;
  onConfirm: () => void;
  onCancel: () => void;
}

const ParentConsentModal = ({ isOpen, userInfo, onConfirm, onCancel }: ParentConsentModalProps) => {
  const [hasRead, setHasRead] = useState(false);
  const [agreed, setAgreed] = useState(false);

  const handleConfirm = () => {
    if (hasRead && agreed) {
      onConfirm();
      setHasRead(false);
      setAgreed(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && userInfo && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-library-navy/60 backdrop-blur-md"
            onClick={onCancel}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: 40 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none"
          >
            <div
              className="pointer-events-auto w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative px-7 pt-7 pb-5 bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50 overflow-hidden">
                <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-amber-200/40 to-transparent rounded-full -translate-y-1/2 translate-x-1/2" />
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-rose-200/40 to-transparent rounded-full translate-y-1/2 -translate-x-1/3" />
                
                <div className="relative z-10">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 15, delay: 0.1 }}
                    className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-amber-400 via-orange-400 to-rose-400 shadow-xl flex items-center justify-center"
                  >
                    <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center">
                      <Baby className="w-9 h-9 text-rose-500" />
                    </div>
                  </motion.div>

                  <h3 className="font-serif text-2xl font-bold text-library-navy text-center mb-1">
                    儿童读者登录确认
                  </h3>
                  <p className="text-library-navy/60 text-center text-sm">
                    检测到 <span className="font-semibold text-library-navy">{userInfo.name}</span> 为儿童读者账号
                  </p>
                </div>
              </div>

              <div className="p-7">
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="rounded-2xl border-2 border-library-gold/30 bg-gradient-to-br from-library-gold/5 to-transparent p-5 mb-5"
                >
                  <div className="flex items-center gap-2 mb-3">
                    <Shield className="w-5 h-5 text-library-gold" />
                    <h4 className="font-semibold text-library-navy">家长/监护人须知</h4>
                  </div>
                  <div className="space-y-3 text-sm text-library-navy/70">
                    <div className="flex items-start gap-3">
                      <Heart className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                      <p>本账号属于未成年人（儿童读者），其借阅行为需在家长/监护人指导下进行</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <BookOpen className="w-4 h-4 text-library-teal shrink-0 mt-0.5" />
                      <p>建议家长陪同孩子进行图书选借，共同培养良好的阅读习惯</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <Phone className="w-4 h-4 text-library-navy/60 shrink-0 mt-0.5" />
                      <p>重要借阅提醒将同步发送至预留手机号 <span className="font-medium text-library-navy">{userInfo.parentPhone?.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2')}</span></p>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="space-y-4 mb-6"
                >
                  <label className="flex items-start gap-3 cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={hasRead}
                      onChange={(e) => setHasRead(e.target.checked)}
                      className="mt-0.5 w-5 h-5 rounded-lg border-2 border-library-navy/20 text-library-gold focus:ring-library-gold/30 cursor-pointer"
                    />
                    <span className="text-sm text-library-navy/70 group-hover:text-library-navy transition-colors leading-relaxed">
                      我已仔细阅读以上须知内容，并了解本账号的使用规范
                    </span>
                  </label>
                  <label className="flex items-start gap-3 cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={agreed}
                      onChange={(e) => setAgreed(e.target.checked)}
                      className="mt-0.5 w-5 h-5 rounded-lg border-2 border-library-navy/20 text-library-gold focus:ring-library-gold/30 cursor-pointer"
                    />
                    <span className="text-sm text-library-navy/70 group-hover:text-library-navy transition-colors leading-relaxed">
                      我作为家长/监护人同意 {userInfo.name} 使用图书馆服务，并承担相应的监护责任
                    </span>
                  </label>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="space-y-3"
                >
                  <button
                    onClick={handleConfirm}
                    disabled={!hasRead || !agreed}
                    className={`w-full py-4 rounded-2xl font-semibold text-lg flex items-center justify-center gap-2 transition-all duration-300 ${
                      hasRead && agreed
                        ? 'bg-gradient-to-r from-library-gold via-amber-500 to-library-gold text-library-navy shadow-gold hover:shadow-xl hover:-translate-y-0.5'
                        : 'bg-library-navy/10 text-library-navy/30 cursor-not-allowed'
                    }`}
                  >
                    <Check className="w-5 h-5" />
                    确认同意并登录
                  </button>
                  <button
                    onClick={onCancel}
                    className="w-full py-3.5 rounded-2xl border-2 border-library-navy/15 text-library-navy/60 font-medium hover:bg-library-navy/5 hover:text-library-navy transition-all flex items-center justify-center gap-1"
                  >
                    <span>取消，返回登录页</span>
                  </button>
                </motion.div>

                <div className="mt-6 pt-5 border-t border-library-navy/5">
                  <p className="text-xs text-library-navy/40 text-center mb-2">
                    如家长联系方式需要更新，请联系图书馆柜台或
                  </p>
                  <button className="w-full text-xs text-library-gold font-medium hover:text-library-goldLight flex items-center justify-center gap-1 transition-colors">
                    <span>前往家长信息设置</span>
                    <ChevronRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ParentConsentModal;
