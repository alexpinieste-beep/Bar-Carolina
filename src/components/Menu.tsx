import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, UtensilsCrossed, ChevronRight } from "lucide-react";

interface MenuItem {
  name: string;
  description: string;
  price: string;
  isSpecialty?: boolean;
}

interface MenuCategory {
  name: string;
  items: MenuItem[];
}

const menuData: MenuCategory[] = [
  {
    name: "Tapas y Entrantes",
    items: [
      {
        name: "Croquetas de la Abuela",
        description:
          "Croquetas caseras de jamón ibérico con bechamel cremosa y pan rallado artesano",
        price: "9.50€",
        isSpecialty: true,
      },
      {
        name: "Gambas al Ajillo",
        description:
          "Gambas frescas salteadas en aceite de oliva virgen extra con ajo y guindilla",
        price: "13.90€",
      },
      {
        name: "Tabla de Ibéricos",
        description:
          "Selección de jamón ibérico de bellota, lomo y chorizo con pan tostado y tomate",
        price: "18.50€",
        isSpecialty: true,
      },
      {
        name: "Patatas Bravas Carolina",
        description:
          "Patatas fritas con salsa brava casera y alioli suave de elaboración propia",
        price: "7.50€",
      },
      {
        name: "Boquerones en Vinagre",
        description:
          "Boquerones marinados en vinagre de Jerez con aceite de oliva, ajo y perejil fresco",
        price: "8.90€",
      },
    ],
  },
  {
    name: "Platos Principales",
    items: [
      {
        name: "Secreto Ibérico a la Brasa",
        description:
          "Secreto de cerdo ibérico a la brasa con patatas panaderas y pimientos del piquillo confitados",
        price: "22.90€",
        isSpecialty: true,
      },
      {
        name: "Merluza a la Vasca",
        description:
          "Merluza fresca en salsa verde con almejas, espárragos blancos y huevo cocido",
        price: "24.50€",
      },
      {
        name: "Carrilleras Estofadas",
        description:
          "Carrilleras de cerdo ibérico estofadas en vino tinto con verduras de temporada y puré trufado",
        price: "21.90€",
        isSpecialty: true,
      },
      {
        name: "Pollo de Corral al Horno",
        description:
          "Medio pollo de corral asado lentamente con hierbas aromáticas, limón y guarnición de patatas",
        price: "17.50€",
      },
    ],
  },
  {
    name: "Arroces y Pasta",
    items: [
      {
        name: "Paella Valenciana",
        description:
          "Paella tradicional con pollo, conejo, judía verde, garrofón y azafrán. Mínimo 2 personas",
        price: "16.90€/persona",
        isSpecialty: true,
      },
      {
        name: "Arroz Negro con Sepia",
        description:
          "Arroz meloso con tinta de calamar, sepia fresca y alioli casero. Mínimo 2 personas",
        price: "18.50€/persona",
      },
      {
        name: "Fideuá del Bar Carolina",
        description:
          "Fideuá con gambas, cigalas y calamar al estilo tradicional con alioli de ajo asado",
        price: "19.90€/persona",
        isSpecialty: true,
      },
    ],
  },
  {
    name: "Postres",
    items: [
      {
        name: "Crema Catalana",
        description:
          "Crema catalana tradicional con caramelo tostado al momento y canela",
        price: "6.50€",
      },
      {
        name: "Tarta de Queso Casera",
        description:
          "Tarta de queso cremosa al horno estilo La Viña con coulis de frutos rojos",
        price: "7.50€",
        isSpecialty: true,
      },
      {
        name: "Torrija Caramelizada",
        description:
          "Torrija artesana bañada en leche infusionada con canela y vainilla, servida con helado de vainilla",
        price: "7.00€",
      },
      {
        name: "Tabla de Quesos Nacionales",
        description:
          "Selección de quesos manchego, cabrales y tetilla con membrillo, miel y nueces",
        price: "12.90€",
      },
    ],
  },
];

const categoryIcons: Record<string, string> = {
  "Tapas y Entrantes": "🥘",
  "Platos Principales": "🍖",
  "Arroces y Pasta": "🥗",
  Postres: "🍮",
};

