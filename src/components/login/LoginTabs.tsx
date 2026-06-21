import { motion } from 'framer-motion';
import { CreditCard, Smartphone, GraduationCap } from 'lucide-react';
import type { LoginMethod } from '../../types';

interface LoginTabsProps {
  activeMethod: LoginMethod;
  onMethodChange: (method: LoginMethod) => void;
}

const tabs = [
  { method: 'libraryCard' as const, label: '借阅证', icon: CreditCard },
  { method: 'phone' as const, label: '手机号', icon: Smartphone },
  { method: 'campus' as const, label: '校园账号', icon: GraduationCap },
];

const LoginTabs = ({ activeMethod, onMethodChange }: LoginTabsProps) => {
  return (
    <div className="relative p-1.5 bg-library-creamDark/60 rounded-2xl flex">
      {tabs.map((tab, index) => {
        const Icon = tab.icon;
        const isActive = activeMethod === tab.method;
        return (
          <button
            key={tab.method}
            onClick={() => onMethodChange(tab.method)}
            className={`relative flex-1 z-10 flex items-center justify-center gap-2 py-3 px-3 rounded-xl text-sm font-medium transition-all duration-300 ${
              isActive ? 'text-white' : 'text-library-navy/60 hover:text-library-navy'
            }`}
          >
            {isActive && (
              <motion.div
                layoutId="loginTabBg"
                className="absolute inset-0 bg-gradient-navy rounded-xl shadow-md"
                transition={{ type: 'spring', stiffness: 400, damping: 30 }}
              />
            )}
            <span className="relative z-10">
              <Icon className="w-4 h-4" />
            </span>
            <span className="relative z-10 hidden sm:inline">{tab.label}</span>
            <span className="relative z-10 sm:hidden">{index === 0 ? '借阅证' : index === 1 ? '手机' : '校园'}</span>
          </button>
        );
      })}
    </div>
  );
};

export default LoginTabs;
