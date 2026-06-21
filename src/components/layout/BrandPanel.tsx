import { motion } from 'framer-motion';
import { BookOpen, Clock, MapPin, Sparkles } from 'lucide-react';

const BrandPanel = () => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      className="relative w-full h-full bg-gradient-navy rounded-3xl overflow-hidden"
    >
      <div className="absolute inset-0 bg-paper-texture opacity-20" />
      
      <div className="absolute top-0 right-0 w-80 h-80 bg-library-gold/10 rounded-full blur-3xl -translate-y-20 translate-x-20" />
      <div className="absolute bottom-0 left-0 w-60 h-60 bg-library-teal/10 rounded-full blur-3xl translate-y-20 -translate-x-10" />
      
      <div className="relative z-10 h-full flex flex-col p-10 lg:p-12 text-white">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex items-center gap-3"
        >
          <div className="w-12 h-12 rounded-2xl bg-gradient-gold flex items-center justify-center shadow-gold">
            <BookOpen className="w-6 h-6 text-library-navy" strokeWidth={2.5} />
          </div>
          <div>
            <h1 className="text-2xl font-serif font-bold tracking-wide">文澜图书馆</h1>
            <p className="text-library-gold/80 text-xs tracking-widest">WENLAN LIBRARY</p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className="mt-14 lg:mt-20"
        >
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="w-5 h-5 text-library-gold animate-pulse-soft" />
            <span className="text-library-gold/90 text-sm font-medium tracking-wider">欢迎来到知识的殿堂</span>
          </div>
          <h2 className="font-serif text-4xl lg:text-5xl font-bold leading-tight mb-6 text-shadow">
            阅读，是心灵的
            <br />
            <span className="bg-gradient-gold bg-clip-text text-transparent">长途旅行</span>
          </h2>
          <p className="text-white/60 text-lg leading-relaxed max-w-md">
            馆藏120万册图书、500种期刊杂志、上千小时数字资源，
            为每一位读者打开通往世界的大门。
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-10 grid grid-cols-2 gap-4 max-w-md"
        >
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-5 border border-white/10">
            <div className="w-10 h-10 rounded-xl bg-library-gold/20 flex items-center justify-center mb-3">
              <Clock className="w-5 h-5 text-library-gold" />
            </div>
            <p className="text-xs text-white/50 mb-1">开馆时间</p>
            <p className="font-semibold">8:30 - 21:00</p>
            <p className="text-xs text-white/50 mt-1">周一闭馆整理</p>
          </div>
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-5 border border-white/10">
            <div className="w-10 h-10 rounded-xl bg-library-teal/20 flex items-center justify-center mb-3">
              <MapPin className="w-5 h-5 text-library-teal" />
            </div>
            <p className="text-xs text-white/50 mb-1">地址</p>
            <p className="font-semibold">文澜路88号</p>
            <p className="text-xs text-white/50 mt-1">近地铁4号线</p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.65 }}
          className="mt-auto pt-10"
        >
          <div className="flex items-center gap-8">
            <div>
              <p className="font-serif text-3xl font-bold text-library-gold">120<span className="text-lg">万+</span></p>
              <p className="text-xs text-white/40 mt-1">馆藏图书</p>
            </div>
            <div className="w-px h-10 bg-white/10" />
            <div>
              <p className="font-serif text-3xl font-bold text-library-gold">35<span className="text-lg">万+</span></p>
              <p className="text-xs text-white/40 mt-1">注册读者</p>
            </div>
            <div className="w-px h-10 bg-white/10" />
            <div className="hidden sm:block">
              <p className="font-serif text-3xl font-bold text-library-gold">24<span className="text-lg">h</span></p>
              <p className="text-xs text-white/40 mt-1">自助服务</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -right-6 top-1/3 w-28 h-40 rounded-lg bg-gradient-to-br from-amber-600 to-amber-800 shadow-2xl rotate-6 opacity-80"
        >
          <div className="absolute left-3 right-3 top-4 h-px bg-white/30" />
          <div className="absolute left-3 right-3 top-7 h-px bg-white/20" />
          <div className="absolute left-3 right-3 top-10 h-px bg-white/10" />
        </motion.div>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
          className="absolute -right-12 top-1/2 w-24 h-36 rounded-lg bg-gradient-to-br from-emerald-600 to-teal-800 shadow-2xl -rotate-12 opacity-70"
        >
          <div className="absolute left-2 right-2 top-3 h-px bg-white/30" />
          <div className="absolute left-2 right-2 top-6 h-px bg-white/20" />
        </motion.div>
        <motion.div
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
          className="absolute right-8 top-2/3 w-20 h-32 rounded-lg bg-gradient-to-br from-rose-500 to-pink-700 shadow-2xl rotate-3 opacity-60"
        >
          <div className="absolute left-2 right-2 top-3 h-px bg-white/30" />
          <div className="absolute left-2 right-2 top-6 h-px bg-white/20" />
        </motion.div>
      </div>
    </motion.div>
  );
};

export default BrandPanel;
