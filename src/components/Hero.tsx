import { motion } from "framer-motion";
import { ChevronDown, UtensilsCrossed, CalendarDays } from "lucide-react";

const Hero = () => {
  const scrollToMenu = () => {
    const menuSection = document.getElementById("carta");
    if (menuSection) {
      menuSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  const scrollToReservations = () => {
    const reservationSection = document.getElementById("reservar");
    if (reservationSection) {
      reservationSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400;1,600&display=swap"
        rel="stylesheet"
      />
      <section className="relative w-full h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1920&q=80"
            alt="Interior del Bar Carolina"
            className="w-full h-full object-cover object-center"
          />
          {/* Dark overlay with warm tint */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(135deg, rgba(44,24,16,0.82) 0%, rgba(139,26,26,0.65) 50%, rgba(44,24,16,0.88) 100%)",
            }}
          />
          {/* Subtle vignette */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.45) 100%)",
            }}
          />
        </div>

        {/* Decorative top border */}
        <div
          className="absolute top-0 left-0 right-0 h-1 z-20"
          style={{ backgroundColor: "#C4922A" }}
        />

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center justify-center text-center px-6 max-w-5xl mx-auto">
          {/* Decorative element */}
          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex items-center gap-4 mb-6"
          >
            <div
              className="h-px w-16 md:w-24"
              style={{ backgroundColor: "#C4922A" }}
            />
            <UtensilsCrossed
              size={20}
              style={{ color: "#C4922A" }}
              strokeWidth={1.5}
            />
            <div
              className="h-px w-16 md:w-24"
              style={{ backgroundColor: "#C4922A" }}
            />
          </motion.div>

          {/* Main Title */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.2, ease: "easeOut" }}
            className="text-6xl md:text-8xl lg:text-9xl font-bold text-white mb-2 leading-none tracking-wide"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Bar Carolina
          </motion.h1>

          {/* Decorative divider */}
          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ duration: 0.6, delay: 0.5, ease: "easeOut" }}
            className="flex items-center gap-3 my-5"
          >
            <div
              className="h-px w-8"
              style={{ backgroundColor: "#C4922A", opacity: 0.7 }}
            />
            <div
              className="w-1.5 h-1.5 rotate-45"
              style={{ backgroundColor: "#C4922A" }}
            />
            <div
              className="h-px w-8"
              style={{ backgroundColor: "#C4922A", opacity: 0.7 }}
            />
          </motion.div>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.4, ease: "easeOut" }}
            className="text-xl md:text-2xl lg:text-3xl mb-2 font-light italic tracking-wide"
            style={{
              fontFamily: "'Playfair Display', serif",
              color: "#F5E6D3",
            }}
          >
            El alma de Alcalá en cada copa
          </motion.p>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-sm md:text-base uppercase tracking-[0.25em] mb-10 font-light"
            style={{ color: "#C4922A" }}
          >
            Tradición · Sabor · Autenticidad
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7, ease: "easeOut" }}
            className="flex flex-col sm:flex-row gap-4 items-center"
          >
            {/* Primary CTA */}
            <motion.button
              onClick={scrollToMenu}
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.97 }}
              transition={{ duration: 0.2 }}
              className="flex items-center gap-2.5 px-8 py-4 text-white font-semibold uppercase tracking-widest text-sm border-2 cursor-pointer relative overflow-hidden group"
              style={{
                backgroundColor: "#8B1A1A",
                borderColor: "#8B1A1A",
                fontFamily: "'Playfair Display', serif",
                letterSpacing: "0.15em",
              }}
            >
              <span
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ backgroundColor: "#6e1515" }}
              />
              <UtensilsCrossed size={16} strokeWidth={2} className="relative z-10" />
              <span className="relative z-10">Ver Carta</span>
            </motion.button>

            {/* Secondary CTA */}
            <motion.button
              onClick={scrollToReservations}
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.97 }}
              transition={{ duration: 0.2 }}
              className="flex items-center gap-2.5 px-8 py-4 font-semibold uppercase tracking-widest text-sm border-2 cursor-pointer relative overflow-hidden group"
              style={{
                backgroundColor: "transparent",
                borderColor: "#C4922A",
                color: "#C4922A",
                fontFamily: "'Playfair Display', serif",
                letterSpacing: "0.15em",
              }}
            >
              <span
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ backgroundColor: "rgba(196,146,42,0.15)" }}
              />
              <CalendarDays size={16} strokeWidth={2} className="relative z-10" />
              <span className="relative z-10">Reservar Mesa</span>
            </motion.button>
          </motion.div>

          {/* Opening hours hint */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.7 }}
            transition={{ duration: 1, delay: 1 }}
            className="mt-8 text-xs uppercase tracking-[0.2em]"
            style={{ color: "#F5E6D3" }}
          >
            Abierto todos los días · 08:00 – 00:00
          </motion.p>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 cursor-pointer"
          onClick={scrollToMenu}
        >
          <motion.p
            className="text-xs uppercase tracking-[0.2em]"
            style={{ color: "rgba(245,230,211,0.6)" }}
          >
            Descubrir
          </motion.p>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          >
            <ChevronDown
              size={22}
              style={{ color: "#C4922A" }}
              strokeWidth={1.5}
            />
          </motion.div>
        </motion.div>

        {/* Bottom decorative border */}
        <div
          className="absolute bottom-0 left-0 right-0 h-1 z-20"
          style={{
            background: "linear-gradient(90deg, #8B1A1A, #C4922A, #8B1A1A)",
          }}
        />
      </section>
    </>
  );
};

export default Hero;