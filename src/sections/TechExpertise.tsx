import { useState, useEffect, useRef } from 'react';
import { 
  Monitor, 
  Smartphone, 
  Laptop, 
  Sparkles, 
  Database, 
  Cloud,
  Blocks,
  ArrowRight,
  Settings
} from 'lucide-react';

const technologies = [
  {
    icon: Monitor,
    title: 'Web Apps',
    description: 'Build high-performing and intuitive web applications to power your business.',
    color: 'from-blue-500/20 to-cyan-500/20'
  },
  {
    icon: Smartphone,
    title: 'Mobile Apps',
    description: 'Build native or cross-platform mobile apps for iOS and Android.',
    color: 'from-purple-500/20 to-pink-500/20'
  },
  {
    icon: Laptop,
    title: 'Desktop Apps',
    description: 'Build apps that run locally, on top of Linux, Microsoft Windows, and macOS.',
    color: 'from-green-500/20 to-teal-500/20'
  },
  {
    icon: Sparkles,
    title: 'AI and Machine Learning',
    description: 'Add existing AI services to your product or build a custom AI/ML solution.',
    color: 'from-orange-500/20 to-yellow-500/20'
  },
  {
    icon: Database,
    title: 'Big Data',
    description: 'Big data strategy, data processing and management, analytics.',
    color: 'from-red-500/20 to-orange-500/20'
  },
  {
    icon: Cloud,
    title: 'Cloud-Native',
    description: 'Develop cloud-based apps using the most efficient cloud services.',
    color: 'from-indigo-500/20 to-purple-500/20'
  },
  {
    icon: Blocks,
    title: 'Blockchain Apps',
    description: 'Provide Web 3.0 experience for your users: Metaverse, DeFi, and much more.',
    color: 'from-cyan-500/20 to-blue-500/20'
  },
  {
    icon: ArrowRight,
    title: 'Integration & Migration',
    description: 'Seamlessly integrate third-party services or migrate legacy systems.',
    color: 'from-pink-500/20 to-rose-500/20'
  },
  {
    icon: Settings,
    title: 'Refinement & Reengineering',
    description: 'Modernize and optimize existing applications for better performance.',
    color: 'from-emerald-500/20 to-green-500/20'
  }
];

export default function TechExpertise() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Animated floating particles
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

    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      opacity: number;
    }> = [];

    for (let i = 0; i < 50; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        radius: Math.random() * 1.5,
        opacity: Math.random() * 0.5
      });
    }

    let animationId: number;

    const animate = () => {
      ctx.fillStyle = 'rgba(5, 5, 5, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      particles.forEach((particle) => {
        particle.x += particle.vx;
        particle.y += particle.vy;

        if (particle.x < 0) particle.x = canvas.width;
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = canvas.height;
        if (particle.y > canvas.height) particle.y = 0;

        ctx.fillStyle = `rgba(0, 102, 204, ${particle.opacity})`;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        ctx.fill();
      });

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <section id="expertise" className="relative py-24 bg-cody-darker overflow-hidden">
      {/* Animated particle canvas */}
      <canvas 
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{ opacity: 0.4 }}
      />

      {/* Background */}
      <div className="absolute inset-0 grid-pattern opacity-20" />

      {/* Interactive globe effect - follows mouse */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(circle at ${mousePos.x}px ${mousePos.y}px, rgba(0, 102, 204, 0.05) 0%, transparent 50%)`
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Tech Expertise
          </h2>
          <p className="text-white/60 max-w-2xl mx-auto">
            From artificial intelligence to cloud computing, we excel in modern technology 
            and provide the expertise that growth-focused businesses require.
          </p>
        </div>

        {/* Tech grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {technologies.map((tech, index) => (
            <div
              key={tech.title}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              className={`group relative p-6 rounded-2xl border border-white/5 bg-white/[0.02] hover:bg-white/5 hover:border-cody-blue/30 transition-all duration-500 cursor-pointer overflow-hidden ${
                hoveredIndex === index ? 'card-entrance' : ''
              }`}
              style={{
                transform: hoveredIndex === index ? 'translateY(-4px) scale(1.02)' : 'translateY(0) scale(1)',
                boxShadow: hoveredIndex === index ? '0 20px 40px rgba(0, 102, 204, 0.15)' : 'none'
              }}
            >
              {/* Enhanced gradient background on hover */}
              <div className={`absolute inset-0 bg-gradient-to-br ${tech.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
              
              {/* Glow effect */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{
                boxShadow: `inset 0 0 40px rgba(0, 102, 204, 0.1), 0 0 40px rgba(0, 102, 204, 0.1)`
              }} />
              
              {/* Content */}
              <div className="relative z-10">
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-cody-blue/20 to-cyan-500/10 rounded-xl flex items-center justify-center group-hover:from-cody-blue/40 group-hover:to-cyan-500/30 transition-all duration-300">
                    <tech.icon className={`w-6 h-6 text-cody-blue ${hoveredIndex === index ? 'icon-pulse' : ''}`} />
                  </div>
                  <ArrowRight className="w-5 h-5 text-white/20 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all duration-300" />
                </div>

                <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-cody-blue transition-colors duration-300">
                  {tech.title}
                </h3>
                
                <p className={`text-white/50 text-sm transition-all duration-300 ${
                  hoveredIndex === index ? 'opacity-100 max-h-20' : 'opacity-0 max-h-0'
                } overflow-hidden`}>
                  {tech.description}
                </p>
              </div>

              {/* Enhanced corner accent with glow */}
              <div className="absolute bottom-0 right-0 w-32 h-32 bg-gradient-to-tl from-cody-blue/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
