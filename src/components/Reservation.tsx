import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, Clock, Users, User, Mail, Phone, FileText, CheckCircle, XCircle, Loader2 } from "lucide-react";

interface ReservationForm {
  nombre: string;
  email: string;
  telefono: string;
  fecha: string;
  hora: string;
  personas: string;
  notas: string;
}

type FormStatus = "idle" | "loading" | "success" | "error";

const generateTimeSlots = (): string[] => {
  const slots: string[] = [];
  for (let hour = 13; hour <= 23; hour++) {
    slots.push(`${hour.toString().padStart(2, "0")}:00`);
    if (hour < 23) {
      slots.push(`${hour.toString().padStart(2, "0")}:30`);
    }
  }
  return slots;
};

const timeSlots = generateTimeSlots();

const personasOptions = Array.from({ length: 20 }, (_, i) => i + 1);

export default function Reservation() {
  const [form, setForm] = useState<ReservationForm>({
    nombre: "",
    email: "",
    telefono: "",
    fecha: "",
    hora: "",
    personas: "",
    notas: "",
  });

  const [status, setStatus] = useState<FormStatus>("idle");
  const [errorMessage, setErrorMessage] = useState<string>("");

  const today = new Date().toISOString().split("T")[0];

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    try {
      const response = await fetch("/api/reservations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        throw new Error(data?.message || "Error al procesar la reserva");
      }

      setStatus("success");
      setForm({
        nombre: "",
        email: "",
        telefono: "",
        fecha: "",
        hora: "",
        personas: "",
        notas: "",
      });
    } catch (error) {
      setStatus("error");
      setErrorMessage(
        error instanceof Error ? error.message : "Ocurrió un error inesperado"
      );
    }
  };

  const handleReset = () => {
    setStatus("idle");
    setErrorMessage("");
  };

  const inputBase =
    "w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-amber-400 focus:bg-white/15 transition-all duration-200 font-sans text-sm";

  const labelBase = "block text-white/80 text-xs font-semibold uppercase tracking-widest mb-1.5 font-sans";

  return (
    <section
      className="min-h-screen w-full flex items-center justify-center py-16 px-4"
      style={{ backgroundColor: "#8B1A1A" }}
    >
      <div className="w-full max-w-2xl">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {/* Header */}
          <div className="text-center mb-10">
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-amber-400 text-xs uppercase tracking-[0.3em] font-sans font-semibold mb-3"
            >
              Bar Carolina
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-white text-4xl md:text-5xl font-bold mb-4"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Haz tu Reserva
            </motion.h2>
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="mx-auto h-px w-24 bg-amber-400/60"
            />
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-white/60 text-sm mt-4 font-sans"
            >
              Reserva tu mesa y disfruta de una experiencia única
            </motion.p>
          </div>

          {/* Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.93, y: 30, rotateX: 3 }}
            whileInView={{ opacity: 1, scale: 1, y: 0, rotateX: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ delay: 0.3, duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
            style={{ transformPerspective: 1000, backgroundColor: "rgba(0,0,0,0.25)", backdropFilter: "blur(10px)" }}
            className="rounded-2xl overflow-hidden"
          >
            <div className="p-8 md:p-10">
              <AnimatePresence mode="wait">
                {/* SUCCESS */}
                {status === "success" && (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.4 }}
                    className="flex flex-col items-center justify-center py-12 text-center"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.1 }}
                    >
                      <CheckCircle className="w-20 h-20 text-amber-400 mb-6" strokeWidth={1.5} />
                    </motion.div>
                    <h3
                      className="text-white text-3xl font-bold mb-3"
                      style={{ fontFamily: "'Playfair Display', serif" }}
                    >
                      ¡Reserva Confirmada!
                    </h3>
                    <p className="text-white/60 text-sm font-sans mb-8 max-w-sm">
                      Hemos recibido tu solicitud. Te enviaremos un correo de confirmación en breve.
                    </p>
                    <motion.button
                      whileHover={{ scale: 1.04 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={handleReset}
                      className="px-8 py-3 rounded-lg text-white text-sm font-semibold font-sans uppercase tracking-widest transition-opacity hover:opacity-90"
                      style={{ backgroundColor: "#C4922A" }}
                    >
                      Nueva Reserva
                    </motion.button>
                  </motion.div>
                )}

                {/* ERROR */}
                {status === "error" && (
                  <motion.div
                    key="error"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.4 }}
                    className="flex flex-col items-center justify-center py-12 text-center"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.1 }}
                    >
                      <XCircle className="w-20 h-20 text-red-400 mb-6" strokeWidth={1.5} />
                    </motion.div>
                    <h3
                      className="text-white text-3xl font-bold mb-3"
                      style={{ fontFamily: "'Playfair Display', serif" }}
                    >
                      Algo salió mal
                    </h3>
                    <p className="text-white/60 text-sm font-sans mb-2 max-w-sm">
                      {errorMessage}
                    </p>
                    <p className="text-white/40 text-xs font-sans mb-8">
                      Por favor inténtalo de nuevo o llámanos directamente.
                    </p>
                    <motion.button
                      whileHover={{ scale: 1.04 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={handleReset}
                      className="px-8 py-3 rounded-lg text-white text-sm font-semibold font-sans uppercase tracking-widest transition-opacity hover:opacity-90"
                      style={{ backgroundColor: "#C4922A" }}
                    >
                      Intentar de nuevo
                    </motion.button>
                  </motion.div>
                )}

                {/* FORM */}
                {(status === "idle" || status === "loading") && (
                  <motion.form
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    onSubmit={handleSubmit}
                    className="space-y-6"
                  >
                    {/* Row 1: Nombre + Email */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <motion.div
                        initial={{ opacity: 0, x: -15 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 }}
                      >
                        <label className={labelBase}>
                          <span className="flex items-center gap-1.5">
                            <User className="w-3 h-3" />
                            Nombre completo
                          </span>
                        </label>
                        <input
                          type="text"
                          name="nombre"
                          value={form.nombre}
                          onChange={handleChange}
                          required
                          placeholder="Tu nombre"
                          className={inputBase}
                          style={{
                            colorScheme: "dark",
                          }}
                        />
                      </motion.div>

                      <motion.div
                        initial={{ opacity: 0, x: 15 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.15 }}
                      >
                        <label className={labelBase}>
                          <span className="flex items-center gap-1.5">
                            <Mail className="w-3 h-3" />
                            Correo electrónico
                          </span>
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={form.email}
                          onChange={handleChange}
                          required
                          placeholder="tu@email.com"
                          className={inputBase}
                        />
                      </motion.div>
                    </div>

                    {/* Row 2: Teléfono + Personas */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <motion.div
                        initial={{ opacity: 0, x: -15 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                      >
                        <label className={labelBase}>
                          <span className="flex items-center gap-1.5">
                            <Phone className="w-3 h-3" />
                            Teléfono
                          </span>
                        </label>
                        <input
                          type="tel"
                          name="telefono"
                          value={form.telefono}
                          onChange={handleChange}
                          required
                          placeholder="+34 600 000 000"
                          className={inputBase}
                        />
                      </motion.div>

                      <motion.div
                        initial={{ opacity: 0, x: 15 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.25 }}
                      >
                        <label className={labelBase}>
                          <span className="flex items-center gap-1.5">
                            <Users className="w-3 h-3" />
                            Personas
                          </span>
                        </label>
                        <div className="relative">
                          <select
                            name="personas"
                            value={form.personas}
                            onChange={handleChange}
                            required
                            className={`${inputBase} appearance-none`}
                          >
                            <option value="" disabled hidden>
                              Selecciona...
                            </option>
                            {personasOptions.map((num) => (
                              <option key={num} value={num} style={{ color: "black" }}>
                                {num} {num === 1 ? "persona" : "personas"}
                              </option>
                            ))}
                          </select>
                        </div>
                      </motion.div>
                    </div>

                    {/* Row 3: Fecha + Hora */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <motion.div
                        initial={{ opacity: 0, x: -15 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 }}
                      >
                        <label className={labelBase}>
                          <span className="flex items-center gap-1.5">
                            <Calendar className="w-3 h-3" />
                            Fecha
                          </span>
                        </label>
                        <input
                          type="date"
                          name="fecha"
                          value={form.fecha}
                          onChange={handleChange}
                          required
                          min={today}
                          className={inputBase}
                          style={{ colorScheme: "dark" }}
                        />
                      </motion.div>

                      <motion.div
                        initial={{ opacity: 0, x: 15 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.35 }}
                      >
                        <label className={labelBase}>
                          <span className="flex items-center gap-1.5">
                            <Clock className="w-3 h-3" />
                            Hora
                          </span>
                        </label>
                        <div className="relative">
                          <select
                            name="hora"
                            value={form.hora}
                            onChange={handleChange}
                            required
                            className={`${inputBase} appearance-none`}
                          >
                            <option value="" disabled hidden>
                              Selecciona...
                            </option>
                            {timeSlots.map((time) => (
                              <option key={time} value={time} style={{ color: "black" }}>
                                {time}
                              </option>
                            ))}
                          </select>
                        </div>
                      </motion.div>
                    </div>

                    {/* Row 4: Notas */}
                    <motion.div
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                    >
                      <label className={labelBase}>
                        <span className="flex items-center gap-1.5">
                          <FileText className="w-3 h-3" />
                          Notas especiales (Opcional)
                        </span>
                      </label>
                      <textarea
                        name="notas"
                        value={form.notas}
                        onChange={handleChange}
                        rows={3}
                        placeholder="Alergias, trona para bebé, etc."
                        className={`${inputBase} resize-none`}
                      />
                    </motion.div>

                    {/* Submit Button */}
                    <motion.div
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.45 }}
                      className="pt-2"
                    >
                      <button
                        type="submit"
                        disabled={status === "loading"}
                        className="w-full py-4 rounded-lg flex items-center justify-center gap-2 text-white font-bold uppercase tracking-widest text-sm transition-all duration-300 hover:shadow-lg disabled:opacity-70 disabled:cursor-not-allowed group relative overflow-hidden"
                        style={{ backgroundColor: "#C4922A" }}
                      >
                        <span className="relative z-10 flex items-center gap-2">
                          {status === "loading" ? (
                            <>
                              <Loader2 className="w-4 h-4 animate-spin" />
                              Procesando...
                            </>
                          ) : (
                            "Confirmar Reserva"
                          )}
                        </span>
                        <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
                      </button>
                    </motion.div>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}