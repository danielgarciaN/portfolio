# Iteración visual del portfolio

Se ha trabajado sobre los componentes existentes, conservando ES/EN, categorías múltiples, búsqueda, dossiers, recursos, contacto y temas claro/oscuro.

## Cambios y archivos

| Archivo | Cambio |
| --- | --- |
| `app/page.tsx` | Orden: Hero, perfil profesional, formación, experiencia, skills, proyectos, GitHub, contacto y pasiones. |
| `components/sections/Hero.tsx` | Composición amplia, texto a la izquierda, retrato a la derecha, capas cian y órbitas decorativas. Conserva CTAs y enlaces sociales. Admite PNG transparente con respaldo JPG. |
| `components/sections/About.tsx` | Sustituye los intereses personales por las cuatro áreas profesionales que ya existían en los diccionarios. |
| `components/sections/Timeline.tsx` | Formación en una columna conectada, ordenada por fecha de inicio descendente. Experiencia en tarjetas grandes con encabezado, responsabilidades y bloque de áreas, tecnologías y contexto. |
| `components/sections/Skills.tsx` | Conserva las seis agrupaciones y todas sus habilidades. Tarjetas individuales con icono grande, nombre y explicación breve, sin barras ni porcentajes. |
| `components/sections/PassionateAbout.tsx` | Nuevo componente independiente al final: Marvel, Gym, Cine y Campamentos. Reutiliza los textos existentes. |
| `components/ui/ProjectCard.tsx` | Imagen más amplia, categorías y estado sin solapamientos, CTA inferior, acceso a GitHub cuando existe y hover de toda la tarjeta. |
| `components/projects/ProjectHeader.tsx` | Comparte los estilos de badges con el listado. |
| `components/ui/Section.tsx` | Respeta la preferencia de movimiento reducido en el desplazamiento de entrada. |
| `components/layout/Navbar.tsx` | Añade Formación y sigue el nuevo orden. Menú compacto en pantallas intermedias. Las anclas también vuelven al inicio desde los dossiers. |
| `styles/globals.css` | Contenedor de hasta 1440 px, fondo del Hero, hover con elevación de 6 px y escala 1.02; skills hasta 1.045. Sombras, bordes, foco y movimiento reducido. Badges opacos con texto blanco. |
| `lib/data.ts` | Ingeniería: sep 2021–jun 2025. Proyectos personales: ene 2024. Bachillerato: sep 2019–jun 2021. Añade la configuración del PNG. |
| `lib/projects.ts` | Garantiza que xG se normalice como finalizado incluso si Supabase devuelve un estado antiguo. Ya estaba finalizado en los datos locales y en el dossier. |
| `messages/es.json`, `messages/en.json` | Traducciones de nuevos encabezados, descripciones de skills, Bachillerato, responsabilidades y etiquetas. Se reorganiza información existente sin añadir logros o experiencia. |
| `supabase/schema.sql` | Actualiza las fechas y añade Bachillerato a los datos iniciales. No modifica una base de datos remota existente. |
| `README.md` | Instrucciones para conectar el PNG definitivo. |
| `ITERACION.md` | Esta entrega. |

## Interacciones y contraste

La elevación usa las propiedades CSS `translate` y `scale`, independientes del `transform` de Framer Motion, para que las animaciones de entrada no anulen el hover. Las imágenes de proyectos mantienen un zoom de 1.05. Los CTAs y acciones secundarias siguen disponibles con teclado.

Los badges de categoría usan cian oscuro; los de estado, verde oscuro, azul oscuro o gris oscuro. Todos tienen fondo opaco y texto blanco en ambos temas, también sobre imágenes claras y al hacer hover. Las etiquetas fluyen en el mismo contenedor para evitar solapamientos en móvil.

## Validación

- Build de producción, TypeScript y lint correctos.
- Revisión visual en Chrome de ambos temas: Hero, formación, experiencia, skills, proyectos y pasiones.
- Revisión responsive a 320, 390, 768, 1024 y 1440 px.
- Comprobación de filtros, búsqueda, limpieza de filtros, cambio ES/EN, menú móvil, persistencia del tema y dossier xG.
- Comprobación de hover, zoom, preferencia de movimiento reducido y descargas de CV y notebook.
- Restaurada en el entorno local la dependencia `sharp@0.35.4`, ya declarada en el proyecto, para verificar las imágenes optimizadas. No se han cambiado los manifiestos de dependencias.
- El build conserva el aviso previo de `metadataBase` sin configurar; necesita el dominio público definitivo para las URLs de Open Graph.

## Pendiente del material definitivo

En el adjunto recibido solo estaba el texto: no estaban las capturas de referencia ni el PNG. La composición sigue las indicaciones escritas y la paleta existente; queda pendiente contrastarla con esas capturas.

Para el retrato, guardar `public/images/profile/daniel-garcia-nilo.png` y configurar `personalInfo.profileCutoutImage` con `/images/profile/daniel-garcia-nilo.png` en `lib/data.ts`. Después, ajustar únicamente el tamaño visual y la alineación según los márgenes transparentes reales. El código usa `object-contain`, alineación inferior y sombra suave, sin recortar la silueta; si falla el archivo, vuelve al JPG actual.

No se ha añadido centro educativo, especialidad ni descripción del Bachillerato porque no se proporcionaron esos datos.
