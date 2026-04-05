// Forever One — Product Analytics Engine
// Monitoriza vistas y tiempo de visualización por producto

class ProductAnalytics {
  private observers: Map<string, IntersectionObserver> = new Map();
  private timers: Map<string, number> = new Map();
  private viewThreshold = 0.5; // El producto debe estar al menos 50% visible

  constructor() {}

  /**
   * Registra un clic en WhatsApp para un producto específico
   */
  public async trackWhatsAppClick(productId: string) {
    await fetch('/api/stats', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ productId, whatsappClick: true })
    });
  }

  /**
   * Monitoriza cuando un producto entra o sale de la pantalla
   */
  public watch(productId: string, element: HTMLElement) {
    if (this.observers.has(productId)) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Inicia cronómetro
          this.timers.set(productId, Date.now());
          // Registra una vista inicial
          this.trackView(productId);
        } else {
          // Detiene cronómetro y envía tiempo total
          this.flushTime(productId);
        }
      });
    }, { threshold: this.viewThreshold });

    observer.observe(element);
    this.observers.set(productId, observer);
  }

  private async trackView(productId: string) {
    await fetch('/api/stats', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ productId, incrementViews: true })
    });
  }

  private async flushTime(productId: string) {
    const startTime = this.timers.get(productId);
    if (!startTime) return;

    const endTime = Date.now();
    const durationSeconds = Math.round((endTime - startTime) / 1000);
    
    // Solo enviamos si estuvo más de 2 segundos (vistas accidentales no cuentan)
    if (durationSeconds >= 2) {
      await fetch('/api/stats', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productId, timeSpent: durationSeconds })
      });
    }

    this.timers.delete(productId);
  }
}

export const analytics = new ProductAnalytics();
