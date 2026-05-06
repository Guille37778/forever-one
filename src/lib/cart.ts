import { supabase } from './supabase';

/**
 * ATELIER CART SYSTEM (BETA)
 * Centralized logic for cart management and Supabase synchronization.
 */

let cart: any[] = [];
let isSyncing = false;
let dollarRate = 0;

const el = (id: string) => document.getElementById(id);

const getAuth = () => {
    const Alpine = (window as any).Alpine;
    if (!Alpine) return { isLoggedIn: false };
    return Alpine.store('auth') || { isLoggedIn: false };
};

export const loadCart = () => {
    try {
        const raw = JSON.parse(localStorage.getItem('fo1_cart') || '[]');
        cart = raw.map((i: any) => ({ 
            ...i, 
            precio: parseFloat(String(i.precio || '0').replace(',', '.')), 
            qty: parseInt(i.qty) || 1 
        })).filter((i: any) => i.nombre && i.id);
    } catch(e) { 
        cart = []; 
    }
};

export const saveCart = (fromSync = false) => {
    localStorage.setItem('fo1_cart', JSON.stringify(cart));
    
    if (!fromSync) {
        const auth = getAuth();
        if (auth.isLoggedIn && auth.user) {
            syncCartWithDB();
        }
    }
};

export const cartTotal = () => cart.reduce((s, i) => s + (i.precio * i.qty), 0);

export const syncCartWithDB = async () => {
    if (isSyncing) return;
    const auth = getAuth();
    if (!auth.isLoggedIn || !auth.user) return;

    isSyncing = true;
    try {
        // 1. Get current local state
        const localCart = [...cart];
        
        // PRUNING: Remove items from DB that are not in local cart
        const { data: dbItemsBefore, error: pullBeforeError } = await supabase
            .from('cart_items')
            .select('product_id, size')
            .eq('user_id', auth.user.id);

        if (!pullBeforeError && dbItemsBefore) {
            for (const dbItem of dbItemsBefore) {
                const stillExists = localCart.find(lc => lc.id === dbItem.product_id && lc.size === dbItem.size);
                if (!stillExists) {
                    await supabase.from('cart_items')
                        .delete()
                        .eq('user_id', auth.user.id)
                        .eq('product_id', dbItem.product_id)
                        .eq('size', dbItem.size);
                }
            }
        }

        if (localCart.length > 0) {
            const upsertData = localCart.map(item => ({
                user_id: auth.user.id,
                product_id: item.id,
                variant_id: item.variantId || null,
                name: item.nombre,
                size: item.size || '',
                price: item.precio,
                qty: item.qty,
                image_url: item.image_url || (item.imagenes?.[0]) || ''
            }));

            // Batch upsert to DB
            const { error: upsertError } = await supabase
                .from('cart_items')
                .upsert(upsertData, { onConflict: 'user_id,product_id,size' });
            
            if (upsertError) throw upsertError;
        }

        // 2. Pull final state to merge any other devices' data
        const { data: dbItems, error: pullError } = await supabase
            .from('cart_items')
            .select('*')
            .eq('user_id', auth.user.id);

        if (pullError) throw pullError;

        if (dbItems) {
            // MERGE LOGIC: Prefer local higher quantity or newer items if possible
            // But for now, simple overwrite from DB is standard for "Sync" 
            // BUT only if local hasn't changed *during* this async call.
            
            const syncedCart = dbItems.map((i: any) => ({
                id: i.product_id,
                variantId: i.variant_id,
                nombre: i.name,
                size: i.size || 'UNICO',
                precio: i.price,
                qty: i.qty,
                image_url: i.image_url
            }));

            // Check if local cart changed since we started
            const currentLocalRaw = JSON.stringify(cart);
            const startedLocalRaw = JSON.stringify(localCart);
            
            if (currentLocalRaw === startedLocalRaw) {
                cart = syncedCart;
                saveCart(true); 
                (window as any).__renderCart?.();
            } else {
                // If local changed, we trigger another sync soon or just let the next one handle it
                console.log('Cart changed during sync, skipping overwrite to avoid state loss');
            }
        }
    } catch (e) {
        console.error('Cart Sync Error:', e);
    } finally {
        isSyncing = false;
    }
};

// Global Exposure for templates
if (typeof window !== 'undefined') {
    (window as any).__addToCart = (product: any) => {
        const auth = getAuth();
        if (!auth.isLoggedIn) {
            auth.toggleModal?.(true);
            return;
        }

        if(!product || parseInt(product.stock) <= 0) return;
        
        const size = product.selectedSize || 'UNICO';
        const existing = cart.find(i => i.id === product.id && i.size === size);
        
        if(existing) {
            if(existing.qty >= parseInt(product.stock)) { 
                alert('✦ Stock máximo alcanzado'); 
                return; 
            }
            existing.qty++;
        } else {
            cart.push({ ...product, qty: 1, size: size, image_url: product.image_url || product.imagen });
        }
        
        saveCart();
        (window as any).__renderCart?.();

        // Feedback
        let t = el('fo1-toast');
        if(!t) {
            t = document.createElement('div');
            t.id = 'fo1-toast';
            t.style.cssText = 'position:fixed; z-index:9000; bottom:40px; left:50%; transform:translateX(-50%); background:rgba(10,10,10,0.95); color:#f3cf7a; padding:16px 32px; font-size:11px; font-weight:900; text-transform:uppercase; letter-spacing:0.35em; border:1px solid rgba(184,134,11,0.5); pointer-events:none; transition:opacity 0.5s; opacity:0;';
            document.body.appendChild(t);
        }
        t.textContent = '✓ Producto añadido';
        t.style.opacity = '1';
        setTimeout(() => t!.style.opacity = '0', 2500);
    };

    (window as any).__removeFromCart = async (productId: string, size: string = '') => {
        cart = cart.filter(i => !(i.id === productId && i.size === size));
        saveCart();
        (window as any).__renderCart?.();

        // Sync deletion to DB if logged in
        const auth = getAuth();
        if (auth.isLoggedIn && auth.user) {
            try {
                await supabase
                    .from('cart_items')
                    .delete()
                    .eq('user_id', auth.user.id)
                    .eq('product_id', productId)
                    .eq('size', size);
            } catch (e) {
                console.error('Delete Sync Error:', e);
            }
        }
    };

    (window as any).__updateQty = (productId: string, delta: number, size: string = '') => {
        const item = cart.find(i => i.id === productId && i.size === size);
        if(!item) return;
        const newQty = item.qty + delta;
        if(newQty <= 0) { (window as any).__removeFromCart(productId, size); return; }
        item.qty = newQty;
        saveCart();
        (window as any).__renderCart?.();
    };

    (window as any).__syncCartWithDB = syncCartWithDB;
    (window as any).__getCartTotal = cartTotal;
    (window as any).__getCart = () => cart;
    (window as any).__setDollarRate = (rate: number) => { dollarRate = rate; };

    let selectedMethod = 'retiro';
    let selectedCourier = 'Zoom';

    (window as any).__setDeliveryMethod = (meth: string) => {
        selectedMethod = meth;
        (window as any).__updateDeliveryUI?.();
    };

    (window as any).__setCourier = (cour: string) => {
        selectedCourier = cour;
        (window as any).__updateDeliveryUI?.();
    };

    (window as any).__getDeliveryData = () => ({ selectedMethod, selectedCourier });
}
