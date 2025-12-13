import { Link } from 'react-router-dom';
import type { Department } from './department.types';

interface DepartmentCardProps {
  department: Department;
}

export default function DepartmentCard({ department }: DepartmentCardProps) {
  return (
    <Link
      to={`/departments/${department.slug}`}
      className="
   group rounded-xl border border-slate-200
    bg-white p-6 transition-all duration-200 hover:border-primary-light hover:shadow-md
  "
    >
      <h3 className="text-lg font-semibold text-gray-900 group-hover:text-primary">
        {department.name}
      </h3>

      <p className="mt-2 text-sm text-gray-500">View faculty & research</p>
    </Link>
  );
}
