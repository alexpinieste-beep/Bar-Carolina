import { motion, type Variants } from "framer-motion";
import { MapPin, Phone, Mail, Clock, Instagram, Facebook, Twitter, Navigation } from "lucide-react";

const LAT = 40.4817;
const LON = -3.3639;
const LABEL = "Bar Carolina, Alcalá de Henares";

function getMapsUrl(): string {
  const ua = navigator.userAgent;
  const isIOS = /iPad|iPhone|iPod/.test(ua) && !(window as unknown as Record<string, unknown>).MSStream;
  const isAndroid = /Android/.test(ua);

  if (isIOS) {
    return `maps://maps.apple.com/?ll=${LAT},${LON}&q=${encodeURIComponent(LABEL)}`;
  }
  if (isAndroid) {
    return `geo:${LAT},${LON}?q=${LAT},${LON}(${encodeURIComponent(LABEL)})`;
  }
  return `https://www.google.com/maps/search/?api=1&query=${LAT},${LON}`;
}

const Footer = () => {
  const currentYear = 2026;

  const scheduleItems = [
    { days: "Lunes a Jueves", hours: "08:00 – 23:00" },
    { days: "Viernes y Sábado", hours: "08:00 – 00:00" },
    { days: "Domingo", hours: "09:00 – 17:00" },
  ];

  const socialLinks = [
    { icon: Instagram, label: "Instagram", href: "#" },
    { icon: Facebook, label: "Facebook", href: "#" },
    { icon: Twitter, label: "Twitter", href: "#" },
  ];

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  const columnVariants: Variants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const iconHoverVariants = {
    rest: { scale: 1, rotate: 0 },
    hover: { scale: 1.2, rotate: 5, transition: { duration: 0.2 } },
  };

  return (
    <footer
      style={{ backgroundColor: "#8B1A1A", fontFamily: "sans-serif" }}
      className="w-full"
    >
      {/* Decorative top border */}
      <div
        style={{ backgroundColor: "#C4922A" }}
        className="w-full h-1"
      />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="max-w-6xl mx-auto px-6 py-14"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">

          {/* Columna Izquierda: Logo y descripción */}
          <motion.div
            variants={columnVariants}
            className="flex flex-col items-center md:items-start gap-4"
          >
            {/* Logo / Nombre */}
            <div className="flex flex-col items-center md:items-start">
              <div
                style={{
                  borderColor: "#C4922A",
                  fontFamily: "'Playfair Display', Georgia, serif",
                }}
                className="border-2 rounded-sm px-4 py-2 mb-3"
              >
                <span
                  style={{ color: "#C4922A", fontFamily: "'Playfair Display', Georgia, serif" }}
                  className="text-3xl font-bold tracking-widest uppercase"
                >
                  Bar
                </span>
                <span
                  style={{ color: "#F5E6D3", fontFamily: "'Playfair Display', Georgia, serif" }}
                  className="text-3xl font-bold tracking-widest uppercase ml-2"
                >
                  Carolina
                </span>
              </div>

              <div
                style={{ backgroundColor: "#C4922A" }}
                className="w-12 h-0.5 mb-4"
              />
            </div>

            <p
              style={{ color: "#F5E6D3" }}
              className="text-sm leading-relaxed text-center md:text-left opacity-90 max-w-xs"
            >
              Un rincón auténtico donde la tradición y el sabor se encuentran.
              Cocina casera elaborada con los mejores productos de temporada,
              en un ambiente cálido y acogedor.
            </p>

            {/* Redes sociales */}
            <div className="flex items-center gap-4 mt-2">
              {socialLinks.map(({ icon: Icon, label, href }) => (
                <motion.a
                  key={label}
                  href={href}
                  aria-label={label}
                  variants={iconHoverVariants}
                  initial="rest"
                  whileHover="hover"
                  style={{ borderColor: "#C4922A", color: "#F5E6D3" }}
                  className="w-9 h-9 rounded-full border flex items-center justify-center transition-colors duration-200 hover:bg-amber-700"
                >
                  <Icon size={16} />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Columna Central: Horario */}
          <motion.div
            variants={columnVariants}
            className="flex flex-col items-center gap-4"
          >
            <div className="flex items-center gap-2 mb-1">
              <Clock size={18} style={{ color: "#C4922A" }} />
              <h3
                style={{
                  color: "#F5E6D3",
                  fontFamily: "'Playfair Display', Georgia, serif",
                }}
                className="text-lg font-semibold tracking-wide uppercase"
              >
                Horario
              </h3>
            </div>

            <div
              style={{ backgroundColor: "#C4922A" }}
              className="w-10 h-0.5 mb-2"
            />

            <div className="flex flex-col gap-3 w-full max-w-xs">
              {scheduleItems.map(({ days, hours }) => (
                <motion.div
                  key={days}
                  whileHover={{ x: 4 }}
                  transition={{ duration: 0.2 }}
                  className="flex flex-col sm:flex-row sm:justify-between items-center sm:items-start gap-1 sm:gap-4 py-2 border-b border-white border-opacity-10 last:border-b-0"
                >
                  <span
                    style={{ color: "#F5E6D3" }}
                    className="text-sm font-medium opacity-90 text-center sm:text-left"
                  >
                    {days}
                  </span>
                  <span
                    style={{ color: "#C4922A" }}
                    className="text-sm font-semibold whitespace-nowrap"
                  >
                    {hours}
                  </span>
                </motion.div>
              ))}
            </div>

            <p
              style={{ color: "#F5E6D3" }}
              className="text-xs mt-2 opacity-60 italic text-center"
            >
              * Horario sujeto a cambios en festivos
            </p>
          </motion.div>

          {/* Columna Derecha: Contacto */}
          <motion.div
            variants={columnVariants}
            className="flex flex-col items-center md:items-end gap-4"
          >
            <div className="flex items-center gap-2 mb-1">
              <MapPin size={18} style={{ color: "#C4922A" }} />
              <h3
                style={{
                  color: "#F5E6D3",
                  fontFamily: "'Playfair Display', Georgia, serif",
                }}
                className="text-lg font-semibold tracking-wide uppercase"
              >
                Contacto
              </h3>
            </div>

            <div
              style={{ backgroundColor: "#C4922A" }}
              className="w-10 h-0.5 mb-2"
            />

            <div className="flex flex-col items-center md:items-end gap-4">
              {/* Dirección */}
              <motion.div
                whileHover={{ x: -4 }}
                transition={{ duration: 0.2 }}
                className="flex items-start gap-3 group"
              >
                <MapPin
                  size={16}
                  style={{ color: "#C4922A" }}
                  className="mt-0.5 flex-shrink-0"
                />
                <div className="text-center md:text-right">
                  <p
                    style={{ color: "#F5E6D3" }}
                    className="text-sm opacity-90"
                  >
                    Alcalá de Henares
                  </p>
                  <p
                    style={{ color: "#F5E6D3" }}
                    className="text-sm opacity-90"
                  >
                    Madrid, España
                  </p>
                </div>
              </motion.div>

              {/* Teléfono */}
              <motion.a
                href="tel:+34900000000"
                whileHover={{ x: -4 }}
                transition={{ duration: 0.2 }}
                className="flex items-center gap-3 group"
              >
                <Phone
                  size={16}
                  style={{ color: "#C4922A" }}
                  className="flex-shrink-0"
                />
                <span
                  style={{ color: "#F5E6D3" }}
                  className="text-sm opacity-90 group-hover:opacity-100 transition-opacity"
                >
                  +34 900 000 000
                </span>
              </motion.a>

              {/* Email */}
              <motion.a
                href="mailto:info@barcarolina.es"
                whileHover={{ x: -4 }}
                transition={{ duration: 0.2 }}
                className="flex items-center gap-3 group"
              >
                <Mail
                  size={16}
                  style={{ color: "#C4922A" }}
                  className="flex-shrink-0"
                />
                <span
                  style={{ color: "#F5E6D3" }}
                  className="text-sm opacity-90 group-hover:opacity-100 transition-opacity"
                >
                  info@barcarolina.es
                </span>
              </motion.a>
            </div>
          </motion.div>
        </div>

        {/* Mini-mapa interactivo — fila completa */}
        <motion.div
          variants={columnVariants}
          className="mt-10 relative rounded-2xl overflow-hidden"
          style={{
            height: "200px",
            border: "1px solid rgba(196,146,42,0.35)",
            boxShadow: "0 4px 24px rgba(0,0,0,0.3)",
          }}
        >
          {/* Iframe OpenStreetMap */}
          <iframe
            src={`https://www.openstreetmap.org/export/embed.html?bbox=${LON - 0.006},${LAT - 0.003},${LON + 0.006},${LAT + 0.003}&layer=mapnik&marker=${LAT},${LON}`}
            width="100%"
            height="100%"
            style={{
              border: 0,
              display: "block",
              filter: "sepia(25%) saturate(85%) brightness(0.92)",
            }}
            loading="lazy"
            title="Ubicación Bar Carolina en Alcalá de Henares"
            aria-label="Mapa interactivo de Bar Carolina"
          />

          {/* Overlay gradiente inferior para integrar con el footer */}
          <div
            className="absolute inset-x-0 bottom-0 h-10 pointer-events-none"
            style={{
              background: "linear-gradient(to top, rgba(139,26,26,0.35) 0%, transparent 100%)",
            }}
          />

          {/* Etiqueta del lugar */}
          <div
            className="absolute top-3 left-3 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold pointer-events-none"
            style={{
              backgroundColor: "rgba(139,26,26,0.92)",
              color: "#F5E6D3",
              border: "1px solid rgba(196,146,42,0.4)",
              backdropFilter: "blur(4px)",
            }}
          >
            <MapPin size={11} style={{ color: "#C4922A" }} />
            Bar Carolina · Alcalá de Henares
          </div>

          {/* Botón "Abrir en Maps" */}
          <motion.button
            onClick={() => {
              const url = getMapsUrl();
              window.open(url, "_blank", "noopener,noreferrer");
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.96 }}
            className="absolute bottom-3 right-3 flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wide shadow-lg cursor-pointer"
            style={{
              backgroundColor: "#8B1A1A",
              color: "#F5E6D3",
              border: "1px solid rgba(196,146,42,0.55)",
            }}
          >
            <Navigation size={12} style={{ color: "#C4922A" }} />
            Abrir en Maps
          </motion.button>
        </motion.div>

        {/* Separador decorativo */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          className="mt-12 mb-6 flex items-center gap-4"
        >
          <div
            style={{ backgroundColor: "rgba(245,230,211,0.2)" }}
            className="flex-1 h-px"
          />
          <div
            style={{ color: "#C4922A" }}
            className="text-lg"
          >
            ✦
          </div>
          <div
            style={{ backgroundColor: "rgba(245,230,211,0.2)" }}
            className="flex-1 h-px"
          />
        </motion.div>

        {/* Copyright */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center"
        >
          <p
            style={{ color: "rgba(245,230,211,0.6)" }}
            className="text-xs tracking-wider"
          >
            © {currentYear} Bar Carolina. Todos los derechos reservados.
          </p>
        </motion.div>
      </motion.div>
    </footer>
  );
};

export default Footer;
