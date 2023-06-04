export default function RowSkeleton() {
  return (
    <tr className='bg-white border-b hover:bg-gray-50 h-10 animate-pulse duration-100'>
      <th scope='row' className='px-6 py-2 font-medium whitespace-nowrap'>
        <div className='h-4 w-28 bg-gray-300 hover:bg-gray-400 rounded' />
      </th>
      <td className='px-6 py-2'>
        <div className='h-4 w-28 bg-gray-300 hover:bg-gray-400 rounded' />
      </td>
      <td className='px-6 py-2'>
        <div className='bg-gray-300 hover:bg-gray-400 rounded-full p-1 w-7 h-7 mx-auto' />
      </td>
      <td className='px-6 py-2 text-right'>
        <div className='flex w-full items-center justify-between gap-2 mx-auto'>
          <div className='font-medium text-blue-500 hover:text-blue-600 hover:shadow transition-all bg-blue-50 rounded-full p-4 hover:bg-blue-200' />
          <button className='font-medium text-red-500 hover:text-red-600 hover:shadow transition-all bg-red-50 rounded-full p-4 hover:bg-red-200'></button>
          <div className='font-medium text-amber-400 hover:text-amber-500 hover:shadow transition-all bg-amber-50 rounded-full p-4 hover:bg-amber-200' />
        </div>
      </td>
    </tr>
  );
}
