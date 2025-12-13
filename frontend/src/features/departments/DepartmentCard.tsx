import { Link } from 'react-router-dom';
import type { Department } from './department.types';

interface DepartmentCardProps {
  department: Department;
}

export default function DepartmentCard({ department }: DepartmentCardProps) {
  return (
    <Link
      to={`/departments/${department.slug}`}
      className="block rounded-lg border border-gray-200 p-5 hover:border-gray-400 hover:shadow-sm transition"
    >
      <h3 className="text-lg font-semibold text-gray-900">{department.name}</h3>
    </Link>
  );
}
