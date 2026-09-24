export function TechList({ items }: { items: string[] }) {
  return (
    <ul className="flex flex-wrap gap-2">
      {items.map((item) => (
        <li
          key={item}
          className="rounded-full border border-accent/15 bg-accent/5 px-2.5 py-0.5 font-mono text-xs text-accent dark:border-accent-soft/20 dark:bg-accent-soft/10 dark:text-accent-soft"
        >
          {item}
        </li>
      ))}
    </ul>
  );
}
