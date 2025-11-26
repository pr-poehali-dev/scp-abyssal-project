import { useEffect, useState, useRef } from 'react';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

const Index = () => {
  const [scrollY, setScrollY] = useState(0);
  const [activeSection, setActiveSection] = useState('');
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const bubblesRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
      
      const sections = ['about', 'features', 'team', 'info'];
      const current = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      
      setActiveSection(current || '');
    };

    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
      
      bubblesRef.current.forEach((bubble) => {
        if (!bubble) return;
        const rect = bubble.getBoundingClientRect();
        const bubbleX = rect.left + rect.width / 2;
        const bubbleY = rect.top + rect.height / 2;
        
        const deltaX = e.clientX - bubbleX;
        const deltaY = e.clientY - bubbleY;
        const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
        
        if (distance < 150) {
          const force = (150 - distance) / 150;
          const moveX = -deltaX * force * 0.5;
          const moveY = -deltaY * force * 0.5;
          bubble.style.transform = `translate(${moveX}px, ${moveY}px)`;
        } else {
          bubble.style.transform = 'translate(0, 0)';
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);
    handleScroll();
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
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
    { name: 'Alucard', role: 'Директор сообщества', image: 'https://cdn.poehali.dev/files/31199a1a-f99f-4780-b831-6ff4e1991487.png' },
    { name: 'Biazox', role: 'Со-директор сообщества', image: 'https://cdn.poehali.dev/files/31199a1a-f99f-4780-b831-6ff4e1991487.png' },
    { name: 'Raptor', role: 'Со-директор сообщества', image: 'https://cdn.poehali.dev/files/31199a1a-f99f-4780-b831-6ff4e1991487.png' },
    { name: 'Punisher', role: 'Координатор', image: 'https://cdn.poehali.dev/files/31199a1a-f99f-4780-b831-6ff4e1991487.png' },
    { name: 'Jason', role: 'Менеджер сообщества', image: 'https://cdn.poehali.dev/files/31199a1a-f99f-4780-b831-6ff4e1991487.png' },
    { name: 'mxd', role: 'Технический директор', image: 'https://cdn.poehali.dev/files/31199a1a-f99f-4780-b831-6ff4e1991487.png' },
    { name: 'Toheyyy', role: 'Технический отдел', image: 'https://cdn.poehali.dev/files/31199a1a-f99f-4780-b831-6ff4e1991487.png' },
    { name: 'Nhilis', role: 'Руководитель проекта', image: 'https://cdn.poehali.dev/files/31199a1a-f99f-4780-b831-6ff4e1991487.png' },
  ];

  const bubbles = [...Array(40)].map((_, i) => ({
    left: Math.random() * 100,
    bottom: Math.random() * 100,
    size: 5 + Math.random() * 15,
    duration: 20 + Math.random() * 30,
    delay: Math.random() * 20,
  }));

  return (
    <div className="min-h-screen bg-[#051510] text-white relative overflow-hidden">
      <div className="fixed inset-0 pointer-events-none z-0">
        {bubbles.map((bubble, i) => (
          <div
            key={i}
            ref={(el) => {
              if (el) bubblesRef.current[i] = el;
            }}
            className="bubble"
            style={{
              left: `${bubble.left}%`,
              bottom: `${bubble.bottom}%`,
              width: `${bubble.size}px`,
              height: `${bubble.size}px`,
              animation: `float-up ${bubble.duration}s linear infinite`,
              animationDelay: `${bubble.delay}s`,
            }}
          />
        ))}
      </div>

      <div className="decorative-lines" style={{ top: '20%', left: '10%' }}></div>
      <div className="decorative-lines" style={{ top: '60%', right: '10%' }}></div>

      <div className="fixed inset-0 pointer-events-none opacity-30 z-0">
        <div className="absolute inset-0 bg-gradient-radial from-[#1DB954]/20 via-transparent to-transparent"></div>
      </div>

      <header className="fixed top-0 left-0 right-0 z-50 bg-[#051510]/90 backdrop-blur-sm border-b border-primary/20">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src="https://cdn.poehali.dev/files/4468007d-3ca2-4d75-af22-bd7b04f04385.png" alt="Abyssal" className="w-10 h-10" />
            <h1 className="text-xl font-bold tracking-wider">ABYSSAL</h1>
          </div>
          <nav className="hidden md:flex gap-8 text-sm">
            <a href="#about" className={`nav-link hover:text-primary transition-colors tracking-wide ${activeSection === 'about' ? 'active' : ''}`}>
              О проекте
            </a>
            <a href="#features" className={`nav-link hover:text-primary transition-colors tracking-wide ${activeSection === 'features' ? 'active' : ''}`}>
              Информация
            </a>
            <a href="#team" className={`nav-link hover:text-primary transition-colors tracking-wide ${activeSection === 'team' ? 'active' : ''}`}>
              Команда
            </a>
          </nav>
          <div className="flex gap-4">
            <Button className="corner-bracket bg-transparent border border-primary text-primary hover:bg-primary hover:text-black px-6">
              Подключиться
            </Button>
            <Button className="corner-bracket bg-primary text-black hover:bg-primary/80 px-6">
              Играть
            </Button>
          </div>
        </div>
      </header>

      <main className="relative z-10">
        <section
          className="min-h-screen flex items-center justify-center relative pt-20"
          style={{
            transform: `translateY(${scrollY * 0.3}px)`,
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-[#051510] via-transparent to-[#051510]"></div>

          <div className="container mx-auto px-4 text-center relative z-10">
            <div className="mb-8 animate-fade-in flex flex-col items-center gap-6" style={{ animationDelay: '0.2s' }}>
              <img src="https://cdn.poehali.dev/files/4468007d-3ca2-4d75-af22-bd7b04f04385.png" alt="Abyssal Logo" className="w-32 h-32 opacity-90" />
              <div className="text-6xl md:text-9xl font-black tracking-wider text-primary">
                ABYSSAL
              </div>
            </div>
            <p className="text-lg md:text-xl mb-12 tracking-widest opacity-80 animate-fade-in" style={{ animationDelay: '0.4s' }}>
              Глубоководный исследовательский комплекс
            </p>
            <div className="flex justify-center items-center gap-2 animate-bounce" style={{ animationDelay: '1s' }}>
              <Icon name="ChevronDown" size={20} />
              <span className="text-sm tracking-widest">Прокрутить</span>
            </div>
          </div>
        </section>

        <section id="about" className="py-32 relative">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-16 items-start">
              <div className="space-y-8">
                <div className="animate-fade-in">
                  <div className="text-sm tracking-widest opacity-50 mb-2">О ПРОЕКТЕ</div>
                  <h3 className="text-4xl font-bold tracking-wide">О ПРОЕКТЕ</h3>
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
                <div className="corner-bracket aspect-square bg-gradient-to-br from-primary/20 to-transparent grid-bg p-8 flex items-center justify-center overflow-hidden">
                  <img
                    src="https://cdn.poehali.dev/files/24a714af-6942-423f-9d65-d1abc526b450.png"
                    alt="Abyssal Station"
                    className="w-full h-full object-cover opacity-90"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="features" className="py-32 relative">
          <div className="container mx-auto px-4">
            <div className="mb-16 animate-fade-in">
              <div className="text-sm tracking-widest opacity-50 mb-2">ОТКРОЙТЕ ДЛЯ СЕБЯ</div>
              <h3 className="text-5xl font-bold tracking-wide mb-6">ВОЗМОЖНОСТИ</h3>
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

        <section className="py-16 relative bg-gradient-to-r from-[#0a1f18] via-primary/10 to-[#0a1f18] border-y border-primary/30 overflow-hidden">
          <div className="absolute inset-0 grid-bg opacity-50"></div>
          <div className="container mx-auto px-4 flex items-center justify-between gap-8 relative z-10">
            <div className="scroll-text whitespace-nowrap text-4xl md:text-6xl font-bold tracking-wider flex-shrink-0">
              ОТКРЫТИЕ 1 ДЕКАБРЯ • ОТКРЫТИЕ 1 ДЕКАБРЯ • ОТКРЫТИЕ 1 ДЕКАБРЯ •
            </div>
          </div>
          <div className="mt-8 text-center">
            <a href="#info">
              <Button className="corner-bracket bg-primary text-black hover:bg-primary/80 px-8 py-6 text-lg">
                Узнать больше
              </Button>
            </a>
          </div>
        </section>

        <section id="team" className="py-32 relative">
          <div className="container mx-auto px-4">
            <div className="mb-16 text-center animate-fade-in">
              <div className="text-sm tracking-widest opacity-50 mb-2">НАША КОМАНДА</div>
              <h3 className="text-5xl font-bold tracking-wide mb-4">НАША КОМАНДА</h3>
              <div className="w-16 h-1 bg-primary mx-auto mb-4"></div>
              <p className="text-sm opacity-70 max-w-3xl mx-auto">
                Познакомьтесь с увлечёнными людьми, которые неустанно работают над созданием и поддержкой уникального игрового опыта
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
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="info" className="py-32 relative">
          <div className="container mx-auto px-4">
            <div className="mb-16 animate-fade-in">
              <div className="text-sm tracking-widest opacity-50 mb-2">ИНФОРМАЦИЯ</div>
              <h3 className="text-5xl font-bold tracking-wide">ИНФОРМАЦИЯ</h3>
            </div>

            <div className="space-y-4 max-w-4xl animate-fade-in" style={{ animationDelay: '0.2s' }}>
              <div className="border border-white/10 hover:border-primary transition-all">
                <button className="w-full p-6 flex items-center justify-between text-left">
                  <span className="text-xl tracking-wide">Discord сервер</span>
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
                  <span className="text-xl tracking-wide">Контент-криэйторы</span>
                  <Icon name="Plus" size={24} />
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="py-8 border-t border-white/10 relative z-10">
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
