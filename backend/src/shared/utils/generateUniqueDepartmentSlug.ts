import { Department } from '../../app/modules/department/department.model';
import { slugify } from './slugify';

// NOTE: This function ensures uniqueness even if two CS-related departments would otherwise collide.

export async function generateUniqueDepartmentSlug(
  name: string
): Promise<string> {
  const baseSlug = slugify(name);
  let slug = baseSlug;
  let counter = 2;

  while (await Department.exists({ slug })) {
    slug = `${baseSlug}-${counter}`;
    counter++;
  }

  return slug;
}
