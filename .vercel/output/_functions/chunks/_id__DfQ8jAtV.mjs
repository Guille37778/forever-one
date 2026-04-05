import { c as createComponent } from './astro-component_D3bPY0Kc.mjs';
import 'piccolore';
import { Q as renderTemplate, B as maybeRenderHead, a3 as addAttribute } from './sequence_BZ_GwenZ.mjs';
import { r as renderComponent } from './entrypoint_RSxQFoUR.mjs';
import { r as renderScript } from './script_C8kPsTrl.mjs';
import { $ as $$AdminLayout } from './AdminLayout_CM0GIn_a.mjs';
import { s as supabase, a as supabaseAdmin } from './supabase_CUGkxkOG.mjs';

const $$id = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$id;
  const { id } = Astro2.params;
  const accessToken = Astro2.cookies.get("sb-access-token")?.value;
  if (!accessToken) return Astro2.redirect("/admin/login");
  const { data: { user }, error: authError } = await supabase.auth.getUser(accessToken);
  if (authError || !user) return Astro2.redirect("/admin/login");
  const { data: product } = await supabase.from("products").select("*, variants(*)").eq("id", id).single();
  const { data: collections } = await supabase.from("collections").select("*").eq("is_active", true);
  const { data: allSubcategories } = await supabase.from("subcategories").select("*");
  if (!product) return Astro2.redirect("/admin/products");
  let successMessage = "";
  let errorMessage = "";
  if (Astro2.request.method === "POST") {
    const form = await Astro2.request.formData();
    const action = form.get("action")?.toString();
    if (action === "delete") {
      const { error } = await supabase.from("products").delete().eq("id", id);
      if (!error) return Astro2.redirect("/admin/products");
      errorMessage = "Error al eliminar: " + error.message;
    } else {
      const name = form.get("name")?.toString();
      const description = form.get("description")?.toString();
      const price = parseFloat(form.get("price")?.toString() || "0");
      const collectionId = form.get("collection_id")?.toString() || null;
      const category = form.get("category")?.toString() || "ropa";
      const subcategoryId = form.get("subcategory_id")?.toString() || null;
      const isActive = form.get("is_active") === "true";
      const sizes = form.getAll("sizes[]").map((s) => s.toString());
      const existingImageUrls = form.getAll("existing_image_urls[]").map((u) => u.toString());
      const newImageFiles = form.getAll("new_image_files");
      const uploadedImageUrls = [];
      for (const file of newImageFiles) {
        if (file.size > 0 && file.name) {
          const fileExt = file.name.split(".").pop();
          const fileName = `${Math.random().toString(36).substring(2)}-${Date.now()}.${fileExt}`;
          const { data: uploadData, error: uploadError } = await supabaseAdmin.storage.from("productos").upload(fileName, file);
          if (!uploadError) {
            const { data: { publicUrl } } = supabaseAdmin.storage.from("productos").getPublicUrl(fileName);
            uploadedImageUrls.push(publicUrl);
          }
        }
      }
      const imageUrls = [...existingImageUrls, ...uploadedImageUrls];
      const { error: pError } = await supabase.from("products").update({ name, description, price, collection_id: collectionId, category, subcategory_id: subcategoryId, is_active: isActive, image_urls: imageUrls, updated_at: /* @__PURE__ */ new Date() }).eq("id", id);
      if (pError) {
        errorMessage = "Error al actualizar: " + pError.message;
      } else {
        await supabase.from("variants").delete().eq("product_id", id);
        if (sizes.length > 0) {
          const variants = sizes.map((size) => ({
            product_id: id,
            size,
            stock_quantity: parseInt(form.get(`stock_${size}`)?.toString() || "0")
          }));
          await supabase.from("variants").insert(variants);
        }
        return Astro2.redirect(`/admin/products/${id}?success=true`);
      }
    }
  }
  const isSuccess = Astro2.url.searchParams.get("success") === "true";
  if (isSuccess) successMessage = "✦ Prenda actualizada correctamente.";
  return renderTemplate`${renderComponent($$result, "AdminLayout", $$AdminLayout, { "title": `Editar — ${product.name}`, "activeNav": "products", "user": { email: user?.email || "" }, "data-astro-cid-jwnaoqkz": true }, { "default": async ($$result2) => renderTemplate`  ${maybeRenderHead()}<a href="/admin/products" class="back-link" data-astro-cid-jwnaoqkz>← Volver al Inventario</a> <div class="page-header" data-astro-cid-jwnaoqkz> <p data-astro-cid-jwnaoqkz>Inventario · Editar Pieza</p> <h2 data-astro-cid-jwnaoqkz>${product.name}</h2> </div> ${successMessage && renderTemplate`<div class="message success" data-astro-cid-jwnaoqkz>${successMessage}</div>`}${errorMessage && renderTemplate`<div class="message error" data-astro-cid-jwnaoqkz>${errorMessage}</div>`}<form method="POST" class="form-card" enctype="multipart/form-data" data-astro-cid-jwnaoqkz> <!-- Info General --> <div class="form-section" data-astro-cid-jwnaoqkz> <p class="section-label" data-astro-cid-jwnaoqkz>✦ Información General</p> <div class="form-row" data-astro-cid-jwnaoqkz> <div class="form-group" data-astro-cid-jwnaoqkz> <label data-astro-cid-jwnaoqkz>Nombre</label> <input type="text" name="name"${addAttribute(product.name, "value")} required data-astro-cid-jwnaoqkz> </div> <div class="form-group" data-astro-cid-jwnaoqkz> <label data-astro-cid-jwnaoqkz>Precio (USD)</label> <input type="number" name="price"${addAttribute(product.price, "value")} step="0.01" required data-astro-cid-jwnaoqkz> </div> </div> <div class="form-row" data-astro-cid-jwnaoqkz> <div class="form-group" data-astro-cid-jwnaoqkz> <label data-astro-cid-jwnaoqkz>Categoría Principal</label> <select name="category" id="category" data-astro-cid-jwnaoqkz> <option value="ropa"${addAttribute(product.category === "ropa", "selected")} data-astro-cid-jwnaoqkz>Ropa</option> <option value="accesorios"${addAttribute(product.category === "accesorios", "selected")} data-astro-cid-jwnaoqkz>Accesorios</option> </select> </div> <div class="form-group" data-astro-cid-jwnaoqkz> <label data-astro-cid-jwnaoqkz>Subcategoría</label> <select name="subcategory_id" id="subcategory_id" data-astro-cid-jwnaoqkz> <option value="" data-astro-cid-jwnaoqkz>Sin subcategoría</option> ${allSubcategories?.map((s) => renderTemplate`<option${addAttribute(s.id, "value")}${addAttribute(s.parent_category, "data-parent")}${addAttribute(product.subcategory_id === s.id, "selected")} data-astro-cid-jwnaoqkz> ${s.name} </option>`)} </select> </div> </div> <div class="form-row" data-astro-cid-jwnaoqkz> <div class="form-group" data-astro-cid-jwnaoqkz> <label data-astro-cid-jwnaoqkz>Colección</label> <select name="collection_id" data-astro-cid-jwnaoqkz> <option value="" data-astro-cid-jwnaoqkz>Sin colección</option> ${collections?.map((c) => renderTemplate`<option${addAttribute(c.id, "value")}${addAttribute(product.collection_id === c.id, "selected")} data-astro-cid-jwnaoqkz>${c.name}</option>`)} </select> </div> <div class="form-group" data-astro-cid-jwnaoqkz> <label data-astro-cid-jwnaoqkz>Estado</label> <select name="is_active" data-astro-cid-jwnaoqkz> <option value="true"${addAttribute(product.is_active, "selected")} data-astro-cid-jwnaoqkz>● Público</option> <option value="false"${addAttribute(!product.is_active, "selected")} data-astro-cid-jwnaoqkz>○ Oculto</option> </select> </div> </div> <div class="form-group" data-astro-cid-jwnaoqkz> <label data-astro-cid-jwnaoqkz>Descripción</label> <textarea name="description" data-astro-cid-jwnaoqkz>${product.description}</textarea> </div> <div class="form-group" data-astro-cid-jwnaoqkz> <label data-astro-cid-jwnaoqkz>Imágenes de la Prenda</label> <div class="current-images" data-astro-cid-jwnaoqkz> ${product.image_urls?.map((url, index) => renderTemplate`<div class="image-thumb" data-astro-cid-jwnaoqkz> <img${addAttribute(url, "src")}${addAttribute(`Imagen ${index}`, "alt")} data-astro-cid-jwnaoqkz> <input type="hidden" name="existing_image_urls[]"${addAttribute(url, "value")} data-astro-cid-jwnaoqkz> <button type="button" class="remove-img-btn" title="Eliminar" onclick="this.parentElement.remove()" data-astro-cid-jwnaoqkz>×</button> </div>`)} </div> <div class="new-upload" data-astro-cid-jwnaoqkz> <label style="font-size: 7px; color: #B8860B; margin-bottom: 0.25rem;" data-astro-cid-jwnaoqkz>Añadir Nuevas Fotos</label> <input type="file" name="new_image_files" accept="image/*" multiple data-astro-cid-jwnaoqkz> </div> </div> </div> <!-- Stock --> <div class="form-section" id="sizeSelection"${addAttribute(product.category === "accesorios" ? "opacity:0.5; pointer-events:none;" : "", "style")} data-astro-cid-jwnaoqkz> <p class="section-label" data-astro-cid-jwnaoqkz>◈ Stock por Talla</p> <div class="sizes-grid" data-astro-cid-jwnaoqkz> ${["XS", "S", "M", "L", "XL", "XXL", "UNICO"].map((size) => {
    const variant = product.variants.find((v) => v.size === size);
    return renderTemplate`<div class="size-item" data-astro-cid-jwnaoqkz> <input type="checkbox" name="sizes[]"${addAttribute(size, "value")}${addAttribute(`size-${size}`, "id")}${addAttribute(!!variant, "checked")} style="display:none" data-astro-cid-jwnaoqkz> <label class="size-label"${addAttribute(`size-${size}`, "for")} data-astro-cid-jwnaoqkz>${size}</label> </div>`;
  })} </div> <div class="stock-inputs" id="stockInputs" data-astro-cid-jwnaoqkz> ${["XS", "S", "M", "L", "XL", "XXL", "UNICO"].map((size) => {
    const variant = product.variants.find((v) => v.size === size);
    return renderTemplate`<div class="stock-item"${addAttribute(`stock-${size}`, "id")}${addAttribute(variant ? "display:block" : "display:none", "style")} data-astro-cid-jwnaoqkz> <label data-astro-cid-jwnaoqkz>Stock ${size}</label> <input type="number"${addAttribute(`stock_${size}`, "name")}${addAttribute(variant?.stock_quantity || 0, "value")} min="0" data-astro-cid-jwnaoqkz> </div>`;
  })} </div> </div> <!-- Footer --> <div class="form-footer" data-astro-cid-jwnaoqkz> <a href="/admin/products" class="cancel-link" data-astro-cid-jwnaoqkz>Cancelar</a> <div class="footer-actions" data-astro-cid-jwnaoqkz> <button type="submit" name="action" value="delete" class="delete-btn" onclick="return confirm('¿Seguro que deseas eliminar esta prenda permanentemente?')" data-astro-cid-jwnaoqkz>
Eliminar Prenda
</button> <button type="submit" class="submit-btn" data-astro-cid-jwnaoqkz>✦ Guardar Cambios</button> </div> </div> </form> ` })} ${renderScript($$result, "C:/Users/Usuario/Desktop/proyectos reales/forever-one/src/pages/admin/products/[id].astro?astro&type=script&index=0&lang.ts")}`;
}, "C:/Users/Usuario/Desktop/proyectos reales/forever-one/src/pages/admin/products/[id].astro", void 0);

const $$file = "C:/Users/Usuario/Desktop/proyectos reales/forever-one/src/pages/admin/products/[id].astro";
const $$url = "/admin/products/[id]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$id,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
