"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform, useInView, AnimatePresence } from "framer-motion";
import { useSession, signIn } from "next-auth/react";
import {
  Crown, Sparkles, ArrowRight, CheckCircle, Star, Zap, Shield, Users,
  Palette, BarChart3, Heart, Menu, X, Target, Rocket
} from "lucide-react";
import Link from "next/link";

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 60 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] } }
};

const staggerChildren = {
  visible: { transition: { staggerChildren: 0.2 } }
};

const floatingAnimation = {
  y: [-10, 10, -10],
  transition: { duration: 6, repeat: Infinity, ease: "easeInOut" }
};

// Custom counter hook
const useAnimatedCounter = (end: number) => {
  const [count, setCount] = useState(0);
  const countRef = useRef<HTMLElement>(null);
  const isInView = useInView(countRef);

  useEffect(() => {
    if (!isInView) return;
    let startTime: number;
    const updateCount = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / 2000, 1);
      setCount(Math.floor(end * progress));
      if (progress < 1) requestAnimationFrame(updateCount);
    };
    requestAnimationFrame(updateCount);
  }, [end, isInView]);

  return { count, ref: countRef };
};

// Components
const AnimatedText = ({ children, delay = 0 }: { children: string; delay?: number }) => {
  const letters = children.split("");
  return (
    <motion.span initial="hidden" animate="visible">
      {letters.map((letter, i) => (
        <motion.span
          key={i}
          variants={{
            hidden: { opacity: 0, y: 50 },
            visible: { opacity: 1, y: 0, transition: { delay: delay + i * 0.05, duration: 0.6 } }
          }}
        >
          {letter === " " ? "\u00A0" : letter}
        </motion.span>
      ))}
    </motion.span>
  );
};

const StatsCounter = ({ end, label, suffix = "" }: { end: number; label: string; suffix?: string }) => {
  const { count, ref } = useAnimatedCounter(end);
  return (
    <motion.div
      ref={ref}
      className="text-center"
      variants={fadeInUp}
      whileHover={{ scale: 1.05 }}
    >
      <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-2">
        {count.toLocaleString()}{suffix}
      </div>
      <p className="text-gray-400 text-lg">{label}</p>
    </motion.div>
  );
};

const FeatureCard = ({ icon: Icon, title, description }: { icon: any; title: string; description: string }) => {
  return (
    <motion.div
      className="group bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 hover:border-white/20 transition-all duration-500"
      variants={fadeInUp}
      whileHover={{ y: -10, scale: 1.02 }}
    >
      <motion.div
        className="bg-gradient-to-r from-blue-500 to-purple-600 p-4 rounded-xl w-fit mb-6 group-hover:shadow-lg group-hover:shadow-purple-500/25"
        whileHover={{ rotate: 5, scale: 1.1 }}
      >
        <Icon className="h-8 w-8 text-white" />
      </motion.div>
      <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-blue-400 transition-colors">
        {title}
      </h3>
      <p className="text-gray-300 text-lg leading-relaxed">{description}</p>
    </motion.div>
  );
};

