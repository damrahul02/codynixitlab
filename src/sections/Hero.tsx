import { useEffect, useState, useRef } from 'react';
import { ArrowRight, Sparkles, Code, Rocket, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';

const typingTexts = [
  'web application',
  'mobile app',
  'SaaS platform',
  'digital solution'
];

const services = [
  {
    icon: Sparkles,
    title: 'Frontend Development',
    description: 'React, Vue, Angular - Modern frameworks for stunning interfaces'
  },
  {
    icon: Code,
    title: 'Full Stack Solutions',
    description: 'End-to-end development from database to deployment'
  },
  {
    icon: Rocket,
    title: 'Mobile Apps',
    description: 'iOS & Android native and cross-platform solutions'
  },
  {
    icon: Users,
    title: 'Expert IT Teams',
    description: 'Dedicated developers for your project success'
  }
];

export default function Hero() {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Typing effect
  useEffect(() => {
    const currentWord = typingTexts[currentTextIndex];
    const typeSpeed = isDeleting ? 50 : 100;

    const timeout = setTimeout(() => {
      if (!isDeleting) {
        if (displayText.length < currentWord.length) {
          setDisplayText(currentWord.slice(0, displayText.length + 1));
        } else {
          setTimeout(() => setIsDeleting(true), 2000);
        }
      } else {
        if (displayText.length > 0) {
          setDisplayText(displayText.slice(0, -1));
        } else {
          setIsDeleting(false);
          setCurrentTextIndex((prev) => (prev + 1) % typingTexts.length);
        }
      }
    }, typeSpeed);

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, currentTextIndex]);

  // Animated gradient lines background
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    let animationId: number;
    let time = 0;

    const lines: Array<{
      x: number;
      y: number;
      length: number;
      angle: number;
      speed: number;
      color: string;
      opacity: number;
    }> = [];

    // Create lines
    for (let i = 0; i < 30; i++) {
      lines.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        length: 100 + Math.random() * 200,
        angle: (Math.PI / 4) + (Math.random() - 0.5) * 0.5,
        speed: 0.5 + Math.random() * 1,
        color: ['#0066CC', '#00D4FF', '#A855F7', '#EC4899'][Math.floor(Math.random() * 4)],
        opacity: 0.1 + Math.random() * 0.3
      });
    }

    const animate = () => {
      ctx.fillStyle = 'rgba(5, 5, 5, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      time += 0.01;

      lines.forEach((line, i) => {
        const gradient = ctx.createLinearGradient(
          line.x, line.y,
          line.x + Math.cos(line.angle) * line.length,
          line.y + Math.sin(line.angle) * line.length
        );
        
        const hue = (time * 20 + i * 30) % 360;
        gradient.addColorStop(0, `hsla(${hue}, 70%, 50%, 0)`);
        gradient.addColorStop(0.5, `hsla(${hue}, 70%, 50%, ${line.opacity})`);
        gradient.addColorStop(1, `hsla(${hue}, 70%, 50%, 0)`);

        ctx.beginPath();
        ctx.moveTo(line.x, line.y);
        ctx.lineTo(
          line.x + Math.cos(line.angle) * line.length,
          line.y + Math.sin(line.angle) * line.length
        );
        ctx.strokeStyle = gradient;
        ctx.lineWidth = 1;
        ctx.stroke();

        // Move line
        line.x += Math.cos(line.angle + Math.PI / 2) * line.speed;
        line.y += Math.sin(line.angle + Math.PI / 2) * line.speed;

        // Wrap around
        if (line.x < -line.length) line.x = canvas.width + line.length;
        if (line.x > canvas.width + line.length) line.x = -line.length;
        if (line.y < -line.length) line.y = canvas.height + line.length;
        if (line.y > canvas.height + line.length) line.y = -line.length;
      });

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationId);
    };
  }, []);

  const scrollToContact = () => {
    const element = document.querySelector('#contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-cody-darker">
      {/* Canvas background */}
      <canvas 
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ background: 'linear-gradient(135deg, #050505 0%, #0a0a0a 50%, #050505 100%)' }}
      />

      {/* Gradient overlays */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-radial from-cody-blue/10 via-transparent to-transparent" />
      <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-gradient-radial from-purple-500/5 via-transparent to-transparent" />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left content */}
          <div className="space-y-8">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              <span className="text-sm text-white/70">Available for new projects</span>
            </div>

            {/* Main heading */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight">
              Build your{' '}
              <span className="text-gradient-purple typing-cursor">{displayText}</span>
              <br />
              with flawless technology,
              <br />
              design, and execution
            </h1>

            {/* Subtitle */}
            <p className="text-lg text-white/60 max-w-xl">
              Award-winning Web & Mobile Development Company. We transform ideas into 
              powerful digital experiences that drive growth and innovation.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4">
              <Button 
                onClick={scrollToContact}
                className="bg-white text-cody-darker hover:bg-white/90 px-8 py-6 rounded-full text-base font-medium group transition-all duration-300"
              >
                Book a call
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button 
                variant="outline"
                onClick={() => document.querySelector('#case-studies')?.scrollIntoView({ behavior: 'smooth' })}
                className="border-white/20 text-white hover:bg-white/10 px-8 py-6 rounded-full text-base"
              >
                View our work
              </Button>
            </div>

            {/* Social proof */}
            <div className="flex items-center gap-8 pt-4">
              <div>
                <div className="flex items-center gap-1 mb-1">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
                      <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                    </svg>
                  ))}
                  <span className="ml-2 text-white font-semibold">4.9</span>
                </div>
                <p className="text-sm text-white/50">Reviewed on Clutch</p>
              </div>
              <div className="h-10 w-px bg-white/10" />
              <div className="flex items-center gap-4">
                <span className="text-white/40 text-sm">Trusted by:</span>
                <div className="flex items-center gap-3">
                  {['Google', 'Microsoft', 'Amazon'].map((company) => (
                    <span key={company} className="text-white/30 text-sm font-medium">
                      {company}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right content - Service cards */}
          <div className="grid grid-cols-2 gap-4">
            {services.map((service, index) => (
              <div
                key={service.title}
                className={`group p-6 bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-sm border border-white/10 rounded-2xl hover:from-white/10 hover:to-white/5 hover:border-cody-blue/30 transition-all duration-500 card-glow hover-lift overflow-hidden relative ${
                  index % 2 === 1 ? 'card-entrance' : 'card-entrance'
                }`}
                style={{ 
                  animationDelay: `${index * 100}ms`,
                  transform: index % 2 === 1 ? 'translateY(0)' : 'translateY(0)'
                }}
              >
                {/* Animated gradient background on hover */}
                <div className="absolute inset-0 bg-gradient-to-r from-cody-blue/10 to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="relative z-10">
                  <div className="w-12 h-12 mb-4 bg-gradient-to-br from-cody-blue/20 to-cyan-500/10 rounded-xl flex items-center justify-center group-hover:from-cody-blue/40 group-hover:to-cyan-500/30 transition-all duration-300">
                    <service.icon className="w-6 h-6 text-cody-blue group-hover:scale-110 transition-transform duration-300" />
                  </div>
                  <h3 className="text-white font-semibold mb-2 group-hover:text-cody-blue transition-colors duration-300">{service.title}</h3>
                  <p className="text-white/50 text-sm group-hover:text-white/70 transition-colors duration-300">{service.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-cody-darker to-transparent" />
    </section>
  );
}
