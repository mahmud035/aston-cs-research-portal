import { Department } from '../../app/modules/department/department.model';
import { slugify } from './slugify';

export async function generateUniqueDepartmentSlug(name: string) {
  let baseSlug = slugify(name);
  let slug = baseSlug;

  let counter = 2;

  while (await Department.exists({ slug })) {
    slug = `${baseSlug}-${counter}`;
    counter++;
  }

  return slug;
}
