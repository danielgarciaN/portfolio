# Ajustes finales: color, Hero, contraste y Skills

Refinamiento sobre el portfolio existente, conservando estructura, fuentes Manrope
y JetBrains Mono, proyectos, filtros, páginas internas, responsive e idiomas.
Esta entrega sustituye la paleta y el enfoque de niveles de la iteración anterior.

## Paleta y fondos

Dorado principal **#B8966B**: nombre, botones, subtítulos, líneas y detalles del Hero
y header. Hover claro **#C9AB86**. Texto accent sobre fondos claros **#705235**,
para mantener legibilidad. Texto principal claro/oscuro: #F7F7F5 / #171717.

| Sección | Fondo |
| --- | --- |
| Hero | #0B0C0D, con halo cálido muy sutil |
| Sobre mí | #ECEBE7 |
| Experiencia profesional | #FFFFFF |
| Formación | #E3E1DB |
| Skills | #0B0C0D; tarjetas #141414 |
| Proyectos | #ECEBE7 |
| GitHub | #FFFFFF |
| Pasiones | #E8E6E1 |
| Contacto | Degradado #1B1B17 → #0B0C0D |
| Índice y contenido de categorías de skills | #F5F5F3; tarjetas blancas |

La alternancia gris/blanco/gris cálido separa el bloque profesional y formativo.
Proyectos y Pasiones usan grises perceptibles, separados por GitHub blanco.
Texto y bordes siguen adaptándose automáticamente al fondo de cada sección.

## Hero

La proporción de columnas pasa a 1:1.12. La foto ocupa el 120% de su bloque y se
desplaza hacia el centro con un margen izquierdo de -12%. Su altura pasa de 45 a
49 rem en escritorio y de 25 a 29 rem en móvil. A 1440 px, el contenedor mide
aproximadamente 838 × 784 px, con el centro unos 50 px más a la izquierda.
Entre 1024 y 1279 px, el texto tiene un margen adicional frente a la imagen.
Fotografía en color, máscara suave y Hero limpio, sin badges ni elementos flotantes.

## Formación y experiencia

Formación conserva el timeline, fechas y contenido. Tarjetas blancas opacas sobre
#E3E1DB, borde al 20%, línea lateral dorada y sombra sutil mejoran su separación.
Experiencia mantiene estructura, espaciado, logos y headers corporativos: SDG navy
#0E2442 y Occident rojo #BB1736. Su fondo blanco diferencia esta sección de las grises.

## Skills

Categorías y herramientas tienen iconos grandes centrados dentro de círculos
semirrellenos de 80 px, seguidos por nombre y descripción. Las categorías conservan
tecnologías destacadas y CTA; las herramientas mantienen sus enlaces a proyectos.

Se retiran las etiquetas de nivel, «Orientativo» / «Indicative», su explicación y
el clasificador de niveles del modelo de datos. No se añaden porcentajes ni puntos.
«Experiencia y nivel» pasa a «Experiencia y contexto de uso» / «Experience & context».
Se conservan los contextos académicos y profesionales, 69 skills y ocho categorías.
Databricks mantiene contexto formativo sin proyectos inventados.

## Projects

Solo se armonizan el fondo y los accents de categorías y dossiers con el dorado cálido.
Badge de categoría: fondo #30271F, texto #E8D3B9. Se conservan estados verde/ámbar,
imágenes, descripciones, hover, filtros, búsqueda, recursos y páginas internas.
Categorías a la izquierda y estado a la derecha, sin solapamientos en los anchos revisados.

## Archivos modificados en este refinamiento

- styles/globals.css
- components/sections/Hero.tsx
- components/sections/About.tsx
- components/sections/ProfessionalExperience.tsx
- components/sections/Timeline.tsx
- components/sections/Projects.tsx
- components/sections/GithubSection.tsx
- components/sections/SkillsDetail.tsx
- components/skills/SkillCategoryGrid.tsx
- components/skills/TechnologyIcon.tsx
- components/projects/ProjectDetailPage.tsx
- lib/skill-profiles.ts
- messages/es.json
- messages/en.json
- README.md
- ITERACION.md

## Validación

- TypeScript y build de producción con lint correctos; 30 páginas generadas.
- Revisión visual en Chrome de Hero, secciones claras/oscuras, Formación, Skills,
  Experiencia, Proyectos y Contacto.
- Home sin desbordamiento a 320, 390, 768, 1024 y 1440 px.
- Ocho categorías comprobadas en móvil y escritorio; iconos circulares presentes
  y etiquetas de nivel retiradas en ES/EN.
- Cambio y persistencia de idioma, filtros y posición de badges correctos.
- Cero excepciones JavaScript durante la revisión.
- Contraste: accent sobre oscuro 7.10:1; texto accent sobre Formación 5.45:1;
  categorías de proyecto 10.06:1.
- El build conserva el aviso previo de metadataBase, pendiente del dominio público.

## Asset pendiente

Solo falta el PNG transparente definitivo del Hero. Los dos logos ya están integrados.
Guardar el retrato en public/images/profile/daniel-garcia-nilo.png y configurar
personalInfo.profileCutoutImage en lib/data.ts con la ruta pública correspondiente.
Se ajustará su encaje según los márgenes transparentes reales, conservando el color.

Cambios locales; no se ha publicado ni realizado commit.
