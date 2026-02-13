import { useState } from 'react';
import { Rocket, Sparkles, Code, ArrowRight, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';

const serviceSteps = [
  {
    number: '00',
    title: 'Packaged Solutions',
    description: 'Ready-to-deploy solutions for common business needs'
  },
  {
    number: '01',
    title: 'Ideation & Concept Creation',
    description: 'Transform your ideas into actionable project plans'
  },
  {
    number: '02',
    title: 'Product Development',
    description: 'Full-cycle development from design to deployment'
  },
  {
    number: '03',
    title: 'Scale & Grow',
    description: 'Optimize and expand your digital products'
  }
];

const packages = [
  {
    icon: Rocket,
    title: 'Product Concept,\nQuick Start.',
    price: '$2,950',
    description: 'Get a visual design concept, validated scope and product roadmap in just 2 weeks',
    features: ['UI/UX Design Concept', 'Technical Architecture', 'Project Roadmap', 'Cost Estimation'],
    gradient: 'from-cody-blue/20 to-cyan-500/20'
  },
  {
    icon: Sparkles,
    title: 'MVP Development\nPackage',
    price: '$9,950',
    description: 'Launch your minimum viable product with core features in 4-6 weeks',
    features: ['Full Development', 'QA Testing', 'Deployment', '30 Days Support'],
    gradient: 'from-purple-500/20 to-pink-500/20',
    popular: true
  },
  {
    icon: Code,
    title: 'Full Stack\nSolution',
    price: 'Custom',
    description: 'End-to-end development with dedicated team and ongoing support',
    features: ['Dedicated Team', 'Agile Development', 'Cloud Infrastructure', 'Ongoing Maintenance'],
    gradient: 'from-orange-500/20 to-yellow-500/20'
  }
];

export default function Services() {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <section id="services" className="relative py-24 bg-cody-darker overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-radial from-cody-blue/10 via-transparent to-transparent" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            What We Do
          </h2>
          <p className="text-white/60 max-w-2xl mx-auto">
            Strong expertise. Flexible capacity. Predictable delivery. We offer 
            comprehensive solutions tailored to your business needs.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left side - Steps */}
          <div className="space-y-4">
            {serviceSteps.map((step, index) => (
              <div
                key={step.number}
                onClick={() => setActiveStep(index)}
                className={`p-6 rounded-xl cursor-pointer transition-all duration-300 ${
                  activeStep === index 
                    ? 'bg-white/10 border border-cody-blue/30' 
                    : 'bg-transparent border border-transparent hover:bg-white/5'
                }`}
              >
                <div className="flex items-start gap-4">
                  <span className={`text-sm font-mono ${
                    activeStep === index ? 'text-cody-blue' : 'text-white/30'
                  }`}>
                    {step.number}
                  </span>
                  <div>
                    <h3 className={`text-lg font-semibold mb-1 ${
                      activeStep === index ? 'text-white' : 'text-white/70'
                    }`}>
                      {step.title}
                    </h3>
                    {activeStep === index && (
                      <p className="text-white/50 text-sm animate-fade-in-up">
                        {step.description}
                      </p>
                    )}
                  </div>
                </div>
                {activeStep === index && (
                  <div className="mt-4 h-0.5 bg-gradient-to-r from-cody-blue to-transparent rounded-full" />
                )}
              </div>
            ))}
          </div>

          {/* Right side - Package cards */}
          <div className="space-y-6">
            {packages.map((pkg) => (
              <div
                key={pkg.title}
                className={`group relative p-6 rounded-2xl border transition-all duration-500 hover-lift ${
                  pkg.popular 
                    ? 'bg-white/10 border-cody-blue/30' 
                    : 'bg-white/5 border-white/10 hover:border-cody-blue/20'
                }`}
              >
                {/* Popular badge */}
                {pkg.popular && (
                  <div className="absolute -top-3 right-6 px-3 py-1 bg-cody-blue text-white text-xs font-medium rounded-full">
                    Most Popular
                  </div>
                )}

                {/* Gradient background on hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${pkg.gradient} opacity-0 group-hover:opacity-100 rounded-2xl transition-opacity duration-500`} />

                <div className="relative z-10">
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-12 h-12 bg-cody-blue/20 rounded-xl flex items-center justify-center">
                      <pkg.icon className="w-6 h-6 text-cody-blue" />
                    </div>
                    <span className="px-3 py-1 bg-white/10 text-white text-sm rounded-full">
                      {pkg.price} {pkg.price !== 'Custom' && 'only'}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-white mb-2 whitespace-pre-line">
                    {pkg.title}
                  </h3>
                  <p className="text-white/50 text-sm mb-4">
                    {pkg.description}
                  </p>

                  <div className="flex items-center justify-between">
                    <div className="flex flex-wrap gap-2">
                      {pkg.features.slice(0, 2).map((feature) => (
                        <span key={feature} className="flex items-center gap-1 text-xs text-white/40">
                          <Check className="w-3 h-3 text-cody-blue" />
                          {feature}
                        </span>
                      ))}
                    </div>
                    <Button 
                      variant="ghost" 
                      className="text-cody-blue hover:text-white hover:bg-cody-blue/20 group/btn"
                    >
                      Learn more
                      <ArrowRight className="ml-2 w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
