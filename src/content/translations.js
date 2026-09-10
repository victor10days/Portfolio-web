const translations = {
  // Header nav
  nav: {
    about: { en: 'About', es: 'Sobre Mí' },
    skills: { en: 'Skills', es: 'Habilidades' },
    gallery: { en: 'Gallery', es: 'Galería' },
    projects: { en: 'Projects', es: 'Proyectos' },
    experience: { en: 'Experience', es: 'Experiencia' },
    education: { en: 'Education', es: 'Educación' },
    contact: { en: 'Contact', es: 'Contacto' },
    work: { en: 'Work', es: 'Trabajo' },
  },

  // Hero
  hero: {
    line: {
      en: 'Creative technologist in San Juan: interactive media, sound design, music production and composition, full-stack development.',
      es: 'Tecnólogo creativo en San Juan: medios interactivos, diseño sonoro, producción y composición musical, desarrollo full-stack.',
    },
  },

  // About
  about: {
    title: { en: 'About', es: 'Sobre M\u00ed' },
    profile: {
      en: 'Software engineer with an audio engineer\u2019s training: Berklee for electronic production and design, Holberton for software engineering, and studio sessions for Warner Bros. and Caribbean Cinemas in between. I build tools for workflows I learned first-hand.',
      es: 'Ingeniero de software con formaci\u00f3n de ingeniero de audio: Berklee en producci\u00f3n y dise\u00f1o electr\u00f3nico, Holberton en ingenier\u00eda de software, y sesiones de estudio para Warner Bros. y Caribbean Cinemas en el medio. Construyo herramientas para flujos de trabajo que conozco de primera mano.',
    },
    bio: {
      en: 'Creative technologist with a strong foundation in music, sound design, and interactive audiovisual systems. My work blends artistic direction with technical execution, including real-time visuals, audio-reactive environments, projection mapping, experimental interfaces, and full-stack software systems.',
      es: 'Tecn\u00f3logo creativo con una s\u00f3lida formaci\u00f3n en m\u00fasica, dise\u00f1o sonoro y sistemas audiovisuales interactivos. Mi trabajo combina direcci\u00f3n art\u00edstica con ejecuci\u00f3n t\u00e9cnica, incluyendo visuales en tiempo real, entornos audio-reactivos, projection mapping, interfaces experimentales y sistemas de software full-stack.',
    },
    location: { en: 'San Juan, PR', es: 'San Juan, PR' },
    aka: {
      en: 'The music goes out as Ten Days.',
      es: 'La música sale como Ten Days.',
    },
  },

  // Skills
  skills: {
    title: { en: 'Skills', es: 'Habilidades' },
    creativeTech: { en: 'Creative Technologies', es: 'Tecnolog\u00edas Creativas' },
    development: { en: 'Development', es: 'Desarrollo' },
    backendAI: { en: 'Backend & AI', es: 'Backend e IA' },
    audio: { en: 'Audio & DSP', es: 'Audio y DSP' },
    languages: { en: 'Languages', es: 'Idiomas' },
  },

  // Projects
  projects: {
    title: { en: 'Projects', es: 'Proyectos' },
    open: { en: 'see it in the gallery', es: 'verlo en la galería' },
  },

  // Experience
  experience: {
    title: { en: 'Experience', es: 'Experiencia' },
  },

  // Education
  education: {
    title: { en: 'Education', es: 'Educaci\u00f3n' },
    items: [
      {
        school: { en: 'Holberton Coding School', es: 'Holberton Coding School' },
        degree: { en: 'Software Engineering Intensive', es: 'Programa Intensivo de Ingenier\u00eda de Software' },
        date: { en: 'March 2025 \u2013 March 2026', es: 'Marzo 2025 \u2013 Marzo 2026' },
        location: { en: 'San Juan, PR', es: 'San Juan, PR' },
      },
      {
        school: { en: 'Berklee College of Music', es: 'Berklee College of Music' },
        degree: { en: 'BA Music: Electronic Production & Design', es: 'BA M\u00fasica: Producci\u00f3n Electr\u00f3nica y Dise\u00f1o' },
        date: { en: '2019 \u2013 2021', es: '2019 \u2013 2021' },
        location: { en: 'Boston, MA', es: 'Boston, MA' },
        note: { en: 'Thrive Scholarship Recipient & Dean\u2019s List', es: 'Recipiente de la Beca Thrive y Lista del Decano' },
      },
      {
        school: { en: 'Conservatory of Music of PR', es: 'Conservatorio de M\u00fasica de PR' },
        degree: { en: 'Composition, Theory & Musicology', es: 'Composici\u00f3n, Teor\u00eda y Musicolog\u00eda' },
        date: { en: '2014 \u2013 2017', es: '2014 \u2013 2017' },
        location: { en: 'San Juan, PR', es: 'San Juan, PR' },
      },
    ],
  },

  // Contact form
  contact: {
    name: { en: 'Name', es: 'Nombre' },
    email: { en: 'Email', es: 'Correo' },
    subject: { en: 'Subject', es: 'Asunto' },
    message: { en: 'Message', es: 'Mensaje' },
    send: { en: 'Send', es: 'Enviar' },
    sending: { en: 'Sending...', es: 'Enviando...' },
    success: { en: 'Message sent!', es: '\u00a1Mensaje enviado!' },
    error: { en: 'Failed to send. Try again.', es: 'Error al enviar. Int\u00e9ntalo de nuevo.' },
  },

  // Interface strings that are not body copy but are still read aloud.
  a11y: {
    skip: { en: 'Skip to content', es: 'Saltar al contenido' },
    nav: { en: 'Primary', es: 'Principal' },
    top: { en: 'Back to the top', es: 'Volver arriba' },
    menuOpen: { en: 'Open the menu', es: 'Abrir el men\u00fa' },
    menuClose: { en: 'Close the menu', es: 'Cerrar el men\u00fa' },
    sound: { en: 'Ambient sound', es: 'Sonido ambiental' },
    motion: { en: 'Background motion', es: 'Movimiento de fondo' },
  },

  lightbox: {
    prev: { en: 'Prev', es: 'Anterior' },
    next: { en: 'Next', es: 'Siguiente' },
    close: { en: 'Close', es: 'Cerrar' },
  },

  // Shown in place of a list when its API call fails, so the section and its
  // anchor survive instead of the whole block vanishing.
  errors: {
    list: {
      en: 'This list is not loading right now.',
      es: 'Esta lista no est\u00e1 cargando ahora mismo.',
    },
  },

  // Footer
  footer: {
    statement: { en: 'Tell me what you are making.', es: 'Cu\u00e9ntame qu\u00e9 est\u00e1s haciendo.' },
    copyright: { en: '\u00a9 2026 V\u00edctor E. D\u00edaz. San Juan, PR.', es: '\u00a9 2026 V\u00edctor E. D\u00edaz. San Juan, PR.' },
  },
};

export const t = (key, lang) => {
  const keys = key.split('.');
  let value = translations;
  for (const k of keys) {
    value = value?.[k];
  }
  if (value && typeof value === 'object' && (value.en || value.es)) {
    return value[lang] || value.en;
  }
  return value || key;
};

export default translations;
