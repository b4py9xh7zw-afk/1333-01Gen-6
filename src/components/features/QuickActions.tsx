import { motion } from 'framer-motion';
import { RefreshCcw, CalendarCheck, ChevronRight, BookOpen } from 'lucide-react';
import { mockBorrowRecords, mockReserveRecords } from '../../data/mockData';

const QuickActions = () => {
  const renewCount = mockBorrowRecords.filter(r => r.canRenew).length;
  const reserveCount = mockReserveRecords.filter(r => r.status === 'available').length;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        whileHover={{ y: -4, transition: { duration: 0.2 } }}
        className="group relative overflow-hidden rounded-2xl bg-white p-6 border border-library-navy/5 shadow-soft cursor-pointer"
      >
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-library-teal/10 to-transparent rounded-full -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-500" />
        
        <div className="relative z-10">
          <div className="flex items-start justify-between mb-4">
            <div className="relative">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-library-teal to-library-tealLight flex items-center justify-center shadow-lg">
                <RefreshCcw className="w-7 h-7 text-white" strokeWidth={2.2} />
              </div>
              {renewCount > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', delay: 0.5 }}
                  className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-library-coral text-white text-xs font-bold flex items-center justify-center shadow-md"
                >
                  {renewCount}
                </motion.span>
              )}
            </div>
            <ChevronRight className="w-5 h-5 text-library-navy/30 group-hover:text-library-teal group-hover:translate-x-1 transition-all" />
          </div>
          
          <h4 className="font-serif text-lg font-bold text-library-navy mb-1">图书续借</h4>
          <p className="text-sm text-library-navy/50 mb-4">
            {renewCount > 0 ? `有 ${renewCount} 本图书待续借` : '暂无待续借图书'}
          </p>
          
          <div className="space-y-2">
            {mockBorrowRecords.slice(0, 2).map((r, i) => (
              <motion.div
                key={r.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 + i * 0.1 }}
                className="flex items-center gap-3 p-2 rounded-lg bg-library-cream/50 group-hover:bg-library-teal/5 transition-colors"
              >
                <div className={`w-8 h-10 rounded bg-gradient-to-br ${r.coverColor} shadow-sm flex items-center justify-center`}>
                  <BookOpen className="w-3.5 h-3.5 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium text-library-navy truncate">{r.bookTitle}</p>
                  <p className="text-[10px] text-library-navy/40">到期 {r.dueDate.slice(5)}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        whileHover={{ y: -4, transition: { duration: 0.2 } }}
        className="group relative overflow-hidden rounded-2xl bg-white p-6 border border-library-navy/5 shadow-soft cursor-pointer"
      >
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-library-gold/15 to-transparent rounded-full -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-500" />
        
        <div className="relative z-10">
          <div className="flex items-start justify-between mb-4">
            <div className="relative">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-library-gold to-library-goldLight flex items-center justify-center shadow-gold">
                <CalendarCheck className="w-7 h-7 text-library-navy" strokeWidth={2.2} />
              </div>
              {reserveCount > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', delay: 0.5 }}
                  className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-library-teal text-white text-xs font-bold flex items-center justify-center shadow-md"
                >
                  {reserveCount}
                </motion.span>
              )}
            </div>
            <ChevronRight className="w-5 h-5 text-library-navy/30 group-hover:text-library-gold group-hover:translate-x-1 transition-all" />
          </div>
          
          <h4 className="font-serif text-lg font-bold text-library-navy mb-1">图书预约</h4>
          <p className="text-sm text-library-navy/50 mb-4">
            {reserveCount > 0 ? `有 ${reserveCount} 本预约图书已到馆` : '暂无预约到馆图书'}
          </p>
          
          <div className="space-y-2">
            {mockReserveRecords.map((r, i) => (
              <motion.div
                key={r.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + i * 0.1 }}
                className="flex items-center gap-3 p-2 rounded-lg bg-library-cream/50 group-hover:bg-library-gold/10 transition-colors"
              >
                <div className={`w-8 h-10 rounded bg-gradient-to-br ${r.coverColor} shadow-sm flex items-center justify-center`}>
                  <BookOpen className="w-3.5 h-3.5 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium text-library-navy truncate">{r.bookTitle}</p>
                  <span className={`text-[10px] inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full ${
                    r.status === 'available'
                      ? 'bg-library-teal/15 text-library-teal'
                      : 'bg-library-navy/10 text-library-navy/50'
                  }`}>
                    {r.status === 'available' ? '已到馆' : '等待中'}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default QuickActions;
