import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Smartphone, Mail, Search, CreditCard, CheckCircle2, ArrowLeft } from 'lucide-react';
import type { FindMethod } from '../../types';

interface FindCardModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type Step = 'method' | 'verify' | 'result';

const FindCardModal = ({ isOpen, onClose }: FindCardModalProps) => {
  const [step, setStep] = useState<Step>('method');
  const [findMethod, setFindMethod] = useState<FindMethod>('phone');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [foundCard, setFoundCard] = useState('');
  const [userName, setUserName] = useState('');

  const resetAndClose = () => {
    setStep('method');
    setPhone('');
    setEmail('');
    setCode('');
    onClose();
  };

  const goBack = () => {
    if (step === 'verify') setStep('method');
    else if (step === 'result') setStep('verify');
  };

  const handleVerify = () => {
    if (findMethod === 'phone' && phone && code === '123456') {
      setFoundCard('LIB2024001');
      setUserName('张博文');
      setStep('result');
    } else if (findMethod === 'email' && email && code === '123456') {
      setFoundCard('LIB2024001');
      setUserName('张博文');
      setStep('result');
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-library-navy/50 backdrop-blur-sm"
            onClick={resetAndClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none"
          >
            <div
              className="pointer-events-auto w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative bg-gradient-navy px-7 py-6 text-white">
                <div className="absolute inset-0 bg-paper-texture opacity-10" />
                <div className="relative z-10">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-library-gold/20 flex items-center justify-center">
                        <Search className="w-5 h-5 text-library-gold" />
                      </div>
                      <div>
                        <h3 className="font-serif text-xl font-bold">找回借阅证号</h3>
                        <p className="text-white/60 text-sm">通过预留信息快速找回</p>
                      </div>
                    </div>
                    <button
                      onClick={resetAndClose}
                      className="p-2 rounded-xl hover:bg-white/10 transition-colors"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                  {step !== 'method' && (
                    <button
                      onClick={goBack}
                      className="mt-4 flex items-center gap-1.5 text-sm text-library-gold hover:text-library-goldLight transition-colors"
                    >
                      <ArrowLeft className="w-4 h-4" />
                      返回上一步
                    </button>
                  )}
                </div>
              </div>

              <div className="p-7">
                <AnimatePresence mode="wait">
                  {step === 'method' && (
                    <motion.div
                      key="method"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-4"
                    >
                      <p className="text-sm text-library-navy/70 mb-6">请选择找回方式，使用注册时预留的信息找回借阅证号：</p>

                      <button
                        onClick={() => setFindMethod('phone')}
                        className={`w-full p-4 rounded-2xl border-2 rounded-xl flex items-center gap-4 transition-all ${
                          findMethod === 'phone'
                            ? 'border-library-gold bg-library-gold/5'
                            : 'border-library-creamDark hover:border-library-navy/20'
                        }`}
                      >
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                          findMethod === 'phone' ? 'bg-library-gold/20' : 'bg-library-navy/5'
                        }`}>
                          <Smartphone className={`w-6 h-6 ${findMethod === 'phone' ? 'text-library-gold' : 'text-library-navy/60'}`} />
                        </div>
                        <div className="text-left flex-1">
                          <p className={`font-semibold ${findMethod === 'phone' ? 'text-library-navy' : 'text-library-navy/80'}`}>
                            手机号找回
                          </p>
                          <p className="text-sm text-library-navy/50">已验证短信接收验证码</p>
                        </div>
                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                          findMethod === 'phone'
                            ? 'border-library-gold bg-library-gold'
                            : 'border-library-navy/20'
                        }`}>
                          {findMethod === 'phone' && <CheckCircle2 className="w-4 h-4 text-white" />}
                        </div>
                      </button>

                      <button
                        onClick={() => setFindMethod('email')}
                        className={`w-full p-4 rounded-2xl border-2 rounded-xl flex items-center gap-4 transition-all ${
                          findMethod === 'email'
                            ? 'border-library-gold bg-library-gold/5'
                            : 'border-library-creamDark hover:border-library-navy/20'
                        }`}
                      >
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                          findMethod === 'email' ? 'bg-library-gold/20' : 'bg-library-navy/5'
                        }`}>
                          <Mail className={`w-6 h-6 ${findMethod === 'email' ? 'text-library-gold' : 'text-library-navy/60'}`} />
                        </div>
                        <div className="text-left flex-1">
                          <p className={`font-semibold ${findMethod === 'email' ? 'text-library-navy' : 'text-library-navy/80'}`}>
                            邮箱找回
                          </p>
                          <p className="text-sm text-library-navy/50">注册邮箱接收验证邮件</p>
                        </div>
                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                          findMethod === 'email'
                            ? 'border-library-gold bg-library-gold'
                            : 'border-library-navy/20'
                        }`}>
                          {findMethod === 'email' && <CheckCircle2 className="w-4 h-4 text-white" />}
                        </div>
                      </button>

                      <div className="pt-2">
                        {findMethod === 'phone' ? (
                          <div>
                            <label className="block text-sm font-medium text-library-navy/80 mb-2">预留手机号</label>
                            <input
                              type="tel"
                              value={phone}
                              onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 11))}
                              placeholder="请输入注册时的手机号"
                              className="input-base"
                            />
                          </div>
                        ) : (
                          <div>
                            <label className="block text-sm font-medium text-library-navy/80 mb-2">预留邮箱</label>
                            <input
                              type="email"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              placeholder="请输入注册时的邮箱"
                              className="input-base"
                            />
                          </div>
                        )}
                      </div>

                      <button
                        onClick={() => setStep('verify')}
                        disabled={(findMethod === 'phone' ? !/^1[3-9]\d{9}$/.test(phone) : !email.includes('@'))}
                        className="btn-gold w-full"
                      >
                        下一步
                      </button>
                    </motion.div>
                  )}

                  {step === 'verify' && (
                    <motion.div
                      key="verify"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-5"
                    >
                      <p className="text-sm text-library-navy/70">
                        已向您的{findMethod === 'phone' ? `手机 ${phone.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2')}` : '邮箱'}发送了6位数字验证码，请在下方输入：
                      </p>
                      <div>
                        <label className="block text-sm font-medium text-library-navy/80 mb-2">验证码</label>
                        <input
                          type="text"
                          value={code}
                          onChange={(e) => setCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                          placeholder="请输入6位验证码"
                          className="input-base text-center text-2xl font-bold tracking-widest"
                        />
                        <p className="mt-2 text-xs text-library-navy/40">
                          演示验证码：123456
                        </p>
                      </div>
                      <button
                        onClick={handleVerify}
                        disabled={code.length !== 6}
                        className="btn-gold w-full"
                      >
                        验证并找回
                      </button>
                    </motion.div>
                  )}

                  {step === 'result' && (
                    <motion.div
                      key="result"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="text-center py-4"
                    >
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: 'spring', stiffness: 300, damping: 15, delay: 0.1 }}
                        className="w-20 h-20 mx-auto mb-5 rounded-full bg-library-teal/15 flex items-center justify-center"
                      >
                        <CheckCircle2 className="w-10 h-10 text-library-teal" />
                      </motion.div>
                      <h4 className="font-serif text-xl font-bold text-library-navy mb-2">
                        {userName}，您好！
                      </h4>
                      <p className="text-library-navy/60 text-sm mb-6">您的借阅证号已成功找回</p>
                      <div className="p-5 rounded-2xl bg-library-cream mb-6">
                        <p className="text-xs text-library-navy/50 mb-2">您的借阅证号：</p>
                        <div className="flex items-center justify-center gap-3 mt-2">
                          <CreditCard className="w-6 h-6 text-library-gold" />
                          <span className="font-serif text-2xl font-bold text-library-navy tracking-wider">
                            {foundCard}
                          </span>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <button
                          onClick={resetAndClose}
                          className="btn-primary"
                        >
                          使用该证号登录
                        </button>
                        <button
                          onClick={resetAndClose}
                          className="btn-secondary w-full"
                        >
                          关闭
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default FindCardModal;
