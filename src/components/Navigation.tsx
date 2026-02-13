import { useState, useEffect } from 'react';
import { Menu, X, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';

const navItems = [
  { label: 'Case Studies', href: '#case-studies' },
  { 
    label: 'Services', 
    href: '#services',
    dropdown: [
      { label: 'Web Development', href: '#web-dev' },
      { label: 'Mobile Apps', href: '#mobile-apps' },
      { label: 'UI/UX Design', href: '#design' },
      { label: 'Full Stack Solutions', href: '#fullstack' },
    ]
  },
  { 
    label: 'Expertise', 
    href: '#expertise',
    dropdown: [
      { label: 'Frontend Development', href: '#frontend' },
      { label: 'Backend Systems', href: '#backend' },
      { label: 'Cloud Solutions', href: '#cloud' },
      { label: 'API Integration', href: '#api' },
    ]
  },
  { 
    label: 'Industries', 
    href: '#industries',
    dropdown: [
      { label: 'Fintech', href: '#fintech' },
      { label: 'Healthcare', href: '#healthcare' },
      { label: 'E-commerce', href: '#ecommerce' },
      { label: 'Education', href: '#education' },
    ]
  },
  { label: 'Company', href: '#about' },
  { label: 'Careers', href: '#careers' },
];

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
    setActiveDropdown(null);
  };

  return (
    <>
      <nav 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled 
            ? 'bg-cody-darker/80 backdrop-blur-xl border-b border-white/5' 
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <a 
              href="#" 
              className="flex items-center gap-3 group"
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            >
              <img 
                src="/logo.png" 
                alt="codynixitlab" 
                className="w-10 h-10 object-contain transition-transform duration-300 group-hover:scale-110"
              />
              <span className="text-xl font-bold text-white">
                <span className="text-cody-blue">cody</span>nixitlab
              </span>
            </a>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-1">
              {navItems.map((item) => (
                <div 
                  key={item.label}
                  className="relative"
                  onMouseEnter={() => item.dropdown && setActiveDropdown(item.label)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <button
                    onClick={() => !item.dropdown && scrollToSection(item.href)}
                    className="flex items-center gap-1 px-4 py-2 text-sm text-white/70 hover:text-white transition-colors rounded-lg hover:bg-white/5"
                  >
                    {item.label}
                    {item.dropdown && (
                      <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${activeDropdown === item.label ? 'rotate-180' : ''}`} />
                    )}
                  </button>

                  {/* Dropdown */}
                  {item.dropdown && activeDropdown === item.label && (
                    <div className="absolute top-full left-0 mt-2 w-56 py-2 bg-cody-gray/95 backdrop-blur-xl border border-white/10 rounded-xl shadow-2xl animate-fade-in-up">
                      {item.dropdown.map((subItem) => (
                        <button
                          key={subItem.label}
                          onClick={() => scrollToSection(subItem.href)}
                          className="w-full px-4 py-2.5 text-left text-sm text-white/70 hover:text-white hover:bg-white/5 transition-colors"
                        >
                          {subItem.label}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* CTA Button */}
            <div className="hidden lg:block">
              <Button 
                onClick={() => scrollToSection('#contact')}
                className="bg-transparent border border-white/20 text-white hover:bg-white/10 hover:border-white/40 px-6 py-2 rounded-full transition-all duration-300"
              >
                Contact us
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 text-white/70 hover:text-white transition-colors"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div 
        className={`fixed inset-0 z-40 lg:hidden transition-all duration-500 ${
          isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="absolute inset-0 bg-cody-darker/95 backdrop-blur-xl" onClick={() => setIsMobileMenuOpen(false)} />
        <div 
          className={`absolute top-20 left-0 right-0 bg-cody-gray border-b border-white/10 p-4 transition-transform duration-500 ${
            isMobileMenuOpen ? 'translate-y-0' : '-translate-y-full'
          }`}
        >
          <div className="flex flex-col gap-2">
            {navItems.map((item) => (
              <div key={item.label}>
                <button
                  onClick={() => !item.dropdown && scrollToSection(item.href)}
                  className="w-full px-4 py-3 text-left text-white/70 hover:text-white hover:bg-white/5 rounded-lg transition-colors flex items-center justify-between"
                >
                  {item.label}
                  {item.dropdown && <ChevronDown className="w-4 h-4" />}
                </button>
                {item.dropdown && (
                  <div className="pl-4 mt-1 space-y-1">
                    {item.dropdown.map((subItem) => (
                      <button
                        key={subItem.label}
                        onClick={() => scrollToSection(subItem.href)}
                        className="w-full px-4 py-2 text-left text-sm text-white/50 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
                      >
                        {subItem.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <Button 
              onClick={() => scrollToSection('#contact')}
              className="mt-4 w-full bg-cody-blue text-white hover:bg-cody-blue/90 py-3 rounded-full"
            >
              Contact us
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
