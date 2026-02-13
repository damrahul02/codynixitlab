import { useState } from 'react';
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

  return (
    <section id="expertise" className="relative py-24 bg-cody-darker overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 grid-pattern opacity-30" />

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
              className="group relative p-6 rounded-2xl border border-white/5 bg-white/[0.02] hover:bg-white/5 hover:border-cody-blue/20 transition-all duration-500 cursor-pointer overflow-hidden"
            >
              {/* Gradient background on hover */}
              <div className={`absolute inset-0 bg-gradient-to-br ${tech.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
              
              {/* Content */}
              <div className="relative z-10">
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center group-hover:bg-white/10 transition-colors">
                    <tech.icon className="w-6 h-6 text-cody-blue" />
                  </div>
                  <ArrowRight className="w-5 h-5 text-white/20 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all duration-300" />
                </div>

                <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-cody-blue transition-colors">
                  {tech.title}
                </h3>
                
                <p className={`text-white/50 text-sm transition-all duration-300 ${
                  hoveredIndex === index ? 'opacity-100 max-h-20' : 'opacity-0 max-h-0'
                } overflow-hidden`}>
                  {tech.description}
                </p>
              </div>

              {/* Corner accent */}
              <div className="absolute bottom-0 right-0 w-20 h-20 bg-gradient-to-tl from-cody-blue/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
