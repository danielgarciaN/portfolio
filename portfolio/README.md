# Daniel García Nilo - Portfolio Personal

Portfolio profesional construido con Next.js 14, TypeScript, Tailwind CSS, Framer Motion y Supabase. Está diseñado para presentar un perfil de Ingeniería Informática con foco en desarrollo software, Data Science, inteligencia artificial, backend y cloud.

## Características

- Diseño minimalista, profesional y responsive.
- Modo claro y oscuro con paleta tecnológica:
  - Claro: blanco roto + azul noche.
  - Oscuro: fondo elegante + cian brillante.
- Multiidioma:
  - Español por defecto.
  - Inglés desde selector de banderas en el navbar.
- Hero con foto personal y botón para descargar CV.
- Proyectos con imagen, categoría, estado, tecnologías, GitHub y demo opcional.
- Timeline de experiencia y formación.
- Formulario de contacto con validación.
- Datos fallback sin Supabase y soporte opcional para Supabase.
- Preparado para Vercel y Google Cloud Run.

## Stack técnico

| Capa | Tecnología |
|---|---|
| Framework | Next.js 14 App Router |
| Lenguaje | TypeScript |
| Estilos | Tailwind CSS |
| Animaciones | Framer Motion |
| Datos opcionales | Supabase |
| Iconos | Lucide React |
| Fuentes | next/font con Manrope y JetBrains Mono |
| Deploy | Vercel o Google Cloud Run |

## Estructura principal

```txt
app/
  layout.tsx              Layout raíz, metadata y fuentes
  page.tsx                Home
  projects/page.tsx       Página de proyectos
  contact/page.tsx        Página de contacto
  blog/page.tsx           Blog preparado
  api/                    API routes
components/
  layout/                 Navbar y Footer
  sections/               Hero, About, Skills, Projects, Timeline, Contact
  ui/                     Componentes reutilizables
lib/
  data.ts                 Datos fallback del portfolio
  i18n.tsx                Provider de idioma ES/EN
  projects.ts             Lectura de proyectos desde Supabase o fallback
  supabase.ts             Cliente Supabase
  validations.ts          Validación del formulario
messages/
  es.json                 Textos en español
  en.json                 Textos en inglés
public/
  cv/                     CV descargable
  images/profile/         Foto personal
  images/projects/        Capturas de proyectos
styles/
  globals.css             Tailwind, paleta y clases globales
supabase/
  schema.sql              Schema opcional de Supabase
```

## Desarrollo local

1. Instala dependencias:

```bash
npm install
```

2. Crea variables de entorno:

```bash
cp .env.local.example .env.local
```

3. Arranca el servidor:

```bash
npm run dev
```

4. Abre:

```txt
http://localhost:3000
```

5. Valida producción:

```bash
npm run build
npm run start
```

## Foto personal

Guarda tu foto aquí:

```txt
public/images/profile/daniel-garcia-nilo.jpg
```

Ruta completa en este proyecto:

```txt
C:\Users\Daniel\Desktop\Proyectos\portfolio-daniel-garcia\portfolio\public\images\profile\daniel-garcia-nilo.jpg
```

Recomendaciones:

- JPG o PNG.
- Formato cuadrado.
- Tamaño sugerido: 800x800 px.
- Fondo limpio y buena iluminación.

Si quieres usar PNG, cambia en `lib/data.ts`:

```ts
profileImage: '/images/profile/daniel-garcia-nilo.png'
```

## CV descargable

El botón `Descargar CV` usa:

```txt
public/cv/daniel-garcia-nilo-cv.pdf
```

Para actualizar tu CV, reemplaza ese archivo manteniendo el mismo nombre.

## Imágenes de proyectos

Guarda las capturas aquí:

```txt
public/images/projects/
```

Rutas configuradas:

```txt
public/images/projects/tfg-agentes-conversacionales-iatech.jpg
public/images/projects/expected-goals-xg-statsbomb.jpg
public/images/projects/lol-win-prediction.jpg
public/images/projects/find-it.jpg
public/images/projects/futbol-data.jpg
public/images/projects/tofu-awards.jpg
public/images/projects/unimate.jpg
```

