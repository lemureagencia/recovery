
import React, { useState, useEffect, useRef } from 'react';
import { 
  CheckCircle, 
  XCircle, 
  Mic, 
  Filter, 
  Clock, 
  FileText, 
  MessageSquare, 
  Zap, 
  TrendingUp, 
  ShieldCheck, 
  ChevronDown, 
  ChevronUp,
  Rocket
} from 'lucide-react';

// --- Constants ---
const WHATSAPP_NUMBER = "557181913493";
const WHATSAPP_MESSAGE = encodeURIComponent("olá, vim do site da recovery e quero mais informações sobre o Agente recovery");
const WHATSAPP_LINK = `https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MESSAGE}`;
const VIDEO_URL = "https://agencialemure.com.br/wp-content/uploads/2026/01/video-para-site01-2.webm";
const LOGO_URL = "logo.webp"; 

// --- Components ---

const Logo: React.FC<{ className?: string; isHero?: boolean }> = ({ className, isHero }) => (
  <div className={`flex items-center ${className}`}>
    <img 
      src={LOGO_URL} 
      alt="Recovery IA Logo" 
      className="h-10 md:h-12 w-auto object-contain"
      // @ts-ignore
      fetchpriority={isHero ? "high" : "auto"}
      decoding="async"
      onError={(e) => {
        e.currentTarget.style.display = 'none';
        const parent = e.currentTarget.parentElement;
        if (parent) {
          parent.innerHTML = `
            <div class="flex items-center gap-2">
              <div class="relative flex items-center justify-center w-8 h-8 md:w-10 md:h-10">
                <div class="absolute inset-0 border-[3px] border-[#1800ad] rounded-full rounded-bl-none rotate-45"></div>
                <svg class="w-4 h-4 md:w-5 md:h-5 text-[#1800ad] -rotate-45" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M6.62 10.79a15.15 15.15 0 006.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
                </svg>
              </div>
              <span class="text-[#1800ad] font-bold text-xl md:text-2xl tracking-tighter uppercase">RECOVERY IA</span>
            </div>
          `;
        }
      }}
    />
  </div>
);

const SmartphoneFrame: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);

  // Força o play do vídeo para garantir autoplay em dispositivos móveis e desktop
  useEffect(() => {
    const playVideo = () => {
      if (videoRef.current) {
        // Muted é essencial para autoplay funcionar sem interação
        videoRef.current.muted = true;
        videoRef.current.play().catch(err => {
          console.warn("Autoplay impedido, aguardando interação ou tentando novamente...", err);
        });
      }
    };

    playVideo();
    
    // Reforço para garantir o play após o carregamento completo do DOM
    window.addEventListener('load', playVideo);
    
    // Re-tenta dar play se o vídeo parar por algum motivo (alguns browsers mobile pausam ao mudar aba)
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        playVideo();
      }
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      window.removeEventListener('load', playVideo);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  return (
    <div className="relative mx-auto mt-12 md:mt-16 w-full max-w-[280px] md:max-w-[310px]">
      {/* Exterior Hardware Frame */}
      <div className="relative z-10 border-slate-950 bg-slate-950 border-[10px] md:border-[12px] rounded-[2.8rem] md:rounded-[3.2rem] shadow-[0_20px_50px_rgba(0,0,0,0.4)] overflow-hidden aspect-[9/19.2]">
        
        {/* Display Screen Area */}
        <div className="absolute inset-0 bg-black overflow-hidden">
          
          {/* Notch / Dynamic Island */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-20 md:w-24 h-5 md:h-6 bg-slate-950 rounded-b-2xl z-30 flex items-center justify-center gap-1.5 px-3">
            <div className="w-1.5 h-1.5 bg-slate-800 rounded-full"></div>
            <div className="w-8 h-1 bg-slate-800 rounded-full"></div>
          </div>

          {/* Video Content - Forçado como Background com Loop Infinito */}
          <video
            ref={videoRef}
            className="w-full h-full object-cover pointer-events-none"
            src={VIDEO_URL}
            autoPlay
            muted
            loop
            playsInline
            controls={false}
            preload="auto"
            aria-hidden="true"
            disablePictureInPicture
            disableRemotePlayback
          />
        </div>
      </div>
      
      {/* Botões do Hardware */}
      <div className="absolute -left-2 top-28 w-1 h-12 bg-slate-900 rounded-l-md z-0"></div>
      <div className="absolute -left-2 top-44 w-1 h-12 bg-slate-900 rounded-l-md z-0"></div>
      <div className="absolute -right-2 top-36 w-1 h-20 bg-slate-900 rounded-r-md z-0"></div>
      
      {/* Brilho Realista */}
      <div className="absolute inset-0 bg-blue-brand/20 blur-[100px] -z-10 scale-125"></div>
    </div>
  );
};

const CTAButton: React.FC<{ children: React.ReactNode; className?: string; variant?: 'green' | 'blue' | 'white' }> = ({ children, className, variant = 'green' }) => {
  const getVariantClass = () => {
    switch (variant) {
      case 'white': return 'bg-white text-green-brand hover:bg-slate-100';
      case 'blue': return 'blue-brand text-white hover:bg-blue-900';
      default: return 'green-brand text-white hover:bg-green-600';
    }
  };

  return (
    <button 
      className={`px-8 py-4 rounded-full font-bold transition-all transform hover:scale-105 active:scale-95 shadow-xl flex items-center justify-center gap-2 ${getVariantClass()} ${className || ''}`}
      onClick={() => window.open(WHATSAPP_LINK, '_blank')}
    >
      {children}
    </button>
  );
};

const SectionTitle: React.FC<{ children: React.ReactNode; light?: boolean }> = ({ children, light }) => (
  <h2 className={`text-2xl md:text-4xl font-extrabold text-center mb-10 md:mb-12 ${light ? 'text-white' : 'text-slate-900'}`}>
    {children}
  </h2>
);

const FeatureCard: React.FC<{ number: string; title: string; description: string; icon: React.ReactNode }> = ({ number, title, description, icon }) => (
  <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-slate-100 flex flex-col items-start gap-4 transition-all hover:shadow-md">
    <div className="flex items-center gap-3">
      <span className="text-3xl md:text-4xl font-black text-blue-brand">{number}</span>
      <div className="p-3 rounded-lg bg-soft-blue text-blue-brand">
        {icon}
      </div>
    </div>
    <h3 className="text-lg md:text-xl font-bold text-slate-900">{title}</h3>
    <p className="text-slate-600 leading-relaxed text-sm md:text-base">{description}</p>
  </div>
);

const FAQItem: React.FC<{ question: string; answer: string }> = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-slate-200 py-4">
      <button 
        className="w-full flex justify-between items-center text-left py-2 gap-4 outline-none"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="text-base md:text-lg font-bold text-slate-800">{question}</span>
        {isOpen ? <ChevronUp className="flex-shrink-0" /> : <ChevronDown className="flex-shrink-0" />}
      </button>
      {isOpen && (
        <div className="mt-4 text-slate-600 animate-fadeIn text-sm md:text-base leading-relaxed">
          {answer}
        </div>
      )}
    </div>
  );
};

