import { useState, useEffect } from 'react';
import { ArrowRight, Building2, GraduationCap, Heart, ShoppingCart, Store, Briefcase, Truck, Factory } from 'lucide-react';

const industries = [
  {
    id: '01',
    title: 'Finance',
    description: 'Build a secure and reliable fintech app to transform financial operations and enhance customer engagement.',
    icon: Building2,
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400&h=500&fit=crop',
    color: 'from-blue-600/30 to-indigo-600/30'
  },
  {
    id: '02',
    title: 'Education',
    description: 'Develop self-learning apps and platforms for corporate training and improve the learning experience.',
    icon: GraduationCap,
    image: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=400&h=500&fit=crop',
    color: 'from-orange-600/30 to-red-600/30'
  },
  {
    id: '03',
    title: 'Healthcare',
    description: 'Create healthcare solutions to enhance diagnostic accuracy, improve patient care, and optimize costs.',
    icon: Heart,
    image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=400&h=500&fit=crop',
    color: 'from-green-600/30 to-teal-600/30'
  }
];

const moreIndustries = [
  { id: '04', title: 'E-commerce', icon: ShoppingCart },
  { id: '05', title: 'Retail', icon: Store },
  { id: '06', title: 'Prof. Services', icon: Briefcase },
  { id: '07', title: 'Logistics', icon: Truck },
  { id: '08', title: 'Manufacturing', icon: Factory }
];

export default function Industries() {
  const [activeIndustry, setActiveIndustry] = useState<string | null>(null);
  const [visibleIndustries, setVisibleIndustries] = useState<boolean[]>(new Array(industries.length).fill(false));

  useEffect(() => {
    industries.forEach((_, index) => {
      setTimeout(() => {
        setVisibleIndustries((prev) => {
          const newState = [...prev];
          newState[index] = true;
          return newState;
        });
      }, index * 100);
    });
  }, []);

  return (
    <section id="industries" className="relative py-24 bg-cody-darker overflow-hidden">
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Domain Expertise
          </h2>
          <p className="text-white/60 max-w-2xl mx-auto">
            We blend cutting-edge technologies, expert engineering skills, and domain-specific 
            knowledge to build top-notch solutions across industries.
          </p>
        </div>

        {/* Main industry cards with animations */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {industries.map((industry, index) => (
            <div
              key={industry.id}
              onMouseEnter={() => setActiveIndustry(industry.id)}
              onMouseLeave={() => setActiveIndustry(null)}
              className={`group relative h-[400px] rounded-2xl overflow-hidden cursor-pointer ${
                visibleIndustries[index] ? 'slide-in-left' : 'opacity-0'
              }`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Background image with parallax */}
              <div className="absolute inset-0">
                <img 
                  src={industry.image} 
                  alt={industry.title}
                  className="w-full h-full object-cover opacity-40 group-hover:opacity-30 group-hover:scale-110 transition-all duration-700 ease-out"
                />
                <div className={`absolute inset-0 bg-gradient-to-t ${industry.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                <div className="absolute inset-0 bg-gradient-to-t from-cody-darker via-cody-darker/80 to-transparent group-hover:via-cody-darker/60 transition-all duration-500" />
              </div>

              {/* Animated glow on hover */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{
                boxShadow: 'inset 0 0 50px rgba(0, 102, 204, 0.15)'
              }} />

              {/* Content */}
              <div className="absolute inset-0 p-6 flex flex-col justify-between">
                <div>
                  <span className="text-white/30 text-sm font-mono group-hover:text-cody-blue/60 transition-colors duration-300">{industry.id}</span>
                </div>

                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-cody-blue/20 to-cyan-500/10 rounded-lg flex items-center justify-center group-hover:from-cody-blue/40 group-hover:to-cyan-500/30 transition-all duration-300">
                      <industry.icon className="w-5 h-5 text-cody-blue group-hover:scale-110 transition-transform duration-300" />
                    </div>
                    <h3 className="text-2xl font-bold text-white group-hover:text-cody-blue transition-colors duration-300">{industry.title}</h3>
                  </div>
                  
                  {/* Animated underline */}
                  <div className="h-0.5 w-0 bg-gradient-to-r from-cody-blue to-transparent group-hover:w-full transition-all duration-500 mb-3" />
                  
                  <p className={`text-white/60 text-sm mb-4 transition-all duration-300 ${
                    activeIndustry === industry.id ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
                  }`}>
                    {industry.description}
                  </p>

                  <button className={`flex items-center gap-2 text-cody-blue text-sm font-medium transition-all duration-300 ${
                    activeIndustry === industry.id ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'
                  }`}>
                    Learn more
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* More industries with staggered animation */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
          {moreIndustries.map((industry, index) => (
            <div
              key={industry.id}
              className="group p-4 bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/5 rounded-xl hover:bg-gradient-to-br hover:from-cody-blue/10 hover:to-cyan-500/5 hover:border-cody-blue/30 transition-all duration-300 cursor-pointer overflow-hidden"
              style={{
                animation: `card-entrance 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) forwards`,
                animationDelay: `${(industries.length + index) * 80}ms`,
                opacity: 0
              }}
            >
              <span className="text-white/30 text-xs font-mono block mb-2 group-hover:text-cody-blue/60 transition-colors duration-300">{industry.id}</span>
              <div className="flex items-center gap-2">
                <industry.icon className="w-4 h-4 text-white/50 group-hover:text-cody-blue group-hover:scale-110 transition-all duration-300" />
                <span className="text-white/70 group-hover:text-white text-sm font-medium transition-colors duration-300">
                  {industry.title}
                </span>
              </div>
              
              {/* Hover background effect */}
              <div className="absolute inset-0 -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-r from-cody-blue/10 to-cyan-500/10" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
