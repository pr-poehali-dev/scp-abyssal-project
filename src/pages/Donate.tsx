import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import Icon from '@/components/ui/icon';
import { useToast } from '@/hooks/use-toast';

const Donate = () => {
  const [steamId, setSteamId] = useState('');
  const [amount, setAmount] = useState('');
  const [loading, setLoading] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const { toast } = useToast();

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const quickAmounts = [100, 500, 1000, 2000, 5000];

  const handleDonate = async () => {
    if (!steamId.trim()) {
      toast({
        title: 'Ошибка',
        description: 'Введите Steam ID',
        variant: 'destructive',
      });
      return;
    }

    const customAmount = parseInt(amount);
    if (!customAmount || customAmount < 100) {
      toast({
        title: 'Ошибка',
        description: 'Минимальная сумма пополнения 100 ₽',
        variant: 'destructive',
      });
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('https://functions.poehali.dev/82e4a93c-2575-4ee2-8cc3-dbdc6931e07f', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          steam_id: steamId,
          amount: customAmount,
        }),
      });

      const data = await response.json();
      
      if (data.payment_url) {
        window.location.href = data.payment_url;
      } else {
        throw new Error('Не удалось создать платёж');
      }
    } catch (error) {
      toast({
        title: 'Ошибка',
        description: 'Не удалось создать платёж. Попробуйте позже.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen text-white relative overflow-hidden bg-[#051510]">
      <div 
        className="fixed pointer-events-none z-0 rounded-full blur-3xl transition-opacity duration-300"
        style={{
          left: `${mousePos.x}px`,
          top: `${mousePos.y}px`,
          width: '400px',
          height: '400px',
          transform: 'translate(-50%, -50%)',
          background: 'radial-gradient(circle, rgba(29, 185, 84, 0.2) 0%, transparent 70%)',
        }}
      ></div>

      <header className="fixed top-0 left-0 right-0 z-50 bg-[#051510]/90 backdrop-blur-sm border-b border-primary/20">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <a href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
            <img src="https://cdn.poehali.dev/files/4468007d-3ca2-4d75-af22-bd7b04f04385.png" alt="Abyssal" className="w-10 h-10" />
            <h1 className="text-xl font-bold tracking-wider">ABYSSAL</h1>
          </a>
          <Button 
            onClick={() => window.history.back()}
            className="bg-primary/10 text-primary border-2 border-primary hover:bg-primary hover:text-black transition-all duration-300 px-6 flex items-center gap-2 group"
          >
            <Icon name="ArrowLeft" size={18} className="group-hover:-translate-x-1 transition-transform duration-300" />
            Вернуться
          </Button>
        </div>
      </header>

      <main className="relative z-10 pt-32 pb-20">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center mb-16 animate-fade-in">
            <h1 className="text-6xl font-bold mb-6 tracking-wide">
              ПОПОЛНЕНИЕ <span className="text-primary">БАЛАНСА</span>
            </h1>
            <p className="text-xl opacity-80 max-w-2xl mx-auto">
              Поддержите развитие проекта и получите донат-валюту для улучшения игрового опыта
            </p>
            <div className="mt-6 inline-flex items-center gap-2 px-6 py-3 bg-primary/10 border border-primary/30 rounded-full">
              <Icon name="TrendingUp" size={20} className="text-primary" />
              <span className="text-sm font-bold">Курс: 1₽ = 1 донат-валюта</span>
            </div>
          </div>

          <div className="max-w-6xl mx-auto mb-16 animate-fade-in" style={{ animationDelay: '0.1s' }}>
            <div className="grid lg:grid-cols-2 gap-8 items-center">
              <div className="relative animate-fade-in order-2 lg:order-1">
                <div className="absolute inset-0 bg-primary/20 rounded-full blur-[100px] animate-pulse"></div>
                <img 
                  src="https://cdn.poehali.dev/files/bgsite.png" 
                  alt="Abyssal Hero" 
                  className="relative w-full h-auto rounded-2xl shadow-2xl shadow-primary/30 animate-float"
                />
              </div>

              <Card className="p-8 bg-card/50 backdrop-blur-sm border-2 border-primary/30 hover:border-primary transition-all duration-500 relative overflow-hidden rounded-2xl order-1 lg:order-2">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent pointer-events-none"></div>
                <div className="relative space-y-6">
                  <div>
                    <label className="block text-lg font-bold mb-3 tracking-wide flex items-center gap-2">
                      <Icon name="User" size={20} className="text-primary" />
                      ВАШ STEAM ID
                    </label>
                    <Input
                      type="text"
                      placeholder="STEAM_0:1:12345678"
                      value={steamId}
                      onChange={(e) => setSteamId(e.target.value)}
                      className="bg-background/70 border-2 border-primary/30 focus:border-primary text-white text-lg h-14 transition-all duration-300"
                    />
                    <p className="text-xs opacity-60 mt-2 flex items-center gap-2">
                      <Icon name="Info" size={14} />
                      Найти свой Steam ID:{' '}
                      <a href="https://steamid.io/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline font-bold">
                        steamid.io
                      </a>
                    </p>
                  </div>

                  <div>
                    <label className="block text-lg font-bold mb-3 tracking-wide flex items-center gap-2">
                      <Icon name="Wallet" size={20} className="text-primary" />
                      ВВЕДИТЕ СУММУ
                    </label>
                    <Input
                      type="number"
                      placeholder="Минимум 100 ₽"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      className="bg-background/70 border-2 border-primary/30 focus:border-primary text-white text-lg h-14 transition-all duration-300"
                      min="100"
                    />
                    
                    <div className="grid grid-cols-5 gap-2 mt-4">
                      {quickAmounts.map((sum) => (
                        <button
                          key={sum}
                          onClick={() => setAmount(sum.toString())}
                          className="px-3 py-2 bg-background/70 border-2 border-primary/30 rounded-lg text-sm font-bold hover:border-primary hover:bg-primary/10 transition-all duration-300 group relative overflow-hidden"
                        >
                          <span className="absolute inset-0 bg-primary/20 scale-0 group-hover:scale-100 transition-transform duration-300 rounded-lg"></span>
                          <span className="relative">{sum}₽</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  <Button
                    onClick={handleDonate}
                    disabled={loading}
                    className="w-full bg-primary text-black hover:bg-primary/90 font-bold text-lg h-14 transition-all duration-300 flex items-center justify-center gap-3 group relative overflow-hidden"
                  >
                    <span className="absolute inset-0 bg-white/20 scale-0 group-hover:scale-100 transition-transform duration-300"></span>
                    <Icon name={loading ? "Loader2" : "CreditCard"} size={20} className={loading ? "animate-spin" : "group-hover:scale-110 transition-transform"} />
                    <span className="relative">{loading ? 'ОБРАБОТКА...' : 'ПОПОЛНИТЬ'}</span>
                  </Button>
                </div>
              </Card>
            </div>
          </div>

          <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8 mb-16 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <Card className="p-8 bg-card/30 backdrop-blur-sm border-2 border-primary/20 hover:border-primary/40 transition-all duration-300 rounded-xl">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-primary/10 rounded-lg">
                  <Icon name="Shield" size={28} className="text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Безопасно</h3>
                  <p className="text-sm opacity-70 leading-relaxed">
                    Оплата через надёжные кассы
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-8 bg-card/30 backdrop-blur-sm border-2 border-primary/20 hover:border-primary/40 transition-all duration-300 rounded-xl">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-primary/10 rounded-lg">
                  <Icon name="Zap" size={28} className="text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Мгновенно</h3>
                  <p className="text-sm opacity-70 leading-relaxed">
                    Зачисление до двух минут
                  </p>
                </div>
              </div>
            </Card>
          </div>

          <div className="max-w-4xl mx-auto text-center space-y-4 animate-fade-in" style={{ animationDelay: '0.3s' }}>
            <div className="flex items-center justify-center gap-6 text-sm opacity-60">
              <a href="/privacy" className="hover:text-primary hover:opacity-100 transition-all duration-300 flex items-center gap-2">
                <Icon name="FileText" size={16} />
                Политика конфиденциальности
              </a>
              <a href="/refund" className="hover:text-primary hover:opacity-100 transition-all duration-300 flex items-center gap-2">
                <Icon name="RefreshCcw" size={16} />
                Политика возврата
              </a>
              <a href="/services" className="hover:text-primary hover:opacity-100 transition-all duration-300 flex items-center gap-2">
                <Icon name="Package" size={16} />
                Услуги
              </a>
            </div>
          </div>
        </div>
      </main>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.8s ease-out forwards;
          opacity: 0;
        }
      `}</style>
    </div>
  );
};

export default Donate;
