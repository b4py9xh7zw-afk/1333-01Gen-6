import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CreditCard, HelpCircle, UserCheck, LogOut } from 'lucide-react';
import BrandPanel from '../components/layout/BrandPanel';
import Footer from '../components/layout/Footer';
import LoginTabs from '../components/login/LoginTabs';
import LibraryCardForm from '../components/login/LibraryCardForm';
import PhoneForm from '../components/login/PhoneForm';
import CampusForm from '../components/login/CampusForm';
import FindCardModal from '../components/login/FindCardModal';
import QuickActions from '../components/features/QuickActions';
import NoticeMarquee from '../components/features/NoticeMarquee';
import ParentConsentModal from '../components/modal/ParentConsentModal';
import { mockUsers } from '../data/mockData';
import type { LoginMethod, UserInfo } from '../types';

export default function Home() {
  const [loginMethod, setLoginMethod] = useState<LoginMethod>('libraryCard');
  const [findCardOpen, setFindCardOpen] = useState(false);
  const [parentModalOpen, setParentModalOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<UserInfo | null>(null);
  const [pendingUser, setPendingUser] = useState<UserInfo | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const mockLogin = (account: string, type: LoginMethod) => {
    setIsLoading(true);
    setError(null);

    setTimeout(() => {
      const user = mockUsers[account];
      if (user) {
        if (user.userType === 'child') {
          setPendingUser(user);
          setParentModalOpen(true);
          setIsLoading(false);
        } else {
          setCurrentUser(user);
          setIsLoading(false);
        }
      } else {
        setError(type === 'phone' ? '手机号未注册或验证码错误' : '账号或密码错误');
        setIsLoading(false);
      }
    }, 1200);
  };

  const handleLibraryCardSubmit = (cardNo: string, _password: string) => {
    mockLogin(cardNo, 'libraryCard');
  };

  const handlePhoneSubmit = (phone: string, _code: string) => {
    mockLogin(phone, 'phone');
  };

  const handleCampusSubmit = (campusId: string, _password: string) => {
    mockLogin(campusId, 'campus');
  };

  const handleParentConfirm = () => {
    if (pendingUser) {
      setCurrentUser(pendingUser);
      setParentModalOpen(false);
      setPendingUser(null);
    }
  };

  const handleParentCancel = () => {
    setParentModalOpen(false);
    setPendingUser(null);
    setCurrentUser(null);
  };

  const handleLogout = () => {
    setCurrentUser(null);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-1 container max-w-7xl mx-auto px-4 sm:px-6 py-8 lg:py-12">
        {!currentUser ? (
          <>
            <NoticeMarquee />
            
            <div className="mt-6 lg:mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
              <div className="lg:col-span-7">
                <div className="h-full min-h-[600px] lg:min-h-[720px]">
                  <BrandPanel />
                </div>
              </div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.1, ease: 'easeOut' }}
                className="lg:col-span-5"
              >
                <div className="relative h-full bg-white/80 backdrop-blur-xl rounded-3xl p-8 lg:p-10 shadow-card border border-white/50">
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-1 bg-gradient-gold rounded-b-full opacity-60" />

                  <div className="relative flex items-start justify-between mb-6">
                    <div>
                      <motion.h2
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="font-serif text-3xl font-bold text-library-navy mb-1"
                      >
                        读者登录
                      </motion.h2>
                      <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.15 }}
                        className="text-library-navy/50 text-sm"
                      >
                        欢迎回到文澜图书馆
                      </motion.p>
                    </div>
                    <button
                      onClick={() => setFindCardOpen(true)}
                      className="group flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-medium text-library-gold hover:bg-library-gold/10 transition-all"
                    >
                      <HelpCircle className="w-4 h-4 group-hover:rotate-12 transition-transform" />
                      <span className="hidden sm:inline">找回证号</span>
                    </button>
                  </div>

                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="mb-7"
                  >
                    <LoginTabs activeMethod={loginMethod} onMethodChange={(m) => {
                      setLoginMethod(m);
                      setError(null);
                    }} />
                  </motion.div>

                  <div className="relative">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={loginMethod}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.25 }}
                      >
                        {loginMethod === 'libraryCard' && (
                          <LibraryCardForm
                            onSubmit={handleLibraryCardSubmit}
                            isLoading={isLoading}
                            error={error}
                          />
                        )}
                        {loginMethod === 'phone' && (
                          <PhoneForm
                            onSubmit={handlePhoneSubmit}
                            isLoading={isLoading}
                            error={error}
                          />
                        )}
                        {loginMethod === 'campus' && (
                          <CampusForm
                            onSubmit={handleCampusSubmit}
                            isLoading={isLoading}
                            error={error}
                          />
                        )}
                      </motion.div>
                    </AnimatePresence>
                  </div>

                  <div className="mt-7 pt-6 border-t border-library-navy/5">
                    <div className="flex items-center justify-center gap-2 text-xs text-library-navy/40">
                      <CreditCard className="w-3.5 h-3.5" />
                      <span>还没有借阅证？</span>
                      <a href="#" className="text-library-gold font-medium hover:text-library-goldLight transition-colors">
                        在线办理读者证 →
                      </a>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="bg-white rounded-3xl p-6 lg:p-8 shadow-card border border-white/50">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className={`w-16 h-16 rounded-2xl flex items-center justify-center ${
                    currentUser.userType === 'child'
                      ? 'bg-gradient-to-br from-amber-400 to-rose-400'
                      : 'bg-gradient-navy'
                  } shadow-lg`}>
                    <UserCheck className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h2 className="font-serif text-2xl font-bold text-library-navy">
                      {currentUser.name}，欢迎回来！
                    </h2>
                    <div className="flex items-center gap-3 mt-1">
                      <span className="text-sm text-library-navy/50">
                        证号：{currentUser.libraryCardNo}
                      </span>
                      {currentUser.userType === 'child' && (
                        <span className="text-xs px-2 py-0.5 rounded-full bg-amber-100 text-amber-700 font-medium">
                          儿童读者
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                <button
                  onClick={handleLogout}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border-2 border-library-navy/15 text-library-navy/70 font-medium hover:bg-library-navy hover:text-white hover:border-library-navy transition-all"
                >
                  <LogOut className="w-4 h-4" />
                  退出登录
                </button>
              </div>
            </div>

            <NoticeMarquee />
            
            <QuickActions />
          </motion.div>
        )}

        <div className="mt-10 lg:mt-12">
          {!currentUser && (
            <div className="mb-8">
              <QuickActions />
            </div>
          )}
          <Footer />
        </div>
      </div>

      <FindCardModal isOpen={findCardOpen} onClose={() => setFindCardOpen(false)} />
      <ParentConsentModal
        isOpen={parentModalOpen}
        userInfo={pendingUser}
        onConfirm={handleParentConfirm}
        onCancel={handleParentCancel}
      />
    </div>
  );
}
