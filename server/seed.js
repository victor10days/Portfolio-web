import db from './db.js';
import { gallery, projects, experience } from './data.js';

// Seed
console.log('Seeding database...');

const insertGallery = db.prepare(
  `INSERT INTO gallery (image, video, title_en, title_es, category_en, category_es, year, desc_en, desc_es, sort_order)
   VALUES (@image, @video, @title_en, @title_es, @category_en, @category_es, @year, @desc_en, @desc_es, @sort_order)`
);

const insertProject = db.prepare(
  `INSERT INTO projects (name_en, name_es, desc_en, desc_es, status_en, status_es, stack, category_en, category_es, gallery_id, link, sort_order)
   VALUES (@name_en, @name_es, @desc_en, @desc_es, @status_en, @status_es, @stack, @category_en, @category_es, @gallery_id, @link, @sort_order)`
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
    insertProject.run({ ...item, gallery_id: item.gallery_id ?? null, link: item.link ?? null, sort_order: i });
  });

  experience.forEach((item, i) => {
    insertExperience.run({ ...item, sort_order: i });
  });
});

seedAll();

console.log(`Seeded ${gallery.length} gallery items, ${projects.length} projects, and ${experience.length} experience items.`);
