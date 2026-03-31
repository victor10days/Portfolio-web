import db from './db.js';

// Gallery data — IDs after seed: 1=HBnB, 2=AI Optimizer, 3=Simple Shell, 4=Printf, 5=Toma Control, 6=Caribbean Cinemas, 7=Humanos Seguros, 8=IAMBICA
const gallery = [
  {
    image: 'https://opengraph.githubassets.com/1/victor10days/holbertonschool-hbnb',
    title_en: 'HBnB Evolution', title_es: 'HBnB Evolution',
    category_en: 'Full-Stack Development', category_es: 'Desarrollo Full-Stack',
    year: '2025',
    desc_en: 'A complete, production-ready rental property management platform built with Python, Flask, SQLAlchemy, and JavaScript. Demonstrates RESTful API design, database integration, authentication, and full-stack web development.',
    desc_es: 'Una plataforma completa de gestión de propiedades de alquiler construida con Python, Flask, SQLAlchemy y JavaScript. Demuestra diseño de API RESTful, integración de bases de datos, autenticación y desarrollo web full-stack.',
  },
  {
    image: 'https://opengraph.githubassets.com/1/victor10days/apexive-hackaton-odoo',
    title_en: 'AI Business Process Optimizer', title_es: 'Optimizador de Procesos con IA',
    category_en: 'AI / ERP', category_es: 'IA / ERP',
    year: '2025',
    desc_en: 'An enterprise Odoo 16.0 ERP add-on for automated process analysis and optimization using multi-provider AI integration (Anthropic Claude & OpenAI GPT). Identifies bottlenecks and generates optimization recommendations with ROI projections.',
    desc_es: 'Un módulo empresarial para Odoo 16.0 que analiza y optimiza procesos de negocio mediante integración de IA multi-proveedor (Anthropic Claude y OpenAI GPT). Identifica cuellos de botella y genera recomendaciones de optimización con proyecciones de ROI.',
  },
  {
    image: 'https://opengraph.githubassets.com/1/victor10days/holbertonschool-simple_shell',
    title_en: 'Simple Shell', title_es: 'Simple Shell',
    category_en: 'Systems Programming', category_es: 'Programación de Sistemas',
    year: '2025',
    desc_en: 'A lightweight UNIX command interpreter written in C. Features built-in commands, PATH searching, fork/execve execution, signal handling, and memory-safe operation verified with Valgrind.',
    desc_es: 'Un intérprete de comandos UNIX ligero escrito en C. Incluye comandos integrados, búsqueda en PATH, ejecución con fork/execve, manejo de señales y operación segura en memoria verificada con Valgrind.',
  },
  {
    image: 'https://opengraph.githubassets.com/1/victor10days/holbertonschool-low_level_programming',
    title_en: 'Printf', title_es: 'Printf',
    category_en: 'Systems Programming', category_es: 'Programación de Sistemas',
    year: '2025',
    desc_en: 'A custom implementation of the standard C library function printf. Explores variadic functions, function pointers, and modular C programming.',
    desc_es: 'Una implementación personalizada de la función printf de la biblioteca estándar de C. Explora funciones variádicas, punteros a funciones y programación modular en C.',
  },
  {
    image: 'toma-control-flyer.png',
    video: '/videos/toma-control-recap.mp4',
    title_en: 'Toma Control', title_es: 'Toma Control',
    category_en: 'Interactive Event', category_es: 'Evento Interactivo',
    year: '2024',
    desc_en: 'An immersive audiovisual party where participants shape sound and image in real time through interactive stations with voice and electronic instruments, generating live oscilloscope-based visuals. Built with TouchDesigner, MaxMSP, and Pure Data.',
    desc_es: 'Una fiesta audiovisual inmersiva donde los participantes moldean sonido e imagen en tiempo real a través de estaciones interactivas con voz e instrumentos electrónicos, generando visuales en vivo basados en osciloscopio. Construido con TouchDesigner, MaxMSP y Pure Data.',
  },
  {
    image: '/uploads/1774712099411-unnamed.png',
    video: 'https://www.youtube.com/watch?v=8saunvDlCIk',
    title_en: 'Caribbean Cinemas Policy Trailer', title_es: 'Tráiler de Políticas Caribbean Cinemas',
    category_en: 'Sound Design', category_es: 'Diseño Sonoro',
    year: '2022',
    desc_en: 'Sound design and audio implementation for the Caribbean Cinemas policy trailer, created in collaboration with Paleta Creativa.',
    desc_es: 'Diseño sonoro e implementación de audio para el tráiler de políticas de Caribbean Cinemas, creado en colaboración con Paleta Creativa.',
  },
  {
    image: '/uploads/1774711659996-unnamed-(1).png',
    video: 'https://www.youtube.com/watch?v=ei6vcByEARU&list=RDei6vcByEARU&start_radio=1',
    title_en: 'Humanos Seguros Commercial', title_es: 'Anuncio Humanos Seguro',
    category_en: 'Audio', category_es: 'Audio',
    year: '2024',
    desc_en: 'Sound design and audio implementation for the Humanos Seguros 2024 commercial, created in collaboration with Adelobo Estudios.',
    desc_es: 'Diseño de sonido e implementación de audio para el anuncio publicitario de Humanos Seguros 2024, creado en colaboración con Adelobo Estudios.',
  },
  {
    image: 'iambica-logo.svg',
    title_en: 'IAMBICA', title_es: 'IAMBICA',
    category_en: 'In Progress', category_es: 'En progreso',
    year: '2026',
    desc_en: 'Interactive web platform for a new media art festival. Real-time audience participation via mobile devices, with OSC integration for audiovisual systems.',
    desc_es: 'Plataforma web interactiva para un festival de new media art. Participación del público en tiempo real a través de dispositivos móviles, con integración OSC para sistemas audiovisuales.',
  },
];

