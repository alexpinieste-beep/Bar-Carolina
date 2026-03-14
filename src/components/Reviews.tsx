import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";

interface Review {
  author: string;
  rating: number;
  text: string;
  source: string;
}

const reviews: Review[] = [
  {
    author: "Miguel Ángel Torres",
    rating: 5,
    text: "Llevaba tiempo queriendo venir al Bar Carolina después de que me lo recomendaran varios compañeros de trabajo y no me ha decepcionado para nada. El menú del día es una pasada, abundante y a un precio muy ajustado para lo que te ponen. El trato de los camareros es cercano y sin pretensiones, como los bares de toda la vida.",
    source: "google",
  },
  {
    author: "Cristina Fuentes Molina",
    rating: 4,
    text: "Sitio clásico en Alcalá con mucha solera. Fui a tomar unas tapas con amigas un sábado por la tarde y aunque estaba bastante lleno nos atendieron rápido. Las croquetas estaban buenísimas, caseras de verdad. Le quito una estrella porque el ruido ambiente era un poco alto, pero volvería sin dudarlo.",
    source: "google",
  },
  {
    author: "Roberto S.",
    rating: 5,
    text: "De los pocos sitios en los que el café de después de comer todavía sabe a café de verdad. Vengo casi todos los días laborables y siempre encuentro mi sitio en la barra. Personal simpático y profesional, que ya es difícil de encontrar hoy en día.",
    source: "google",
  },
  {
    author: "Laura Escribano",
    rating: 4,
    text: "Estuvimos comiendo aquí durante una visita al centro histórico de Alcalá y fue una elección acertada. La ración de calamares era generosa y el vino de la casa más que correcto. El local tiene ese encanto castizo que se agradece, aunque quizás la decoración podría estar algo más cuidada. En general, una experiencia muy satisfactoria.",
    source: "google",
  },
];

const averageRating =
  reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;

function getInitials(name: string): string {
  return name
    .split(" ")
    .slice(0, 2)
    .map((n) => n[0])
    .join("")
    .toUpperCase();
}

function StarRating({ rating, size = "sm" }: { rating: number; size?: "sm" | "lg" }) {
  const starSize = size === "lg" ? "w-7 h-7" : "w-4 h-4";
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`${starSize} ${
            star <= rating
              ? "fill-amber-500 text-amber-500"
              : "fill-stone-300 text-stone-300"
          }`}
        />
      ))}
    </div>
  );
}

function AvatarInitials({ name }: { name: string }) {
  return (
    <div
      className="w-12 h-12 rounded-full flex items-center justify-center text-sm font-bold shrink-0 shadow-md"
      style={{
        backgroundColor: "#8B1A1A",
        color: "#F5E6D3",
        fontFamily: "'Playfair Display', serif",
      }}
    >
      {getInitials(name)}
    </div>
  );
}

