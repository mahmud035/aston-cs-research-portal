export default function Footer() {
  return (
    <footer className="mt-20 border-t border-slate-200 bg-white">
      <div className="container mx-auto max-w-6xl px-4 py-6 text-center text-sm text-slate-600">
        <p className="font-medium text-slate-700">
          Aston Computer Science Department
        </p>

        <p className="mt-1">Aston University · Birmingham, UK</p>

        <p className="mt-2 text-xs text-slate-500">
          © {new Date().getFullYear()} Aston University. Academic project.
        </p>
      </div>
    </footer>
  );
}
