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
  },

  // Hero
  hero: {
    subtitle: { en: 'aka Ten Days', es: 'aka Ten Days' },
    tagline1: {
      en: 'Creative Technologist \u2022 Interactive Media \u2022 Sound Design',
      es: 'Tecn\u00f3logo Creativo \u2022 Medios Interactivos \u2022 Dise\u00f1o Sonoro',
    },
    tagline2: {
      en: 'Music Production and Composition \u2022 Full-Stack Development',
      es: 'Producci\u00f3n Musical y Composici\u00f3n \u2022 Desarrollo Full-Stack',
    },
    cta: { en: 'Explore', es: 'Explorar' },
  },

  // About
  about: {
    title: { en: 'About', es: 'Sobre M\u00ed' },
    bio: {
      en: 'Creative technologist with a strong foundation in music, sound design, and interactive audiovisual systems. My work blends artistic direction with technical execution, including real-time visuals, audio-reactive environments, projection mapping, experimental interfaces, and full-stack software systems.',
      es: 'Tecn\u00f3logo creativo con una s\u00f3lida formaci\u00f3n en m\u00fasica, dise\u00f1o sonoro y sistemas audiovisuales interactivos. Mi trabajo combina direcci\u00f3n art\u00edstica con ejecuci\u00f3n t\u00e9cnica, incluyendo visuales en tiempo real, entornos audio-reactivos, projection mapping, interfaces experimentales y sistemas de software full-stack.',
    },
    location: { en: 'San Juan, PR', es: 'San Juan, PR' },
  },

  // Skills
  skills: {
    title: { en: 'Skills', es: 'Habilidades' },
    creativeTech: { en: 'Creative Technologies', es: 'Tecnolog\u00edas Creativas' },
    development: { en: 'Development', es: 'Desarrollo' },
    audio: { en: 'Audio', es: 'Audio' },
    languages: { en: 'Languages', es: 'Idiomas' },
  },

  // Projects
  projects: {
    title: { en: 'Projects', es: 'Proyectos' },
    iambica: {
      name: { en: 'IAMBICA', es: 'IAMBICA' },
      desc: {
        en: 'Interactive web platform for a new media art festival. Real-time audience participation via mobile devices, with OSC integration for audiovisual systems.',
        es: 'Plataforma web interactiva para un festival de new media art. Participaci\u00f3n del p\u00fablico en tiempo real a trav\u00e9s de dispositivos m\u00f3viles, con integraci\u00f3n OSC para sistemas audiovisuales.',
      },
      status: { en: 'In Progress', es: 'En Progreso' },
    },
    hbnb: {
      name: { en: 'HBnB Evolution', es: 'HBnB Evolution' },
      desc: {
        en: 'Complete full-stack rental platform with user authentication, property management, and review system.',
        es: 'Plataforma de alquiler full-stack completa con autenticaci\u00f3n de usuarios, gesti\u00f3n de propiedades y sistema de rese\u00f1as.',
      },
      status: { en: 'December 2025', es: 'Diciembre 2025' },
    },
    shell: {
      name: { en: 'Simple Shell', es: 'Simple Shell' },
      desc: {
        en: 'A lightweight UNIX command interpreter written in C for educational purposes.',
        es: 'Un int\u00e9rprete de comandos UNIX ligero escrito en C con fines educativos.',
      },
      status: { en: 'March 2025', es: 'Marzo 2025' },
    },
    printf: {
      name: { en: 'Printf', es: 'Printf' },
      desc: {
        en: 'Custom implementation of the standard C library function printf.',
        es: 'Implementaci\u00f3n personalizada de la funci\u00f3n printf de la biblioteca est\u00e1ndar de C.',
      },
      status: { en: 'February 2025', es: 'Febrero 2025' },
    },
  },

  // Experience
  experience: {
    title: { en: 'Experience', es: 'Experiencia' },
    items: [
      {
        role: { en: 'Studio Engineer', es: 'Ingeniero de Estudio' },
        company: { en: 'Paleta Creativa', es: 'Paleta Creativa' },
        date: { en: '2025 \u2013 Present', es: '2025 \u2013 Presente' },
        desc: {
          en: 'Clients include Warner Bros, Caribbean Cinemas, GFR Media, Mobil.',
          es: 'Clientes incluyen Warner Bros, Caribbean Cinemas, GFR Media, Mobil.',
        },
      },
      {
        role: { en: 'Architectural Documentation Assistant', es: 'Asistente de Documentaci\u00f3n Arquitect\u00f3nica' },
        company: { en: 'D\u00edaz Paunetto Architects', es: 'D\u00edaz Paunetto Arquitectos' },
        date: { en: '2024 \u2013 2025', es: '2024 \u2013 2025' },
        desc: {
          en: 'Restoration documentation for Museo Casa Roig.',
          es: 'Documentaci\u00f3n de restauraci\u00f3n del Museo Casa Roig.',
        },
      },
      {
        role: { en: 'Event Producer', es: 'Productor de Eventos' },
        company: { en: '\u2018Toma Control\u2019 Interactive Event', es: 'Evento Interactivo \u2018Toma Control\u2019' },
        date: { en: '2024', es: '2024' },
        desc: {
          en: 'Collaboration with Coca-Cola, Cuadrado Gris, Radio Underground.',
          es: 'Colaboraci\u00f3n con Coca-Cola, Cuadrado Gris, Radio Underground.',
        },
      },
      {
        role: { en: 'Sound Designer', es: 'Dise\u00f1ador de Sonido' },
        company: { en: 'Adelobo Estudios', es: 'Adelobo Estudios' },
        date: { en: '2024', es: '2024' },
        desc: {
          en: 'Sound design work in Santo Domingo, DR.',
          es: 'Trabajo de dise\u00f1o sonoro en Santo Domingo, RD.',
        },
      },
      {
        role: { en: 'Music Teacher', es: 'Profesor de M\u00fasica' },
        company: { en: 'MAC: \u00c9tica y Reggaet\u00f3n', es: 'MAC: \u00c9tica y Reggaet\u00f3n' },
        date: { en: '2023 \u2013 2024', es: '2023 \u2013 2024' },
        desc: {
          en: 'Barrio Obrero en el Microphone program, San Juan.',
          es: 'Programa Barrio Obrero en el Microphone, San Juan.',
        },
      },
      {
        role: { en: 'Sound Designer', es: 'Dise\u00f1ador de Sonido' },
        company: { en: 'Caribbean Cinemas', es: 'Caribbean Cinemas' },
        date: { en: '2022', es: '2022' },
        desc: {
          en: 'Sound design for the Caribbean Cinemas policy trailer.',
          es: 'Dise\u00f1o sonoro para el trailer de pol\u00edticas de Caribbean Cinemas.',
        },
      },
    ],
  },

  // Education
  education: {
    title: { en: 'Education', es: 'Educaci\u00f3n' },
    items: [
      {
        school: { en: 'Holberton Coding School', es: 'Holberton Coding School' },
        degree: { en: 'Software Engineering Intensive', es: 'Programa Intensivo de Ingenier\u00eda de Software' },
        date: { en: '2025 \u2013 2026', es: '2025 \u2013 2026' },
        location: { en: 'San Juan, PR', es: 'San Juan, PR' },
      },
      {
        school: { en: 'Berklee College of Music', es: 'Berklee College of Music' },
        degree: { en: 'BA Music: Electronic Production & Design', es: 'BA M\u00fasica: Producci\u00f3n Electr\u00f3nica y Dise\u00f1o' },
        date: { en: '2019 \u2013 2021', es: '2019 \u2013 2021' },
        location: { en: 'Boston, MA', es: 'Boston, MA' },
        note: { en: 'Thrive Scholarship Recipient', es: 'Recipiente de la Beca Thrive' },
      },
      {
        school: { en: 'Conservatory of Music of PR', es: 'Conservatorio de M\u00fasica de PR' },
        degree: { en: 'Composition, Theory & Musicology', es: 'Composici\u00f3n, Teor\u00eda y Musicolog\u00eda' },
        date: { en: '2014 \u2013 2018', es: '2014 \u2013 2018' },
        location: { en: 'San Juan, PR', es: 'San Juan, PR' },
      },
    ],
  },

  // Footer
  footer: {
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
