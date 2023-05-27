export default function AuthLayout({ children }) {
  return (
    <div className='container m-auto flex flex-col justify-between items-center'>
      {children}
    </div>
  );
}
