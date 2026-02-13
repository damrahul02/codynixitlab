import { useState, useEffect, useRef } from 'react';
import { Phone, Mail, Send, Paperclip, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

const offices = [
  { city: 'New York', country: 'USA', flag: '🇺🇸' },
  { city: 'London', country: 'UK', flag: '🇬🇧' },
  { city: 'Singapore', country: 'SG', flag: '🇸🇬' },
  { city: 'Dubai', country: 'UAE', flag: '🇦🇪' },
  { city: 'Sydney', country: 'AU', flag: '🇦🇺' }
];

export default function Contact() {
  const [activeTab, setActiveTab] = useState<'project' | 'career'>('project');
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Animated background canvas
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

    const dots: Array<{ x: number; y: number; vx: number; vy: number; r: number }> = [];
    for (let i = 0; i < 40; i++) {
      dots.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        r: Math.random() * 1 + 0.5
      });
    }

    let animationId: number;

    const animate = () => {
      ctx.fillStyle = 'rgba(5, 5, 5, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      dots.forEach((dot) => {
        dot.x += dot.vx;
        dot.y += dot.vy;

        if (dot.x < 0) dot.x = canvas.width;
        if (dot.x > canvas.width) dot.x = 0;
        if (dot.y < 0) dot.y = canvas.height;
        if (dot.y > canvas.height) dot.y = 0;

        ctx.fillStyle = 'rgba(0, 102, 204, 0.3)';
        ctx.beginPath();
        ctx.arc(dot.x, dot.y, dot.r, 0, Math.PI * 2);
        ctx.fill();

        // Draw lines between nearby dots
        dots.forEach((otherDot) => {
          const dist = Math.hypot(dot.x - otherDot.x, dot.y - otherDot.y);
          if (dist < 150) {
            ctx.strokeStyle = `rgba(0, 102, 204, ${0.1 * (1 - dist / 150)})`;
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(dot.x, dot.y);
            ctx.lineTo(otherDot.x, otherDot.y);
            ctx.stroke();
          }
        });
      });

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationId);
    };
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ name: '', company: '', email: '', phone: '', message: '' });
    }, 3000);
  };

  return (
    <section id="contact" className="relative py-24 bg-cody-darker overflow-hidden">
      {/* Animated canvas background */}
      <canvas 
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{ opacity: 0.5 }}
      />

      {/* Background gradient overlays */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-radial from-cody-blue/10 via-transparent to-transparent" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-radial from-cody-blue/5 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-radial from-purple-500/5 to-transparent rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Left side - Info */}
          <div>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Get in touch<br />
              whenever you're ready
            </h2>
            <p className="text-white/60 mb-8">
              We would love to learn more about your project idea. Contact us and 
              we will get back to you within a few business hours.
            </p>

            {/* Office locations */}
            <div className="mb-8 p-6 bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 rounded-2xl group hover:border-cody-blue/30 transition-all duration-300">
              <p className="text-cody-blue text-sm font-medium mb-3 group-hover:text-cody-blue/80 transition-colors">Head Office</p>
              <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-cody-blue transition-colors duration-300">
                New York, USA
              </h3>
              <p className="text-white/50 text-sm group-hover:text-white/70 transition-colors duration-300">
                350 Fifth Avenue, Suite 2500<br />
                New York, NY 10118
              </p>
            </div>

            {/* Other offices with animations */}
            <div className="flex flex-wrap gap-3 mb-8">
              {offices.map((office, index) => (
                <button
                  key={office.city}
                  className="flex items-center gap-2 px-3 py-2 bg-gradient-to-r from-white/5 to-white/[0.02] border border-white/10 rounded-lg hover:from-cody-blue/10 hover:to-cyan-500/5 hover:border-cody-blue/30 transition-all text-sm group"
                  style={{
                    animation: `slide-in-left 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) forwards`,
                    animationDelay: `${index * 80}ms`,
                    opacity: 0
                  }}
                >
                  <span className="text-lg group-hover:scale-125 transition-transform duration-300">{office.flag}</span>
                  <span className="text-white/70 group-hover:text-white transition-colors duration-300">{office.city}</span>
                </button>
              ))}
            </div>

            {/* Contact info with enhanced styling */}
            <div className="space-y-4">
              <a 
                href="tel:+1234567890" 
                className="flex items-center gap-4 p-4 bg-gradient-to-r from-white/5 to-white/[0.02] border border-white/10 rounded-xl hover:from-cody-blue/10 hover:to-cyan-500/5 hover:border-cody-blue/30 transition-all duration-300 group overflow-hidden relative"
              >
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-r from-cody-blue/10 to-transparent" />
                <div className="w-10 h-10 bg-gradient-to-br from-cody-blue/20 to-cyan-500/10 rounded-lg flex items-center justify-center group-hover:from-cody-blue/40 group-hover:to-cyan-500/30 transition-all duration-300 relative z-10">
                  <Phone className="w-5 h-5 text-cody-blue group-hover:scale-110 transition-transform duration-300" />
                </div>
                <div className="relative z-10">
                  <p className="text-white/50 text-sm group-hover:text-white/70 transition-colors duration-300">Call us</p>
                  <p className="text-white font-medium group-hover:text-cody-blue transition-colors duration-300">+1 (234) 567-890</p>
                </div>
              </a>

              <a 
                href="mailto:hello@codynixitlab.com" 
                className="flex items-center gap-4 p-4 bg-gradient-to-r from-white/5 to-white/[0.02] border border-white/10 rounded-xl hover:from-cody-blue/10 hover:to-cyan-500/5 hover:border-cody-blue/30 transition-all duration-300 group overflow-hidden relative"
              >
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-r from-cody-blue/10 to-transparent" />
                <div className="w-10 h-10 bg-gradient-to-br from-cody-blue/20 to-cyan-500/10 rounded-lg flex items-center justify-center group-hover:from-cody-blue/40 group-hover:to-cyan-500/30 transition-all duration-300 relative z-10">
                  <Mail className="w-5 h-5 text-cody-blue group-hover:scale-110 transition-transform duration-300" />
                </div>
                <div className="relative z-10">
                  <p className="text-white/50 text-sm group-hover:text-white/70 transition-colors duration-300">Send us an email</p>
                  <p className="text-white font-medium group-hover:text-cody-blue transition-colors duration-300">hello@codynixitlab.com</p>
                </div>
              </a>
            </div>
          </div>

          {/* Right side - Form */}
          <div className="relative bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 rounded-2xl p-6 sm:p-8 overflow-hidden group hover:border-cody-blue/30 transition-all duration-300">
            {/* Success overlay */}
            {isSubmitted && (
              <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-emerald-500/5 flex items-center justify-center z-50 rounded-2xl backdrop-blur-sm animate-fade-in-up">
                <div className="text-center">
                  <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4 animate-bounce" />
                  <h4 className="text-xl font-bold text-white mb-2">Success!</h4>
                  <p className="text-white/70">We'll get back to you shortly</p>
                </div>
              </div>
            )}
            {/* Tabs with enhanced styling */}
            <div className="flex gap-4 mb-6 border-b border-white/10 relative z-10">
              <button
                onClick={() => setActiveTab('project')}
                className={`pb-4 text-sm font-medium transition-all relative ${
                  activeTab === 'project' ? 'text-cody-blue' : 'text-white/50 hover:text-white/70'
                }`}
              >
                Discuss a project
                {activeTab === 'project' && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-cody-blue to-cyan-500 underline-reveal" />
                )}
              </button>
              <button
                onClick={() => setActiveTab('career')}
                className={`pb-4 text-sm font-medium transition-all relative ${
                  activeTab === 'career' ? 'text-cody-blue' : 'text-white/50 hover:text-white/70'
                }`}
              >
                Send CV
                {activeTab === 'career' && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-cody-blue to-cyan-500 underline-reveal" />
                )}
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 relative z-10">
              <div className="group">
                <label className="block text-white/70 text-sm mb-2 group-focus-within:text-cody-blue transition-colors">
                  Full Name <span className="text-cody-blue">*</span>
                </label>
                <Input
                  type="text"
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="bg-gradient-to-r from-white/5 to-white/[0.02] border-white/10 text-white placeholder:text-white/30 focus:border-cody-blue/50 focus:ring-cody-blue/20 focus:bg-gradient-to-r focus:from-white/10 focus:to-white/5 transition-all duration-300"
                  required
                />
              </div>

              <div className="group">
                <label className="block text-white/70 text-sm mb-2 group-focus-within:text-cody-blue transition-colors">
                  {activeTab === 'project' ? 'Company' : 'Position'} <span className="text-cody-blue">*</span>
                </label>
                <Input
                  type="text"
                  placeholder={activeTab === 'project' ? 'Your Company' : 'Position you are interested in'}
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  className="bg-gradient-to-r from-white/5 to-white/[0.02] border-white/10 text-white placeholder:text-white/30 focus:border-cody-blue/50 focus:ring-cody-blue/20 focus:bg-gradient-to-r focus:from-white/10 focus:to-white/5 transition-all duration-300"
                  required
                />
              </div>

              <div className="group">
                <label className="block text-white/70 text-sm mb-2 group-focus-within:text-cody-blue transition-colors">
                  E-mail <span className="text-cody-blue">*</span>
                </label>
                <Input
                  type="email"
                  placeholder="john@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="bg-gradient-to-r from-white/5 to-white/[0.02] border-white/10 text-white placeholder:text-white/30 focus:border-cody-blue/50 focus:ring-cody-blue/20 focus:bg-gradient-to-r focus:from-white/10 focus:to-white/5 transition-all duration-300"
                  required
                />
              </div>

              <div>
                <label className="block text-white/70 text-sm mb-2">Phone</label>
                <div className="flex gap-2">
                  <select className="w-20 bg-gradient-to-r from-white/5 to-white/[0.02] border border-white/10 text-white rounded-lg px-3 py-2 text-sm hover:border-cody-blue/30 transition-colors duration-300">
                    <option value="+1">🇺🇸 +1</option>
                    <option value="+44">🇬🇧 +44</option>
                    <option value="+65">🇸🇬 +65</option>
                  </select>
                  <Input
                    type="tel"
                    placeholder="(555) 000-0000"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="flex-1 bg-gradient-to-r from-white/5 to-white/[0.02] border-white/10 text-white placeholder:text-white/30 focus:border-cody-blue/50 focus:ring-cody-blue/20 focus:from-white/10 focus:to-white/5 transition-all duration-300"
                  />
                </div>
              </div>

              <div className="group">
                <label className="block text-white/70 text-sm mb-2 group-focus-within:text-cody-blue transition-colors">
                  {activeTab === 'project' ? 'Tell us about your project' : 'Tell us about yourself'}
                </label>
                <Textarea
                  placeholder={activeTab === 'project' ? 'Describe your project requirements...' : 'Share your experience and skills...'}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="bg-gradient-to-r from-white/5 to-white/[0.02] border-white/10 text-white placeholder:text-white/30 focus:border-cody-blue/50 focus:ring-cody-blue/20 focus:bg-gradient-to-r focus:from-white/10 focus:to-white/5 min-h-[120px] transition-all duration-300"
                  rows={4}
                />
              </div>

              {/* File attachment */}
              <div>
                <button
                  type="button"
                  className="flex items-center gap-2 text-white/50 hover:text-cody-blue transition-colors text-sm"
                >
                  <Paperclip className="w-4 h-4" />
                  Attach {activeTab === 'project' ? 'files' : 'your CV'}
                </button>
              </div>

              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-white to-cyan-100 text-cody-darker hover:from-white/90 hover:to-cyan-100/90 py-6 rounded-full font-medium group shadow-lg shadow-white/20 hover:shadow-xl hover:shadow-cody-blue/30 transition-all duration-300 relative overflow-hidden"
              >
                <span className="relative z-10 flex items-center justify-center">
                  Submit
                  <Send className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                </span>
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