// Projects data — grouped by category, with gallery_id references
const projects = [
  // --- Interactive ---
  {
    name_en: 'IAMBICA', name_es: 'IAMBICA',
    desc_en: 'Interactive web platform for a new media art festival. Real-time audience participation via mobile devices, with OSC integration for audiovisual systems.',
    desc_es: 'Plataforma web interactiva para un festival de new media art. Participación del público en tiempo real a través de dispositivos móviles, con integración OSC para sistemas audiovisuales.',
    status_en: 'In Progress', status_es: 'En Progreso',
    stack: JSON.stringify(['React 19', 'p5.js', 'WebSockets', 'OSC', 'Express', 'SQLite', 'Web Audio API']),
    category_en: 'Interactive', category_es: 'Interactivo',
    gallery_id: 8,
  },
  {
    name_en: 'Toma Control', name_es: 'Toma Control',
    desc_en: 'An immersive audiovisual party where participants shape sound and image in real time through interactive stations.',
    desc_es: 'Una fiesta audiovisual inmersiva donde los participantes moldean sonido e imagen en tiempo real a través de estaciones interactivas.',
    status_en: '2024', status_es: '2024',
    stack: JSON.stringify(['TouchDesigner', 'MaxMSP', 'Pure Data']),
    category_en: 'Interactive', category_es: 'Interactivo',
    gallery_id: 5,
  },
  // --- Audio ---
  {
    name_en: 'Humanos Seguros Commercial', name_es: 'Anuncio Humanos Seguros',
    desc_en: 'Sound design and audio implementation for the Humanos Seguros 2024 commercial, created in collaboration with Adelobo Estudios.',
    desc_es: 'Diseño de sonido e implementación de audio para el anuncio publicitario de Humanos Seguros 2024, creado en colaboración con Adelobo Estudios.',
    status_en: '2024', status_es: '2024',
    stack: JSON.stringify(['Ableton Live', 'Logic', 'Pro Tools', 'Foley']),
    category_en: 'Audio', category_es: 'Audio',
    gallery_id: 7,
  },
  {
    name_en: 'Caribbean Cinemas Policy Trailer', name_es: 'Tráiler de Políticas Caribbean Cinemas',
    desc_en: 'Sound design and audio implementation for the Caribbean Cinemas policy trailer, created in collaboration with Paleta Creativa.',
    desc_es: 'Diseño sonoro e implementación de audio para el tráiler de políticas de Caribbean Cinemas, creado en colaboración con Paleta Creativa.',
    status_en: '2022', status_es: '2022',
    stack: JSON.stringify(['Sound Design', 'Pro Tools', 'Foley']),
    category_en: 'Audio', category_es: 'Audio',
    gallery_id: 6,
  },
  // --- Full-Stack Development ---
  {
    name_en: 'HBnB Evolution', name_es: 'HBnB Evolution',
    desc_en: 'Complete full-stack rental platform with user authentication, property management, and review system.',
    desc_es: 'Plataforma de alquiler full-stack completa con autenticación de usuarios, gestión de propiedades y sistema de reseñas.',
    status_en: 'December 2025', status_es: 'Diciembre 2025',
    stack: JSON.stringify(['Python', 'Flask', 'HTML/CSS', 'JavaScript', 'SQL']),
    category_en: 'Full-Stack Development', category_es: 'Desarrollo Full-Stack',
    gallery_id: 1,
  },
  {
    name_en: 'AI Business Process Optimizer', name_es: 'Optimizador de Procesos con IA',
    desc_en: 'Enterprise Odoo 16.0 ERP add-on for automated process analysis and optimization using multi-provider AI integration.',
    desc_es: 'Módulo empresarial para Odoo 16.0 que analiza y optimiza procesos de negocio mediante integración de IA multi-proveedor.',
    status_en: '2025', status_es: '2025',
    stack: JSON.stringify(['Python', 'Odoo 16', 'Anthropic API', 'OpenAI API']),
    category_en: 'Full-Stack Development', category_es: 'Desarrollo Full-Stack',
    gallery_id: 2,
  },
  {
    name_en: 'Simple Shell', name_es: 'Simple Shell',
    desc_en: 'A lightweight UNIX command interpreter written in C for educational purposes.',
    desc_es: 'Un intérprete de comandos UNIX ligero escrito en C con fines educativos.',
    status_en: 'March 2025', status_es: 'Marzo 2025',
    stack: JSON.stringify(['C', 'UNIX', 'System Calls']),
    category_en: 'Full-Stack Development', category_es: 'Desarrollo Full-Stack',
    gallery_id: 3,
  },
  {
    name_en: 'Printf', name_es: 'Printf',
    desc_en: 'Custom implementation of the standard C library function printf.',
    desc_es: 'Implementación personalizada de la función printf de la biblioteca estándar de C.',
    status_en: 'February 2025', status_es: 'Febrero 2025',
    stack: JSON.stringify(['C', 'Variadic Functions']),
    category_en: 'Full-Stack Development', category_es: 'Desarrollo Full-Stack',
    gallery_id: 4,
  },
];

