export default function AdminGrid({ children, className }) {
  return (
    <div
      className={`grid grid-cols-2 auto-rows-fr place-items-stretch gap-5 ${className}`}
    >
      {children}
    </div>
  );
}
