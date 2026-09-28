import { pgTable, uuid, text, integer, numeric, boolean, timestamp, date } from 'drizzle-orm/pg-core';

// =============================================
// MÓDULO DE PROVEEDORES — Schema Independiente
// Este archivo es 100% aislado de schema.ts
// No contiene foreign keys hacia tablas existentes
// =============================================

// =============================================
// PROVEEDORES
// =============================================
export const suppliers = pgTable('suppliers', {
  id: uuid('id').primaryKey().defaultRandom(),
  companyName: text('company_name').notNull(),           // Nombre de la empresa / marca
  contactPerson: text('contact_person'),                 // Persona de contacto
  email: text('email'),                                  // Email principal
  phone: text('phone'),                                  // Teléfono principal
  phoneSecondary: text('phone_secondary'),               // Teléfono secundario
  city: text('city'),                                    // Ciudad (compras nacionales)
  address: text('address'),                              // Dirección física
  website: text('website'),                              // Sitio web
  notes: text('notes'),                                  // Notas internas libres
  paymentTerms: text('payment_terms'),                   // Condiciones de pago
  tags: text('tags').array(),                            // Etiquetas: "mayorista", "premium", etc.
  isActive: boolean('is_active').default(true),          // Activo / Inactivo
  isConfidential: boolean('is_confidential').default(false), // Proveedor confidencial
  nextRestockDate: date('next_restock_date'),             // Fecha estimada próxima compra
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

// =============================================
// PERFILES DE REDES SOCIALES DEL PROVEEDOR
// =============================================
export const supplierSocialProfiles = pgTable('supplier_social_profiles', {
  id: uuid('id').primaryKey().defaultRandom(),
  supplierId: uuid('supplier_id').references(() => suppliers.id, { onDelete: 'cascade' }).notNull(),
  platform: text('platform').notNull(),                  // "instagram", "whatsapp", "tiktok", "facebook", "telegram"
  handle: text('handle'),                                // @usuario o nombre
  url: text('url'),                                      // Link directo al perfil
});

// =============================================
// HISTORIAL DE COMPRAS AL PROVEEDOR
// =============================================
export const supplierPurchases = pgTable('supplier_purchases', {
  id: uuid('id').primaryKey().defaultRandom(),
  supplierId: uuid('supplier_id').references(() => suppliers.id, { onDelete: 'cascade' }).notNull(),
  purchaseDate: date('purchase_date').notNull(),          // Fecha de la compra
  referenceCode: text('reference_code'),                  // Código de referencia / factura
  description: text('description'),                       // Qué se compró (texto libre)
  totalUsd: numeric('total_usd', { precision: 10, scale: 2 }), // Monto en USD
  totalLocal: numeric('total_local', { precision: 12, scale: 2 }), // Monto en moneda local
  currencyLocal: text('currency_local').default('VES'),   // Moneda local
  paymentMethod: text('payment_method'),                  // Transferencia, Zelle, Binance, efectivo...
  itemsSummary: text('items_summary').array(),             // ["50 blusas", "30 faldas"]
  notes: text('notes'),                                   // Notas de la compra
  // Calificaciones por compra (idea #5: Sistema de Calificación)
  qualityRating: integer('quality_rating'),                // 1-5 estrellas: calidad del producto
  punctualityRating: integer('punctuality_rating'),        // 1-5 estrellas: puntualidad de entrega
  communicationRating: integer('communication_rating'),    // 1-5 estrellas: comunicación
  priceRating: integer('price_rating'),                    // 1-5 estrellas: relación precio/calidad
  createdAt: timestamp('created_at').defaultNow(),
});

// =============================================
// DOCUMENTOS ADJUNTOS DEL PROVEEDOR
// =============================================
export const supplierDocuments = pgTable('supplier_documents', {
  id: uuid('id').primaryKey().defaultRandom(),
  supplierId: uuid('supplier_id').references(() => suppliers.id, { onDelete: 'cascade' }).notNull(),
  name: text('name').notNull(),                           // Nombre del documento
  fileUrl: text('file_url').notNull(),                    // URL del archivo (Supabase Storage)
  fileType: text('file_type'),                            // "pdf", "image", "excel", "doc"
  uploadedAt: timestamp('uploaded_at').defaultNow(),
});
