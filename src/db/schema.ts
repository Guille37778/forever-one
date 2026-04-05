import { pgTable, uuid, text, integer, numeric, boolean, timestamp, pgEnum } from 'drizzle-orm/pg-core';

// =============================================
// ENUMS
// =============================================
export const sizeEnum = pgEnum('size', ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'UNICO']);
export const orderStatusEnum = pgEnum('order_status', ['verificando', 'preparando', 'enviado', 'entregado', 'cancelado']);
export const courierEnum = pgEnum('courier', ['zoom', 'tealca', 'mrw', 'dhl', 'otro']);

// =============================================
// COLECCIONES (Temporadas / Drops)
// =============================================
export const collections = pgTable('collections', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: text('name').notNull(),                         // "Atemporal", "Invierno 2025"
  slug: text('slug').notNull().unique(),                // "atemporal", "invierno-2025"
  description: text('description'),
  isActive: boolean('is_active').default(true),
  createdAt: timestamp('created_at').defaultNow(),
});

// =============================================
// SUBCATEGORÍAS
// =============================================
export const subcategories = pgTable('subcategories', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: text('name').notNull(),                         // "Pantalones", "Vestidos"
  slug: text('slug').notNull().unique(),                // "pantalones", "vestidos"
  parentCategory: text('parent_category').notNull(),    // "ropa", "accesorios"
  createdAt: timestamp('created_at').defaultNow(),
});

// =============================================
// PRODUCTOS
// =============================================
export const products = pgTable('products', {
  id: uuid('id').primaryKey().defaultRandom(),
  collectionId: uuid('collection_id').references(() => collections.id),
  name: text('name').notNull(),                         // "Chaqueta Distinción"
  description: text('description'),                    // Texto de lujo
  price: numeric('price', { precision: 10, scale: 2 }).notNull(), // Precio en USD
  category: text('category').default('ropa'),          // "ropa", "accesorios"
  subcategoryId: uuid('subcategory_id').references(() => subcategories.id),
  imageUrls: text('image_urls').array(),               // Array de URLs de fotos
  isActive: boolean('is_active').default(true),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

// =============================================
// VARIANTES (Stock por Talla)
// =============================================
export const variants = pgTable('variants', {
  id: uuid('id').primaryKey().defaultRandom(),
  productId: uuid('product_id').references(() => products.id).notNull(),
  size: sizeEnum('size').notNull(),
  stockQuantity: integer('stock_quantity').default(0).notNull(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

// =============================================
// PERFILES DE CLIENTES
// =============================================
export const profiles = pgTable('profiles', {
  id: uuid('id').primaryKey(),                         // Mismo UUID que Supabase Auth
  fullName: text('full_name'),
  email: text('email').notNull().unique(),
  city: text('city'),
  totalOrders: integer('total_orders').default(0),
  createdAt: timestamp('created_at').defaultNow(),
});

// =============================================
// ÓRDENES / PEDIDOS
// =============================================
export const orders = pgTable('orders', {
  id: uuid('id').primaryKey().defaultRandom(),
  orderCode: text('order_code').notNull().unique(),    // "FO-001", "FO-002"
  profileId: uuid('profile_id').references(() => profiles.id),
  customerName: text('customer_name').notNull(),
  customerEmail: text('customer_email').notNull(),
  customerPhone: text('customer_phone'),
  city: text('city'),
  courier: courierEnum('courier'),
  totalUsd: numeric('total_usd', { precision: 10, scale: 2 }).notNull(),
  paymentReference: text('payment_reference'),
  screenshotUrl: text('screenshot_url'),
  trackingNumber: text('tracking_number'),
  status: orderStatusEnum('status').default('verificando'),
  notes: text('notes'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

// =============================================
// ITEMS DE ÓRDENES
// =============================================
export const orderItems = pgTable('order_items', {
  id: uuid('id').primaryKey().defaultRandom(),
  orderId: uuid('order_id').references(() => orders.id).notNull(),
  productId: uuid('product_id').references(() => products.id).notNull(),
  variantId: uuid('variant_id').references(() => variants.id),
  productName: text('product_name').notNull(),         // Snapshot del nombre
  size: text('size'),
  priceUsd: numeric('price_usd', { precision: 10, scale: 2 }).notNull(),
  quantity: integer('quantity').default(1).notNull(),
});

// =============================================
// ANALYTICS (Inteligencia de Marca)
// =============================================
export const productStats = pgTable('product_stats', {
  id: uuid('id').primaryKey().defaultRandom(),
  productId: uuid('product_id').references(() => products.id).notNull().unique(),
  views: integer('views').default(0),
  whatsappClicks: integer('whatsapp_clicks').default(0),
  avgTimeOnPageSeconds: integer('avg_time_on_page_seconds').default(0),
  cityInterest: text('city_interest'),
  createdAt: timestamp('created_at').defaultNow(),
});

// =============================================
// LEADS (Marketing)
// =============================================
export const leads = pgTable('leads', {
  id: uuid('id').primaryKey().defaultRandom(),
  email: text('email').notNull().unique(),
  source: text('source'),                              // "popup", "footer", "whatsapp"
  createdAt: timestamp('created_at').defaultNow(),
});

// =============================================
// CONFIGURACIÓN GLOBAL (Tasa BCV, etc)
// =============================================
export const siteSettings = pgTable('site_settings', {
  id: uuid('id').primaryKey().defaultRandom(),
  key: text('key').notNull().unique(),                 // "bcv_usd_rate"
  value: text('value').notNull(),                      // "47.50"
  updatedAt: timestamp('updated_at').defaultNow(),
});
