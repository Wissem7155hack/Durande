import React, { useState, useEffect, useRef } from 'react';
import { HashRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import {
  ArrowRight, Leaf, PencilRuler, Shovel, CheckCircle, Play, Loader2, Send, Phone,
  Maximize2, Sprout, MapPin, Clock, Quote, Star
} from 'lucide-react';
import { NavigationLinks, ProjectImage } from './types';

// --- Utility Components ---

// Reveal on Scroll Animation Wrapper

const RevealOnScroll: React.FC<{ children: React.ReactNode; delay?: number }> = ({ children, delay = 0 }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`transition-all duration-1000 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

const SectionTitle: React.FC<{ subtitle: string; title: string; align?: 'left' | 'center' }> = ({ subtitle, title, align = 'center' }) => (
  <div className={`mb-12 ${align === 'center' ? 'text-center' : 'text-left'}`}>
    <span className="text-gold-500 font-bold tracking-[0.2em] text-xs uppercase mb-3 block">{subtitle}</span>
    <h2 className="text-4xl md:text-5xl font-serif text-earth-900 relative inline-block">
      {title}
      <span className="absolute -bottom-4 left-0 w-1/2 h-1 bg-gold-500"></span>
    </h2>
  </div>
);

// Contact Form Component
const ContactForm = () => {
  const [formState, setFormState] = useState({ name: '', phone: '', message: '', agreed: false });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Quote request sent!");
  };

  return (
    <div className="bg-black p-8 rounded-xl shadow-2xl max-w-md w-full">
      <h3 className="text-3xl font-black text-white text-center mb-8 uppercase font-sans">Get a Free Quote</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-white font-bold text-sm mb-1">Full Name *</label>
          <input
            type="text"
            placeholder="John Smith"
            className="w-full p-3 rounded-md text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          />
        </div>
        <div>
          <label className="block text-white font-bold text-sm mb-1">Phone *</label>
          <input
            type="tel"
            placeholder="(555) 555-5555"
            className="w-full p-3 rounded-md text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          />
        </div>
        <div>
          <label className="block text-white font-bold text-sm mb-1">Short message about your needs *</label>
          <textarea
            placeholder="**Your message goes straight to my phone, I'll get back to you as soon as I'm available**"
            rows={3}
            className="w-full p-3 rounded-md text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500 text-sm"
            required
          ></textarea>
        </div>
        <div className="flex items-start gap-2">
          <input type="checkbox" className="mt-1" required />
          <span className="text-xs text-gray-300">I agree to <a href="#" className="text-green-500 underline">terms & conditions</a> provided by the company. By providing my phone number, I agree to receive text messages from the business.</span>
        </div>
        <button className="w-full bg-[#4a7c59] hover:bg-[#3d664a] text-white font-black uppercase py-4 rounded-md text-xl tracking-wide transition-colors mt-2">
          Send
        </button>
      </form>
    </div>
  );
};

// --- Core Sections ---

const Hero = () => (
  <div className="relative h-screen w-full overflow-hidden">
    {/* Background Image with Slow Zoom Effect */}
    <div
      className="absolute inset-0 bg-cover bg-center animate-slow-zoom"
      style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1723208757257-3e71cf4c5040?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")' }}
    >
      <div className="absolute inset-0 bg-black/40"></div>
      <div className="absolute inset-0 bg-gradient-to-t from-earth-900/80 via-transparent to-black/20"></div>
    </div>

    {/* Content */}
    <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-center z-10 pt-10">
      <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
        <div className="max-w-2xl">
          <div className="overflow-hidden mb-2">
            <p className="text-gold-500 font-bold tracking-[0.3em] uppercase text-sm animate-[fadeInUp_1s_ease-out_forwards]">
              Premium Landscape Architecture
            </p>
          </div>
          <h1 className="text-6xl md:text-7xl lg:text-8xl font-serif text-white leading-[1.1] drop-shadow-2xl mb-8 animate-[fadeInUp_1.2s_ease-out_forwards]">
            Harmonious <br />
            <span className="italic font-light text-gold-400">environment</span> projects
          </h1>

          <p className="text-xl text-gray-200 font-light max-w-2xl border-l-2 border-gold-500 pl-6 mb-10 animate-[fadeInUp_1.4s_ease-out_forwards]">
            Every plot has its own uniqueness and potential. We reveal and create an environment that invites you to live.
          </p>

          <div className="flex flex-col sm:flex-row gap-5 animate-[fadeInUp_1.6s_ease-out_forwards]">
            <Link
              to={NavigationLinks.SERVICES}
              className="px-10 py-4 bg-gold-500 hover:bg-gold-600 text-white font-bold tracking-widest uppercase transition-all duration-300 text-center shadow-xl hover:-translate-y-1"
            >
              Our Services
            </Link>
            <Link
              to={NavigationLinks.PROJECTS}
              className="px-10 py-4 bg-transparent hover:bg-white/10 text-white border border-white/30 font-bold tracking-widest uppercase transition-all duration-300 text-center backdrop-blur-sm hover:-translate-y-1"
            >
              View Projects
            </Link>
          </div>
        </div>

        {/* Contact Form placed on the right */}
        <div className="animate-[fadeInUp_1.6s_ease-out_forwards]">
          <ContactForm />
        </div>
      </div>
    </div>

    {/* Scroll Indicator */}
    <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce text-white/50">
      <div className="flex flex-col items-center">
        <span className="text-[10px] tracking-widest uppercase mb-2">Scroll</span>
        <div className="w-px h-12 bg-white/50"></div>
      </div>
    </div>
  </div>
);

const ServicesSection = () => {
  const services = [
    {
      icon: <PencilRuler className="w-8 h-8" />,
      title: "Landscape Design",
      desc: "Conceptualization and detailed planning of outdoor spaces tailored to your lifestyle and local terrain."
    },
    {
      icon: <Shovel className="w-8 h-8" />,
      title: "Hardscaping & Paving",
      desc: "Structural elements including walkways, patios, and retaining walls built with premium materials."
    },
    {
      icon: <Sprout className="w-8 h-8" />,
      title: "Planting Schemes",
      desc: "Curated selection of native and exotic flora to create year-round visual interest and biodiversity."
    },
    {
      icon: <Leaf className="w-8 h-8" />,
      title: "Garden Maintenance",
      desc: "Seasonal care packages to ensure your garden evolves beautifully throughout the years."
    }
  ];

  return (
    <section className="py-24 bg-stone-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <RevealOnScroll>
          <SectionTitle subtitle="What We Do" title="Crafting Natural Balance" />
        </RevealOnScroll>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((s, i) => (
            <RevealOnScroll key={i} delay={i * 100}>
              <div className="h-full p-8 bg-white hover:bg-earth-900 group transition-all duration-500 shadow-sm hover:shadow-xl border-b-2 border-transparent hover:border-gold-500">
                <div className="w-16 h-16 bg-stone-100 group-hover:bg-white/10 rounded-full flex items-center justify-center text-earth-900 group-hover:text-gold-500 mb-6 transition-colors">
                  {s.icon}
                </div>
                <h3 className="text-xl font-serif text-earth-900 group-hover:text-white mb-4 transition-colors">{s.title}</h3>
                <p className="text-gray-600 group-hover:text-gray-300 text-sm leading-relaxed transition-colors">{s.desc}</p>
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
};

const AboutPreview = () => (
  <section className="py-24 bg-earth-900 text-white overflow-hidden relative">
    <div className="absolute top-0 right-0 w-1/2 h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5 pointer-events-none"></div>

    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col lg:flex-row items-center gap-16">
        <RevealOnScroll>
          <div className="relative">
            <div className="absolute -top-6 -left-6 w-full h-full border border-gold-500/30 z-0"></div>
            <img
              src="https://images.unsplash.com/photo-1714392528529-f306b48ef731?q=80&w=764&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Landscape Architect"
              className="relative z-10 w-full max-w-lg h-[600px] object-cover shadow-2xl"
            />
            <div className="absolute -bottom-10 -right-10 bg-white text-earth-900 p-8 shadow-xl max-w-xs hidden lg:block z-20">
              <p className="font-serif text-2xl italic">"Nature is not a place to visit. It is home."</p>
              <p className="text-right mt-4 font-bold text-gold-600 text-sm tracking-widest">— GARY SNYDER</p>
            </div>
          </div>
        </RevealOnScroll>

        <div className="lg:w-1/2 space-y-8">
          <RevealOnScroll delay={200}>
            <span className="text-gold-500 font-bold tracking-[0.2em] text-xs uppercase">Our Philosophy</span>
            <h2 className="text-4xl md:text-5xl font-serif mt-4 leading-tight">We create spaces that <span className="text-gold-500 italic">breathe</span></h2>

            <p className="text-gray-300 text-lg font-light leading-relaxed mt-6">
              Since 2010, Durande Shop has been at the forefront of sustainable landscape design in Switzerland. We harmonize architectural rigor with organic fluidity.
            </p>

            {/* Owner Section */}
            <div className="flex items-center gap-6 p-6 bg-white/5 border border-white/10 rounded-sm mt-8 backdrop-blur-sm hover:bg-white/10 transition-colors">
              <img
                src="https://scontent.ftun16-1.fna.fbcdn.net/v/t39.30808-6/582530395_122222963936118882_3843968844078073111_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=3gIg5Lu23TUQ7kNvwFHGt0c&_nc_oc=AdmChd4aeNzFud3-poSnzG833AUswi5OBY6katrWUaxw7E5lRRBXed55lVi4nQR2zkY&_nc_zt=23&_nc_ht=scontent.ftun16-1.fna&_nc_gid=LkTUO5WcMlLNWjxxyI8TAA&oh=00_AfgvmS_-HH-FL51zAoVRo8EWYKs6Pgd5YbMmPLSLUtAXZQ&oe=692A1440" /* Placeholder for owner's image */
                alt="Founder"
                className="w-24 h-24 rounded-full object-cover border-2 border-gold-500 shadow-md"
              />
              <div>
                <h4 className="text-xl font-serif text-white">Durande</h4>
                <p className="text-gold-500 text-xs font-bold uppercase tracking-widest mb-2">Founder & Lead Architect</p>
                <p className="text-gray-400 text-xs italic">"Designing with nature, not against it."</p>
              </div>
            </div>

            <div className="space-y-6 mt-8">
              {[
                { title: "Sustainable Design", desc: "Eco-friendly materials and drought-tolerant planting." },
                { title: "Modern Technology", desc: "Smart irrigation systems and automated lighting." },
                { title: "Bespoke Solutions", desc: "Every project is unique to the client's vision." }
              ].map((item, i) => (
                <div key={i} className="flex">
                  <div className="mt-1 mr-4 text-gold-500 shrink-0"><CheckCircle size={24} /></div>
                  <div>
                    <h4 className="text-white font-bold font-serif">{item.title}</h4>
                    <p className="text-gray-400 text-sm mt-1">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-8">
              <Link to={NavigationLinks.ABOUT} className="inline-flex items-center text-gold-500 hover:text-white uppercase tracking-widest font-bold text-sm transition-colors border-b border-gold-500 pb-1 hover:border-white">
                Read our full story <ArrowRight className="ml-2" size={16} />
              </Link>
            </div>
          </RevealOnScroll>
        </div>
      </div>
    </div>
  </section>
);

const ProjectsGallery = () => {
  const [images] = useState<ProjectImage[]>([
    { id: '1', url: 'https://images.squarespace-cdn.com/content/v1/5fd3d528706a437badc5dedb/1616013380923-3LRI9CFMZ9RRZUDCL4UJ/landscape-for-new-home.jpg?format=750w', title: 'Hidden Gems of the Drought-Resistant Plant World' },
    { id: '2', url: 'https://scontent.ftun16-1.fna.fbcdn.net/v/t1.15752-9/586230306_881523767649672_6052646511705830062_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=9f807c&_nc_ohc=Ajnu5uSvUzUQ7kNvwHAmWt1&_nc_oc=Adn3G8qlClji1B_MbOF8U2U6CAVt0Bvuu8sg4pa6NzxiBrCUWB6XR65HNQyh0sG9go8&_nc_zt=23&_nc_ht=scontent.ftun16-1.fna&oh=03_Q7cD3wFDD-LlZwGhuqUaeRvCKl01jXaeAadRGZBRxbRsFTs1og&oe=694BA9D8', title: ' Garden Retreat' },
    { id: '3', url: 'https://images.squarespace-cdn.com/content/v1/5fd3d528706a437badc5dedb/1671226425841-G6QVMVWJ59CEBQTGUG21/landscaping.jpg?format=1000w', title: 'Stone Pathway Design' },
    { id: '4', url: 'https://images.unsplash.com/photo-1746343365806-29570de127d4?q=80&w=1030&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', title: 'The Art of Outside' },
    { id: '5', url: 'https://images.unsplash.com/photo-1723616769351-55d582e22eaa?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', title: 'Your Personal Park' },
    { id: '6', url: 'https://plus.unsplash.com/premium_photo-1678286769656-009c133e6f89?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', title: 'Garden Dream' },
  ]);

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <RevealOnScroll>
          <SectionTitle subtitle="Our Portfolio" title="Recent Projects & Concepts" />
        </RevealOnScroll>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-1 mt-12">
          {images.map((img, index) => (
            <RevealOnScroll key={img.id} delay={index * 50}>
              <div className="group relative overflow-hidden aspect-[4/3] cursor-pointer">
                <img
                  src={img.url}
                  alt={img.title}
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-earth-900/70 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col items-center justify-center p-6 text-center">
                  <span className="text-gold-500 text-xs tracking-widest uppercase mb-2">
                    Realized Project
                  </span>
                  <h4 className="text-2xl font-serif text-white mb-4 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">{img.title}</h4>
                  <button className="text-white border-b border-white pb-1 hover:text-gold-500 hover:border-gold-500 transition-colors text-sm uppercase tracking-widest">
                    View Details
                  </button>
                </div>
              </div>
            </RevealOnScroll>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link to={NavigationLinks.PROJECTS} className="inline-block px-10 py-4 border-2 border-earth-900 text-earth-900 font-bold uppercase tracking-widest hover:bg-earth-900 hover:text-white transition-colors">
            View Full Gallery
          </Link>
        </div>
      </div>
    </section>
  );
};

const Testimonials = () => (
  <section className="py-24 bg-stone-100">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <RevealOnScroll>
        <SectionTitle subtitle="Testimonials" title="Client Stories" />
      </RevealOnScroll>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[
          { name: "Sarah Mueller", loc: "Zurich", text: "We hired Darnios Erdvės to transform our sloping backyard. The result exceeded our expectations. The team was professional, clean, and the design is simply breathtaking." },
          { name: "Thomas Weber", loc: "Geneva", text: "Their conceptualization process helped us visualize exactly what we wanted before a single stone was laid. Truly modern approach to landscaping." },
          { name: "Elena Rossi", loc: "Lugano", text: "Maintenance services are top notch. Our garden looks pristine in every season. Highly recommended for anyone wanting luxury outdoor spaces." }
        ].map((t, i) => (
          <RevealOnScroll key={i} delay={i * 100}>
            <div className="bg-white p-10 shadow-lg border-t-4 border-gold-500 relative h-full flex flex-col">
              <Quote className="text-gold-200 w-12 h-12 mb-6" />
              <p className="text-gray-600 italic mb-8 leading-relaxed flex-grow">"{t.text}"</p>
              <div className="flex items-center border-t border-gray-100 pt-6">
                <div className="w-10 h-10 bg-earth-900 rounded-full flex items-center justify-center text-white font-serif font-bold text-lg mr-4">
                  {t.name[0]}
                </div>
                <div>
                  <div className="font-bold text-earth-900 font-serif">{t.name}</div>
                  <div className="text-xs text-gold-600 uppercase tracking-wider">{t.loc}</div>
                </div>
                <div className="ml-auto flex text-gold-500">
                  {[...Array(5)].map((_, j) => <Star key={j} size={14} fill="currentColor" />)}
                </div>
              </div>
            </div>
          </RevealOnScroll>
        ))}
      </div>
    </div>
  </section>
);

const InteractiveMap = () => (
  <div className="w-full h-[500px] relative group">
    <iframe
      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d86524.25396075909!2d8.47638469082454!3d47.37736367958597!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47900b9749bea219%3A0xe66e8df1e71fdc03!2sZurich%2C%20Switzerland!5e0!3m2!1sen!2sus!4v1715260000000!5m2!1sen!2sus"
      width="100%"
      height="100%"
      style={{ border: 0 }}
      allowFullScreen
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
      title="Office Location in Switzerland"
      className="transition-all duration-700"
    ></iframe>

    {/* Overlay Card */}
    <div className="absolute top-10 left-10 md:top-20 md:left-20 bg-white p-8 shadow-2xl max-w-sm z-10 border-l-4 border-gold-500">
      <h3 className="text-2xl font-serif text-earth-900 mb-2">Visit Our Studio</h3>
      <p className="text-gray-600 mb-6">Come meet our designers and see material samples in person.</p>
      <div className="space-y-4">
        <div className="flex items-start">
          <MapPin className="text-gold-500 mt-1 mr-3 shrink-0" size={20} />
          <span className="text-earth-900">Bahnhofstrasse 15,<br />8001 Zürich, Switzerland</span>
        </div>
        <div className="flex items-center">
          <Clock className="text-gold-500 mr-3 shrink-0" size={20} />
          <span className="text-earth-900">Mon-Fri: 09:00 - 18:00</span>
        </div>
      </div>
    </div>
  </div>
);

// --- Page Layouts ---

const PageHeader: React.FC<{ title: string; subtitle: string; image: string }> = ({ title, subtitle, image }) => (
  <div className="relative h-[50vh] min-h-[400px] w-full overflow-hidden flex items-center justify-center">
    <div
      className="absolute inset-0 bg-cover bg-center"
      style={{ backgroundImage: `url("${image}")` }}
    >
      <div className="absolute inset-0 bg-black/50"></div>
    </div>
    <div className="relative z-10 text-center px-4">
      <span className="block text-gold-500 font-bold tracking-[0.3em] uppercase text-sm mb-4 animate-[fadeInUp_0.8s_ease-out_forwards]">{subtitle}</span>
      <h1 className="text-5xl md:text-7xl font-serif text-white mb-6 animate-[fadeInUp_1s_ease-out_forwards]">{title}</h1>
    </div>
  </div>
);

const HomePage = () => (
  <>
    <Hero />
    <ServicesSection />
    <AboutPreview />
    <ProjectsGallery />
    <Testimonials />
    <InteractiveMap />
  </>
);

const ServicesPage = () => (
  <>
    <PageHeader
      title="Our Services"
      subtitle="Expertise & Dedication"
      image="https://images.unsplash.com/photo-1557429287-b2e26467fc2b?q=80&w=2000&auto=format&fit=crop"
    />
    <ServicesSection />
    <section className="py-20 bg-earth-900 text-center text-white">
      <div className="max-w-4xl mx-auto px-4">
        <h2 className="text-3xl font-serif mb-6">Need a Custom Maintenance Plan?</h2>
        <p className="text-gray-300 mb-8">We offer tailored solutions for estates, corporate campuses, and private residences.</p>
        <Link to={NavigationLinks.CONTACT} className="inline-block px-8 py-3 border border-gold-500 text-gold-500 hover:bg-gold-500 hover:text-earth-900 transition-colors uppercase tracking-widest font-bold">
          Request Proposal
        </Link>
      </div>
    </section>
    <Testimonials />
  </>
);

const ProjectsPage = () => (
  <>
    <PageHeader
      title="Portfolio"
      subtitle="Curated Excellence"
      image="https://images.unsplash.com/photo-1557429287-b2e26467fc2b?q=80&w=2000&auto=format&fit=crop"
    />
    <ProjectsGallery />
    <div className="bg-stone-50 pb-20">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <p className="text-gray-500 italic">Displaying selection of works from 2020-2024</p>
      </div>
    </div>
  </>
);

const AboutPage = () => (
  <>
    <PageHeader
      title="About Us"
      subtitle="Our Legacy"
      image="https://images.unsplash.com/photo-1557429287-b2e26467fc2b?q=80&w=2000&auto=format&fit=crop"
    />
    <section className="py-24 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="prose prose-lg prose-stone mx-auto">
          {/* Owner Image Block */}
          <div className="flex flex-col items-center mb-12">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-gold-400 to-earth-800 rounded-full blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
              <img
                src="https://scontent.ftun16-1.fna.fbcdn.net/v/t39.30808-6/582530395_122222963936118882_3843968844078073111_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=3gIg5Lu23TUQ7kNvwFHGt0c&_nc_oc=AdmChd4aeNzFud3-poSnzG833AUswi5OBY6katrWUaxw7E5lRRBXed55lVi4nQR2zkY&_nc_zt=23&_nc_ht=scontent.ftun16-1.fna&_nc_gid=LkTUO5WcMlLNWjxxyI8TAA&oh=00_AfgvmS_-HH-FL51zAoVRo8EWYKs6Pgd5YbMmPLSLUtAXZQ&oe=692A1440"
                alt="Owner"
                className="relative w-48 h-48 rounded-full object-cover border-4 border-white shadow-2xl"
              />
            </div>
            <div className="mt-6 text-center">
              <h4 className="text-2xl font-serif text-earth-900">Lukas Durande</h4>
              <p className="text-gold-500 text-sm font-bold uppercase tracking-widest">Founder & Landscape Architect</p>
            </div>
          </div>

          <h3 className="text-3xl font-serif text-earth-900 mb-6 text-center">Cultivating Beauty Since 2010</h3>
          <p className="leading-loose text-gray-600 mb-6">
            Durande Shop began with a simple mission: to reconnect people with nature in their own backyards. What started as a small two-person team in Zürich has grown into one of Switzerland's premier landscape architecture firms.
          </p>
          <p className="leading-loose text-gray-600 mb-6">
            We believe that a garden is not just a collection of plants, but a living extension of the home—a place for rest, for play, and for inspiration. Our team of architects, horticulturists, and craftsmen work in unison to deliver projects that stand the test of time.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-12 text-center border-y border-gray-200 my-12">
            <div>
              <span className="block text-4xl font-serif text-gold-500 mb-2">14+</span>
              <span className="text-xs uppercase tracking-widest text-gray-500">Years Experience</span>
            </div>
            <div>
              <span className="block text-4xl font-serif text-gold-500 mb-2">250+</span>
              <span className="text-xs uppercase tracking-widest text-gray-500">Projects Completed</span>
            </div>
            <div>
              <span className="block text-4xl font-serif text-gold-500 mb-2">18</span>
              <span className="text-xs uppercase tracking-widest text-gray-500">Awards Won</span>
            </div>
            <div>
              <span className="block text-4xl font-serif text-gold-500 mb-2">100%</span>
              <span className="text-xs uppercase tracking-widest text-gray-500">Client Satisfaction</span>
            </div>
          </div>
        </div>
      </div>
    </section>
    <InteractiveMap />
  </>
);

const ContactPage = () => (
  <>
    <PageHeader
      title="Contact Us"
      subtitle="Let's Talk"
      image="https://images.unsplash.com/photo-1558635924-f555998d5819?q=80&w=2000&auto=format&fit=crop"
    />
    <InteractiveMap />
  </>
);

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const App: React.FC = () => {
  return (
    <Router>
      <ScrollToTop />
      <div className="flex flex-col min-h-screen font-sans text-earth-900 selection:bg-gold-500 selection:text-white bg-stone-50">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path={NavigationLinks.HOME} element={<HomePage />} />
            <Route path={NavigationLinks.SERVICES} element={<ServicesPage />} />
            <Route path={NavigationLinks.PROJECTS} element={<ProjectsPage />} />
            <Route path={NavigationLinks.ABOUT} element={<AboutPage />} />
            <Route path={NavigationLinks.CONTACT} element={<ContactPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;