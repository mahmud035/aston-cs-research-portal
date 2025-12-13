import DepartmentGrid from '../features/departments/DepartmentGrid';

export default function Home() {
  return (
    <main className="container mx-auto px-4 py-10">
      <h1 className="mb-8 text-3xl font-bold">
        Aston Computer Science Department
      </h1>

      <DepartmentGrid />

      {/* Search section will go here later */}
    </main>
  );
}
