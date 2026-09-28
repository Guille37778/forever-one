import type { APIRoute } from 'astro';
import { supabaseAdmin } from '../../../lib/supabase';

// GET /api/suppliers/stats — Estadísticas globales del módulo de proveedores
export const GET: APIRoute = async () => {
  try {
    // Total de proveedores activos
    const { count: totalActive } = await supabaseAdmin
      .from('suppliers')
      .select('*', { count: 'exact', head: true })
      .eq('is_active', true);

    // Total de proveedores inactivos
    const { count: totalInactive } = await supabaseAdmin
      .from('suppliers')
      .select('*', { count: 'exact', head: true })
      .eq('is_active', false);

    // Todas las compras para cálculos
    const { data: allPurchases } = await supabaseAdmin
      .from('supplier_purchases')
      .select('supplier_id, total_usd, purchase_date, quality_rating, punctuality_rating, communication_rating, price_rating');

    const purchases = allPurchases || [];

    // Total gastado en USD
    const totalSpentUsd = purchases.reduce((sum, p) => sum + (parseFloat(p.total_usd) || 0), 0);

    // Gastos por proveedor
    const spentBySupplier: Record<string, number> = {};
    const purchaseCountBySupplier: Record<string, number> = {};
    const lastPurchaseBySupplier: Record<string, string> = {};
    const ratingsBySupplier: Record<string, { total: number; count: number }> = {};

    for (const p of purchases) {
      const sid = p.supplier_id;
      spentBySupplier[sid] = (spentBySupplier[sid] || 0) + (parseFloat(p.total_usd) || 0);
      purchaseCountBySupplier[sid] = (purchaseCountBySupplier[sid] || 0) + 1;

      if (!lastPurchaseBySupplier[sid] || p.purchase_date > lastPurchaseBySupplier[sid]) {
        lastPurchaseBySupplier[sid] = p.purchase_date;
      }

      // Calcular rating promedio de la compra
      const ratings = [p.quality_rating, p.punctuality_rating, p.communication_rating, p.price_rating].filter(Boolean);
      if (ratings.length > 0) {
        const avgRating = ratings.reduce((a, b) => a + b, 0) / ratings.length;
        if (!ratingsBySupplier[sid]) ratingsBySupplier[sid] = { total: 0, count: 0 };
        ratingsBySupplier[sid].total += avgRating;
        ratingsBySupplier[sid].count += 1;
      }
    }

    // Top proveedores por gasto
    const topBySpend = Object.entries(spentBySupplier)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 5)
      .map(([id, total]) => ({ supplier_id: id, total_usd: total }));

    // Proveedores con mejor rating promedio
    const topByRating = Object.entries(ratingsBySupplier)
      .map(([id, r]) => ({ supplier_id: id, avg_rating: r.total / r.count }))
      .sort((a, b) => b.avg_rating - a.avg_rating)
      .slice(0, 5);

    // Proveedores con reabastecimiento próximo
    const { data: upcomingRestock } = await supabaseAdmin
      .from('suppliers')
      .select('id, company_name, next_restock_date')
      .not('next_restock_date', 'is', null)
      .gte('next_restock_date', new Date().toISOString().split('T')[0])
      .order('next_restock_date', { ascending: true })
      .limit(10);

    // Gastos por mes (últimos 12 meses)
    const monthlySpend: Record<string, number> = {};
    for (const p of purchases) {
      const month = p.purchase_date?.substring(0, 7); // "2025-09"
      if (month) {
        monthlySpend[month] = (monthlySpend[month] || 0) + (parseFloat(p.total_usd) || 0);
      }
    }

    // Todas las etiquetas únicas
    const { data: allSuppliers } = await supabaseAdmin
      .from('suppliers')
      .select('tags');

    const allTags = new Set<string>();
    for (const s of allSuppliers || []) {
      if (s.tags) {
        for (const t of s.tags) allTags.add(t);
      }
    }

    return new Response(JSON.stringify({
      totalActive: totalActive || 0,
      totalInactive: totalInactive || 0,
      totalSpentUsd: Math.round(totalSpentUsd * 100) / 100,
      totalPurchases: purchases.length,
      topBySpend,
      topByRating,
      upcomingRestock: upcomingRestock || [],
      monthlySpend,
      allTags: Array.from(allTags).sort(),
      spentBySupplier,
      purchaseCountBySupplier,
      lastPurchaseBySupplier,
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err: any) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
