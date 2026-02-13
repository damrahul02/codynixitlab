import { useState } from 'react';
import { Quote, Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const testimonials = [
  {
    id: 1,
    company: 'TechVentures',
    logo: 'TV',
    quote: 'codynixitlab transformed our vision into reality. Their team delivered a world-class mobile app that exceeded our expectations in every way. The attention to detail and technical expertise was outstanding.',
    author: 'Sarah Mitchell',
    role: 'CEO',
    location: 'San Francisco, USA',
    rating: 5,
    color: 'bg-blue-500'
  },
  {
    id: 2,
    company: 'FinFlow',
    logo: 'FF',
    quote: 'Working with codynixitlab was a game-changer for our fintech startup. They built a secure, scalable platform that helped us acquire 10,000+ users in the first month. Highly recommended!',
    author: 'Michael Chen',
    role: 'Founder',
    location: 'Singapore',
    rating: 5,
    color: 'bg-green-500'
  },
  {
    id: 3,
    company: 'HealthFirst',
    logo: 'HF',
    quote: 'The healthcare app they developed for us has revolutionized how we connect with patients. The UI is intuitive, the performance is excellent, and our patient satisfaction scores have increased by 40%.',
    author: 'Dr. Emily Roberts',
    role: 'Medical Director',
    location: 'London, UK',
    rating: 5,
    color: 'bg-teal-500'
  },
  {
    id: 4,
    company: 'EduSpark',
    logo: 'ES',
    quote: 'codynixitlab built our e-learning platform from scratch. Their team understood our educational goals and created an engaging, interactive experience that students love.',
    author: 'David Park',
    role: 'CTO',
    location: 'Seoul, South Korea',
    rating: 5,
    color: 'bg-purple-500'
  },
  {
    id: 5,
    company: 'RetailMax',
    logo: 'RM',
    quote: 'Our e-commerce sales increased by 150% after launching the new platform built by codynixitlab. The seamless checkout experience and personalized recommendations are game-changers.',
    author: 'Anna Schmidt',
    role: 'E-commerce Manager',
    location: 'Berlin, Germany',
    rating: 5,
    color: 'bg-orange-500'
  }
];

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const navigate = (direction: 'prev' | 'next') => {
    if (isAnimating) return;
    setIsAnimating(true);
    
    setCurrentIndex(prev => {
      if (direction === 'next') {
        return prev === testimonials.length - 1 ? 0 : prev + 1;
      }
      return prev === 0 ? testimonials.length - 1 : prev - 1;
    });

    setTimeout(() => setIsAnimating(false), 500);
  };

  const currentTestimonial = testimonials[currentIndex];

  return (
    <section className="relative py-24 bg-cody-darker overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-radial from-cody-blue/10 via-transparent to-transparent" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full mb-6">
            <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
            <span className="text-sm text-white/70">4.9 Rating on Clutch</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Proud to be a Trusted Partner
          </h2>
          <p className="text-white/60 max-w-2xl mx-auto">
            We measure our success with success of our customers and partners. 
            By helping others win and grow we aspire to build bulletproof alliances.
          </p>
        </div>

        {/* Main testimonial */}
        <div className="max-w-4xl mx-auto">
          <div className="relative bg-white/5 border border-white/10 rounded-3xl p-8 sm:p-12">
            {/* Quote icon */}
            <Quote className="absolute top-8 right-8 w-12 h-12 text-cody-blue/20" />

            {/* Content */}
            <div className={`transition-all duration-500 ${isAnimating ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'}`}>
              {/* Company info */}
              <div className="flex items-center gap-4 mb-6">
                <div className={`w-14 h-14 ${currentTestimonial.color} rounded-xl flex items-center justify-center text-white font-bold text-lg`}>
                  {currentTestimonial.logo}
                </div>
                <div>
                  <h3 className="text-white font-semibold">{currentTestimonial.company}</h3>
                  <div className="flex items-center gap-1">
                    {[...Array(currentTestimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                    ))}
                  </div>
                </div>
              </div>

              {/* Quote */}
              <blockquote className="text-xl sm:text-2xl text-white/90 leading-relaxed mb-8">
                "{currentTestimonial.quote}"
              </blockquote>

              {/* Author */}
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white font-medium">{currentTestimonial.author}</p>
                  <p className="text-white/50 text-sm">{currentTestimonial.role}</p>
                  <p className="text-white/30 text-xs">{currentTestimonial.location}</p>
                </div>

                {/* Navigation */}
                <div className="flex gap-3">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => navigate('prev')}
                    className="w-10 h-10 rounded-full border-white/20 text-white hover:bg-white/10"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => navigate('next')}
                    className="w-10 h-10 rounded-full border-white/20 text-white hover:bg-white/10"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Progress dots */}
            <div className="flex justify-center gap-2 mt-8">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    if (!isAnimating) {
                      setIsAnimating(true);
                      setCurrentIndex(index);
                      setTimeout(() => setIsAnimating(false), 500);
                    }
                  }}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === currentIndex ? 'w-8 bg-cody-blue' : 'bg-white/20 hover:bg-white/40'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Company logos grid */}
        <div className="mt-16 grid grid-cols-3 sm:grid-cols-5 gap-8 items-center justify-items-center opacity-50">
          {['Google', 'Microsoft', 'Amazon', 'Meta', 'Netflix'].map((company) => (
            <div key={company} className="text-white/40 text-lg font-semibold hover:text-white/60 transition-colors cursor-default">
              {company}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
