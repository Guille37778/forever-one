# Cómo restaurar el servicio de Asesorías

Para volver a habilitar la página de Asesorías en el sitio web, siga estos pasos:

1. **Restaurar el archivo de la página**:
   - Renombre el archivo `src/pages/_asesorias.astro.bak` a `src/pages/asesorias.astro`.
   - Astro detectará automáticamente el archivo y creará la ruta `/asesorias`.

2. **Habilitar los enlaces de navegación**:
   - En `src/components/Header.astro`, descomente las líneas que contienen el enlace a `/asesorias`.
   - En `src/components/Footer.astro`, descomente las líneas similares.

3. **Restaurar las secciones de la página de inicio**:
   - En `src/pages/index.astro`, vuelva a añadir el componente `<PersonalShopper />` al layout.
   - En `src/components/sections/Collections.astro`, descomente la sección "Shopping Concierge".

---
*Nota: Este archivo fue creado automáticamente al suspender temporalmente el servicio.*