function MenuItemCard({ item, index }: { item: MenuItem; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: index % 2 === 0 ? -40 : 40, y: 10 }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.5, delay: index * 0.07, ease: "easeOut" }}
      className="relative group"
    >
      <div
        className={`
          relative rounded-2xl p-5 h-full flex flex-col justify-between
          transition-all duration-300 cursor-default
          ${
            item.isSpecialty
              ? "bg-white border-2 shadow-md"
              : "bg-white border border-stone-200 shadow-sm hover:shadow-md"
          }
        `}
        style={
          item.isSpecialty
            ? { borderColor: "#C4922A" }
            : { borderColor: "#e7ddd4" }
        }
      >
        {item.isSpecialty && (
          <div
            className="absolute -top-3 left-4 flex items-center gap-1 px-3 py-0.5 rounded-full text-xs font-semibold tracking-wide shadow-sm"
            style={{ backgroundColor: "#C4922A", color: "#FDFAF6" }}
          >
            <Star size={11} fill="#FDFAF6" strokeWidth={0} />
            <span>Especialidad</span>
          </div>
        )}

        <div className="flex-1">
          <div className="flex items-start justify-between gap-3 mb-2 mt-1">
            <h3
              className="font-bold text-base leading-snug"
              style={{
                fontFamily: "'Playfair Display', serif",
                color: "#2C1810",
              }}
            >
              {item.name}
            </h3>
            <span
              className="text-base font-bold whitespace-nowrap shrink-0 mt-0.5"
              style={{ color: "#8B1A1A" }}
            >
              {item.price}
            </span>
          </div>
          <p className="text-sm leading-relaxed" style={{ color: "#6b4f3a" }}>
            {item.description}
          </p>
        </div>

        {item.isSpecialty && (
          <div
            className="absolute bottom-0 left-0 right-0 h-0.5 rounded-b-2xl opacity-40"
            style={{ backgroundColor: "#C4922A" }}
          />
        )}
      </div>
    </motion.div>
  );
}

function Menu() {
  const [activeCategory, setActiveCategory] = useState<string>(
    menuData[0].name
  );

  const activeData = menuData.find((cat) => cat.name === activeCategory);

  return (
    <section
      className="min-h-screen py-16 px-4"
      style={{ backgroundColor: "#FDFAF6" }}
    >
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-3 mb-3">
            <div
              className="h-px w-16 rounded-full"
              style={{ backgroundColor: "#C4922A" }}
            />
            <UtensilsCrossed size={20} style={{ color: "#C4922A" }} />
            <div
              className="h-px w-16 rounded-full"
              style={{ backgroundColor: "#C4922A" }}
            />
          </div>

          <h2
            className="text-5xl font-bold mb-3 tracking-tight"
            style={{
              fontFamily: "'Playfair Display', serif",
              color: "#8B1A1A",
            }}
          >
            Nuestra Carta
          </h2>
          <p className="text-base max-w-xl mx-auto leading-relaxed" style={{ color: "#6b4f3a" }}>
            Cocina tradicional elaborada con ingredientes de temporada y el
            cariño de siempre
          </p>
        </motion.div>

        {/* Category Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="flex flex-wrap justify-center gap-2 mb-10"
        >
          {menuData.map((category) => {
            const isActive = activeCategory === category.name;
            return (
              <button
                key={category.name}
                onClick={() => setActiveCategory(category.name)}
                className={`
                  flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold
                  transition-all duration-250 border
                  focus:outline-none focus-visible:ring-2
                `}
                style={
                  isActive
                    ? {
                        backgroundColor: "#8B1A1A",
                        color: "#FDFAF6",
                        borderColor: "#8B1A1A",
                        boxShadow: "0 2px 12px rgba(139,26,26,0.22)",
                      }
                    : {
                        backgroundColor: "#fff",
                        color: "#2C1810",
                        borderColor: "#d6c4b0",
                      }
                }
              >
                <span>{categoryIcons[category.name]}</span>
                <span>{category.name}</span>
                {isActive && <ChevronRight size={14} className="opacity-75" />}
              </button>
            );
          })}
        </motion.div>

        {/* Divider */}
        <div className="flex items-center gap-3 mb-8">
          <div
            className="flex-1 h-px"
            style={{ backgroundColor: "#e7ddd4" }}
          />
          <span
            className="text-xs uppercase tracking-widest font-semibold"
            style={{ color: "#8B1A1A" }}
          >
            {activeCategory}
          </span>
          <div
            className="flex-1 h-px"
            style={{ backgroundColor: "#e7ddd4" }}
          />
        </div>

        {/* Items Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <AnimatePresence mode="popLayout">
            {activeData?.items.map((item, index) => (
              <MenuItemCard
                key={`${activeCategory}-${item.name}`}
                item={item}
                index={index}
              />
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

export default Menu;