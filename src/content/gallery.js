// Gallery data — add new pieces by appending to this array.
// Images go in public/gallery/ and are referenced by filename.
//
// Each entry:
//   image:    filename in public/gallery/ or full URL
//   video:    (optional) local path in public/videos/ or YouTube URL
//   title:    { en, es }
//   category: { en, es }  — used for filtering
//   year:     string
//   desc:     { en, es }  — optional longer description shown in lightbox

const gallery = [
  {
    image: 'https://opengraph.githubassets.com/1/victor10days/holbertonschool-hbnb',
    title: { en: 'HBnB Evolution', es: 'HBnB Evolution' },
    category: { en: 'Full-Stack Development', es: 'Desarrollo Full-Stack' },
    year: '2025',
    desc: {
      en: 'A complete, production-ready rental property management platform built with Python, Flask, SQLAlchemy, and JavaScript. Demonstrates RESTful API design, database integration, authentication, and full-stack web development.',
      es: 'Una plataforma completa de gestión de propiedades de alquiler construida con Python, Flask, SQLAlchemy y JavaScript. Demuestra diseño de API RESTful, integración de bases de datos, autenticación y desarrollo web full-stack.',
    },
  },
  {
    image: 'https://opengraph.githubassets.com/1/victor10days/apexive-hackaton-odoo',
    title: { en: 'AI Business Process Optimizer', es: 'Optimizador de Procesos con IA' },
    category: { en: 'AI / ERP', es: 'IA / ERP' },
    year: '2025',
    desc: {
      en: 'An enterprise Odoo 16.0 ERP add-on for automated process analysis and optimization using multi-provider AI integration (Anthropic Claude & OpenAI GPT). Identifies bottlenecks and generates optimization recommendations with ROI projections.',
      es: 'Un módulo empresarial para Odoo 16.0 que analiza y optimiza procesos de negocio mediante integración de IA multi-proveedor (Anthropic Claude y OpenAI GPT). Identifica cuellos de botella y genera recomendaciones de optimización con proyecciones de ROI.',
    },
  },
  {
    image: 'https://opengraph.githubassets.com/1/victor10days/holbertonschool-simple_shell',
    title: { en: 'Simple Shell', es: 'Simple Shell' },
    category: { en: 'Systems Programming', es: 'Programación de Sistemas' },
    year: '2025',
    desc: {
      en: 'A lightweight UNIX command interpreter written in C. Features built-in commands, PATH searching, fork/execve execution, signal handling, and memory-safe operation verified with Valgrind.',
      es: 'Un intérprete de comandos UNIX ligero escrito en C. Incluye comandos integrados, búsqueda en PATH, ejecución con fork/execve, manejo de señales y operación segura en memoria verificada con Valgrind.',
    },
  },
  {
    image: 'https://opengraph.githubassets.com/1/victor10days/holbertonschool-low_level_programming',
    title: { en: 'Printf', es: 'Printf' },
    category: { en: 'Systems Programming', es: 'Programación de Sistemas' },
    year: '2025',
    desc: {
      en: 'A custom implementation of the standard C library function printf. Explores variadic functions, function pointers, and modular C programming.',
      es: 'Una implementación personalizada de la función printf de la biblioteca estándar de C. Explora funciones variádicas, punteros a funciones y programación modular en C.',
    },
  },
  {
    image: 'toma-control-flyer.png',
    video: '/videos/toma-control-recap.mp4',
    title: { en: 'Toma Control', es: 'Toma Control' },
    category: { en: 'Interactive Event', es: 'Evento Interactivo' },
    year: '2024',
    desc: {
      en: 'An immersive audiovisual party where participants shape sound and image in real time through interactive stations with voice and electronic instruments, generating live oscilloscope-based visuals. Built with TouchDesigner, MaxMSP, and Pure Data.',
      es: 'Una fiesta audiovisual inmersiva donde los participantes moldean sonido e imagen en tiempo real a través de estaciones interactivas con voz e instrumentos electrónicos, generando visuales en vivo basados en osciloscopio. Construido con TouchDesigner, MaxMSP y Pure Data.',
    },
  },
  {
    image: 'iambica-logo.svg',
    title: { en: 'Iambica', es: 'Iambica' },
    category: { en: 'Branding', es: 'Branding' },
    year: '2025',
  },
  {
    image: 'caribbean-cinemas-logo.png',
    video: 'https://www.youtube.com/watch?v=8saunvDlCIk',
    title: { en: 'Caribbean Cinemas Policy Trailer', es: 'Tráiler de Políticas Caribbean Cinemas' },
    category: { en: 'Sound Design', es: 'Diseño Sonoro' },
    year: '2022',
    desc: {
      en: 'Sound design and audio implementation for the Caribbean Cinemas policy trailer, created in collaboration with Paleta Creativa.',
      es: 'Diseño sonoro e implementación de audio para el tráiler de políticas de Caribbean Cinemas, creado en colaboración con Paleta Creativa.',
    },
  },
];

export default gallery;
