import React, { useState } from 'react';

type FormStatus = 'idle' | 'submitting' | 'success' | 'error';

const ContactInfoCard: React.FC<{ icon: React.ReactNode; title: string; children: React.ReactNode; }> = ({ icon, title, children }) => (
  <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-6 text-center flex flex-col items-center">
    <div className="text-indigo-400 mb-4">{icon}</div>
    <h3 className="text-xl font-semibold text-white">{title}</h3>
    <div className="mt-2 text-gray-400">{children}</div>
  </div>
);


const ContactPage: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<FormStatus>('idle');
  const [formError, setFormError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('submitting');
    setFormError(null);

    try {
      const response = await fetch("https://formspree.io/f/mzzkgzgq", {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, email, message })
      });

      if (response.ok) {
        setStatus('success');
        setName('');
        setEmail('');
        setMessage('');
      } else {
        const data = await response.json();
        // FIX: Replaced Object.hasOwn with Object.prototype.hasOwnProperty.call for wider compatibility.
        if (Object.prototype.hasOwnProperty.call(data, 'errors')) {
          setFormError(data["errors"].map((error: { message: string }) => error.message).join(", "));
        } else {
          setFormError('An unexpected error occurred.');
        }
        setStatus('error');
      }
    } catch (error) {
      setFormError('Failed to send message. Please check your network connection.');
      setStatus('error');
    }
  };

  return (
    <div className="py-16 sm:py-24 bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-base font-semibold text-indigo-400 tracking-wide uppercase">Contact Us</h2>
          <p className="mt-1 text-4xl font-extrabold text-white sm:text-5xl sm:tracking-tight lg:text-6xl">
            Get in Touch
          </p>
          <p className="max-w-xl mt-5 mx-auto text-xl text-gray-300">
            We'd love to hear from you. Whether you have a question about features, pricing, or anything else, our team is ready to answer all your questions.
          </p>
        </div>

        <div className="mt-20 max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
            <ContactInfoCard 
                icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>}
                title="Email Us"
            >
                <a href="mailto:business@mosagraphic.com" className="hover:text-indigo-400 transition-colors">business@mosagraphic.com</a>
            </ContactInfoCard>
             <ContactInfoCard 
                icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>}
                title="Call Us"
            >
                 <a href="tel:+351920715535" className="hover:text-indigo-400 transition-colors">+351 920 715 535</a>
            </ContactInfoCard>
             <ContactInfoCard 
                icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>}
                title="Our Location"
            >
                Rua das Forças Armadas, Nº 133, <br /> 3º Esquerdo, 4715-029 Braga
            </ContactInfoCard>
        </div>


        <div className="mt-16 max-w-3xl mx-auto">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-300">Full Name</label>
              <div className="mt-1">
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="block w-full shadow-sm py-3 px-4 bg-gray-700 border-gray-600 rounded-md focus:ring-indigo-500 focus:border-indigo-500 text-white"
                />
              </div>
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-300">Email</label>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="email"
                  required
                  className="block w-full shadow-sm py-3 px-4 bg-gray-700 border-gray-600 rounded-md focus:ring-indigo-500 focus:border-indigo-500 text-white"
                />
              </div>
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-300">Message</label>
              <div className="mt-1">
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                  className="block w-full shadow-sm py-3 px-4 bg-gray-700 border-gray-600 rounded-md focus:ring-indigo-500 focus:border-indigo-500 text-white"
                ></textarea>
              </div>
            </div>
            <div>
              <button
                type="submit"
                disabled={status === 'submitting'}
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-indigo-500 disabled:opacity-50"
              >
                {status === 'submitting' ? 'Sending...' : 'Send Message'}
              </button>
            </div>
            {status === 'success' && <p className="text-center text-green-400">Message sent successfully! We'll get back to you soon.</p>}
            {status === 'error' && <p className="text-center text-red-400">Error: {formError}</p>}
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
