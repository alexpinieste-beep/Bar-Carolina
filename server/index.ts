import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import Database from "better-sqlite3";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import crypto from "crypto";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ── Database setup ──────────────────────────────────────────────────────────

const dataDir = path.join(__dirname, "../data");
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

const db = new Database(path.join(dataDir, "restaurant.db"));

db.pragma("journal_mode = WAL");
db.pragma("foreign_keys = ON");

db.exec(`
  CREATE TABLE IF NOT EXISTS reservations (
    id          TEXT PRIMARY KEY,
    name        TEXT NOT NULL,
    email       TEXT NOT NULL,
    phone       TEXT NOT NULL,
    date        TEXT NOT NULL,
    time        TEXT NOT NULL,
    people      INTEGER NOT NULL,
    notes       TEXT,
    created_at  TEXT NOT NULL DEFAULT (datetime('now'))
  );

  CREATE TABLE IF NOT EXISTS contacts (
    id          TEXT PRIMARY KEY,
    name        TEXT NOT NULL,
    email       TEXT NOT NULL,
    message     TEXT NOT NULL,
    created_at  TEXT NOT NULL DEFAULT (datetime('now'))
  );
`);

// ── Prepared statements ─────────────────────────────────────────────────────

const insertReservation = db.prepare(`
  INSERT INTO reservations (id, name, email, phone, date, time, people, notes)
  VALUES (@id, @name, @email, @phone, @date, @time, @people, @notes)
`);

const insertContact = db.prepare(`
  INSERT INTO contacts (id, name, email, message)
  VALUES (@id, @name, @email, @message)
`);

// ── Types ───────────────────────────────────────────────────────────────────

interface ReservationBody {
  name?: string;
  email?: string;
  phone?: string;
  date?: string;
  time?: string;
  people?: number | string;
  notes?: string;
}

interface ContactBody {
  name?: string;
  email?: string;
  message?: string;
}

interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  allergens?: string[];
  isVegetarian?: boolean;
  isGlutenFree?: boolean;
}

interface MenuCategory {
  id: string;
  name: string;
  description?: string;
  items: MenuItem[];
}

// ── Menu data ───────────────────────────────────────────────────────────────

