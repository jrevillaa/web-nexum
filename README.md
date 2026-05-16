# Nexum Business — sitio web estático

Sitio promocional de **Nexum Business SAC** (Lima, Perú): Moodle, Oracle Cloud (OCI), desarrollo y arquitecturas cloud. Es HTML, CSS y JavaScript estático, sin build ni servidor propio.

## Estructura

| Ruta | Contenido |
|------|-----------|
| `index.html` | Entrada: redirige a `dark/inicio.html` o `light/inicio.html` según preferencia guardada o del sistema. |
| `light/` | Variante tema claro (páginas `.html`). |
| `dark/` | Variante tema oscuro. |
| `assets/css/main.css` | Estilos compartidos. |
| `assets/js/` | `theme.js` (anti-parpadeo y persistencia del tema), `main.js`, `components.js`. |
| `assets/images/` | Logo, favicon, capturas e ilustraciones (WebP/PNG). |

Páginas habituales: inicio, servicios, nosotros, contacto, moodle, cloud, recursos, legales; en **light** también existe `experiencia.html`.

## Vista previa local

Desde esta carpeta (raíz del repo), sirve los archivos con cualquier servidor estático, por ejemplo:

```bash
python3 -m http.server 8080
```

Abre `http://localhost:8080/` — deberías ser redirigido a `light/...` o `dark/...` según el tema.

## GitHub Pages

**Sí: el repo está pensado para publicarse como sitio estático** (solo HTML/CSS/JS y rutas relativas a `assets/`, `light/` y `dark/`).

1. En GitHub: **Settings → Pages**.
2. **Build and deployment**: *GitHub Actions* o *Deploy from a branch*.
3. Si usas **branch**: elige `main` y carpeta **`/` (root)** — el `index.html` de la raíz del repo debe ser el de la web (como en este proyecto).

La URL será del tipo `https://<usuario>.github.io/<nombre-del-repo>/`. Entra por la raíz (`…/nombre-repo/` o `…/nombre-repo/index.html`) para que la redirección del `index.html` resuelva bien las rutas `dark/` y `light/`.

Opcional: **Custom domain** en la misma sección de Pages si más adelante apuntas un dominio propio.

### Nota sobre metadatos

Los `<meta>` de Open Graph, Twitter y `canonical` en las páginas apuntan a **nexumbusiness.com**. En GitHub Pages seguirán mostrando esa URL en previews sociales; no afecta a que el sitio cargue, solo a cómo se comparte el enlace si no actualizas esas URLs.

## Licencia y contacto

Contenido y marca propios de Nexum Business SAC. Para cambios de copy o despliegue, coordina con quien mantenga el repositorio.
