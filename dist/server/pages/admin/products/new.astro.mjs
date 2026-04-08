import { e as createComponent, i as renderComponent, k as renderScript, r as renderTemplate, h as createAstro, m as maybeRenderHead, g as addAttribute } from '../../../chunks/astro/server_BtsvdxdT.mjs';
import 'kleur/colors';
import { $ as $$AdminLayout } from '../../../chunks/AdminLayout__mw4gnds.mjs';
import { s as supabase, a as supabaseAdmin } from '../../../chunks/supabase_FqJk9_vE.mjs';
/* empty css                                     */
export { renderers } from '../../../renderers.mjs';

const $$Astro = createAstro();
const $$New = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$New;
  const accessToken = Astro2.cookies.get("sb-access-token")?.value;
  if (!accessToken) return Astro2.redirect("/admin/login");
  const { data: { user }, error: authError } = await supabase.auth.getUser(accessToken);
  if (authError || !user) return Astro2.redirect("/admin/login");
  const { data: collections } = await supabase.from("collections").select("*").eq("is_active", true);
  const { data: allSubcategories } = await supabase.from("subcategories").select("*");
  let successMessage = "";
  let errorMessage = "";
  if (Astro2.request.method === "POST") {
    const form = await Astro2.request.formData();
    const name = form.get("name")?.toString();
    const description = form.get("description")?.toString();
    const price = parseFloat(form.get("price")?.toString() || "0");
    const collectionId = form.get("collection_id")?.toString() || null;
    const category = form.get("category")?.toString() || "ropa";
    const subcategoryId = form.get("subcategory_id")?.toString() || null;
    const sizes = form.getAll("sizes[]").map((s) => s.toString());
    const imageFiles = form.getAll("image_files");
    const imageUrls = [];
    for (const file of imageFiles) {
      if (file.size > 0 && file.name) {
        const fileExt = file.name.split(".").pop();
        const fileName = `${Math.random().toString(36).substring(2)}-${Date.now()}.${fileExt}`;
        const { data: uploadData, error: uploadError } = await supabaseAdmin.storage.from("productos").upload(fileName, file);
        if (!uploadError) {
          const { data: { publicUrl } } = supabaseAdmin.storage.from("productos").getPublicUrl(fileName);
          imageUrls.push(publicUrl);
        } else {
          console.error("Error uploading image:", uploadError);
        }
      }
    }
    if (!name || !price) {
      errorMessage = "El nombre y precio son obligatorios.";
    } else {
      const { data: product, error: productError } = await supabaseAdmin.from("products").insert({ name, description, price, collection_id: collectionId, category, subcategory_id: subcategoryId, image_urls: imageUrls }).select().single();
      if (productError) {
        errorMessage = "Error al guardar la prenda: " + productError.message;
      } else {
        if (sizes.length > 0) {
          const variants = sizes.map((size) => ({
            product_id: product.id,
            size,
            stock_quantity: parseInt(form.get(`stock_${size}`)?.toString() || "0")
          }));
          await supabaseAdmin.from("variants").insert(variants);
        }
        successMessage = `\u2726 "${name}" a\xF1adida al cat\xE1logo exitosamente.`;
      }
    }
  }
  return renderTemplate`${renderComponent($$result, "AdminLayout", $$AdminLayout, { "title": "Nueva Prenda", "activeNav": "products", "user": { email: user?.email || "" }, "data-astro-cid-unfxests": true }, { "default": async ($$result2) => renderTemplate`   ${maybeRenderHead()}<a href="/admin/products" class="back-link" data-astro-cid-unfxests>← Volver al Inventario</a>  <div class="page-header" data-astro-cid-unfxests> <p data-astro-cid-unfxests>Inventario · Nueva Pieza</p> <h2 data-astro-cid-unfxests>Añadir al Catálogo</h2> </div> ${successMessage && renderTemplate`<div class="message success" data-astro-cid-unfxests>${successMessage}</div>`}${errorMessage && renderTemplate`<div class="message error" data-astro-cid-unfxests>${errorMessage}</div>`}<form method="POST" class="form-card" enctype="multipart/form-data" data-astro-cid-unfxests> <!-- Info Básica --> <div class="form-section" data-astro-cid-unfxests> <p class="section-label" data-astro-cid-unfxests>✦ Información de la Prenda</p> <div class="form-grid-main" data-astro-cid-unfxests> <div class="form-group" data-astro-cid-unfxests> <label for="name" data-astro-cid-unfxests>Nombre de la Prenda *</label> <input type="text" id="name" name="name" placeholder="Ej: Camiseta de Algodón" required data-astro-cid-unfxests> </div> <div class="form-group" data-astro-cid-unfxests> <label for="price" data-astro-cid-unfxests>Precio (USD) *</label> <input type="number" id="price" name="price" placeholder="0.00" min="0" step="0.01" required data-astro-cid-unfxests> </div> </div> <div class="form-grid-three" data-astro-cid-unfxests> <div class="form-group" data-astro-cid-unfxests> <label for="category" data-astro-cid-unfxests>Categoría Principal *</label> <select id="category" name="category" required data-astro-cid-unfxests> <option value="ropa" data-astro-cid-unfxests>Ropa</option> <option value="accesorios" data-astro-cid-unfxests>Accesorios</option> </select> </div> <div class="form-group" data-astro-cid-unfxests> <label for="subcategory_id" data-astro-cid-unfxests>Subcategoría</label> <select id="subcategory_id" name="subcategory_id" data-astro-cid-unfxests> <option value="" data-astro-cid-unfxests>Sin subcategoría</option> ${allSubcategories?.map((s) => renderTemplate`<option${addAttribute(s.id, "value")}${addAttribute(s.parent_category, "data-parent")} data-astro-cid-unfxests>${s.name}</option>`)} </select> </div> <div class="form-group" data-astro-cid-unfxests> <label for="collection_id" data-astro-cid-unfxests>Colección / Drop</label> <select id="collection_id" name="collection_id" data-astro-cid-unfxests> <option value="" data-astro-cid-unfxests>Sin colección</option> ${collections?.map((c) => renderTemplate`<option${addAttribute(c.id, "value")} data-astro-cid-unfxests>${c.name}</option>`)} </select> </div> </div> </div> <!-- Descripción & Fotos --> <div class="form-section" data-astro-cid-unfxests> <p class="section-label" data-astro-cid-unfxests>◈ Contenido y Medios</p> <div class="form-group" data-astro-cid-unfxests> <label for="description" data-astro-cid-unfxests>Descripción de Lujo</label> <textarea id="description" name="description" placeholder="Una pieza que encarna la sofisticación..." data-astro-cid-unfxests></textarea> </div> <div class="form-group" data-astro-cid-unfxests> <label for="image_files" data-astro-cid-unfxests>Subir Imágenes de Lujo</label> <input type="file" id="image_files" name="image_files" accept="image/*" multiple data-astro-cid-unfxests> <p style="font-size: 8px; color: #B8860B; margin-top: 0.5rem; letter-spacing: 0.1em; text-transform: uppercase; font-weight: 600;" data-astro-cid-unfxests>