export default function Reviews() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);
  const [paused, setPaused] = useState(false);

  const goTo = useCallback(
    (index: number, dir: number) => {
      setDirection(dir);
      setCurrent((index + reviews.length) % reviews.length);
    },
    []
  );

  const next = useCallback(() => {
    goTo(current + 1, 1);
  }, [current, goTo]);

  const prev = useCallback(() => {
    goTo(current - 1, -1);
  }, [current, goTo]);

  useEffect(() => {
    if (paused) return;
    const timer = setInterval(() => {
      setDirection(1);
      setCurrent((prev) => (prev + 1) % reviews.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [paused]);

  const variants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 60 : -60,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (dir: number) => ({
      x: dir > 0 ? -60 : 60,
      opacity: 0,
    }),
  };

  return (
    <section
      className="py-20 px-4"
      style={{ backgroundColor: "#F5E6D3" }}
    >
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <p
            className="text-sm uppercase tracking-widest mb-3 font-medium"
            style={{ color: "#C4922A" }}
          >
            Lo que dicen nuestros clientes
          </p>
          <h2
            className="text-4xl md:text-5xl mb-6"
            style={{
              fontFamily: "'Playfair Display', serif",
              color: "#2C1810",
            }}
          >
            Opiniones
          </h2>

          {/* Average rating */}
          <div className="flex flex-col items-center gap-2">
            <StarRating rating={Math.round(averageRating)} size="lg" />
            <p
              className="text-lg font-semibold"
              style={{
                fontFamily: "'Playfair Display', serif",
                color: "#2C1810",
              }}
            >
              {averageRating.toFixed(1)}{" "}
              <span
                className="text-sm font-normal"
                style={{ color: "#8B1A1A" }}
              >
                sobre 5 · {reviews.length} reseñas
              </span>
            </p>
          </div>

          {/* Decorative divider */}
          <div className="flex items-center justify-center gap-3 mt-6">
            <div className="h-px w-16" style={{ backgroundColor: "#C4922A" }} />
            <div
              className="w-2 h-2 rounded-full"
              style={{ backgroundColor: "#C4922A" }}
            />
            <div className="h-px w-16" style={{ backgroundColor: "#C4922A" }} />
          </div>
        </motion.div>

        {/* Carousel */}
        <motion.div
          className="relative"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.2 }}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          {/* Card container */}
          <motion.div
            className="relative overflow-hidden rounded-2xl shadow-lg min-h-64"
            style={{ backgroundColor: "#FDFAF6" }}
            whileHover={{ y: -4, boxShadow: "0 16px 48px rgba(44,24,16,0.14)" }}
            transition={{ duration: 0.3 }}
          >
            <AnimatePresence custom={direction} mode="wait">
              <motion.div
                key={current}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.45, ease: "easeInOut" }}
                className="p-8 md:p-12"
              >
                {/* Quote icon */}
                <Quote
                  className="w-10 h-10 mb-4 opacity-20"
                  style={{ color: "#8B1A1A" }}
                />

                {/* Review text */}
                <p
                  className="text-base md:text-lg leading-relaxed mb-8 italic"
                  style={{ color: "#2C1810" }}
                >
                  "{reviews[current].text}"
                </p>

                {/* Author */}
                <div className="flex items-center gap-4">
                  <AvatarInitials name={reviews[current].author} />
                  <div>
                    <p
                      className="font-semibold text-base"
                      style={{
                        fontFamily: "'Playfair Display', serif",
                        color: "#2C1810",
                      }}
                    >
                      {reviews[current].author}
                    </p>
                    <div className="flex items-center gap-2 mt-1">
                      <StarRating rating={reviews[current].rating} />
                      <span
                        className="text-xs capitalize"
                        style={{ color: "#C4922A" }}
                      >
                        vía {reviews[current].source}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </motion.div>

          {/* Navigation buttons */}
          <button
            onClick={prev}
            aria-label="Reseña anterior"
            className="absolute -left-4 md:-left-6 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full shadow-md flex items-center justify-center transition-transform hover:scale-110 active:scale-95"
            style={{ backgroundColor: "#8B1A1A", color: "#F5E6D3" }}
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={next}
            aria-label="Reseña siguiente"
            className="absolute -right-4 md:-right-6 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full shadow-md flex items-center justify-center transition-transform hover:scale-110 active:scale-95"
            style={{ backgroundColor: "#8B1A1A", color: "#F5E6D3" }}
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </motion.div>

        {/* Dot indicators */}
        <div className="flex justify-center gap-2 mt-7">
          {reviews.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i, i > current ? 1 : -1)}
              aria-label={`Ir a reseña ${i + 1}`}
              className="transition-all duration-300 rounded-full"
              style={{
                width: i === current ? "28px" : "10px",
                height: "10px",
                backgroundColor:
                  i === current ? "#8B1A1A" : "#C4922A",
                opacity: i === current ? 1 : 0.4,
              }}
            />
          ))}
        </div>

        {/* Progress bar */}
        {!paused && (
          <div className="mt-8 max-w-xs mx-auto h-0.5 rounded-full overflow-hidden" style={{ backgroundColor: "rgba(196,146,42,0.2)" }}>
            <motion.div
              key={current}
              initial={{ x: "-100%" }}
              animate={{ x: "0%" }}
              transition={{ duration: 5, ease: "linear" }}
              className="h-full w-full"
              style={{ backgroundColor: "#C4922A" }}
            />
          </div>
        )}
      </div>
    </section>
  );
}