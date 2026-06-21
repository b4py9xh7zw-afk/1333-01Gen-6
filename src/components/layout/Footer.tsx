import { Phone, Mail, Clock, Heart } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="mt-10 pt-8 border-t border-library-navy/10">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-sm">
        <div>
          <p className="font-serif font-semibold text-library-navy mb-3">联系我们</p>
          <div className="space-y-2 text-library-navy/60">
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4" />
              <span>服务热线：400-888-8888</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4" />
              <span>reader@wenlan.lib</span>
            </div>
          </div>
        </div>
        <div>
          <p className="font-serif font-semibold text-library-navy mb-3">开放时间</p>
          <div className="space-y-2 text-library-navy/60">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span>周二至周日 8:30-21:00</span>
            </div>
            <p className="pl-6">少儿阅览区：9:00-17:30</p>
            <p className="pl-6">24小时自助借还区：全天开放</p>
          </div>
        </div>
        <div>
          <p className="font-serif font-semibold text-library-navy mb-3">快速链接</p>
          <div className="space-y-2 text-library-navy/60">
            <p className="hover:text-library-navy cursor-pointer transition-colors">借阅规则</p>
            <p className="hover:text-library-navy cursor-pointer transition-colors">读者办证</p>
            <p className="hover:text-library-navy cursor-pointer transition-colors">数字图书馆</p>
          </div>
        </div>
      </div>
      <div className="mt-8 pt-6 border-t border-library-navy/5 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-library-navy/40">
        <p>© 2026 文澜图书馆 版权所有 鄂ICP备xxxxxxxx号</p>
        <p className="flex items-center gap-1">
          用心服务每一位读者 <Heart className="w-3 h-3 text-library-coral fill-library-coral/30" />
        </p>
      </div>
    </footer>
  );
};

export default Footer;
