import { useEffect, useState } from 'react';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

const Index = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const features = [
    {
      icon: 'Waves',
      title: 'Глубоководная локация',
      description: 'Уникальная подводная база на дне океана с реалистичной физикой и атмосферой',
    },
    {
      icon: 'Users',
      title: 'Ролевая игра',
      description: 'Развитая система ролей: исследователи, охрана, научный персонал, D-класс',
    },
    {
      icon: 'Zap',
      title: 'Динамические события',
      description: 'Прорывы контейнмента, аварийные ситуации, исследовательские миссии',
    },
    {
      icon: 'Radio',
      title: 'Коммуникации',
      description: 'Система внутренней связи, терминалы доступа, голосовой чат',
    },
    {
      icon: 'Shield',
      title: 'Система безопасности',
      description: 'Уровни допуска, биометрия, протоколы чрезвычайных ситуаций',
    },
    {
      icon: 'Lock',
      title: 'Аномалии',
      description: 'Уникальные объекты и существа, требующие особых протоколов содержания',
    },
  ];

  const team = [
    { name: 'Alucard', role: 'DIRECTEUR COMMUNAUTAIRE', image: 'https://cdn.poehali.dev/files/31199a1a-f99f-4780-b831-6ff4e1991487.png' },
    { name: 'Biazox', role: 'CO-DIRECTEUR COMMUNAUTAIRE', image: 'https://cdn.poehali.dev/files/31199a1a-f99f-4780-b831-6ff4e1991487.png' },
    { name: 'Raptor', role: 'CO-DIRECTEUR COMMUNAUTAIRE', image: 'https://cdn.poehali.dev/files/31199a1a-f99f-4780-b831-6ff4e1991487.png' },
    { name: 'Punisher', role: 'COORDINATEUR', image: 'https://cdn.poehali.dev/files/31199a1a-f99f-4780-b831-6ff4e1991487.png' },
    { name: 'Jason', role: 'COMMUNITY MANAGER', image: 'https://cdn.poehali.dev/files/31199a1a-f99f-4780-b831-6ff4e1991487.png' },
    { name: 'mxd', role: 'DIRECTEUR TECHNIQUE', image: 'https://cdn.poehali.dev/files/31199a1a-f99f-4780-b831-6ff4e1991487.png' },
    { name: 'Toheyyy', role: 'PÔLE TECHNIQUE', image: 'https://cdn.poehali.dev/files/31199a1a-f99f-4780-b831-6ff4e1991487.png' },
    { name: 'Nhilis', role: 'RESPONSABLE DE PROJET', image: 'https://cdn.poehali.dev/files/31199a1a-f99f-4780-b831-6ff4e1991487.png' },
  ];

  return (
    <div className="min-h-screen bg-[#051510] text-white relative overflow-hidden">
      <div className="fixed inset-0 pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="bubble"
            style={{
              left: `${Math.random() * 100}%`,
              width: `${20 + Math.random() * 60}px`,
              height: `${20 + Math.random() * 60}px`,
              animationDuration: `${15 + Math.random() * 20}s`,
              animationDelay: `${Math.random() * 10}s`,
            }}
          />
        ))}
      </div>

      <div className="fixed inset-0 pointer-events-none opacity-30">
        <div className="absolute inset-0 bg-gradient-radial from-[#1DB954]/20 via-transparent to-transparent"></div>
      </div>

      <header className="fixed top-0 left-0 right-0 z-50 bg-[#051510]/90 backdrop-blur-sm border-b border-primary/20">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src="https://cdn.poehali.dev/files/4468007d-3ca2-4d75-af22-bd7b04f04385.png" alt="Abyssal" className="w-10 h-10" />
            <h1 className="text-xl font-bold tracking-wider">ABYSSAL</h1>
          </div>
          <nav className="hidden md:flex gap-8 text-sm">
            <a href="#about" className="hover:text-primary transition-colors tracking-wide">
              About
            </a>
            <a href="#features" className="hover:text-primary transition-colors tracking-wide">
              Information
            </a>
            <a href="#team" className="hover:text-primary transition-colors tracking-wide">
              Team
            </a>
          </nav>
          <div className="flex gap-4">
            <Button className="corner-bracket bg-transparent border border-primary text-primary hover:bg-primary hover:text-black px-6">
              JOIN SERVER
            </Button>
            <Button className="corner-bracket bg-primary text-black hover:bg-primary/80 px-6">
              PLAY NOW
            </Button>
          </div>
        </div>
      </header>

      <main>
        <section
          className="min-h-screen flex items-center justify-center relative pt-20"
          style={{
            transform: `translateY(${scrollY * 0.3}px)`,
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-[#051510] via-transparent to-[#051510]"></div>

          <div className="container mx-auto px-4 text-center relative z-10">
            <div className="mb-8 animate-fade-in" style={{ animationDelay: '0.2s' }}>
              <div className="text-6xl md:text-9xl font-black mb-4 tracking-wider">
                <div className="text-white">ABYSSAL</div>
              </div>
            </div>
            <p className="text-lg md:text-xl mb-12 tracking-widest opacity-80 animate-fade-in" style={{ animationDelay: '0.4s' }}>
              Глубоководный исследовательский комплекс
            </p>
            <div className="flex justify-center items-center gap-2 animate-bounce" style={{ animationDelay: '1s' }}>
              <Icon name="ChevronDown" size={20} />
              <span className="text-sm tracking-widest">Scroll</span>
            </div>
          </div>
        </section>

        <section id="about" className="py-32 relative">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-16 items-start">
              <div className="space-y-8">
                <div className="animate-fade-in">
                  <div className="text-sm tracking-widest opacity-50 mb-2">ABOUT</div>
                  <h3 className="text-4xl font-bold tracking-wide">ABOUT</h3>
                </div>

                <div className="space-y-6">
                  <div className="border-l-2 border-primary pl-4 animate-fade-in" style={{ animationDelay: '0.2s' }}>
                    <div className="text-sm tracking-wider mb-2 text-primary">01</div>
                    <h4 className="text-xl font-bold mb-2">Глубоководная станция</h4>
                    <p className="text-sm leading-relaxed opacity-80">
                      Abyssal — это уникальная подводная исследовательская станция, расположенная на глубине 8000 метров.
                      Здесь изучаются самые опасные морские аномалии под огромным давлением океанской бездны.
                    </p>
                  </div>

                  <div className="border-l-2 border-white/20 pl-4 animate-fade-in" style={{ animationDelay: '0.4s' }}>
                    <div className="text-sm tracking-wider mb-2 text-muted-foreground">02</div>
                    <h4 className="text-xl font-bold mb-2">Ролевой проект</h4>
                    <p className="text-sm leading-relaxed opacity-80">
                      Станьте частью команды станции Abyssal. Исследуйте аномальные объекты,
                      поддерживайте протоколы безопасности, взаимодействуйте с другими игроками
                      в атмосфере постоянной угрозы.
                    </p>
                  </div>

                  <div className="border-l-2 border-white/20 pl-4 animate-fade-in" style={{ animationDelay: '0.6s' }}>
                    <div className="text-sm tracking-wider mb-2 text-muted-foreground">03</div>
                    <h4 className="text-xl font-bold mb-2">Выживание</h4>
                    <p className="text-sm leading-relaxed opacity-80">
                      Каждое решение может стоить жизни экипажу. Прорывы контейнмента,
                      технические аварии, угрозы из глубин — готовы ли вы погрузиться в бездну?
                    </p>
                  </div>
                </div>
              </div>

              <div className="relative animate-fade-in" style={{ animationDelay: '0.8s' }}>
                <div className="corner-bracket aspect-square bg-gradient-to-br from-primary/20 to-transparent grid-bg p-8 flex items-center justify-center">
                  <img
                    src="https://cdn.poehali.dev/files/31199a1a-f99f-4780-b831-6ff4e1991487.png"
                    alt="Abyssal Logo"
                    className="w-full h-auto max-w-md opacity-80"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="features" className="py-32 relative">
          <div className="container mx-auto px-4">
            <div className="mb-16 animate-fade-in">
              <div className="text-sm tracking-widest opacity-50 mb-2">DISCOVER THE</div>
              <h3 className="text-5xl font-bold tracking-wide mb-6">POSSIBILITIES</h3>
              <p className="text-sm leading-relaxed opacity-80 max-w-2xl">
                Возможности этой игры безграничны! От строительства собственных баз до участия в
                различных игровых режимах и сценариях выживания в глубинах океана.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mb-8">
              {features.slice(0, 2).map((feature, index) => (
                <div key={index} className="corner-bracket p-8 bg-[#0a1f18]/50 hover:bg-[#0a1f18]/80 transition-all grid-bg animate-fade-in" style={{ animationDelay: `${0.2 + index * 0.1}s` }}>
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 border border-primary flex items-center justify-center flex-shrink-0">
                      <Icon name={feature.icon} className="text-primary" size={24} />
                    </div>
                    <div>
                      <h4 className="text-xl font-bold mb-2 tracking-wide">{feature.title}</h4>
                      <p className="text-sm opacity-80 leading-relaxed">{feature.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {features.slice(2).map((feature, index) => (
                <Card
                  key={index}
                  className="p-6 bg-[#0a1f18]/50 border-white/10 hover:border-primary transition-all grid-bg animate-fade-in"
                  style={{ animationDelay: `${0.4 + index * 0.1}s` }}
                >
                  <div className="w-10 h-10 border border-primary flex items-center justify-center mb-4">
                    <Icon name={feature.icon} className="text-primary" size={20} />
                  </div>
                  <h4 className="text-lg font-bold mb-2 tracking-wide">{feature.title}</h4>
                  <p className="text-sm opacity-70 leading-relaxed">{feature.description}</p>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 relative bg-[#0a1f18]/50 border-y border-primary/20 overflow-hidden">
          <div className="scroll-text whitespace-nowrap text-6xl font-bold tracking-wider opacity-80">
            ОТКРЫТИЕ 1 ДЕКАБРЯ • НАЧАТЬ ИГРУ • ОТКРЫТИЕ 1 ДЕКАБРЯ • НАЧАТЬ ИГРУ • ОТКРЫТИЕ 1 ДЕКАБРЯ • НАЧАТЬ ИГРУ •
          </div>
        </section>

        <section id="team" className="py-32 relative">
          <div className="container mx-auto px-4">
            <div className="mb-16 text-center animate-fade-in">
              <div className="text-sm tracking-widest opacity-50 mb-2">NOTRE ÉQUIPE</div>
              <h3 className="text-5xl font-bold tracking-wide mb-4">NOTRE ÉQUIPE</h3>
              <div className="w-16 h-1 bg-primary mx-auto mb-4"></div>
              <p className="text-sm opacity-70 max-w-3xl mx-auto">
                Découvrez les personnes passionnées qui travaillent sans relâche pour créer et maintenir ces expériences de jeu uniques
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
              {team.map((member, index) => (
                <div
                  key={index}
                  className="border border-white/10 hover:border-primary transition-all p-6 grid-bg bg-[#0a1f18]/30 animate-fade-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-full border-2 border-primary overflow-hidden flex-shrink-0">
                      <img src={member.image} alt={member.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-lg font-bold tracking-wide">{member.name}</h4>
                      <p className="text-xs tracking-wider opacity-60 uppercase">{member.role}</p>
                    </div>
                    <div className="text-sm opacity-60">{member.role.split(' ')[0]}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="info" className="py-32 relative">
          <div className="container mx-auto px-4">
            <div className="mb-16 animate-fade-in">
              <div className="text-sm tracking-widest opacity-50 mb-2">INFORMATION</div>
              <h3 className="text-5xl font-bold tracking-wide">INFORMATION</h3>
            </div>

            <div className="space-y-4 max-w-4xl animate-fade-in" style={{ animationDelay: '0.2s' }}>
              <div className="border border-white/10 hover:border-primary transition-all">
                <button className="w-full p-6 flex items-center justify-between text-left">
                  <span className="text-xl tracking-wide">Discord Server</span>
                  <Icon name="Plus" size={24} />
                </button>
              </div>

              <div className="border border-white/10 hover:border-primary transition-all">
                <button className="w-full p-6 flex items-center justify-between text-left">
                  <span className="text-xl tracking-wide">Правила сервера</span>
                  <Icon name="Plus" size={24} />
                </button>
              </div>

              <div className="border border-white/10 hover:border-primary transition-all">
                <button className="w-full p-6 flex items-center justify-between text-left">
                  <span className="text-xl tracking-wide">Content Creators</span>
                  <Icon name="Plus" size={24} />
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="py-8 border-t border-white/10">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex gap-4">
              <a href="#" className="hover:text-primary transition-colors">
                <Icon name="MessageCircle" size={20} />
              </a>
              <a href="#" className="hover:text-primary transition-colors">
                <Icon name="Twitter" size={20} />
              </a>
              <a href="#" className="hover:text-primary transition-colors">
                <Icon name="Youtube" size={20} />
              </a>
              <a href="#" className="hover:text-primary transition-colors">
                <Icon name="Globe" size={20} />
              </a>
            </div>
            <p className="text-sm opacity-50 tracking-wide">
              Abyssal Project 2025
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
