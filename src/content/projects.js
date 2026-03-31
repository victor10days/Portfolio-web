import translations from './translations';

const projectsData = [
  {
    name: translations.projects.iambica.name,
    desc: translations.projects.iambica.desc,
    status: translations.projects.iambica.status,
    stack: ['React 19', 'p5.js', 'WebSockets', 'OSC', 'Express', 'SQLite', 'Web Audio API'],
  },
  {
    name: translations.projects.hbnb.name,
    desc: translations.projects.hbnb.desc,
    status: translations.projects.hbnb.status,
    stack: ['Python', 'Flask', 'HTML/CSS', 'JavaScript', 'SQL'],
  },
  {
    name: translations.projects.shell.name,
    desc: translations.projects.shell.desc,
    status: translations.projects.shell.status,
    stack: ['C', 'UNIX', 'System Calls'],
  },
  {
    name: translations.projects.printf.name,
    desc: translations.projects.printf.desc,
    status: translations.projects.printf.status,
    stack: ['C', 'Variadic Functions'],
  },
];

export default projectsData;
