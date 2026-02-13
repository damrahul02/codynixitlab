import { useRef, useState, useEffect } from 'react';
import { ArrowRight, ArrowLeft, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';

const caseStudies = [
  {
    id: 1,
    title: 'FinVault',
    category: 'Fintech',
    description: 'A modern fintech platform specializing in secure digital payments and investment tracking.',
    image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=600&h=800&fit=crop',
    color: 'from-orange-500/20 to-red-500/20'
  },
  {
    id: 2,
    title: 'HealthPlus',
    category: 'Healthcare',
    description: 'Telemedicine app connecting patients with healthcare providers for virtual consultations.',
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=600&h=800&fit=crop',
    color: 'from-green-500/20 to-teal-500/20'
  },
  {
    id: 3,
    title: 'ShopWave',
    category: 'E-commerce',
    description: 'Next-gen shopping experience with AI-powered recommendations and seamless checkout.',
    image: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=600&h=800&fit=crop',
    color: 'from-purple-500/20 to-pink-500/20'
  },
  {
    id: 4,
    title: 'EduLearn',
    category: 'Education',
    description: 'Interactive learning platform with live classes, quizzes, and progress tracking.',
    image: 'https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=600&h=800&fit=crop',
    color: 'from-blue-500/20 to-cyan-500/20'
  },
  {
    id: 5,
    title: 'LogiTrack',
    category: 'Logistics',
    description: 'Real-time shipment tracking and fleet management system for logistics companies.',
    image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=600&h=800&fit=crop',
    color: 'from-yellow-500/20 to-orange-500/20'
  },
  {
    id: 6,
    title: 'PropTech',
    category: 'Real Estate',
    description: 'Property management platform with virtual tours and automated tenant screening.',
    image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=600&h=800&fit=crop',
    color: 'from-indigo-500/20 to-purple-500/20'
  }
];

export default function CaseStudies() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [visibleCards, setVisibleCards] = useState<boolean[]>(new Array(caseStudies.length).fill(false));

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Array.from(scrollRef.current?.children || []).indexOf(entry.target as Element);
            setVisibleCards((prev) => {
              const newState = [...prev];
              if (index !== -1) newState[index] = true;
              return newState;
            });
          }
        });
      },
      { threshold: 0.1 }
    );

    scrollRef.current?.querySelectorAll('.case-study-card').forEach((card) => {
      observer.observe(card);
    });

    return () => observer.disconnect();
  }, []);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 400;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section id="case-studies" className="relative py-24 bg-cody-darker overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 dot-pattern opacity-50" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-12">
          <div>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Case studies
            </h2>
            <p className="text-white/60 max-w-xl">
              We get inspired by creating solutions that users love. Explore our portfolio 
              of successful projects across various industries.
            </p>
          </div>
          
          {/* Navigation arrows */}
          <div className="flex gap-3">
            <Button
              variant="outline"
              size="icon"
              onClick={() => scroll('left')}
              className="w-12 h-12 rounded-full border-white/20 text-white hover:bg-white/10 hover:border-white/40"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => scroll('right')}
              className="w-12 h-12 rounded-full border-white/20 text-white hover:bg-white/10 hover:border-white/40"
            >
              <ArrowRight className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* Horizontal scroll container */}
        <div 
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide"
          style={{ scrollSnapType: 'x mandatory' }}
        >
          {caseStudies.map((study, index) => (
            <div
              key={study.id}
              className={`case-study-card group flex-shrink-0 w-[350px] sm:w-[400px] ${
                visibleCards[index] ? 'card-entrance' : 'opacity-0'
              }`}
              style={{ 
                scrollSnapAlign: 'start',
                animationDelay: `${index * 80}ms`
              }}
            >
              <div className="relative h-[500px] rounded-2xl overflow-hidden bg-cody-gray border border-white/5 hover:border-cody-blue/30 transition-all duration-500 hover-lift group-hover:shadow-2xl">
                {/* Background gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${study.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                
                {/* Image with parallax effect */}
                <div className="absolute inset-0 overflow-hidden">
                  <img 
                    src={study.image} 
                    alt={study.title}
                    className="w-full h-full object-cover opacity-60 group-hover:opacity-40 group-hover:scale-110 transition-all duration-1000 ease-out parallax-element"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-cody-darker via-cody-darker/50 to-transparent group-hover:via-cody-darker/40 transition-all duration-500" />
                </div>

                {/* Content */}
                <div className="absolute inset-0 p-6 flex flex-col justify-end transition-all duration-300">
                  {/* Category */}
                  <span className="inline-block px-3 py-1 bg-white/10 backdrop-blur-sm text-white/70 text-xs rounded-full w-fit mb-3 group-hover:bg-cody-blue/30 group-hover:text-cody-blue transition-all duration-300">
                    {study.category}
                  </span>
                  
                  {/* Title with animated arrow */}
                  <h3 className="text-2xl font-bold text-white mb-2 flex items-center gap-2 group-hover:text-cody-blue transition-colors duration-300">
                    {study.title}
                    <ArrowRight className="w-5 h-5 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300" />
                  </h3>
                  
                  {/* Description with smooth reveal */}
                  <p className="text-white/60 text-sm line-clamp-2 mb-4 group-hover:text-white/80 transition-colors duration-300">
                    {study.description}
                  </p>

                  {/* View project link with enhanced animation */}
                  <button className="flex items-center gap-2 text-cody-blue text-sm font-medium opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                    View project
                    <ExternalLink className="w-4 h-4 group-hover:rotate-45 transition-transform duration-300" />
                  </button>
                </div>

                {/* Animated Index number */}
                <div className="absolute top-4 right-4 text-white/20 text-6xl font-bold group-hover:text-white/40 transition-all duration-500 group-hover:scale-110">
                  0{index + 1}
                </div>

                {/* Animated corner glow */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-radial from-cody-blue/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-full blur-2xl" />
              </div>
            </div>
          ))}
        </div>

        {/* Progress indicator */}
        <div className="flex justify-center gap-2 mt-8">
          {caseStudies.map((_, index) => (
            <div 
              key={index}
              className="w-8 h-1 bg-white/10 rounded-full overflow-hidden"
            >
              <div className="h-full bg-cody-blue rounded-full" style={{ width: '30%' }} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