// Experience data
const experience = [
  {
    role_en: 'Studio Engineer', role_es: 'Ingeniero de Estudio',
    company_en: 'Paleta Creativa', company_es: 'Paleta Creativa',
    date_en: '2025 – Present', date_es: '2025 – Presente',
    desc_en: 'Clients include Warner Bros, Caribbean Cinemas, GFR Media, Mobil.',
    desc_es: 'Clientes incluyen Warner Bros, Caribbean Cinemas, GFR Media, Mobil.',
  },
  {
    role_en: 'Architectural Documentation Assistant', role_es: 'Asistente de Documentación Arquitectónica',
    company_en: 'Díaz Paunetto Architects', company_es: 'Díaz Paunetto Arquitectos',
    date_en: '2024 – 2025', date_es: '2024 – 2025',
    desc_en: 'Restoration documentation for Museo Casa Roig.',
    desc_es: 'Documentación de restauración del Museo Casa Roig.',
  },
  {
    role_en: 'Event Producer', role_es: 'Productor de Eventos',
    company_en: "'Toma Control' Interactive Event", company_es: "Evento Interactivo 'Toma Control'",
    date_en: '2024', date_es: '2024',
    desc_en: 'Collaboration with Coca-Cola, Cuadrado Gris, Radio Underground.',
    desc_es: 'Colaboración con Coca-Cola, Cuadrado Gris, Radio Underground.',
  },
  {
    role_en: 'Sound Designer', role_es: 'Diseñador de Sonido',
    company_en: 'Adelobo Estudios', company_es: 'Adelobo Estudios',
    date_en: '2024', date_es: '2024',
    desc_en: 'Sound design work in Santo Domingo, DR.',
    desc_es: 'Trabajo de diseño sonoro en Santo Domingo, RD.',
  },
  {
    role_en: 'Music Teacher', role_es: 'Profesor de Música',
    company_en: 'MAC: Ética y Reggaetón', company_es: 'MAC: Ética y Reggaetón',
    date_en: '2023 – 2024', date_es: '2023 – 2024',
    desc_en: 'Barrio Obrero en el Microphone program, San Juan.',
    desc_es: 'Programa Barrio Obrero en el Microphone, San Juan.',
  },
  {
    role_en: 'Data Entry', role_es: 'Data Entry',
    company_en: 'CENCOR', company_es: 'CENCOR',
    date_en: '2023 - 2024', date_es: '2023 - 2024',
    desc_en: 'The Data Technician supports the Historic Buildings and Sites Division by entering, organizing, verifying, and backing up project data while assisting coordinators with scheduling and taking on additional tasks as needed.',
    desc_es: 'El técnico de datos presta apoyo a la División de Edificios y Sitios Históricos introduciendo, organizando, verificando y realizando copias de seguridad de los datos de los proyectos, a la vez que ayuda a los coordinadores con la programación y asume tareas adicionales según sea necesario.',
  },
  {
    role_en: 'Sound Designer', role_es: 'Diseñador de Sonido',
    company_en: 'Caribbean Cinemas', company_es: 'Caribbean Cinemas',
    date_en: '2022', date_es: '2022',
    desc_en: 'Sound design for the Caribbean Cinemas policy trailer.',
    desc_es: 'Diseño sonoro para el trailer de políticas de Caribbean Cinemas.',
  },
];