Recomendado: 1000x1000px, WebP o JPG (Máx. 500KB)
</p> </div> </div> <!-- Stock --> <div class="form-section" id="sizeSelection" data-astro-cid-unfxests> <p class="section-label" data-astro-cid-unfxests>◇ Stock por Talla</p> <div class="sizes-grid" data-astro-cid-unfxests> ${["XS", "S", "M", "L", "XL", "XXL", "UNICO"].map((size) => renderTemplate`<div class="size-item" data-astro-cid-unfxests> <input type="checkbox" name="sizes[]"${addAttribute(size, "value")}${addAttribute(`size-${size}`, "id")} data-astro-cid-unfxests> <label class="size-label"${addAttribute(`size-${size}`, "for")} data-astro-cid-unfxests>${size}</label> </div>`)} </div> <div class="stock-inputs" id="stockInputs" data-astro-cid-unfxests> ${["XS", "S", "M", "L", "XL", "XXL", "UNICO"].map((size) => renderTemplate`<div class="stock-item"${addAttribute(`stock-${size}`, "id")} style="display:none" data-astro-cid-unfxests> <label data-astro-cid-unfxests>Stock ${size}</label> <input type="number"${addAttribute(`stock_${size}`, "name")} value="0" min="0" placeholder="0" data-astro-cid-unfxests> </div>`)} </div> </div> <!-- Footer --> <div class="form-footer" data-astro-cid-unfxests> <a href="/admin/products" class="cancel-link" data-astro-cid-unfxests>Cancelar</a> <button type="submit" class="submit-btn" data-astro-cid-unfxests>✦ Guardar en Catálogo</button> </div> </form> ` })} ${renderScript($$result, "C:/Users/Usuario/Desktop/proyectos reales/forever-one/src/pages/admin/products/new.astro?astro&type=script&index=0&lang.ts")}`;
}, "C:/Users/Usuario/Desktop/proyectos reales/forever-one/src/pages/admin/products/new.astro", void 0);

const $$file = "C:/Users/Usuario/Desktop/proyectos reales/forever-one/src/pages/admin/products/new.astro";
const $$url = "/admin/products/new";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$New,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
