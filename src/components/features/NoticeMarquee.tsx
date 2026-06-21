import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, X, Calendar, Info, AlertTriangle, PartyPopper } from 'lucide-react';
import { mockNotices } from '../../data/mockData';
import type { Notice } from '../../types';

const typeConfig = {
  closure: { icon: AlertTriangle, color: 'text-library-coral', bg: 'bg-library-coral/10', label: '闭馆通知' },
  event: { icon: PartyPopper, color: 'text-library-gold', bg: 'bg-library-gold/10', label: '活动公告' },
  info: { icon: Info, color: 'text-library-teal', bg: 'bg-library-teal/10', label: '通知' },
};

const NoticeMarquee = () => {
  const [isPaused, setIsPaused] = useState(false);
  const [selectedNotice, setSelectedNotice] = useState<Notice | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const duplicatedNotices = [...mockNotices, ...mockNotices];

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="relative overflow-hidden rounded-2xl border border-library-gold/20 bg-gradient-to-r from-library-gold/8 via-white to-library-gold/8"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <div className="flex items-stretch">
          <div className="flex-shrink-0 flex items-center gap-2 px-4 py-3 bg-gradient-to-r from-library-gold/20 to-library-gold/5 border-r border-library-gold/20">
            <Volume2 className="w-5 h-5 text-library-gold animate-pulse-soft" />
            <span className="font-serif text-sm font-bold text-library-navy whitespace-nowrap">公告栏</span>
          </div>

          <div className="flex-1 overflow-hidden relative py-3">
            <motion.div
              ref={scrollRef}
              animate={isPaused ? { x: 0 } : { x: '-50%' }}
              transition={isPaused ? {} : { duration: 25, repeat: Infinity, ease: 'linear' }}
              className="flex items-center gap-10 whitespace-nowrap"
            >
              {duplicatedNotices.map((notice, idx) => {
                const Icon = typeConfig[notice.type].icon;
                return (
                  <button
                    key={`${notice.id}-${idx}`}
                    onClick={() => setSelectedNotice(notice)}
                    className="group inline-flex items-center gap-2 text-sm hover:text-library-navy text-library-navy/70 transition-colors"
                  >
                    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${typeConfig[notice.type].bg} ${typeConfig[notice.type].color}`}>
                      <Icon className="w-3 h-3" />
                      {typeConfig[notice.type].label}
                    </span>
                    <span className="group-hover:text-library-navy font-medium">{notice.title}</span>
                    <span className="text-library-navy/30 text-xs">|</span>
                  </button>
                );
              })}
            </motion.div>
          </div>

          <div className="hidden sm:flex items-center px-4">
            <div className="flex items-center gap-1 text-xs text-library-navy/40">
              <Calendar className="w-3.5 h-3.5" />
              <span>{mockNotices[0].date}</span>
            </div>
          </div>
        </div>
      </motion.div>

      <AnimatePresence>
        {selectedNotice && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-library-navy/50 backdrop-blur-sm"
              onClick={() => setSelectedNotice(null)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: 'spring', stiffness: 300, damping: 25 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none"
            >
              <div
                className="pointer-events-auto w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden"
                onClick={(e) => e.stopPropagation()}
              >
                <div className={`px-7 py-6 border-b border-library-navy/5 ${typeConfig[selectedNotice.type].bg}`}>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${typeConfig[selectedNotice.type].bg} bg-opacity-50`}>
                        {(() => {
                          const Icon = typeConfig[selectedNotice.type].icon;
                          return <Icon className={`w-6 h-6 ${typeConfig[selectedNotice.type].color}`} />;
                        })()}
                      </div>
                      <div>
                        <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${typeConfig[selectedNotice.type].bg} ${typeConfig[selectedNotice.type].color}`}>
                          {typeConfig[selectedNotice.type].label}
                        </span>
                        <h3 className="font-serif text-xl font-bold text-library-navy mt-1">{selectedNotice.title}</h3>
                      </div>
                    </div>
                    <button
                      onClick={() => setSelectedNotice(null)}
                      className="p-2 rounded-xl hover:bg-white/80 transition-colors"
                    >
                      <X className="w-5 h-5 text-library-navy/50" />
                    </button>
                  </div>
                </div>
                <div className="p-7">
                  <p className="text-library-navy/80 leading-relaxed mb-6">{selectedNotice.content}</p>
                  <div className="flex items-center justify-between">
                    <p className="text-xs text-library-navy/40 flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5" />
                      发布日期：{selectedNotice.date}
                    </p>
                    <button onClick={() => setSelectedNotice(null)} className="btn-gold">
                      我知道了
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default NoticeMarquee;