// Seed
console.log('Seeding database...');

const insertGallery = db.prepare(
  `INSERT INTO gallery (image, video, title_en, title_es, category_en, category_es, year, desc_en, desc_es, sort_order)
   VALUES (@image, @video, @title_en, @title_es, @category_en, @category_es, @year, @desc_en, @desc_es, @sort_order)`
);

const insertProject = db.prepare(
  `INSERT INTO projects (name_en, name_es, desc_en, desc_es, status_en, status_es, stack, category_en, category_es, gallery_id, sort_order)
   VALUES (@name_en, @name_es, @desc_en, @desc_es, @status_en, @status_es, @stack, @category_en, @category_es, @gallery_id, @sort_order)`
);

const insertExperience = db.prepare(
  `INSERT INTO experience (role_en, role_es, company_en, company_es, date_en, date_es, desc_en, desc_es, sort_order)
   VALUES (@role_en, @role_es, @company_en, @company_es, @date_en, @date_es, @desc_en, @desc_es, @sort_order)`
);

const seedAll = db.transaction(() => {
  // Clear existing data
  db.prepare('DELETE FROM projects').run();
  db.prepare('DELETE FROM gallery').run();
  db.prepare('DELETE FROM experience').run();

  // Reset autoincrement so gallery IDs are predictable
  db.prepare("DELETE FROM sqlite_sequence WHERE name='gallery'").run();
  db.prepare("DELETE FROM sqlite_sequence WHERE name='projects'").run();
  db.prepare("DELETE FROM sqlite_sequence WHERE name='experience'").run();

  gallery.forEach((item, i) => {
    insertGallery.run({ ...item, video: item.video || null, desc_en: item.desc_en || null, desc_es: item.desc_es || null, sort_order: i });
  });

  projects.forEach((item, i) => {
    insertProject.run({ ...item, gallery_id: item.gallery_id ?? null, sort_order: i });
  });

  experience.forEach((item, i) => {
    insertExperience.run({ ...item, sort_order: i });
  });
});

seedAll();

console.log(`Seeded ${gallery.length} gallery items, ${projects.length} projects, and ${experience.length} experience items.`);
