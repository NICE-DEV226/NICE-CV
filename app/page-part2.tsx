300 max-w-4xl mx-auto leading-relaxed"
              variants={fadeInUp}
            >
              Une plateforme révolutionnaire pour créer des CV qui captivent et convertissent
            </motion.p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
            variants={staggerChildren}
          >
            {features.map((feature, index) => (
              <FeatureCard
                key={index}
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
                delay={index * 0.1}
              />
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
            <motion.h2
              className="text-4xl md:text-6xl font-bold text-white mb-8"
              variants={fadeInUp}
            >
              Tarifs{" "}
              <span className="bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
                simples
              </span>{" "}
              et transparents
            </motion.h2>
            <motion.p
              className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed"
              variants={fadeInUp}
            >
              Commencez gratuitement, évoluez vers le premium quand vous êtes prêt
            </motion.p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
            {/* Free Plan */}
            <motion.div
              className="relative bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-xl border border-white/10 rounded-3xl p-10 group hover:border-white/20"
              variants={fadeInLeft}
              whileHover={{ y: -10, scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-gray-500/10 to-gray-400/10 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              />

              <div className="relative z-10">
                <div className="text-center mb-10">
                  <motion.div
                    className="inline-flex items-center px-4 py-2 rounded-full bg-gray-500/20 text-gray-300 mb-4"
                    whileHover={{ scale: 1.05 }}
                  >
                    <Target className="h-4 w-4 mr-2" />
                    <span className="text-sm font-medium">Plan Découverte</span>
                  </motion.div>
                  <h3 className="text-3xl font-bold text-white mb-4">Gratuit</h3>
                  <div className="text-5xl font-bold text-white mb-4">
                    0€
                    <span className="text-xl text-gray-400 font-normal">/toujours</span>
                  </div>
                  <p className="text-gray-400 text-lg">Parfait pour commencer</p>
                </div>

                <ul className="space-y-4 mb-10">
                  {[
                    "3 CV maximum",
                    "Templates de base",
                    "Export PDF standard",
                    "Support par email",
                    "Sauvegarde cloud"
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

                <motion.button
                  onClick={handleGetStarted}
                  className="w-full bg-gradient-to-r from-gray-600 to-gray-500 text-white py-4 rounded-2xl font-semibold text-lg hover:from-gray-500 hover:to-gray-400 transition-all duration-300"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Commencer gratuitement
                </motion.button>
              </div>
            </motion.div>

            {/* Premium Plan */}
            <motion.div
              className="relative bg-gradient-to-br from-blue-500/20 to-purple-600/20 backdrop-blur-xl border border-blue-500/30 rounded-3xl p-10 group hover:border-blue-400/50 shadow-2xl shadow-purple-500/20"
              variants={fadeInRight}
              whileHover={{ y: -10, scale: 1.02 }}
              transition={{ duration: 0.3 }}
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

              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              />

              <div className="relative z-10 pt-4">
                <div className="text-center mb-10">
                  <motion.div
                    className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-blue-300 mb-4"
                    whileHover={{ scale: 1.05 }}
                  >
                    <Rocket className="h-4 w-4 mr-2" />
                    <span className="text-sm font-medium">Plan Professionnel</span>
                  </motion.div>
                  <h3 className="text-3xl font-bold text-white mb-4">Premium</h3>
                  <div className="text-5xl font-bold text-white mb-4">
                    5€
                    <span className="text-xl text-gray-400 font-normal">/pack</span>
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
                    "Support prioritaire 24/7",
                    "Accès aux nouveautés en avant-première"
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

                <motion.button
                  onClick={handleGetStarted}
                  className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-4 rounded-2xl font-semibold text-lg shadow-xl shadow-purple-500/25 hover:shadow-2xl hover:shadow-purple-500/40 transition-all duration-300 relative overflow-hidden group"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  />
                  <span className="relative z-10 flex items-center justify-center">
                    <Crown className="mr-2 h-5 w-5" />
                    Passer à Premium
                  </span>
                </motion.button>

                <motion.p
                  className="text-center text-gray-400 text-sm mt-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1 }}
                >
                  💳 Paiement sécurisé par Stripe
                </motion.p>
              </div>
            </motion.div>
          </div>

          <motion.div
            className="text-center mt-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <p className="text-gray-400 text-lg">
              💡 <strong className="text-white">Astuce Pro :</strong> Commencez gratuitement, testez nos fonctionnalités, puis passez au premium quand vous êtes convaincu !
            </p>
          </motion.div>
        </div>
      </motion.section>

      {/* Testimonials Section */}
      <motion.section
        id="témoignages"
        className="py-32 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-black/20 to-transparent relative"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        <div className="max-w-7xl mx-auto">
          <motion.div className="text-center mb-20" variants={staggerChildren}>
            <motion.h2
              className="text-4xl md:text-6xl font-bold text-white mb-8"
              variants={fadeInUp}
            >
              Ils nous font{" "}
              <span className="bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
                confiance
              </span>
            </motion.h2>

            <motion.div
              className="flex justify-center items-center space-x-2 mb-6"
              variants={fadeInUp}
            >
              <div className="flex space-x-1">
                {[...Array(5)].map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, rotate: -180 }}
                    animate={{ opacity: 1, rotate: 0 }}
                    transition={{ delay: i * 0.1, duration: 0.4 }}
                  >
                    <Star className="h-8 w-8 text-yellow-400 fill-current" />
                  </motion.div>
                ))}
              </div>
              <motion.span
                className="text-white text-2xl font-bold ml-4"
                animate={{ opacity: [0.8, 1, 0.8] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                4.9/5
              </motion.span>
            </motion.div>

            <motion.p
              className="text-gray-400 text-xl"
              variants={fadeInUp}
            >
              Plus de 1,247 avis clients authentiques
            </motion.p>
          </motion.div>

          <div className="max-w-4xl mx-auto relative">
            {testimonials.map((testimonial, index) => (
              <TestimonialCard
                key={index}
                testimonial={testimonial}
                isActive={index === currentTestimonial}
              />
            ))}

            <motion.div
              className="flex justify-center space-x-3 mt-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              {testimonials.map((_, index) => (
                <motion.button
                  key={index}
                  className={`w-4 h-4 rounded-full transition-all duration-300 ${
                    index === currentTestimonial
                      ? "bg-gradient-to-r from-blue-500 to-purple-500 w-12"
                      : "bg-gray-600 hover:bg-gray-500"
                  }`}
                  onClick={() => setCurrentTestimonial(index)}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                />
              ))}
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Final CTA Section */}
      <motion.section
        className="py-32 px-4 sm:px-6 lg:px-8 relative"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            className="relative bg-gradient-to-br from-blue-500/20 via-purple-500/20 to-pink-500/20 backdrop-blur-xl border border-blue-500/30 rounded-[3rem] p-16 group overflow-hidden"
            variants={scaleIn}
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            />

            <motion.div
              className="absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full blur-3xl"
              animate={floatingAnimation}
            />
            <motion.div
              className="absolute -bottom-20 -left-20 w-40 h-40 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full blur-3xl"
              animate={{
                ...floatingAnimation,
                transition: { ...floatingAnimation.transition, delay: 2 }
              }}
            />

            <div className="relative z-10">
              <motion.h2
                className="text-4xl md:text-6xl font-bold text-white mb-8 leading-tight"
                variants={fadeInUp}
              >
                Prêt à{" "}
                <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                  transformer
                </span>
                <br />
                votre carrière ?
              </motion.h2>

              <motion.p
                className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed"
                variants={fadeInUp}
              >
                Rejoignez des milliers de professionnels qui ont déjà boosté leur carrière avec des CV exceptionnels créés sur NICE-CV
              </motion.p>

              <motion.div
                className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12"
                variants={staggerChildren}
              >
                <motion.button
                  onClick={handleGetStarted}
                  className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-12 py-5 rounded-2xl font-semibold text-xl shadow-2xl shadow-purple-500/25 flex items-center group relative overflow-hidden"
                  variants={fadeInUp}
                  whileHover={{ scale: 1.05, y: -5 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  />
                  <span className="relative z-10 flex items-center">
                    <Heart className="mr-3 h-6 w-6 group-hover:scale-110 transition-transform text-pink-300" />
                    Créer mon CV maintenant
                    <ArrowRight className="ml-3 h-6 w-6 group-hover:translate-x-2 transition-transform" />
                  </span>
                </motion.button>

                <motion.div
                  className="text-gray-400 text-lg flex items-center"
                  variants={fadeInUp}
                  whileHover={{ scale: 1.05 }}
                >
                  <Shield className="h-6 w-6 text-green-400 mr-3" />
                  100% gratuit pour commencer
                </motion.div>
              </motion.div>

              <motion.div
                className="flex justify-center items-center space-x-8 text-gray-400"
                variants={staggerChildren}
              >
                {[
                  { icon: Users, text: "50K+ utilisateurs" },
                  { icon: Award, text: "98% satisfaction" },
                  { icon: Globe, text: "30+ pays" }
                ].map((stat, index) => (
                  <motion.div
                    key={index}
                    className="flex items-center space-x-2"
                    variants={fadeInUp}
                    whileHover={{ scale: 1.1, color: "#ffffff" }}
                  >
                    <stat.icon className="h-5 w-5" />
                    <span className="text-sm font-medium">{stat.text}</span>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Footer */}
      <motion.footer
        className="bg-black/40 backdrop-blur-sm border-t border-white/10 py-16 px-4 sm:px-6 lg:px-8"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <motion.div
              className="flex items-center mb-6 md:mb-0"
              whileHover={{ scale: 1.05 }}
            >
              <motion.div
                className="bg-gradient-to-r from-blue-500 to-purple-600 p-3 rounded-2xl shadow-lg shadow-purple-500/25"
                whileHover={{ rotate: 5, scale: 1.1 }}
                transition={{ duration: 0.2 }}
              >
                <Crown className="h-7 w-7 text-white" />
              </motion.div>
              <span className="ml-4 text-2xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                NICE-CV
              </span>
            </motion.div>

            <motion.div
              className="text-gray-400 text-center md:text-right"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <p className="text-lg mb-2">&copy; 2024 NICE-CV. Tous droits réservés.</p>
              <motion.p
                className="flex items-center justify-center md:justify-end text-pink-400"
                animate={{ opacity: [0.7, 1, 0.7] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                Créé avec <Heart className="h-4 w-4 mx-2 text-red-500" /> pour votre réussite professionnelle
              </motion.p>
            </motion.div>
          </div>

          <motion.div
            className="mt-12 pt-8 border-t border-white/10 text-center text-gray-500"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            <p className="text-sm">
              🚀 Propulsé par Next.js • 🎨 Designé avec Tailwind CSS • ⚡ Optimisé pour Vercel
            </p>
          </motion.div>
        </div>
      </motion.footer>
    </div>
  );
}
