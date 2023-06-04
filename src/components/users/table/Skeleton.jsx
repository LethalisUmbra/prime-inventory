import RowSkeleton from "./RowSkeleton";

export default function UsersTableSkeleton() {
  return (
    <div className='relative overflow-x-auto shadow-md sm:rounded-lg'>
      <table className='w-full text-sm text-left text-gray-400'>
        <thead className='bg-neutral-800 text-white'>
          <tr>
            <th scope='col' className='px-6 py-3'>
              Username
            </th>
            <th scope='col' className='px-6 py-3 text-center'>
              Email
            </th>
            <th scope='col' className='px-6 py-3 text-center'>
              Is admin
            </th>
            <th scope='col' className='px-6 py-3 text-center'>
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          <RowSkeleton />
        </tbody>
      </table>
    </div>
  );
}
