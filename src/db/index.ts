import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './schema';

// Esta conexión SOLO se usa en el servidor (Astro SSR / Actions)
// NUNCA en el cliente/browser
const connectionString = process.env.SUPABASE_URL + '';

// Para Supabase, usamos la connection string de PostgreSQL directa
// (la obtendremos de Supabase → Settings → Database → Connection string)
const client = postgres(connectionString, { prepare: false });

export const db = drizzle(client, { schema });