Recomendaciones:

- Ratio 16:9.
- Tamaño sugerido: 1600x900 px.
- Evita datos privados en capturas.
- Si falta una imagen, la tarjeta muestra un placeholder.

## Notebook xG

El nuevo proyecto en curso `Expected Goals xG - StatsBomb` tiene su notebook aquí:

```txt
notebooks/expected-goals-xg-statsbomb.ipynb
```

La notebook puede ejecutarse sin descargar datos reales porque incluye un fallback sintético compatible con la estructura de StatsBomb Open Data. Si más adelante descargas StatsBomb Open Data, coloca los eventos en:

```txt
data/statsbomb/open-data/data/events/
```

## Multiidioma

Los textos están en:

```txt
messages/es.json
messages/en.json
```

Para cambiar un texto, edita ambos archivos.

El selector de idioma está en el navbar. Español es el idioma inicial. El idioma elegido se guarda en `localStorage`.

## Cambiar contenido

Datos técnicos y rutas:

```txt
lib/data.ts
```

Textos visibles:

```txt
messages/es.json
messages/en.json
```

Ejemplos:

- Cambiar descripción del Hero: `messages/es.json` y `messages/en.json`, clave `hero.bio`.
- Cambiar experiencia: claves `timeline.items`.
- Cambiar proyectos visibles: claves `projects.items`.
- Cambiar tecnologías reales de un proyecto: `lib/data.ts`.

## Variables de entorno

Archivo local:

```txt
.env.local
```

Variables:

```env
NEXT_PUBLIC_SUPABASE_URL=https://tu-proyecto.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu-anon-key
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

`SUPABASE_SERVICE_ROLE_KEY` solo debe añadirse si creas endpoints backend seguros que necesiten permisos administrativos. No la uses en componentes cliente y no la prefijes con `NEXT_PUBLIC_`.

## Supabase paso a paso

Supabase es opcional. Sin Supabase, la web usa los datos de `lib/data.ts`.

1. Crea una cuenta en Supabase.
2. Crea un proyecto nuevo.
3. Ve a `Project Settings > API`.
4. Copia:
   - Project URL.
   - anon public key.
5. Pega esos valores en `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=https://tu-proyecto.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu-anon-key
```

6. Ve al SQL Editor de Supabase.
7. Abre `supabase/schema.sql`.
8. Copia todo el contenido y ejecútalo en Supabase.
9. Si quieres usar Supabase Storage para imágenes:
   - Crea un bucket, por ejemplo `project-images`.
   - Hazlo público o configura política de lectura pública.
   - Sube imágenes.
   - Guarda sus URLs en la tabla `projects`, campo `image_url`.

Para un portfolio personal sencillo, lo más fácil es guardar imágenes en `public/images/projects`.

## Subir el proyecto a GitHub

1. Crea un repositorio nuevo en GitHub.
2. En local, entra en la carpeta del proyecto:

```bash
cd C:\Users\Daniel\Desktop\Proyectos\portfolio-daniel-garcia\portfolio
```

3. Inicializa Git si aún no existe:

```bash
git init
```

4. Revisa qué se va a subir:

```bash
git status
```

5. Añade los archivos:

```bash
git add .
```

6. Haz commit:

```bash
git commit -m "Initial portfolio"
```

7. Cambia la rama principal a `main`:

```bash
git branch -M main
```

8. Conecta el repositorio remoto:

```bash
git remote add origin https://github.com/TU_USUARIO/TU_REPOSITORIO.git
```

9. Sube el proyecto:

```bash
git push -u origin main
```

## Desplegar en Vercel

1. Entra en Vercel.
2. Inicia sesión con GitHub.
3. Pulsa `Add New Project`.
4. Selecciona el repositorio del portfolio.
5. Vercel detectará Next.js automáticamente.
6. Configura variables de entorno si usas Supabase:

```env
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY
NEXT_PUBLIC_SITE_URL
```

7. Pulsa `Deploy`.
8. Cuando Vercel genere la URL, actualiza:

```env
NEXT_PUBLIC_SITE_URL=https://tu-dominio.vercel.app
```

9. Para publicar cambios después:

```bash
git add .
git commit -m "Update portfolio"
git push
```

Vercel hará deploy automático en cada push a `main`.

## Desplegar en Google Cloud Run

### 1. Preparar Google Cloud

1. Crea un proyecto en Google Cloud.
2. Activa billing.
3. Instala Google Cloud CLI:

```txt
https://cloud.google.com/sdk/docs/install
```

4. Inicia sesión:

```bash
gcloud auth login
```

5. Selecciona el proyecto:

```bash
gcloud config set project TU_PROJECT_ID
```

### 2. Activar APIs

```bash
gcloud services enable run.googleapis.com
gcloud services enable cloudbuild.googleapis.com
gcloud services enable artifactregistry.googleapis.com
```

### 3. Crear repositorio Docker

```bash
gcloud artifacts repositories create portfolio \
  --repository-format=docker \
  --location=europe-west1