const menu: { categories: MenuCategory[] } = {
  categories: [
    {
      id: "starters",
      name: "Entrantes",
      description: "Para abrir el apetito",
      items: [
        {
          id: "s1",
          name: "Croquetas de la abuela",
          description: "Croquetas caseras de jamón ibérico con bechamel cremosa",
          price: 8.5,
          allergens: ["gluten", "lactose", "egg"],
        },
        {
          id: "s2",
          name: "Patatas bravas",
          description: "Patatas fritas con salsa brava picante y alioli casero",
          price: 6.5,
          allergens: ["egg"],
          isVegetarian: true,
          isGlutenFree: true,
        },
        {
          id: "s3",
          name: "Gambas al ajillo",
          description: "Gambas salteadas en aceite de oliva virgen extra con ajo y guindilla",
          price: 12.0,
          allergens: ["shellfish"],
          isGlutenFree: true,
        },
        {
          id: "s4",
          name: "Tabla de quesos",
          description: "Selección de quesos artesanales con membrillo y nueces",
          price: 14.0,
          allergens: ["lactose", "nuts"],
          isVegetarian: true,
          isGlutenFree: true,
        },
        {
          id: "s5",
          name: "Pan con tomate",
          description: "Pan de cristal tostado con tomate triturado y aceite de oliva",
          price: 4.0,
          allergens: ["gluten"],
          isVegetarian: true,
        },
      ],
    },
    {
      id: "salads",
      name: "Ensaladas",
      description: "Frescas y naturales",
      items: [
        {
          id: "sal1",
          name: "Ensalada de la casa",
          description: "Lechuga, tomate, cebolla, aceitunas, huevo duro y atún",
          price: 9.0,
          allergens: ["egg", "fish"],
          isGlutenFree: true,
        },
        {
          id: "sal2",
          name: "Ensalada César",
          description: "Lechuga romana, pollo a la plancha, parmesano, picatostes y salsa César",
          price: 11.5,
          allergens: ["gluten", "egg", "lactose", "fish"],
        },
        {
          id: "sal3",
          name: "Ensalada caprese",
          description: "Tomate fresco, mozzarella di bufala, albahaca y aceite de oliva virgen extra",
          price: 10.0,
          allergens: ["lactose"],
          isVegetarian: true,
          isGlutenFree: true,
        },
      ],
    },
    {
      id: "tapas",
      name: "Tapas y Raciones",
      description: "Nuestra especialidad",
      items: [
        {
          id: "t1",
          name: "Calamares a la romana",
          description: "Anillas de calamar rebozadas y fritas, servidas con limón y alioli",
          price: 13.0,
          allergens: ["gluten", "egg", "fish"],
        },
        {
          id: "t2",
          name: "Pulpo a la gallega",
          description: "Pulpo cocido sobre cama de patata, pimentón de la Vera y aceite de oliva",
          price: 18.0,
          allergens: ["shellfish"],
          isGlutenFree: true,
        },
        {
          id: "t3",
          name: "Pimientos de Padrón",
          description: "Pimientos de Padrón fritos con sal gruesa",
          price: 7.0,
          isVegetarian: true,
          isGlutenFree: true,
        },
        {
          id: "t4",
          name: "Jamón ibérico de bellota",
          description: "Lonchas de jamón ibérico de bellota 100% pata negra",
          price: 22.0,
          isGlutenFree: true,
        },
        {
          id: "t5",
          name: "Tortilla española",
          description: "Tortilla de patatas casera, jugosa por dentro, con o sin cebolla",
          price: 9.5,
          allergens: ["egg"],
          isVegetarian: true,
          isGlutenFree: true,
        },
        {
          id: "t6",
          name: "Albóndigas en salsa",
          description: "Albóndigas de ternera en salsa de tomate casera con hierbas aromáticas",
          price: 11.0,
          allergens: ["gluten", "egg"],
        },
      ],
    },
    {
      id: "mains",
      name: "Platos Principales",
      description: "Cocina tradicional española",
      items: [
        {
          id: "m1",
          name: "Cocido madrileño",
          description: "Cocido tradicional con garbanzos, verduras, carne de ternera, chorizo y morcilla",
          price: 19.0,
          allergens: ["gluten"],
        },
        {
          id: "m2",
          name: "Paella valenciana",
          description: "Paella tradicional con pollo, conejo, judías verdes y garrofó (mínimo 2 personas)",
          price: 16.5,
          allergens: ["shellfish"],
          isGlutenFree: true,
        },
        {
          id: "m3",
          name: "Bacalao al pil-pil",
          description: "Bacalao desalado cocinado en aceite de oliva con ajo y guindilla",
          price: 21.0,
          allergens: ["fish"],
          isGlutenFree: true,
        },
        {
          id: "m4",
          name: "Entrecot de ternera",
          description: "Entrecot de ternera a la parrilla con patatas fritas y pimientos asados",
          price: 24.0,
          isGlutenFree: true,
        },
        {
          id: "m5",
          name: "Pollo al chilindrón",
          description: "Pollo guisado con pimientos, tomate, cebolla y jamón serrano",
          price: 17.0,
          isGlutenFree: true,
        },
        {
          id: "m6",
          name: "Menestra de verduras",
          description: "Verduras de temporada estofadas con jamón serrano",
          price: 14.0,
          isGlutenFree: true,
        },
      ],
    },
    {
      id: "desserts",
      name: "Postres",
      description: "El dulce final",
      items: [
        {
          id: "d1",
          name: "Crema catalana",
          description: "Crema catalana tradicional con azúcar quemado",
          price: 6.0,
          allergens: ["egg", "lactose"],
          isVegetarian: true,
          isGlutenFree: true,
        },
        {
          id: "d2",
          name: "Tarta de Santiago",
          description: "Tarta de almendra tradicional gallega con azúcar glas",
          price: 6.5,
          allergens: ["nuts", "egg"],
          isVegetarian: true,
          isGlutenFree: true,
        },
        {
          id: "d3",
          name: "Flan casero",
          description: "Flan de huevo casero con caramelo líquido",
          price: 5.5,
          allergens: ["egg", "lactose"],
          isVegetarian: true,
          isGlutenFree: true,
        },
        {
          id: "d4",
          name: "Churros con chocolate",
          description: "Churros artesanales con chocolate caliente a la taza",
          price: 7.0,
          allergens: ["gluten", "lactose"],
          isVegetarian: true,
        },
        {
          id: "d5",
          name: "Helado artesanal",
          description: "Bola de helado artesanal a elegir: vainilla, chocolate o turrón",
          price: 4.5,
          allergens: ["lactose", "egg"],
          isVegetarian: true,
          is