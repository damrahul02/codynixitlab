import { useRef } from 'react';
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
              className="group flex-shrink-0 w-[350px] sm:w-[400px]"
              style={{ scrollSnapAlign: 'start' }}
            >
              <div className="relative h-[500px] rounded-2xl overflow-hidden bg-cody-gray border border-white/5 hover:border-cody-blue/30 transition-all duration-500">
                {/* Background gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${study.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                
                {/* Image */}
                <div className="absolute inset-0">
                  <img 
                    src={study.image} 
                    alt={study.title}
                    className="w-full h-full object-cover opacity-60 group-hover:opacity-40 group-hover:scale-105 transition-all duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-cody-darker via-cody-darker/50 to-transparent" />
                </div>

                {/* Content */}
                <div className="absolute inset-0 p-6 flex flex-col justify-end">
                  {/* Category */}
                  <span className="inline-block px-3 py-1 bg-white/10 backdrop-blur-sm text-white/70 text-xs rounded-full w-fit mb-3">
                    {study.category}
                  </span>
                  
                  {/* Title */}
                  <h3 className="text-2xl font-bold text-white mb-2 flex items-center gap-2">
                    {study.title}
                    <ArrowRight className="w-5 h-5 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                  </h3>
                  
                  {/* Description */}
                  <p className="text-white/60 text-sm line-clamp-2 mb-4">
                    {study.description}
                  </p>

                  {/* View project link */}
                  <button className="flex items-center gap-2 text-cody-blue text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    View project
                    <ExternalLink className="w-4 h-4" />
                  </button>
                </div>

                {/* Index number */}
                <div className="absolute top-4 right-4 text-white/20 text-6xl font-bold">
                  0{index + 1}
                </div>
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
