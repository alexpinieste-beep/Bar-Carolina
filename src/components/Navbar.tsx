import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, UtensilsCrossed, ChevronDown } from "lucide-react";

interface NavDropdownItem {
  label: string;
  href: string;
  icon: string;
}

interface NavLink {
  label: string;
  href: string;
  dropdown?: NavDropdownItem[];
}

const navLinks: NavLink[] = [
  { label: "Inicio", href: "#inicio" },
  {
    label: "Carta",
    href: "#carta",
    dropdown: [
      { label: "Tapas y Entrantes", href: "#carta", icon: "🥘" },
      { label: "Platos Principales", href: "#carta", icon: "🍖" },
      { label: "Arroces y Pasta", href: "#carta", icon: "🥗" },
      { label: "Postres", href: "#carta", icon: "🍮" },
    ],
  },
  { label: "Reservas", href: "#reservas" },
  { label: "Contacto", href: "#contacto" },
];

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [openMobileDropdown, setOpenMobileDropdown] = useState<string | null>(null);
  const dropdownTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleMouseEnter = (label: string) => {
    if (dropdownTimeout.current) clearTimeout(dropdownTimeout.current);
    setOpenDropdown(label);
  };

  const handleMouseLeave = () => {
    dropdownTimeout.current = setTimeout(() => setOpenDropdown(null), 150);
  };

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);

  const closeMenu = () => {
    setIsMenuOpen(false);
    setOpenMobileDropdown(null);
  };

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      style={{
        backgroundColor: isScrolled
          ? "rgba(139, 26, 26, 0.97)"
          : "rgba(139, 26, 26, 0.75)",
        backdropFilter: isScrolled ? "blur(0px)" : "blur(8px)",
        boxShadow: isScrolled
          ? "0 2px 20px rgba(44, 24, 16, 0.4)"
          : "none",
        transition:
          "background-color 0.4s ease, box-shadow 0.4s ease, backdrop-filter 0.4s ease",
      }}
      className="fixed top-0 left-0 right-0 z-50"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <motion.a
            href="#inicio"
            className="flex items-center gap-2 group"
            whileHover={{ scale: 1.03 }}
            transition={{ type: "spring", stiffness: 300 }}
            onClick={closeMenu}
          >
            <motion.div
              whileHover={{ rotate: 10 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              <UtensilsCrossed
                size={26}
                style={{ color: "#C4922A" }}
                strokeWidth={1.8}
              />
            </motion.div>
            <span
              className="text-xl md:text-2xl font-bold tracking-wide text-white leading-none"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Bar Carolina
            </span>
          </motion.a>

          {/* Desktop Navigation */}
          <ul className="hidden md:flex items-center gap-1">
            {navLinks.map((link, index) => (
              <motion.li
                key={link.href + link.label}
                className="relative"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + index * 0.08, duration: 0.4 }}
                onMouseEnter={() => link.dropdown && handleMouseEnter(link.label)}
                onMouseLeave={() => link.dropdown && handleMouseLeave()}
              >
                <a
                  href={link.href}
                  className="relative px-4 py-2 text-sm font-medium tracking-wide text-white/90 hover:text-white rounded-md transition-colors duration-200 group flex items-center gap-1"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                  aria-haspopup={link.dropdown ? "true" : undefined}
                  aria-expanded={link.dropdown ? openDropdown === link.label : undefined}
                >
                  {link.label}
                  {link.dropdown && (
                    <motion.span
                      animate={{ rotate: openDropdown === link.label ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                      className="inline-flex"
                    >
                      <ChevronDown size={13} strokeWidth={2} />
                    </motion.span>
                  )}
                  <motion.span
                    className="absolute bottom-1 left-4 right-4 h-px rounded-full"
                    style={{ backgroundColor: "#C4922A" }}
                    initial={{ scaleX: 0 }}
                    whileHover={{ scaleX: 1 }}
                    transition={{ duration: 0.25, ease: "easeOut" }}
                  />
                </a>

                {/* Desktop Dropdown Panel */}
                {link.dropdown && (
                  <AnimatePresence>
                    {openDropdown === link.label && (
                      <motion.ul
                        key="dropdown"
                        role="menu"
                        initial={{ opacity: 0, y: -8, scale: 0.97 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -8, scale: 0.97 }}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                        className="absolute top-full left-0 mt-1 min-w-[200px] rounded-xl overflow-hidden shadow-2xl z-50"
                        style={{
                          backgroundColor: "rgba(44, 24, 16, 0.97)",
                          border: "1px solid rgba(196,146,42,0.25)",
                        }}
                        onMouseEnter={() => handleMouseEnter(link.label)}
                        onMouseLeave={handleMouseLeave}
                      >
                        {link.dropdown.map((child, ci) => (
                          <motion.li
                            key={child.label}
                            role="menuitem"
                            initial={{ x: -10, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: ci * 0.05, duration: 0.2 }}
                          >
                            <a
                              href={child.href}
                              className="flex items-center gap-3 px-4 py-3 text-sm text-white/85 hover:text-white hover:bg-white/10 transition-colors duration-150"
                              style={{ fontFamily: "'Playfair Display', serif" }}
                            >
                              <span className="text-base">{child.icon}</span>
                              {child.label}
                            </a>
                          </motion.li>
                        ))}
                      </motion.ul>
                    )}
                  </AnimatePresence>
                )}
              </motion.li>
            ))}

            <motion.li
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45, duration: 0.4 }}
            >
              <a
                href="#reservas"
                className="ml-3 px-5 py-2 rounded-full text-sm font-semibold tracking-wide transition-all duration-300 hover:brightness-110 active:scale-95"
                style={{
                  backgroundColor: "#C4922A",
                  color: "#FDFAF6",
                  fontFamily: "'Playfair Display', serif",
                  boxShadow: "0 2px 8px rgba(196, 146, 42, 0.35)",
                }}
              >
                Reservar mesa
              </a>
            </motion.li>
          </ul>

          {/* Mobile hamburger button */}
          <motion.button
            onClick={toggleMenu}
            className="md:hidden flex items-center justify-center w-10 h-10 rounded-md text-white/90 hover:text-white hover:bg-white/10 transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
            whileTap={{ scale: 0.92 }}
            aria-label={isMenuOpen ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={isMenuOpen}
          >
            <AnimatePresence mode="wait" initial={false}>
              {isMenuOpen ? (
                <motion.span
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <X size={22} strokeWidth={2} />
                </motion.span>
              ) : (
                <motion.span
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Menu size={22} strokeWidth={2} />
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: "easeInOut" }}
            className="md:hidden overflow-hidden"
            style={{ backgroundColor: "rgba(139, 26, 26, 0.98)" }}
          >
            <div
              className="border-t mx-4"
              style={{ borderColor: "rgba(196, 146, 42, 0.3)" }}
            />
            <ul className="flex flex-col px-4 py-4 gap-1">
              {navLinks.map((link, index) => (
                <motion.li
                  key={link.href + link.label}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: -20, opacity: 0 }}
                  transition={{ delay: index * 0.07, duration: 0.3 }}
                >
                  {link.dropdown ? (
                    <>
                      <button
                        onClick={() =>
                          setOpenMobileDropdown(
                            openMobileDropdown === link.label ? null : link.label
                          )
                        }
                        className="flex items-center justify-between w-full px-3 py-3 rounded-lg text-base font-medium text-white/90 hover:text-white hover:bg-white/10 transition-colors duration-200"
                        style={{ fontFamily: "'Playfair Display', serif" }}
                        aria-expanded={openMobileDropdown === link.label}
                      >
                        <span>{link.label}</span>
                        <motion.span
                          animate={{ rotate: openMobileDropdown === link.label ? 180 : 0 }}
                          transition={{ duration: 0.25 }}
                          className="inline-flex"
                        >
                          <ChevronDown size={16} strokeWidth={2} />
                        </motion.span>
                      </button>

                      <AnimatePresence>
                        {openMobileDropdown === link.label && (
                          <motion.ul
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.25, ease: "easeInOut" }}
                            className="overflow-hidden pl-3"
                          >
                            {link.dropdown.map((child) => (
                              <li key={child.label}>
                                <a
                                  href={child.href}
                                  onClick={closeMenu}
                                  className="flex items-center gap-3 px-3 py-2.5 text-sm text-white/75 hover:text-white hover:bg-white/10 rounded-lg transition-colors duration-150"
                                  style={{ fontFamily: "'Playfair Display', serif" }}
                                >
                                  <span>{child.icon}</span>
                                  {child.label}
                                </a>
                              </li>
                            ))}
                          </motion.ul>
                        )}
                      </AnimatePresence>
                    </>
                  ) : (
                    <a
                      href={link.href}
                      onClick={closeMenu}
                      className="flex items-center px-3 py-3 rounded-lg text-base font-medium text-white/90 hover:text-white hover:bg-white/10 transition-colors duration-200"
                      style={{ fontFamily: "'Playfair Display', serif" }}
                    >
                      {link.label}
                    </a>
                  )}
                </motion.li>
              ))}

              <motion.li
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -20, opacity: 0 }}
                transition={{ delay: navLinks.length * 0.07, duration: 0.3 }}
                className="pt-2"
              >
                <a
                  href="#reservas"
                  onClick={closeMenu}
                  className="flex items-center justify-center w-full px-5 py-3 rounded-full text-sm font-semibold tracking-wide transition-all duration-300 hover:brightness-110 active:scale-95"
                  style={{
                    backgroundColor: "#C4922A",
                    color: "#FDFAF6",
                    fontFamily: "'Playfair Display', serif",
                    boxShadow: "0 2px 8px rgba(196, 146, 42, 0.35)",
                  }}
                >
                  Reservar mesa
                </a>
              </motion.li>
            </ul>
            <div className="pb-2" />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
