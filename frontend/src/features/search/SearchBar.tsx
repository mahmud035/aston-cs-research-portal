interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  onClear: () => void;
}

export default function SearchBar({
  value,
  onChange,
  onClear,
}: SearchBarProps) {
  return (
    <div className="flex gap-2">
      <input
        type="text"
        placeholder="Search publications or faculty..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="flex-1 rounded-md border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-gray-400"
      />

      {value && (
        <button
          onClick={onClear}
          className="rounded-md border border-slate-300
      px-4 py-2 text-sm text-slate-600 cursor-pointer
      transition hover:border-primary hover:text-primary focus:outline-none focus:ring-2 focus:ring-primary-light
    "
        >
          Clear
        </button>
      )}
    </div>
  );
}
