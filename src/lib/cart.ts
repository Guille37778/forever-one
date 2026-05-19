import { supabase } from './supabase';

/**
 * ATELIER CART SYSTEM (BETA)
 * Centralized logic for cart management.
 */

let cart: any[] = [];
let dollarRate = 0;

const el = (id: string) => document.getElementById(id);

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

export const saveCart = (_fromSync = false) => {
    localStorage.setItem('fo1_cart', JSON.stringify(cart));
};

export const cartTotal = () => cart.reduce((s, i) => s + (i.precio * i.qty), 0);

// Global Exposure for templates
if (typeof window !== 'undefined') {
    (window as any).__addToCart = (product: any) => {
        console.log('__addToCart called with:', product);
        if(!product) {
            console.log('__addToCart: product is falsy');
            return;
        }
        console.log('product.stock:', product.stock, 'parsed:', parseInt(product.stock));
        if(parseInt(product.stock) <= 0) {
            console.log('__addToCart: stock is <= 0, returning');
            return;
        }
        
        const size = product.selectedSize || 'UNICO';
        const color = product.selectedColor || '';
        const qtyToAdd = parseInt(product.qty) || 1;
        const existing = cart.find(i => i.id === product.id && i.size === size && (i.color || '') === color);
        
        if(existing) {
            if(existing.qty + qtyToAdd > parseInt(product.stock)) { 
                alert('✦ Stock máximo alcanzado'); 
                return; 
            }
            existing.qty += qtyToAdd;
        } else {
            cart.push({ ...product, qty: qtyToAdd, size: size, color: color, image_url: product.image_url || product.imagen });
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

    (window as any).__removeFromCart = (productId: string, size: string = '', color: string = '') => {
        cart = cart.filter(i => !(i.id === productId && i.size === size && (i.color || '') === color));
        saveCart();
        (window as any).__renderCart?.();
    };

    (window as any).__removeAllOfProduct = (productId: string) => {
        cart = cart.filter(i => i.id !== productId);
        saveCart();
        (window as any).__renderCart?.();
    };

    (window as any).__updateQty = (productId: string, delta: number, size: string = '', color: string = '') => {
        const item = cart.find(i => i.id === productId && i.size === size && (i.color || '') === color);
        if(!item) return;
        const newQty = item.qty + delta;
        if(newQty <= 0) { (window as any).__removeFromCart(productId, size, color); return; }
        item.qty = newQty;
        saveCart();
        (window as any).__renderCart?.();
    };

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
