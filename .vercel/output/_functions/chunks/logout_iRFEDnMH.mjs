import { c as createComponent } from './astro-component_D3bPY0Kc.mjs';
import 'piccolore';
import './sequence_BZ_GwenZ.mjs';
import 'clsx';

const $$Logout = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$Logout;
  Astro2.cookies.delete("sb-access-token", { path: "/" });
  Astro2.cookies.delete("sb-refresh-token", { path: "/" });
  return Astro2.redirect("/admin/login");
}, "C:/Users/Usuario/Desktop/proyectos reales/forever-one/src/pages/admin/logout.astro", void 0);

const $$file = "C:/Users/Usuario/Desktop/proyectos reales/forever-one/src/pages/admin/logout.astro";
const $$url = "/admin/logout";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: $$Logout,
	file: $$file,
	url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
