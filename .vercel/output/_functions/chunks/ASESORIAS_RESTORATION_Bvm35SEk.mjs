import { c as createComponent } from './astro-component_D3bPY0Kc.mjs';
import 'piccolore';
import { B as maybeRenderHead, b7 as unescapeHTML, Q as renderTemplate } from './sequence_BZ_GwenZ.mjs';
import 'clsx';

const html = () => "<h1 id=\"cómo-restaurar-el-servicio-de-asesorías\">Cómo restaurar el servicio de Asesorías</h1>\n<p>Para volver a habilitar la página de Asesorías en el sitio web, siga estos pasos:</p>\n<ol>\n<li>\n<p><strong>Restaurar el archivo de la página</strong>:</p>\n<ul>\n<li>Renombre el archivo <code>src/pages/_asesorias.astro.bak</code> a <code>src/pages/asesorias.astro</code>.</li>\n<li>Astro detectará automáticamente el archivo y creará la ruta <code>/asesorias</code>.</li>\n</ul>\n</li>\n<li>\n<p><strong>Habilitar los enlaces de navegación</strong>:</p>\n<ul>\n<li>En <code>src/components/Header.astro</code>, descomente las líneas que contienen el enlace a <code>/asesorias</code>.</li>\n<li>En <code>src/components/Footer.astro</code>, descomente las líneas similares.</li>\n</ul>\n</li>\n<li>\n<p><strong>Restaurar las secciones de la página de inicio</strong>:</p>\n<ul>\n<li>En <code>src/pages/index.astro</code>, vuelva a añadir el componente <code>&#x3C;PersonalShopper /></code> al layout.</li>\n<li>En <code>src/components/sections/Collections.astro</code>, descomente la sección “Shopping Concierge”.</li>\n</ul>\n</li>\n</ol>\n<hr>\n<p><em>Nota: Este archivo fue creado automáticamente al suspender temporalmente el servicio.</em></p>";

				const frontmatter = {};
				const file = "C:/Users/Usuario/Desktop/proyectos reales/forever-one/src/pages/ASESORIAS_RESTORATION.md";
				const url = "/ASESORIAS_RESTORATION";
				function rawContent() {
					return "# Cómo restaurar el servicio de Asesorías\n\nPara volver a habilitar la página de Asesorías en el sitio web, siga estos pasos:\n\n1. **Restaurar el archivo de la página**:\n   - Renombre el archivo `src/pages/_asesorias.astro.bak` a `src/pages/asesorias.astro`.\n   - Astro detectará automáticamente el archivo y creará la ruta `/asesorias`.\n\n2. **Habilitar los enlaces de navegación**:\n   - En `src/components/Header.astro`, descomente las líneas que contienen el enlace a `/asesorias`.\n   - En `src/components/Footer.astro`, descomente las líneas similares.\n\n3. **Restaurar las secciones de la página de inicio**:\n   - En `src/pages/index.astro`, vuelva a añadir el componente `<PersonalShopper />` al layout.\n   - En `src/components/sections/Collections.astro`, descomente la sección \"Shopping Concierge\".\n\n---\n*Nota: Este archivo fue creado automáticamente al suspender temporalmente el servicio.*\n";
				}
				async function compiledContent() {
					return await html();
				}
				function getHeadings() {
					return [{"depth":1,"slug":"cómo-restaurar-el-servicio-de-asesorías","text":"Cómo restaurar el servicio de Asesorías"}];
				}

				const Content = createComponent((result, _props, slots) => {
					const { layout, ...content } = frontmatter;
					content.file = file;
					content.url = url;

					return renderTemplate`<meta charset="utf-8">${maybeRenderHead()}${unescapeHTML(html())}`;
				});

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	Content,
	compiledContent,
	default: Content,
	file,
	frontmatter,
	getHeadings,
	rawContent,
	url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
