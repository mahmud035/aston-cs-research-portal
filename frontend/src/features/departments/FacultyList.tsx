import { Link } from 'react-router-dom';
import type { FacultyPreview } from './department.types';

interface FacultyListProps {
  faculties: FacultyPreview[];
}

export default function FacultyList({ faculties }: FacultyListProps) {
  if (faculties.length === 0) {
    return (
      <p className="text-gray-600">
        No faculty members are currently listed for this department.
      </p>
    );
  }

  return (
    <ul className="space-y-4">
      {faculties.map((faculty) => (
        <li
          key={faculty._id}
          className="rounded-xl border border-slate-200 bg-white p-5
    transition hover:shadow-sm"
        >
          <Link to={`/faculties/${faculty._id}`}>
            <h3 className="font-semibold text-gray-900">{faculty.name}</h3>

            {faculty.position && (
              <p className="text-sm text-gray-600">{faculty.position}</p>
            )}
          </Link>
        </li>
      ))}
    </ul>
  );
}
