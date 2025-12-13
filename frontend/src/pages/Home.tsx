import DepartmentGrid from '../features/departments/DepartmentGrid';
import SearchSection from '../features/search/SearchSection';

export default function Home() {
  return (
    <main className="container mx-auto max-w-6xl px-4 py-10">
      <h1 className="mb-2 text-3xl font-bold text-slate-900">
        Explore Computer Science Research
      </h1>
      <p className="mb-10 max-w-3xl text-slate-600">
        Discover research areas, academic staff, and scholarly publications
        within the Aston Computer Science Department.
      </p>

      <DepartmentGrid />
      <SearchSection />
    </main>
  );
}
