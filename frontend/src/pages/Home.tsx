import DepartmentGrid from '../features/departments/DepartmentGrid';
import SearchSection from '../features/search/SearchSection';

export default function Home() {
  return (
    <main className="container mx-auto max-w-6xl px-4 py-10">
      <h1 className="mb-8 text-3xl font-bold">
        Aston Computer Science Department
      </h1>

      <DepartmentGrid />
      <SearchSection />
    </main>
  );
}
