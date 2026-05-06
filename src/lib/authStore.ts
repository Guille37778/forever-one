import { supabase } from './supabase';

// Global Alpine.js Store for Authentication
export const initAuthStore = () => {
    if (typeof window === 'undefined') return;

    // @ts-ignore
    const Alpine = window.Alpine;
    if (!Alpine) return;

    Alpine.store('auth', {
        user: null,
        profile: null,
        isLoggedIn: false,
        isLoading: true,
        showModal: false,

        async init() {
            // Get initial session
            const { data: { session } } = await supabase.auth.getSession();
            await this.handleAuthStateChange(session);

            // Listen for auth state changes (login, logout, token refresh, OTP verify)
            supabase.auth.onAuthStateChange(async (_event: string, session: any) => {
                if (_event === 'SIGNED_IN' || _event === 'TOKEN_REFRESHED' || _event === 'INITIAL_SESSION' || _event === 'USER_UPDATED') {
                    await this.handleAuthStateChange(session);
                } else if (_event === 'SIGNED_OUT') {
                    this.user = null;
                    this.profile = null;
                    this.isLoggedIn = false;
                    this.isLoading = false;
                }
            });
        },

        async handleAuthStateChange(session: any) {
            this.isLoading = true;
            if (session) {
                this.user = session.user;
                this.isLoggedIn = true;

                // Try to load the existing profile first
                let { data: profile } = await supabase
                    .from('profiles')
                    .select('*')
                    .eq('id', session.user.id)
                    .single();

                // If no profile exists yet (first login), create it via the secure API
                if (!profile) {
                    try {
                        const res = await fetch('/api/auth/sync-profile', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                                'Authorization': `Bearer ${session.access_token}`
                            }
                        });
                        if (res.ok) {
                            const data = await res.json();
                            profile = data.profile;
                        }
                    } catch (e) {
                        console.warn('[authStore] Could not sync profile:', e);
                    }
                }

                // Fallback: populate name from Google metadata if DB profile is missing/empty
                if (!profile?.full_name) {
                    const meta = session.user.user_metadata || {};
                    const fallbackName = meta.full_name || meta.name || session.user.email?.split('@')[0] || 'Cliente';
                    if (profile) {
                        profile.full_name = fallbackName;
                    } else {
                        profile = { full_name: fallbackName, email: session.user.email };
                    }
                }

                this.profile = profile;

                // Trigger cart sync
                if ((window as any).__syncCartWithDB) {
                    (window as any).__syncCartWithDB();
                }
            } else {
                this.user = null;
                this.profile = null;
                this.isLoggedIn = false;
            }
            this.isLoading = false;
        },

        async loginWithGoogle() {
            const { error } = await supabase.auth.signInWithOAuth({
                provider: 'google',
                options: {
                    redirectTo: window.location.origin + '/auth/callback'
                }
            });
            if (error) console.error('Login error:', error.message);
        },

        async logout() {
            await supabase.auth.signOut();
            localStorage.removeItem('fo1_cart'); // Clear local cart on logout
            window.location.reload();
        },

        toggleModal(val: boolean) {
            this.showModal = val;
            if (val) document.body.style.overflow = 'hidden';
            else document.body.style.overflow = '';
        }
    });
};

// Also expose to window for the inline script
if (typeof window !== 'undefined') {
    (window as any).initAuthStore = initAuthStore;
}
