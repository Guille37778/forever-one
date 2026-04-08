import { e as createComponent, i as renderComponent, r as renderTemplate, h as createAstro, m as maybeRenderHead, g as addAttribute } from '../../chunks/astro/server_BtsvdxdT.mjs';
import 'kleur/colors';
import { $ as $$AdminLayout } from '../../chunks/AdminLayout__mw4gnds.mjs';
import { s as supabase, a as supabaseAdmin } from '../../chunks/supabase_FqJk9_vE.mjs';
/* empty css                                    */
export { renderers } from '../../renderers.mjs';

const $$Astro = createAstro();
const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Index;
  const accessToken = Astro2.cookies.get("sb-access-token")?.value;
  if (!accessToken) return Astro2.redirect("/admin/login");
  const { data: { user }, error: authError } = await supabase.auth.getUser(accessToken);
  if (authError || !user) return Astro2.redirect("/admin/login");
  let statusMessage = "";
  let statusType = "";
  if (Astro2.request.method === "POST") {
    const formData = await Astro2.request.formData();
    const action = formData.get("action");
    if (action === "create") {
      const name = formData.get("name")?.toString();
      const parentCategory = formData.get("parentCategory")?.toString();
      const slug = name?.toLowerCase().trim().replace(/\s+/g, "-").replace(/[^\w-]+/g, "");
      if (name && parentCategory && slug) {
        const { error } = await supabaseAdmin.from("subcategories").insert([{ name, slug, parent_category: parentCategory }]);
        if (error) {
          console.error("Error al crear subcategor\xEDa:", error);
          statusMessage = `Error: ${error.message}`;
          statusType = "error";
        } else {
          statusMessage = "Subcategor\xEDa registrada exitosamente.";
          statusType = "success";
        }
      } else {
        statusMessage = "Por favor complete todos los campos.";
        statusType = "error";
      }
    }
    if (action === "delete") {
      const id = formData.get("id")?.toString();
      if (id) {
        const { error } = await supabaseAdmin.from("subcategories").delete().eq("id", id);
        if (error) {
          console.error("Error al eliminar subcategor\xEDa:", error);
          statusMessage = `Error al eliminar: ${error.message}`;
          statusType = "error";
        } else {
          statusMessage = "Subcategor\xEDa eliminada con \xE9xito.";
          statusType = "success";
        }
      }
    }
  }
  const { data: subcategories } = await supabase.from("subcategories").select("*").order("parent_category", { ascending: true }).order("name", { ascending: true });
  const ropaSubs = subcategories?.filter((s) => s.parent_category === "ropa") || [];
  const accesoriosSubs = subcategories?.filter((s) => s.parent_category === "accesorios") || [];
  return renderTemplate`${renderComponent($$result, "AdminLayout", $$AdminLayout, { "title": "Subcategor\xEDas", "activeNav": "subcategories", "user": { email: user?.email || "" }, "data-astro-cid-vvlxq4jv": true }, { "default": async ($$result2) => renderTemplate`  ${maybeRenderHead()}<div class="page-header" data-astro-cid-vvlxq4jv> <p data-astro-cid-vvlxq4jv>Configuración del Catálogo</p> <h2 data-astro-cid-vvlxq4jv>Gestión de Subcategorías</h2> </div> <div class="layout" data-astro-cid-vvlxq4jv> <!-- New Subcategory Form --> <div data-astro-cid-vvlxq4jv> ${statusMessage && renderTemplate`<div${addAttribute(`status-msg ${statusType}`, "class")} data-astro-cid-vvlxq4jv> ${statusType === "success" ? "\u2726 " : "\u26A0 "} ${statusMessage} </div>`} <div class="form-card" data-astro-cid-vvlxq4jv> <div class="card-header" data-astro-cid-vvlxq4jv> <p data-astro-cid-vvlxq4jv>✦ Registrar</p> <h3 data-astro-cid-vvlxq4jv>Nueva Subcategoría</h3> </div> <div class="card-body" data-astro-cid-vvlxq4jv> <form method="POST" data-astro-cid-vvlxq4jv> <input type="hidden" name="action" value="create" data-astro-cid-vvlxq4jv> <div class="form-group" data-astro-cid-vvlxq4jv> <label data-astro-cid-vvlxq4jv>Nombre de la Subcategoría</label> <input type="text" name="name" class="form-input" placeholder="Ej: Vestidos de Gala" required data-astro-cid-vvlxq4jv> </div> <div class="form-group" data-astro-cid-vvlxq4jv> <label data-astro-cid-vvlxq4jv>Categoría Padre</label> <select name="parentCategory" class="form-input" required data-astro-cid-vvlxq4jv> <option value="ropa" data-astro-cid-vvlxq4jv>Ropa</option> <option value="accesorios" data-astro-cid-vvlxq4jv>Accesorios</option> </select> </div> <button type="submit" class="submit-btn" style="border-radius:12px" data-astro-cid-vvlxq4jv>✦ Registrar Subcategoría</button> </form> </div> </div> </div> <!-- Existing Subcategories --> <div class="list-section" data-astro-cid-vvlxq4jv> <!-- Ropa --> <div class="group-card" data-astro-cid-vvlxq4jv> <div class="group-header" data-astro-cid-vvlxq4jv> <span class="group-label" data-astro-cid-vvlxq4jv>◇ Ropa</span> <span class="group-count" data-astro-cid-vvlxq4jv>${ropaSubs.length} subcategorías</span> </div> <div class="subcat-list" data-astro-cid-vvlxq4jv> ${ropaSubs.length === 0 ? renderTemplate`<div class="empty-group" data-astro-cid-vvlxq4jv>Sin subcategorías de Ropa aún</div>` : ropaSubs.map((sub) => renderTemplate`<div class="subcat-item" data-astro-cid-vvlxq4jv> <div data-astro-cid-vvlxq4jv> <p class="subcat-name" data-astro-cid-vvlxq4jv>${sub.name}</p> <p class="subcat-slug" data-astro-cid-vvlxq4jv>/${sub.slug}</p> </div> <form method="POST" onsubmit="return confirm('¿Eliminar esta subcategoría?')" data-astro-cid-vvlxq4jv> <input type="hidden" name="action" value="delete" data-astro-cid-vvlxq4jv> <input type="hidden" name="id"${addAttribute(sub.id, "value")} data-astro-cid-vvlxq4jv> <button type="submit" class="delete-btn" data-astro-cid-vvlxq4jv>Eliminar</button> </form> </div>`)} </div> </div> <!-- Accesorios --> <div class="group-card" data-astro-cid-vvlxq4jv> <div class="group-header" data-astro-cid-vvlxq4jv> <span class="group-label" data-astro-cid-vvlxq4jv>◈ Accesorios</span> <span class="group-count" data-astro-cid-vvlxq4jv>${accesoriosSubs.length} subcategorías</span> </div> <div class="subcat-list" data-astro-cid-vvlxq4jv> ${accesoriosSubs.length === 0 ? renderTemplate`<div class="empty-group" data-astro-cid-vvlxq4jv>Sin subcategorías de Accesorios aún</div>` : accesoriosSubs.map((sub) => renderTemplate`<div class="subcat-item" data-astro-cid-vvlxq4jv> <div data-astro-cid-vvlxq4jv> <p class="subcat-name" data-astro-cid-vvlxq4jv>${sub.name}</p> <p class="subcat-slug" data-astro-cid-vvlxq4jv>/${sub.slug}</p> </div> <form method="POST" onsubmit="return confirm('¿Eliminar esta subcategoría?')" data-astro-cid-vvlxq4jv> <input type="hidden" name="action" value="delete" data-astro-cid-vvlxq4jv> <input type="hidden" name="id"${addAttribute(sub.id, "value")} data-astro-cid-vvlxq4jv> <button type="submit" class="delete-btn" data-astro-cid-vvlxq4jv>Eliminar</button> </form> </div>`)} </div> </div> </div> </div> ` })}`;
}, "C:/Users/Usuario/Desktop/proyectos reales/forever-one/src/pages/admin/subcategories/index.astro", void 0);

const $$file = "C:/Users/Usuario/Desktop/proyectos reales/forever-one/src/pages/admin/subcategories/index.astro";
const $$url = "/admin/subcategories";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
