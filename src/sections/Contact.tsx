import { useState } from 'react';
import { Phone, Mail, Send, Paperclip } from 'lucide-react';
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    alert('Thank you for reaching out! We will get back to you soon.');
  };

  return (
    <section id="contact" className="relative py-24 bg-cody-darker overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-radial from-cody-blue/5 via-transparent to-transparent" />
        {/* World map pattern */}
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }} />
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
            <div className="mb-8">
              <p className="text-cody-blue text-sm font-medium mb-3">Head Office</p>
              <h3 className="text-xl font-semibold text-white mb-2">
                New York, USA
              </h3>
              <p className="text-white/50 text-sm">
                350 Fifth Avenue, Suite 2500<br />
                New York, NY 10118
              </p>
            </div>

            {/* Other offices */}
            <div className="flex flex-wrap gap-3 mb-8">
              {offices.map((office) => (
                <button
                  key={office.city}
                  className="flex items-center gap-2 px-3 py-2 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 hover:border-cody-blue/30 transition-all text-sm"
                >
                  <span>{office.flag}</span>
                  <span className="text-white/70">{office.city}</span>
                </button>
              ))}
            </div>

            {/* Contact info */}
            <div className="space-y-4">
              <a 
                href="tel:+1234567890" 
                className="flex items-center gap-4 p-4 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 hover:border-cody-blue/30 transition-all group"
              >
                <div className="w-10 h-10 bg-cody-blue/20 rounded-lg flex items-center justify-center group-hover:bg-cody-blue/30 transition-colors">
                  <Phone className="w-5 h-5 text-cody-blue" />
                </div>
                <div>
                  <p className="text-white/50 text-sm">Call us</p>
                  <p className="text-white font-medium">+1 (234) 567-890</p>
                </div>
              </a>

              <a 
                href="mailto:hello@codynixitlab.com" 
                className="flex items-center gap-4 p-4 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 hover:border-cody-blue/30 transition-all group"
              >
                <div className="w-10 h-10 bg-cody-blue/20 rounded-lg flex items-center justify-center group-hover:bg-cody-blue/30 transition-colors">
                  <Mail className="w-5 h-5 text-cody-blue" />
                </div>
                <div>
                  <p className="text-white/50 text-sm">Send us an email</p>
                  <p className="text-white font-medium">hello@codynixitlab.com</p>
                </div>
              </a>
            </div>
          </div>

          {/* Right side - Form */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 sm:p-8">
            {/* Tabs */}
            <div className="flex gap-4 mb-6 border-b border-white/10">
              <button
                onClick={() => setActiveTab('project')}
                className={`pb-4 text-sm font-medium transition-colors relative ${
                  activeTab === 'project' ? 'text-cody-blue' : 'text-white/50 hover:text-white/70'
                }`}
              >
                Discuss a project
                {activeTab === 'project' && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-cody-blue" />
                )}
              </button>
              <button
                onClick={() => setActiveTab('career')}
                className={`pb-4 text-sm font-medium transition-colors relative ${
                  activeTab === 'career' ? 'text-cody-blue' : 'text-white/50 hover:text-white/70'
                }`}
              >
                Send CV
                {activeTab === 'career' && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-cody-blue" />
                )}
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-white/70 text-sm mb-2">
                  Full Name <span className="text-cody-blue">*</span>
                </label>
                <Input
                  type="text"
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-cody-blue/50 focus:ring-cody-blue/20"
                  required
                />
              </div>

              <div>
                <label className="block text-white/70 text-sm mb-2">
                  {activeTab === 'project' ? 'Company' : 'Position'} <span className="text-cody-blue">*</span>
                </label>
                <Input
                  type="text"
                  placeholder={activeTab === 'project' ? 'Your Company' : 'Position you are interested in'}
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  className="bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-cody-blue/50 focus:ring-cody-blue/20"
                  required
                />
              </div>

              <div>
                <label className="block text-white/70 text-sm mb-2">
                  E-mail <span className="text-cody-blue">*</span>
                </label>
                <Input
                  type="email"
                  placeholder="john@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-cody-blue/50 focus:ring-cody-blue/20"
                  required
                />
              </div>

              <div>
                <label className="block text-white/70 text-sm mb-2">Phone</label>
                <div className="flex gap-2">
                  <select className="w-20 bg-white/5 border border-white/10 text-white rounded-lg px-3 py-2 text-sm">
                    <option value="+1">🇺🇸 +1</option>
                    <option value="+44">🇬🇧 +44</option>
                    <option value="+65">🇸🇬 +65</option>
                  </select>
                  <Input
                    type="tel"
                    placeholder="(555) 000-0000"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="flex-1 bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-cody-blue/50 focus:ring-cody-blue/20"
                  />
                </div>
              </div>

              <div>
                <label className="block text-white/70 text-sm mb-2">
                  {activeTab === 'project' ? 'Tell us about your project' : 'Tell us about yourself'}
                </label>
                <Textarea
                  placeholder={activeTab === 'project' ? 'Describe your project requirements...' : 'Share your experience and skills...'}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-cody-blue/50 focus:ring-cody-blue/20 min-h-[120px]"
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
                className="w-full bg-white text-cody-darker hover:bg-white/90 py-6 rounded-full font-medium group"
              >
                Submit
                <Send className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