const TestimonialCard = ({ testimonial, isActive }: { testimonial: any; isActive: boolean }) => {
  return (
    <AnimatePresence mode="wait">
      {isActive && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8, rotateY: -15 }}
          animate={{ opacity: 1, scale: 1, rotateY: 0 }}
          exit={{ opacity: 0, scale: 0.8, rotateY: 15 }}
          transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 rounded-3xl p-8 text-center max-w-2xl mx-auto"
        >
          <motion.div className="flex justify-center mb-6" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.2 }}>
            {[...Array(testimonial.rating)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, rotate: -180 }}
                animate={{ opacity: 1, rotate: 0 }}
                transition={{ delay: 0.3 + i * 0.1 }}
              >
                <Star className="h-6 w-6 text-yellow-400 fill-current" />
              </motion.div>
            ))}
          </motion.div>

          <motion.blockquote
            className="text-2xl md:text-3xl text-white mb-8 leading-relaxed font-light"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            "{testimonial.content}"
          </motion.blockquote>

          <motion.div
            className="flex items-center justify-center space-x-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            <div className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-xl shadow-lg">
              {testimonial.name.charAt(0)}
            </div>
            <div className="text-left">
              <div className="text-white font-semibold text-xl">{testimonial.name}</div>
              <div className="text-gray-400 text-lg">{testimonial.role}</div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default function LandingPage() {
  const { data: session, status } = useSession();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef });
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.8]);

  const testimonials = [
    {
      name: "Marie Dubois",
      role: "Marketing Manager chez Airbnb",
      content: "NICE-CV m'a permis de décrocher mon poste de rêve ! L'interface est si intuitive et les templates sont magnifiques.",
      rating: 5,
    },
    {
      name: "Jean Martin",
      role: "Lead Developer chez Spotify",
      content: "En tant que développeur, j'apprécie la qualité du code et l'UX exceptionnelle. Les animations sont parfaites !",
      rating: 5,
    },
    {
      name: "Sophie Laurent",
      role: "UX Designer chez Figma",
      content: "Les templates premium sont d'un niveau professionnel impressionnant. Ça vaut vraiment chaque centime !",
      rating: 5,
    },
  ];

  const features = [
    {
      icon: Palette,
      title: "Design Premium",
      description: "Des templates exclusifs créés par des designers de renom, inspirés des meilleures pratiques UX/UI modernes.",
    },
    {
      icon: Zap,
      title: "Export Ultra-Rapide",
      description: "Génération PDF haute qualité en moins de 2 secondes grâce à notre technologie d'optimisation avancée.",
    },
    {
      icon: Shield,
      title: "Sécurité Maximale",
      description: "Chiffrement end-to-end, conformité RGPD et protection des données avec les standards militaires.",
    },
    {
      icon: BarChart3,
      title: "Analytics Avancés",
      description: "Suivez les performances de vos CV avec des métriques détaillées et des insights d'amélioration.",
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [testimonials.length]);

  const handleGetStarted = () => {
    if (session) {
      window.location.href = "/dashboard";
    } else {
      signIn();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-20 left-10 w-20 h-20 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full blur-xl"
          animate={floatingAnimation}
        />
        <motion.div
          className="absolute top-40 right-20 w-32 h-32 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full blur-2xl"
          animate={{ ...floatingAnimation, transition: { ...floatingAnimation.transition, delay: 2 } }}
        />
        <motion.div
          className="absolute bottom-20 left-1/4 w-16 h-16 border-2 border-blue-400/30 rounded-lg"
          animate={{ rotate: [0, 360] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />
      </div>

      {/* Navigation */}
      <motion.nav
        className="fixed w-full top-0 z-40 bg-black/10 backdrop-blur-2xl border-b border-white/5"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <motion.div className="flex items-center" whileHover={{ scale: 1.05 }}>
              <motion.div
                className="bg-gradient-to-r from-blue-500 to-purple-600 p-3 rounded-2xl shadow-lg shadow-purple-500/25"
                whileHover={{ rotate: 5, scale: 1.1 }}
              >
                <Crown className="h-7 w-7 text-white" />
              </motion.div>
              <span className="ml-4 text-2xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                NICE-CV
              </span>
            </motion.div>

            <div className="hidden md:flex items-center space-x-8">
              {["Fonctionnalités", "Tarifs", "Témoignages"].map((item, index) => (
                <motion.a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="text-gray-300 hover:text-white px-4 py-2 text-lg font-medium transition-all duration-300 relative group"
                  whileHover={{ scale: 1.05 }}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + index * 0.1 }}
                >
                  {item}
                  <motion.div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
                </motion.a>
              ))}
            </div>

            <motion.div className="hidden md:flex items-center space-x-4">
              {status === "loading" ? (
                <motion.div className="animate-pulse bg-gradient-to-r from-gray-700 to-gray-600 h-12 w-32 rounded-xl" />
              ) : session ? (
                <motion.div whileHover={{ scale: 1.05 }}>
                  <Link href="/dashboard" className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-4 rounded-xl font-semibold text-lg shadow-lg shadow-purple-500/25 hover:shadow-xl hover:shadow-purple-500/40 transition-all duration-300">
                    Dashboard
                  </Link>
                </motion.div>
              ) : (
                <motion.div className="flex items-center space-x-4">
                  <motion.button
                    onClick={() => signIn()}
                    className="text-gray-300 hover:text-white px-6 py-3 text-lg font-medium transition-colors"
                    whileHover={{ scale: 1.05 }}
                  >
                    Connexion
                  </motion.button>
                  <motion.button
                    onClick={() => signIn()}
                    className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-4 rounded-xl font-semibold text-lg shadow-lg shadow-purple-500/25 hover:shadow-xl hover:shadow-purple-500/40 transition-all duration-300 flex items-center group"
                    whileHover={{ scale: 1.05, y: -2 }}
                  >
                    Inscription gratuite
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </motion.button>
                </motion.div>
              )}
            </motion.div>

            <div className="md:hidden">
              <motion.button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-gray-300 hover:text-white p-3 rounded-xl hover:bg-white/10 transition-all"
                whileHover={{ scale: 1.05 }}
              >
                <AnimatePresence mode="wait">
                  {isMenuOpen ? (
                    <motion.div
                      key="close"
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                    >
                      <X className="h-6 w-6" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="menu"
                      initial={{ rotate: 90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: -90, opacity: 0 }}
                    >
                      <Menu className="h-6 w-6" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>
            </div>
          </div>
        </div>

        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              className="md:hidden bg-black/80 backdrop-blur-2xl border-t border-white/10"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
            >
              <div className="px-4 py-6 space-y-4">
                <button
                  onClick={handleGetStarted}
                  className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-4 rounded-xl font-semibold text-lg"
                >
                  Commencer gratuitement
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Hero Section */}
      <motion.section
        ref={heroRef}
        className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 min-h-screen flex items-center relative"
        style={{ opacity, scale }}
      >
        <div className="max-w-7xl mx-auto w-full">
          <motion.div className="text-center" variants={staggerChildren} initial="hidden" animate="visible">
            <motion.div
              className="inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-purple-500/20 to-blue-500/20 border border-purple-500/30 text-purple-200 mb-8 backdrop-blur-xl"
              variants={fadeInUp}
              whileHover={{ scale: 1.05, y: -2 }}
            >
              <Sparkles className="h-5 w-5 mr-3 animate-pulse" />
              <span className="text-sm md:text-base font-medium">
                ✨ Nouveau : Templates Premium disponibles !
              </span>
            </motion.div>

            <div className="mb-8">
              <motion.h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-6 leading-tight" variants={fadeInUp}>
                Créez des CV
                <br />
                <span className="relative">
                  <AnimatedText delay={0.5}>exceptionnels</AnimatedText>
                  <motion.div
                    className="absolute -inset-2 bg-gradient-to-r from-blue-400/20 via-purple-400/20 to-pink-400/20 rounded-2xl blur-2xl -z-10"
                    animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0.8, 0.5] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  />
                </span>
              </motion.h1>
            </div>

            <motion.p className="text-xl md:text-3xl text-gray-300 mb-12 max-w-5xl mx-auto leading-relaxed" variants={fadeInUp}>
              Démarquez-vous avec des CV professionnels créés par des designers de renom.
              <br className="hidden md:block" />
              <motion.strong
                className="text-white bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent"
                animate={{ opacity: [0.8, 1, 0.8] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                3 CV gratuits
              </motion.strong>
              , puis accès premium pour des designs exclusifs.
            </motion.p>

            <motion.div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16" variants={fadeInUp}>
              <motion.button
                onClick={handleGetStarted}
                className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-12 py-5 rounded-2xl font-semibold text-xl shadow-2xl shadow-purple-500/25 flex items-center group relative overflow-hidden"
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="relative z-10 flex items-center">
                  Commencer gratuitement
                  <ArrowRight className="ml-3 h-6 w-6 group-hover:translate-x-2 transition-transform" />
                </span>
              </motion.button>

              <motion.div className="flex items-center text-gray-300 text-lg" whileHover={{ scale: 1.05 }}>
                <CheckCircle className="h-6 w-6 text-green-400 mr-3" />
                <span>Aucune carte de crédit requise</span>
              </motion.div>
            </motion.div>

            <motion.div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-4xl mx-auto" variants={staggerChildren}>
              <StatsCounter end={50} label="CV créés" suffix="K+" />
              <StatsCounter end={98} label="Taux de satisfaction" suffix="%" />
              <StatsCounter end={24} label="Support client" suffix="/7" />
            </motion.div>
          </motion.div>
        </div>

        <motion.div
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
            <motion.div
              className="w-1 h-3 bg-white/60 rounded-full mt-2"
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </div>
        </motion.div>
      </motion.section>

      {/* Features Section */}
      <motion.section
        id="fonctionnalités"
        className="py-32 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-black/20 to-transparent relative"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        <div className="max-w-7xl mx-auto">
          <motion.div className="text-center mb-20" variants={staggerChildren}>
            <motion.h2 className="text-4xl md:text-6xl font-bold text-white mb-8" variants={fadeInUp}>
              Pourquoi choisir{" "}
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                NICE-CV
              </span>{" "}
              ?
            </motion.h2>
            <motion.p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed" variants={fadeInUp}>
              Une plateforme révolutionnaire pour créer des CV qui captivent et convertissent
            </motion.p>
          </motion.div>

          <motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8" variants={staggerChildren}>
            {features.map((feature, index) => (
              <FeatureCard key={index} icon={feature.icon} title={feature.title} description={feature.description} />
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* Pricing Section */}
      <motion.section
        id="tarifs"
        className="py-32 px-4 sm:px-6 lg:px-8 relative"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        <div className="max-w-7xl mx-auto">
          <motion.div className="text-center mb-20" variants={staggerChildren}>
            <motion.h2 className="text-4xl md:text-6xl font-bold text-white mb-8" variants={fadeInUp}>
              Tarifs{" "}
              <span className="bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
                simples
              </span>{" "}
              et transparents
            </motion.h2>
            <motion.p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed" variants={fadeInUp}>
              Commencez gratuitement, évoluez vers le premium quand vous êtes prêt
            </motion.p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
            {/* Free Plan */}
            <motion.div
              className="relative bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-xl border border-white/10 rounded-3xl p-10 group hover:border-white/20"
              variants={fadeInUp}
              whileHover={{ y: -10, scale: 1.02 }}
            >
              <div className="text-center mb-10">
                <motion.div className="inline-flex items-center px-4 py-2 rounded-full bg-gray-500/20 text-gray-300 mb-4" whileHover={{ scale: 1.05 }}>
                  <Target className="h-4 w-4 mr-2" />
                  <span className="text-sm font-medium">Plan Découverte</span>
                </motion.div>
                <h3 className="text-3xl font-bold text-white mb-4">Gratuit</h3>
                <div className="text-5xl font-bold text-white mb-4">
                  0€<span className="text-xl text-gray-400 font-normal">/toujours</span>
                </div>
                <p className="text-gray-400 text-lg">Parfait pour commencer</p>
              </div>

              <ul className="space-y-4 mb-10">
                {["3 CV maximum", "Templates de base", "Export PDF standard", "Support par email", "Sauvegarde cloud"].map((feature, index) => (
                  <motion.li
                    key={index}
                    className="flex items-center text-gray-300 text-lg"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <CheckCircle className="h-6 w-6 text-green-400 mr-4 flex-shrink-0" />
                    {feature}
                  </motion.li>
                ))}
              </ul>

              <motion.button
                onClick={handleGetStarted}
                className="w-full bg-gradient-to-r from-gray-600 to-gray-500 text-white py-4 rounded-2xl font-semibold text-lg hover:from-gray-500 hover:to-gray-400 transition-all duration-300"
                whileHover={{ scale: 1.02 }}
              >
                Commencer gratuitement
              </motion.button>
            </motion.div>

            {/* Premium Plan */}
            <motion.div
              className="relative bg-gradient-to-br from-blue-500/20 to-purple-600/20 backdrop-blur-xl border border-blue-500/30 rounded-3xl p-10 group hover:border-blue-400/50 shadow-2xl shadow-purple-500/20"
              variants={fadeInUp}
              whileHover={{ y: -10, scale: 1.02 }}
            >
              <motion.div
                className="absolute -top-6 left-1/2 transform -translate-x-1/2"
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <span className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-2 rounded-full text-sm font-semibold flex items-center shadow-lg">
                  <Crown className="h-4 w-4 mr-2" />
                  ⭐ Le plus populaire
                </span>
              </motion.div>

              <div className="pt-4">
                <div className="text-center mb-10">
                  <motion.div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-blue-300 mb-4" whileHover={{ scale: 1.05 }}>
                    <Rocket className="h-4 w-4 mr-2" />
                    <span className="text-sm font-medium">Plan Professionnel</span>
                  </motion.div>
                  <h3 className="text-3xl font-bold text-white mb-4">Premium</h3>
                  <div className="text-5xl font-bold text-white mb-4">
                    5€<span className="text-xl text-gray-400 font-normal">/pack</span>
                  </div>
                  <p className="text-gray-400 text-lg">10 CV supplémentaires + fonctionnalités premium</p>
                </div>

                <ul className="space-y-4 mb-10">
                  {[
                    "10 CV supplémentaires (13 au total)",
                    "Templates premium exclusifs",
                    "Personnalisation avancée",
                    "Export PDF haute qualité",
                    "Analytics de performance",
                    "Support prioritaire 24/7"
                  ].map((feature, index) => (
                    <motion.li
                      key={index}
                      className="flex items-center text-gray-300 text-lg"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <CheckCircle className="h-6 w-6 text-green-400 mr-4 flex-shrink-0" />
                      {feature}
                    </motion.li>
                  ))}
                </ul>