```

### 4. Construir imagen

Desde la raíz del proyecto:

```bash
gcloud builds submit \
  --tag europe-west1-docker.pkg.dev/TU_PROJECT_ID/portfolio/web
```

### 5. Desplegar servicio

```bash
gcloud run deploy portfolio \
  --image europe-west1-docker.pkg.dev/TU_PROJECT_ID/portfolio/web \
  --region europe-west1 \
  --platform managed \
  --allow-unauthenticated \
  --port 3000 \
  --memory 512Mi \
  --min-instances 0 \
  --max-instances 3
```

### 6. Variables de entorno en Cloud Run

```bash
gcloud run services update portfolio \
  --region europe-west1 \
  --set-env-vars NEXT_PUBLIC_SUPABASE_URL=https://tu-proyecto.supabase.co,NEXT_PUBLIC_SUPABASE_ANON_KEY=tu-anon-key,NEXT_PUBLIC_SITE_URL=https://tu-url.run.app
```

### 7. Actualizar cambios

Cada vez que cambies código:

```bash
gcloud builds submit \
  --tag europe-west1-docker.pkg.dev/TU_PROJECT_ID/portfolio/web

gcloud run deploy portfolio \
  --image europe-west1-docker.pkg.dev/TU_PROJECT_ID/portfolio/web \
  --region europe-west1
```

## Mantenimiento del portfolio

### Añadir nuevo proyecto

1. Abre `lib/data.ts`.
2. Añade un objeto en `fallbackProjects`.
3. Añade traducciones en:

```txt
messages/es.json -> projects.items
messages/en.json -> projects.items
```

4. Añade imagen en:

```txt
public/images/projects/nombre-del-proyecto.jpg
```

### Actualizar experiencia o formación

1. Cambia datos técnicos en `lib/data.ts`, array `timelineItems`.
2. Cambia textos visibles en:

```txt
messages/es.json -> timeline.items
messages/en.json -> timeline.items
```

### Actualizar skills

Edita:

```txt
messages/es.json -> skills.categories
messages/en.json -> skills.categories
```

### Cambiar CV

Reemplaza:

```txt
public/cv/daniel-garcia-nilo-cv.pdf
```

### Cambiar foto

Reemplaza:

```txt
public/images/profile/daniel-garcia-nilo.jpg
```

### Añadir artículos

La sección Blog está preparada. Puedes:

1. Añadir textos en `messages/es.json` y `messages/en.json`, clave `blog.posts`.
2. Más adelante, crear rutas dinámicas `app/blog/[slug]/page.tsx`.
3. Si usas Supabase, guardar posts en una tabla `blog_posts`.

## Comandos útiles

```bash
npm run dev      # desarrollo
npm run build    # build producción
npm run start    # servidor producción
npm run lint     # lint
```

## Notas finales

El portfolio está pensado para mantener una estética limpia y tecnológica. Evita añadir demasiados colores, tarjetas innecesarias o textos largos. Para cada nueva sección, prioriza claridad, impacto profesional y lectura rápida.
