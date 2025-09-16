import { useState } from 'react';
import emailjs from '@emailjs/browser';

export function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [formStatus, setFormStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Basic validation
    if (!formData.name || !formData.email || !formData.message) {
      setFormStatus('error');
      return;
    }

    setFormStatus('loading');

    try {
      // Get EmailJS configuration from environment variables
      const serviceId = (import.meta as any).env.VITE_EMAILJS_SERVICE_ID;
      const templateId = (import.meta as any).env.VITE_EMAILJS_TEMPLATE_ID;
      const publicKey = (import.meta as any).env.VITE_EMAILJS_PUBLIC_KEY;

      if (!serviceId || !templateId || !publicKey) {
        throw new Error('EmailJS configuration not found');
      }

      // Prepare email data to match your template variables
      const emailParams = {
        name: formData.name,
        time: new Date().toLocaleString(),
        message: `Email: ${formData.email}\n${formData.subject ? `Subject: ${formData.subject}\n` : ''}Message: ${formData.message}`
      };

      // Send email using EmailJS
      await emailjs.send(serviceId, templateId, emailParams, publicKey);

      setFormStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      console.error('Error sending email:', error);
      setFormStatus('error');
    }
  };
  const contactMethods = [
    {
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
        </svg>
      ),
      label: 'Email',
      value: 'aaron.kleiman@queensu.ca',
      link: 'mailto:aaron.kleiman@queensu.ca',
      color: 'text-blue-400'
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
        </svg>
      ),
      label: 'LinkedIn',
      value: 'LinkedIn Profile',
      link: 'https://www.linkedin.com/in/aaron-kleiman-477b19286/',
      color: 'text-blue-400'
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
        </svg>
      ),
      label: 'GitHub',
      value: 'GitHub Profile',
      link: 'https://github.com/aaronk2005',
      color: 'text-gray-400'
    }
  ];

  return (
    <section id="contact" className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 glow-text">
            Get In Touch
          </h2>
          <p className="text-xl text-white/70">
            Open to Summer 2026 12-16 month co-ops and exciting project collaborations
          </p>
        </div>

        <div className="glass-card rounded-2xl sm:rounded-3xl p-8 sm:p-12 mb-8 sm:mb-12">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-white mb-4">Let's Connect</h3>
            <p className="text-white/60">Reach out through any of these platforms</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {contactMethods.map((method) => (
              <a
                key={method.label}
                href={method.link}
                className="glass-card rounded-xl p-8 text-center hover:scale-105 transition-all duration-300 group flex flex-col items-center justify-center space-y-4"
                title={method.label}
                aria-label={`Contact me via ${method.label}: ${method.value}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <div className={`${method.color} group-hover:scale-110 transition-transform mb-2`} aria-hidden="true">
                  {method.icon}
                </div>
                <div>
                  <h4 className="text-white font-semibold text-lg mb-1">{method.label}</h4>
                  <p className="text-white/70 text-sm">{method.value}</p>
                </div>
              </a>
            ))}
          </div>
        </div>

        <div className="glass-card rounded-xl sm:rounded-2xl p-6 sm:p-8">
          <h3 className="text-xl sm:text-2xl font-semibold text-white mb-4 sm:mb-6 text-center">
            Send Me a Message
          </h3>
          
          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6" noValidate>
            <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
              <div>
                <label htmlFor="contact-name" className="block text-white/80 mb-2">Name *</label>
                <input
                  id="contact-name"
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className={`w-full glass rounded-lg px-4 py-3 text-white placeholder-white/50 border transition-all focus:outline-none focus:ring-2 ${
                    formStatus === 'error' && !formData.name 
                      ? 'border-red-500/50 focus:border-red-500/50 focus:ring-red-500/30' 
                      : 'border-white/20 focus:border-blue-400/50 focus:ring-blue-400/30'
                  }`}
                  placeholder="Your name"
                  disabled={formStatus === 'loading'}
                  required
                  aria-describedby={formStatus === 'error' && !formData.name ? 'name-error' : undefined}
                  aria-invalid={formStatus === 'error' && !formData.name}
                />
              </div>
              
              <div>
                <label htmlFor="contact-email" className="block text-white/80 mb-2">Email *</label>
                <input
                  id="contact-email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={`w-full glass rounded-lg px-4 py-3 text-white placeholder-white/50 border transition-all focus:outline-none focus:ring-2 ${
                    formStatus === 'error' && !formData.email 
                      ? 'border-red-500/50 focus:border-red-500/50 focus:ring-red-500/30' 
                      : 'border-white/20 focus:border-blue-400/50 focus:ring-blue-400/30'
                  }`}
                  placeholder="your@email.com"
                  disabled={formStatus === 'loading'}
                  required
                  aria-describedby={formStatus === 'error' && !formData.email ? 'email-error' : undefined}
                  aria-invalid={formStatus === 'error' && !formData.email}
                />
              </div>
            </div>
            
            <div>
              <label htmlFor="contact-subject" className="block text-white/80 mb-2">Subject</label>
              <input
                id="contact-subject"
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleInputChange}
                className="w-full glass rounded-lg px-4 py-3 text-white placeholder-white/50 border border-white/20 focus:border-blue-500/50 focus:outline-none focus:ring-2 focus:ring-blue-500/30 transition-all"
                placeholder="What's this about?"
                disabled={formStatus === 'loading'}
              />
            </div>
            
            <div>
              <label htmlFor="contact-message" className="block text-white/80 mb-2">Message *</label>
              <textarea
                id="contact-message"
                rows={6}
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                className={`w-full glass rounded-lg px-4 py-3 text-white placeholder-white/50 border transition-all focus:outline-none focus:ring-2 resize-none ${
                  formStatus === 'error' && !formData.message 
                    ? 'border-red-500/50 focus:border-red-500/50 focus:ring-red-500/30' 
                    : 'border-white/20 focus:border-blue-400/50 focus:ring-blue-400/30'
                }`}
                placeholder="Tell me about your project or opportunity..."
                disabled={formStatus === 'loading'}
                required
                aria-describedby={formStatus === 'error' && !formData.message ? 'message-error' : undefined}
                aria-invalid={formStatus === 'error' && !formData.message}
              />
            </div>

            {/* Status Messages */}
            {formStatus === 'error' && (
              <div
                className="text-red-400 text-sm text-center"
                role="alert"
                aria-live="polite"
                id="form-error"
              >
                {!formData.name || !formData.email || !formData.message
                  ? 'Please fill in all required fields.'
                  : 'Failed to send message. Please try again or contact me directly at aaron.kleiman@queensu.ca'
                }
              </div>
            )}
            
            {formStatus === 'success' && (
              <div 
                className="text-green-400 text-sm text-center"
                role="alert"
                aria-live="polite"
                id="form-success"
              >
                Message sent successfully! I'll get back to you soon.
              </div>
            )}
            
            <div className="text-center">
              <button
                type="submit"
                disabled={formStatus === 'loading'}
                className={`glass-button rounded-xl px-8 py-3 text-white font-medium transition-all ${
                  formStatus === 'loading' 
                    ? 'opacity-50 cursor-not-allowed' 
                    : 'hover:scale-105'
                }`}
                aria-describedby={formStatus === 'loading' ? 'form-loading' : undefined}
              >
                {formStatus === 'loading' ? 'Sending...' : 'Send Message'}
                {formStatus === 'loading' && (
                  <span className="sr-only" id="form-loading">Message is being sent, please wait</span>
                )}
              </button>
            </div>
          </form>
        </div>

      </div>
    </section>
  );
}