// --- Main App ---

export default function App() {
  return (
    <div className="min-h-screen bg-white">
      
      {/* Header / Navbar */}
      <header className="fixed top-0 left-0 right-0 bg-white/90 backdrop-blur-md z-40 border-b border-slate-100 px-6 py-3 md:py-4">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <Logo />
          <div className="hidden md:block">
            <CTAButton className="px-6 py-2 text-sm">FALAR COM ESPECIALISTA</CTAButton>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative bg-white pt-24 pb-20 md:pt-36 md:pb-32 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <div className="flex justify-center mb-6 md:mb-10">
            <Logo className="scale-110 md:scale-150 transform origin-center" isHero={true} />
          </div>
          <h1 className="text-3xl md:text-6xl font-black text-slate-900 mb-6 leading-tight">
            Transforme seu negócio de limpa nome em uma <span className="text-blue-brand">máquina de vendas automatizada</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-600 mb-8 md:mb-10 max-w-3xl mx-auto">
            O Agente de IA que vende por você (mesmo quando você está dormindo).
          </p>
          <div className="mb-6 md:mb-8 flex justify-center">
            <CTAButton className="w-full md:w-auto">
              QUERO AUTOMATIZAR MEUS PROCESSOS
            </CTAButton>
          </div>
          
          {/* Smartphone Video Mockup */}
          <SmartphoneFrame />
        </div>
      </section>

      {/* Main Features Grid */}
      <section className="bg-slate-50 py-16 md:py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <SectionTitle>O seu melhor vendedor, 24/7</SectionTitle>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            <FeatureCard 
              number="01"
              icon={<MessageSquare size={24} />}
              title="Conversa como gente"
              description="Sem respostas robóticas. O agente é treinado com o tom e linguagem da SUA empresa. O cliente jura que fala com um atendente humano."
            />
            <FeatureCard 
              number="02"
              icon={<Rocket size={24} />}
              title="Faz TUDO que seu vendedor faria"
              description="Responde perguntas, explica serviços, envia documentos, lista requisitos, apresenta valores e conduz até o fechamento."
            />
            <FeatureCard 
              number="03"
              icon={<Mic size={24} />}
              title="Entende e Responde Áudios"
              description="Brasileiro ama áudio. Nosso agente escuta, interpreta e responde corretamente, convertendo leads que bots comuns ignoram."
            />
            <FeatureCard 
              number="04"
              icon={<Filter size={24} />}
              title="Filtra os 'só curiosos'"
              description="Você só recebe notificação de quem já entendeu o serviço, enviou documentos e tem interesse real de fechar. Lead qualificado na mão."
            />
            <FeatureCard 
              number="05"
              icon={<Clock size={24} />}
              title="Sem limite de volume ou horário"
              description="2 da manhã? Domingo? 100 mensagens simultâneas? O agente absorve tudo com a mesma qualidade e agilidade."
            />
            <FeatureCard 
              number="06"
              icon={<FileText size={24} />}
              title="Gera contrato profissional"
              description="Coleta dados automaticamente via formulário e gera o contrato em PDF na hora, enviando direto no WhatsApp do cliente."
            />
          </div>
        </div>
      </section>

      {/* Comparison Section */}
      <section className="py-16 md:py-24 px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-center mb-8 md:mb-10">
             <CTAButton className="w-full md:w-auto">Quero Vender Mais Gastando Menos Tempo</CTAButton>
          </div>
          <h2 className="text-xl md:text-3xl font-bold text-center mb-8 md:mb-12 text-slate-900 leading-tight">
            A diferença entre estar no limite <br className="hidden md:block" /> e faturar 3x mais:
          </h2>

          <div className="overflow-hidden rounded-2xl md:rounded-3xl shadow-2xl border border-slate-100">
            <div className="grid grid-cols-2">
              <div className="red-brand text-white p-4 md:p-6 text-center font-bold uppercase tracking-wider text-[10px] md:text-sm">
                SEM A RECOVERY.IA
              </div>
              <div className="blue-brand text-white p-4 md:p-6 text-center font-bold uppercase tracking-wider text-[10px] md:text-sm relative">
                COM A RECOVERY.IA
              </div>
            </div>

            <div className="bg-white text-slate-800">
              {[
                { label: "30 min/cliente", after: "⚡ 3 minutos" },
                { label: "10 leads/dia máx", after: "🚀 30+ leads/dia" },
                { label: "Cobra manualmente", after: "✅ Agente cobra auto" },
                { label: "Perdendo lead", after: "🤖 IA atende 24/7" },
                { label: "Atendendo curioso", after: "💎 Só qualificado" },
                { label: "Dados soltos", after: "📄 Contrato auto" }
              ].map((item, idx) => (
                <div key={idx} className={`grid grid-cols-2 border-b border-slate-100 last:border-0 ${idx % 2 === 0 ? 'bg-white' : 'bg-slate-50'}`}>
                  <div className="p-4 md:p-6 flex items-center gap-2 md:gap-4 text-slate-500 text-[10px] md:text-base leading-tight">
                    <XCircle size={16} className="text-red-brand flex-shrink-0" />
                    <span>{item.label}</span>
                  </div>
                  <div className="p-4 md:p-6 flex items-center gap-2 md:gap-4 text-blue-brand font-bold text-[10px] md:text-base leading-tight">
                    <CheckCircle size={16} className="text-blue-brand flex-shrink-0" />
                    <span>{item.after}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* News/Transformation Section */}
      <section className="blue-brand py-16 md:py-24 px-4 md:px-6">
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center gap-10 lg:gap-16">
          <div className="w-full lg:w-[48%] text-center lg:text-left">
            <h2 className="text-3xl md:text-5xl font-black text-white mb-6 md:mb-8 leading-tight">
              De Centro de Custo <br />
              a Vendas no Piloto <br />
              <span className="opacity-90">Automático 24/7</span>
            </h2>
            <div className="space-y-4 md:space-y-6">
              <p className="text-lg md:text-xl text-blue-100 leading-relaxed">
                O mercado percebeu que Agentes de IA não servem apenas para “tirar dúvidas”. Eles são a ferramenta mais eficiente para fechar negócios enquanto sua equipe dorme.
              </p>
              <p className="text-lg md:text-xl font-bold text-white">
                Não deixe dinheiro na mesa por usar métodos do passado.
              </p>
            </div>
          </div>
          <div className="w-full lg:w-[52%]">
            <div className="relative">
              <img 
                src="https://agencialemure.com/wp-content/uploads/2026/01/noticia.webp" 
                alt="Mercado de IA Notícias" 
                className="rounded-2xl shadow-2xl border border-white/10 w-full transform transition-transform duration-500"
                loading="lazy"
                decoding="async"
              />
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-white/5 blur-3xl rounded-full -z-10"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="bg-soft-blue py-16 md:py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <SectionTitle>INVESTIMENTO</SectionTitle>
          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col">
            <div className="flex flex-col md:flex-row w-full">
              
              {/* Price Column */}
              <div className="md:w-2/5 p-8 md:p-12 flex flex-col items-center justify-center text-center border-b md:border-b-0 md:border-r border-slate-100 bg-slate-50/50">
                <span className="text-blue-brand font-black tracking-widest uppercase mb-4 text-[10px] md:text-xs">Promoção de Lançamento</span>
                <div className="flex flex-col items-center">
                  <span className="text-slate-400 line-through text-base md:text-lg">R$ 497/mês</span>
                  <div className="flex items-baseline gap-1 mt-1 md:mt-2">
                    <span className="text-2xl md:text-3xl font-bold text-slate-900">R$</span>
                    <span className="text-5xl md:text-6xl font-black text-slate-900">297</span>
                    <span className="text-slate-500 font-medium text-xs md:text-sm">/mês</span>
                  </div>
                  <p className="mt-2 text-green-brand font-bold text-xs md:text-sm">Menos de R$ 10 por dia.</p>
                </div>
              </div>

              {/* Features Column */}
              <div className="md:w-3/5 p-8 md:p-12 flex flex-col justify-between bg-white">
                <div>
                  <h3 className="text-lg md:text-xl font-bold mb-6 text-slate-900">Tudo incluso na licença mensal:</h3>
                  <ul className="space-y-3 md:space-y-4 mb-8 md:mb-10">
                    {[
                      "Agente de IA completo 24/7",
                      "Atendimento por áudio (voz)",
                      "Qualificação automática de leads",
                      "Configuração feita por nossa equipe",
                      "Geração automática de contrato em PDF",
                      "Sem fidelidade ou multa de cancelamento"
                    ].map((item, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-slate-700 text-sm md:text-base font-medium">
                        <CheckCircle size={18} className="text-green-brand flex-shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="flex flex-col items-center md:items-start gap-4">
                  <CTAButton className="w-full">
                    QUERO AUTOMATIZAR AGORA
                  </CTAButton>
                  <p className="text-[10px] md:text-xs text-slate-400 text-center md:text-left w-full">
                    *Preço promocional garantido para os próximos 12 meses.
                  </p>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 md:py-24 px-6 bg-white">
        <div className="max-w-3xl mx-auto">
          <SectionTitle>Perguntas Frequentes</SectionTitle>
          <div className="space-y-2">
            <FAQItem 
              question='"Tem limite de atendimento?"'
              answer="Nenhum. Pode ser 10 ou 10.000 clientes. O sistema é escalável e atende a todos simultaneamente sem atraso ou custo extra por mensagem."
            />
            <FAQItem 
              question='"O agente vai falar algo errado?"'
              answer="A IA é configurada com as regras de negócio da sua empresa. Ela não inventa informações e segue o tom de voz que você definir."
            />
            <FAQItem 
              question='"Como funciona a ativação?"'
              answer="Após o pagamento, nossa equipe entra em contato para coletar suas informações. Em até 48 horas seu Agente de IA estará rodando no seu WhatsApp."
            />
            <FAQItem 
              question='"Posso cancelar a qualquer momento?"'
              answer="Sim. Não trabalhamos com contratos de fidelidade. Você paga pelo mês de uso e pode interromper quando desejar."
            />
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 md:py-24 px-6 bg-slate-50 border-t border-slate-200">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-6 leading-tight">
            Pare de perder leads por demora <br className="hidden md:block" /> e comece a escalar hoje.
          </h2>
          <CTAButton className="w-full md:w-auto">
            QUERO AUTOMATIZAR MEUS PROCESSOS
          </CTAButton>
          <div className="mt-10 flex flex-wrap justify-center gap-6 text-slate-400 font-bold uppercase tracking-widest text-[10px]">
            <div className="flex items-center gap-2"><ShieldCheck size={14} /> 100% SEGURO</div>
            <div className="flex items-center gap-2"><Zap size={14} /> ATIVAÇÃO EM 48H</div>
            <div className="flex items-center gap-2"><TrendingUp size={14} /> ESCALA ILIMITADA</div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white py-10 px-6 border-t border-slate-100">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <Logo className="opacity-70 grayscale hover:grayscale-0 transition-all" />
          <p className="text-slate-400 text-xs text-center md:text-right">
            &copy; {new Date().getFullYear()} Recovery.IA - Tecnologia para Recuperação de Crédito.
          </p>
        </div>
      </footer>

      {/* Floating Sticky Mobile CTA */}
      <div className="fixed bottom-6 left-6 right-6 md:hidden z-50">
        <button 
          className="w-full green-brand py-4 rounded-full font-bold text-white shadow-2xl flex items-center justify-center gap-2 transition-transform active:scale-95 border-none outline-none"
          onClick={() => window.open(WHATSAPP_LINK, '_blank')}
        >
          <Rocket size={20} />
          QUERO AUTOMATIZAR AGORA
        </button>
      </div>

    </div>
  );
}
